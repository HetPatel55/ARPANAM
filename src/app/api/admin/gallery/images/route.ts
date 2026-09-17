import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { addImageToAlbum, saveUploadedGalleryFile } from "@/lib/backend/storage";

export const runtime = "nodejs";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const maxFileSize = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const albumId = String(formData.get("albumId") ?? "");
  const title = String(formData.get("title") ?? "");
  const file = formData.get("file");

  if (!albumId || !title || !(file instanceof File)) {
    return NextResponse.json({ message: "Album, title, and image file are required." }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type) || file.size > maxFileSize) {
    return NextResponse.json(
      { message: "Upload a JPG, PNG, WEBP, or GIF image under 8 MB." },
      { status: 400 }
    );
  }

  const src = await saveUploadedGalleryFile(file);
  const image = await addImageToAlbum(albumId, { title, src });

  if (!image) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  return NextResponse.json({ image }, { status: 201 });
}
