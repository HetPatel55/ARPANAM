import { Building2, HandHeart, Palette, ShieldCheck, UsersRound } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";

const features = [
  {
    title: "Child-Centric Learning",
    description: "Individual attention and joyful discovery.",
    icon: HandHeart,
    color: "bg-sky-100 text-[#1D4ED8]"
  },
  {
    title: "Safe Environment",
    description: "Secure, supervised, child-ready spaces.",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Experienced Educators",
    description: "Warm teachers with structured routines.",
    icon: UsersRound,
    color: "bg-purple-100 text-purple-700"
  },
  {
    title: "Creative Activities",
    description: "Art, music, movement, and expression.",
    icon: Palette,
    color: "bg-pink-100 text-pink-700"
  },
  {
    title: "Modern Classrooms",
    description: "Bright rooms for focus, play, and growth.",
    icon: Building2,
    color: "bg-amber-100 text-amber-700"
  }
];

export function WhyChooseUsSection() {
  return (
    <section className="relative z-10 -mt-16 bg-white pb-20 sm:-mt-20 lg:pb-24">
      <div className="container">
        <Reveal>
          <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-[0_24px_70px_rgba(29,78,216,0.14)] sm:p-5">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              {features.map((item) => {
            const Icon = item.icon;
            return (
                <div
                  key={item.title}
                  className="group rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50/70"
                >
                  <div className="flex items-start gap-4 lg:block">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="lg:mt-4">
                      <h3 className="font-heading text-base font-bold leading-snug text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
            );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
