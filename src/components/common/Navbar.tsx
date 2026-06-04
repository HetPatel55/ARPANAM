"use client";

import { CalendarDays, MapPin, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { navItems, siteInfo } from "@/data/site";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScroll(18);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isHome
          ? "border-b border-blue-100/70 bg-white/95 shadow-sm backdrop-blur-xl"
          : scrolled
            ? "border-b border-blue-100/70 bg-white/92 shadow-sm backdrop-blur-xl"
            : "bg-white/40 backdrop-blur-sm"
      )}
    >
      {isHome ? (
        <div className="border-b border-blue-100/80 bg-[#1D4ED8] text-white">
          <div className="container flex min-h-8 items-center justify-between gap-4 py-1.5 text-xs font-semibold">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-[#FACC15]" />
              Admissions open for Jr KG, Sr KG and Balvatika 2026-2027
            </span>
            <span className="hidden items-center gap-2 text-blue-50 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-[#38BDF8]" />
              Book a guided campus visit today
            </span>
          </div>
        </div>
      ) : null}
      <nav className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary",
                  active && "text-primary"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-primary via-sky-brand to-sunshine-deep transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
          <Button asChild variant="sunshine" size="sm">
            <Link href="/admissions">Admissions</Link>
          </Button>
        </div>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white/90 text-primary shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <div
        className={cn(
          "container grid transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="rounded-3xl border border-blue-100 bg-white p-3 shadow-card">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-primary",
                  pathname === item.href && "bg-blue-50 text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}>
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </Button>
              <Button asChild variant="sunshine" size="sm">
                <Link href="/admissions" onClick={() => setOpen(false)}>
                  Admissions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
