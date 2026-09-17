import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { deleteEnquiry, updateEnquiry } from "@/lib/backend/storage";
import type { EnquiryStatus } from "@/lib/backend/types";

export const runtime = "nodejs";

const statuses: EnquiryStatus[] = ["New", "Contacted", "Admitted", "Closed"];

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body?.status ? String(body.status) : undefined;

  if (status && !statuses.includes(status as EnquiryStatus)) {
    return NextResponse.json({ message: "Invalid enquiry status." }, { status: 400 });
  }

  const enquiry = await updateEnquiry(id, {
    status: status as EnquiryStatus | undefined,
    notes: typeof body?.notes === "string" ? body.notes : undefined
  });

  if (!enquiry) {
    return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ enquiry });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteEnquiry(id);

  if (!deleted) {
    return NextResponse.json({ message: "Enquiry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
