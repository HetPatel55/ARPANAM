import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { testimonials } from "@/data/site";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#F7FBFF]">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Parent Voices"
            title="Families feel the difference in their child's confidence."
            description="Parents choose Arpanam for a preschool experience that feels warm, organized, modern, and deeply attentive."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.07}>
              <article className="relative h-full rounded-lg border border-blue-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-card">
                <Quote className="h-9 w-9 text-[#38BDF8]" />
                <div className="mt-5 flex gap-1 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base font-medium leading-8 text-slate-700">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-7 flex items-center gap-4 border-t border-blue-100 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#38BDF8] font-heading text-base font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-slate-950">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
