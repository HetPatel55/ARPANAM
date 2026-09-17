import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { readCmsData } from "@/lib/backend/storage";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await readCmsData();
  return NextResponse.json({ enquiries: data.enquiries });
}
