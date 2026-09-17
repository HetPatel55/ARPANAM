import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/backend/auth";
import { getSiteContent, updateSiteContent } from "@/lib/backend/storage";
import type { SiteContent } from "@/lib/backend/types";

export const runtime = "nodejs";

function clean(value: unknown, fallback = "", maxLength = 400) {
  const text = String(value ?? fallback).trim();
  return text.slice(0, maxLength);
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ content: await getSiteContent() });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Partial<SiteContent> | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid content details." }, { status: 400 });
  }

  const content = await updateSiteContent({
    siteInfo: body.siteInfo
      ? {
          name: clean(body.siteInfo.name, "Arpanam Kids School", 80),
          shortName: clean(body.siteInfo.shortName, "Arpanam", 40),
          tagline: clean(body.siteInfo.tagline, "", 180),
          admissionYear: clean(body.siteInfo.admissionYear, "", 30),
          phone: clean(body.siteInfo.phone, "", 24),
          whatsappNumber: clean(body.siteInfo.whatsappNumber, "", 24),
          email: clean(body.siteInfo.email, "", 100),
          address: clean(body.siteInfo.address, "", 180)
        }
      : undefined,
    home: body.home
      ? {
          heroTitle: clean(body.home.heroTitle, "", 80),
          heroHighlight: clean(body.home.heroHighlight, "", 80),
          heroDescription: clean(body.home.heroDescription, "", 280)
        }
      : undefined,
    programs: Array.isArray(body.programs)
      ? body.programs.slice(0, 3).map((program) => ({
          title: clean(program.title, "", 50),
          age: clean(program.age, "", 50),
          description: clean(program.description, "", 260)
        }))
      : undefined
  });

  return NextResponse.json({ content });
}
