import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { createParentReview, readCmsData } from "@/lib/backend/storage";

export const runtime = "nodejs";

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await readCmsData();
  return NextResponse.json({ reviews: data.parentReviews ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = clean(body?.name, 80);
  const quote = clean(body?.quote, 500);

  if (!name || !quote) {
    return NextResponse.json({ message: "Parent name and review are required." }, { status: 400 });
  }

  const review = await createParentReview({
    name,
    role: clean(body?.role, 100),
    quote,
    initials: clean(body?.initials, 3),
    visible: Boolean(body?.visible ?? true)
  });

  return NextResponse.json({ review }, { status: 201 });
}
