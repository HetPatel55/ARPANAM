import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { activities } from "@/data/site";

const accents = ["#EC4899", "#A855F7", "#F59E0B", "#22C55E", "#38BDF8"];

export function ActivitiesPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Activities"
            title="Creative school days that build confidence beyond the classroom."
            description="Children explore movement, rhythm, art, teamwork, and curiosity through beautifully planned activity experiences."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Reveal key={activity.title} delay={index * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-lg border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-card">
                  <div
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: accents[index] }}
                  />
                  <div className="flex h-full flex-col">
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-lg ${activity.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-950">{activity.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{activity.description}</p>
                    <div className="mt-auto pt-6">
                      <span
                        className="block h-2 w-20 rounded-full transition-all duration-300 group-hover:w-28"
                        style={{ backgroundColor: accents[index] }}
                      />
                    </div>
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
