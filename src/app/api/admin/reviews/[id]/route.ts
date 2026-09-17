import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { deleteParentReview, updateParentReview } from "@/lib/backend/storage";

export const runtime = "nodejs";

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const review = await updateParentReview(id, {
    name: typeof body?.name === "string" ? clean(body.name, 80) : undefined,
    role: typeof body?.role === "string" ? clean(body.role, 100) : undefined,
    quote: typeof body?.quote === "string" ? clean(body.quote, 500) : undefined,
    initials: typeof body?.initials === "string" ? clean(body.initials, 3) : undefined,
    visible: typeof body?.visible === "boolean" ? body.visible : undefined
  });

  if (!review) {
    return NextResponse.json({ message: "Review not found." }, { status: 404 });
  }

  return NextResponse.json({ review });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteParentReview(id);

  if (!deleted) {
    return NextResponse.json({ message: "Review not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
