import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { activities, imageLibrary } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Explore sports, music, art, dance, and STEM activities at Arpanam Kids School with rich imagery and child-friendly learning outcomes."
};

const outcomes = [
  "Expression",
  "Coordination",
  "Teamwork",
  "Confidence",
  "Curiosity",
  "Creativity"
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Activities"
        title="A school day alive with movement, imagination, music, and making."
        description="Arpanam activities are not extras. They are essential experiences that help children express, explore, connect, and grow with confidence."
        image={imageLibrary.celebration}
        badgeVariant="rose"
      />

      <section className="section-padding bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Showcase"
              title="Modern activity pathways for whole-child development."
              description="Each activity blends joy with purpose, helping children develop physical, creative, emotional, and thinking skills."
            />
          </Reveal>
          <div className="mt-10 grid auto-rows-[220px] gap-5 lg:grid-cols-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Reveal key={activity.title} delay={index * 0.05} className={cn(index === 0 && "lg:row-span-2")}>
                  <article className="group relative h-full overflow-hidden rounded-[2rem] border border-blue-100 bg-slate-900 shadow-card">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/20 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <Badge variant="outline" className="mb-3 border-white/40 bg-white/15 text-white backdrop-blur">
                        {activity.title}
                      </Badge>
                      <h2 className="font-heading text-2xl font-bold">{activity.title}</h2>
                      <p className="mt-3 max-w-md text-sm leading-7 text-white/86">{activity.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Outcomes"
              title="Activities build skills children carry into every classroom moment."
              description="The weekly rhythm gives children repeated opportunities to move, perform, create, solve, cooperate, and celebrate effort."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className={cn(
                    "rounded-3xl border border-blue-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1",
                    index % 3 === 0 && "bg-sky-50",
                    index % 3 === 1 && "bg-amber-50",
                    index % 3 === 2 && "bg-pink-50"
                  )}
                >
                  <p className="text-sm font-bold text-primary">0{index + 1}</p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-slate-950">{outcome}</h3>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
