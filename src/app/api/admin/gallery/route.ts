import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { createAlbum, readCmsData } from "@/lib/backend/storage";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await readCmsData();
  return NextResponse.json({ albums: data.galleryAlbums });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body?.title || !body?.category) {
    return NextResponse.json({ message: "Album title and category are required." }, { status: 400 });
  }

  const album = await createAlbum({
    title: String(body.title),
    category: String(body.category),
    description: body.description ? String(body.description) : "",
    accent: body.accent ? String(body.accent) : "#38BDF8"
  });

  return NextResponse.json({ album }, { status: 201 });
}
