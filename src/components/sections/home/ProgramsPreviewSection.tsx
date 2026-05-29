import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imageLibrary, programs } from "@/data/site";

const programCards = [
  {
    ...programs[0],
    title: "Jr KG",
    accent: "#38BDF8",
    badge: "Age 4+",
    image: imageLibrary.children
  },
  {
    ...programs[1],
    title: "Sr KG",
    accent: "#F59E0B",
    badge: "Age 5+",
    image: imageLibrary.hero
  },
  {
    ...programs[2],
    title: "Balvatika",
    accent: "#22C55E",
    badge: "Foundational",
    image: imageLibrary.playground
  }
];

export function ProgramsPreviewSection() {
  return (
    <section className="section-padding bg-[#EFF8FF]">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Programs"
            title="Purposeful early learning programs for every bright beginning."
            description="A balanced path from joyful first routines to confident school readiness, designed around age, pace, and personality."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {programCards.map((program, index) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.title} delay={index * 0.07}>
                <article className="group h-full overflow-hidden rounded-lg border border-blue-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_28px_80px_rgba(29,78,216,0.18)]">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={`${program.title} classroom`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/5 to-transparent" />
                    <Badge variant="outline" className="absolute left-5 top-5 bg-white/95">
                      {program.badge}
                    </Badge>
                    <div
                      className="absolute bottom-5 right-5 h-2 w-24 rounded-full"
                      style={{ backgroundColor: program.accent }}
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-sm"
                      style={{ backgroundColor: program.accent }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-950">{program.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{program.description}</p>
                    <Button asChild variant="link" className="mt-5">
                      <Link href="/programs">
                        Explore program
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
