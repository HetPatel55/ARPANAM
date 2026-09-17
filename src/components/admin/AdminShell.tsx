"use client";

import { ExternalLink, FilePenLine, GalleryHorizontalEnd, Inbox, LayoutDashboard, MessageSquareQuote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { Button } from "@/components/ui/button";
import { siteInfo } from "@/data/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Gallery", href: "/admin/gallery", icon: GalleryHorizontalEnd },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquareQuote },
  { label: "Content", href: "/admin/content", icon: FilePenLine }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href));
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="container">
          <div className="flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
                aria-label={`${siteInfo.name} admin dashboard`}
                prefetch
              >
                <Image
                  src="/assets/arpanam-logo-transparent.png"
                  alt={siteInfo.name}
                  width={118}
                  height={44}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Admin Panel</p>
                <h1 className="font-heading text-xl font-bold text-slate-950">{siteInfo.name}</h1>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition-all",
                      isActive
                        ? "bg-sky-700 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Button asChild variant="outline" size="sm" className="border-slate-200 text-sky-700 hover:bg-sky-50">
                <Link href="/" target="_blank" prefetch={false}>
                  <ExternalLink className="h-4 w-4" />
                  View Website
                </Link>
              </Button>
              <AdminLogoutButton />
            </nav>
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 top-20 h-72 bg-sky-50/60" />
      <div className="relative">
        <div className="container py-8 lg:py-10">{children}</div>
      </div>
    </main>
  );
}
