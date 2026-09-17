import { NextResponse } from "next/server";

import { validateEnquiryInput } from "@/lib/backend/enquiry-validation";
import { notifyNewEnquiry } from "@/lib/backend/notifications";
import { isRateLimited } from "@/lib/backend/rate-limit";
import { createEnquiry } from "@/lib/backend/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many enquiries. Please try again later or call the admissions desk." },
      { status: 429 }
    );
  }

  const validation = validateEnquiryInput(body);
  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const enquiry = await createEnquiry(validation.input);
  await notifyNewEnquiry(enquiry);

  return NextResponse.json({ enquiry }, { status: 201 });
}
