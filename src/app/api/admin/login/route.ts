import { NextResponse } from "next/server";

import { adminPassword, setAdminCookie } from "@/lib/backend/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.password || String(body.password) !== adminPassword()) {
    return NextResponse.json({ message: "Invalid admin password." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
