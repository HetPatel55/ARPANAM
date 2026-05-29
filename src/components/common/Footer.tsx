import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { navItems, programs, siteInfo } from "@/data/site";

const socials = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "YouTube", icon: Youtube }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-100 bg-slate-950 text-white">
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sunshine-deep/20 blur-3xl" />
      <div className="container relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">{siteInfo.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.label}
                  aria-label={social.label}
                  variant="outline"
                  size="icon"
                  className="border-white/15 bg-white/10 text-white hover:bg-white hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Quick Links</h3>
          <div className="mt-5 space-y-3">
            {navItems.slice(1).map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="block text-sm text-blue-100 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Programs</h3>
          <div className="mt-5 space-y-3">
            {programs.map((program) => (
              <Link
                href="/programs"
                key={program.title}
                className="block text-sm text-blue-100 transition-colors hover:text-white"
              >
                {program.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-blue-100">
            <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`} className="flex gap-3 hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 text-sunshine" />
              {siteInfo.phone}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="flex gap-3 hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 text-sky-brand" />
              {siteInfo.email}
            </a>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
              {siteInfo.address}
            </p>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-blue-100">
        Copyright {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
