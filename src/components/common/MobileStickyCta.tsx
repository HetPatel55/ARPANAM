"use client";

import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { siteInfo } from "@/data/site";
import { compactPhone, whatsappHref } from "@/lib/contact";
import type { SiteInfo } from "@/types/site";

export function MobileStickyCta({ info = siteInfo }: { info?: SiteInfo }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 gap-2 rounded-lg border border-blue-100 bg-white/95 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.18)] backdrop-blur lg:hidden">
      <a
        href={whatsappHref(info.whatsappNumber)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#16A34A] text-sm font-bold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href={`tel:${compactPhone(info.phone)}`}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1D4ED8] text-sm font-bold text-white"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <Link href="/admissions" className="sr-only">
        Admissions
      </Link>
    </div>
  );
}
