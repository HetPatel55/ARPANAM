import Image from "next/image";

import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { facilities } from "@/data/site";

export function FacilitiesSection() {
  return (
    <section className="section-padding bg-blue-50/70">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Campus & Facilities"
            title="A bright campus designed for safety, creativity, and confident exploration."
            description="Modern learning areas support focus, play, active discovery, and social-emotional growth."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Reveal key={facility.title} delay={index * 0.06}>
                <article className="group grid overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-56 overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-slate-950">{facility.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{facility.description}</p>
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
