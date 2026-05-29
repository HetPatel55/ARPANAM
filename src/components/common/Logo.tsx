import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Arpanam Kids School home"
      className={cn("group inline-flex items-center", className)}
    >
      <span
        className={cn(
          "inline-flex rounded-lg transition-transform duration-300 group-hover:-translate-y-0.5",
          light && "drop-shadow-[0_10px_18px_rgba(255,255,255,0.16)]"
        )}
      >
        <Image
          src="/assets/arpanam-logo-transparent.png"
          alt="Arpanam Kids School"
          width={236}
          height={66}
          priority
          className="h-12 w-auto object-contain sm:h-14"
        />
      </span>
    </Link>
  );
}
