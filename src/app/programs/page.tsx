import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { checks, imageLibrary, programs, siteContent } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Explore Jr. KG., Sr. KG., and Balvatika programmes at Arpanam Kids School with learning approach, activities, benefits, and classroom visuals."
};

const programDetails = [
  {
    title: "Jr. KG.",
    approach:
      "A gentle move from free play into structured readiness, with songs, stories, sensory exploration, early sounds, numbers, and social confidence.",
    benefits: ["Comfort with classroom routines", "Vocabulary and listening growth", "Fine motor strengthening", "Early numeracy and phonics readiness"],
    activities: ["Story circles", "Sorting games", "Clay and craft", "Outdoor play"]
  },
  {
    title: "Sr. KG.",
    approach:
      "A confident school-readiness year focused on communication, writing fluency, reading readiness, math foundations, projects, and independence.",
    benefits: ["Primary school readiness", "Reading and writing confidence", "Number operations readiness", "Self-help and presentation skills"],
    activities: ["Phonics work", "Number lab", "Show and tell", "Theme projects"]
  },
  {
    title: "Balvatika",
    approach:
      "An activity-rich foundational stage that blends values, creativity, movement, language, pre-math, nature, and practical life skills.",
    benefits: ["Whole-child development", "Play-based discovery", "Values and social habits", "Creative and physical expression"],
    activities: ["Pretend play", "Music and movement", "Nature observation", "Art exploration"]
  }
];

export default async function ProgramsPage() {
  const editablePrograms = programs.map((program, index) => ({
    ...program,
    ...(siteContent.programs[index] ?? {})
  }));

  return (
    <>
      <PageHero
        eyebrow="Our Programmes"
        title="Age-right learning pathways for confident early school years."
        description="Jr. KG., Sr. KG., and Balvatika at Arpanam Kids School are designed to balance joyful learning, clear routines, creative expression, and foundational readiness."
        image={imageLibrary.children}
        badgeVariant="purple"
      />

      <section className="section-padding bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Learning Approach"
              title="Purposeful play, foundational skills, and gentle structure."
              description="Each programme is shaped around young children's developmental needs while keeping the school experience warm, modern, and confidence-building."
            />
          </Reveal>
          <div className="mt-10 space-y-10">
            {editablePrograms.map((program, index) => {
              const Icon = program.icon;
              const details = programDetails.find((item) => item.title === program.title);
              const CheckIcon = checks;
              return (
                <Reveal key={program.title} delay={index * 0.06}>
                  <article
                    className={cn(
                      "grid gap-8 rounded-[2rem] border border-blue-100 bg-blue-50/60 p-4 shadow-card lg:grid-cols-2 lg:items-center",
                      index % 2 === 1 && "lg:[&>div:first-child]:order-2"
                    )}
                  >
                    <div className="relative overflow-hidden rounded-[1.6rem] bg-white">
                      <Image
                        src={program.image}
                        alt={`${program.title} learning visual`}
                        width={900}
                        height={720}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${program.color} p-5 text-white`}>
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                            <Icon className="h-6 w-6" />
                          </span>
                          <div>
                            <p className="text-sm font-bold">{program.age}</p>
                            <h2 className="font-heading text-2xl font-bold">{program.title}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-5">
                      <Badge variant="sky" className="mb-4">
                        {program.title}
                      </Badge>
                      <h3 className="font-heading text-3xl font-extrabold text-slate-950">
                        Learning Approach
                      </h3>
                      <p className="mt-4 leading-8 text-slate-600">{details?.approach}</p>
                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <Card className="shadow-sm">
                          <CardContent className="p-5">
                            <h4 className="font-heading font-bold text-slate-950">Benefits</h4>
                            <div className="mt-4 space-y-3">
                              {details?.benefits.map((benefit) => (
                                <p key={benefit} className="flex gap-2 text-sm text-slate-600">
                                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                                  {benefit}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                          <CardContent className="p-5">
                            <h4 className="font-heading font-bold text-slate-950">Activities</h4>
                            <div className="mt-4 space-y-3">
                              {details?.activities.map((activity) => (
                                <p key={activity} className="flex gap-2 text-sm text-slate-600">
                                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  {activity}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
