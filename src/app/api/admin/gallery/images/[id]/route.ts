import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { deleteGalleryImage } from "@/lib/backend/storage";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteGalleryImage(id);

  if (!deleted) {
    return NextResponse.json({ message: "Image not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
