import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { deleteAlbum, getGalleryAlbum, updateAlbum } from "@/lib/backend/storage";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const album = await getGalleryAlbum(id);

  if (!album) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  return NextResponse.json({ album });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const album = await updateAlbum(id, {
    title: typeof body?.title === "string" ? body.title : undefined,
    category: typeof body?.category === "string" ? body.category : undefined,
    description: typeof body?.description === "string" ? body.description : undefined,
    accent: typeof body?.accent === "string" ? body.accent : undefined,
    visible: typeof body?.visible === "boolean" ? body.visible : undefined
  });

  if (!album) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  return NextResponse.json({ album });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteAlbum(id);

  if (!deleted) {
    return NextResponse.json({ message: "Album not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
