import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { facilities, imageLibrary, values } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Arpanam Kids School, its mission, vision, values, principal message, and child-friendly infrastructure."
};

const timeline = [
  {
    title: "A warm welcome",
    description: "Children begin with familiar routines, friendly teachers, and a calm environment."
  },
  {
    title: "Joyful discovery",
    description: "Stories, activities, nature, music, art, and play become daily learning moments."
  },
  {
    title: "Growing confidence",
    description: "Children practice independence, expression, sharing, and classroom readiness."
  },
  {
    title: "Ready for the next step",
    description: "Foundational skills are strengthened with care, structure, and celebration."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Arpanam"
        title="A preschool built on care, curiosity, confidence, and trust."
        description="Arpanam Kids School creates a premium yet personal early learning experience where children feel safe enough to explore and supported enough to shine."
        image={imageLibrary.classroom}
      />

      <section className="section-padding bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-blue-50 shadow-glow">
              <Image
                src={imageLibrary.children}
                alt="Children learning together"
                width={900}
                height={760}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Badge variant="sunshine" className="mb-4">
              Our Story
            </Badge>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
              A bright beginning, thoughtfully shaped for young learners.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Arpanam Kids School is designed as a nurturing first school experience, blending
              structured readiness with imagination, activity, values, and emotional security.
              The school environment is warm and child-friendly, while the learning approach
              remains polished, purposeful, and future-ready.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-heading text-xl font-bold text-primary">Mission</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    To help children build foundational skills, confidence, kindness, curiosity,
                    and a joyful relationship with learning.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-heading text-xl font-bold text-primary">Vision</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    To be a trusted early learning space where every child begins school with
                    happiness, courage, and strong values.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="The quiet principles behind every classroom moment."
              description="A clear set of values keeps the school experience caring, consistent, and developmentally right for young children."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.05}>
                  <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-950">{value.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Principal Message"
              title="Every child deserves a first school that feels both gentle and inspiring."
              description="At Arpanam, we believe early childhood is not a race. It is a beautifully important beginning. Our role is to help each child feel seen, safe, capable, expressive, and ready to take their next steps with confidence."
            />
            <p className="mt-6 font-heading text-lg font-bold text-primary">Principal, Arpanam Kids School</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[2rem] bg-gradient-to-br from-primary via-sky-brand to-sunshine-deep p-1 shadow-glow">
              <div className="rounded-[1.85rem] bg-white p-8">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-blue-50 font-heading text-4xl font-extrabold text-primary">
                  AK
                </div>
                <p className="mt-6 text-center text-sm leading-7 text-slate-600">
                  Warm leadership, trained teachers, and child-first routines shape a preschool
                  experience families can trust every day.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Learning Journey"
              title="A gentle timeline from comfort to confidence."
              description="Each child progresses through daily routines, meaningful activities, and small achievements that build readiness."
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="relative border-l-2 border-blue-200 pb-9 pl-8 last:pb-0">
                  <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Infrastructure"
              title="Bright, supervised spaces for learning, play, and expression."
              description="The campus supports classroom learning, creative activities, active play, and secure movement through the day."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {facilities.map((facility, index) => (
              <Reveal key={facility.title} delay={index * 0.05}>
                <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-card">
                  <div className="relative h-64">
                    <Image src={facility.image} alt={facility.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-slate-950">{facility.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{facility.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
