import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "@/components/common/Reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  badgeVariant?: "sky" | "sunshine" | "green" | "rose" | "purple";
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  badgeVariant = "sky"
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-radial pt-32">
      <div className="absolute left-8 top-32 h-16 w-16 rounded-full bg-sunshine/30 blur-2xl" />
      <div className="absolute right-10 top-24 h-24 w-24 rounded-full bg-sky-brand/25 blur-3xl" />
      <div className="container grid gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <Badge variant={badgeVariant} className="mb-5">
            {eyebrow}
          </Badge>
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
        </Reveal>
        <Reveal delay={0.08} className="relative">
          <div className="absolute -left-5 top-8 h-20 w-20 rounded-full bg-rose/20" />
          <div className="absolute -right-4 bottom-8 h-24 w-24 rounded-[2rem] bg-sunshine/30 rotate-6" />
          <div className={cn("relative overflow-hidden rounded-[2rem] border-8 border-white shadow-glow")}>
            <Image
              src={image}
              alt={`${eyebrow} at Arpanam Kids School`}
              width={900}
              height={680}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
