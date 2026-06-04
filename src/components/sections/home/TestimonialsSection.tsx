"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { testimonials } from "@/data/site";
import type { ParentReview } from "@/types/site";

export function TestimonialsSection({ reviews }: { reviews?: ParentReview[] }) {
  const items = reviews?.length ? reviews : testimonials.map((review) => ({ ...review, id: review.name, visible: true }));

  return (
    <section className="section-padding bg-[#F7FBFF]">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Parent Voices"
            title="Families feel the difference in their child's confidence."
            description="Parents choose Arpanam for a preschool experience that feels warm, organised, modern, and deeply attentive."
          />
        </Reveal>
        <div className="scrollbar-hidden mt-10 overflow-x-auto pb-4">
          <div className="flex snap-x snap-mandatory gap-5">
          {items.map((testimonial, index) => (
            <Reveal key={testimonial.id ?? testimonial.name} delay={index * 0.07} className="flex min-w-[18rem] snap-start sm:min-w-[21rem] lg:min-w-[22rem]">
              <motion.article
                className="relative flex min-h-[21rem] w-full flex-col rounded-lg border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Quote className="h-9 w-9 text-[#38BDF8]" />
                <div className="mt-5 flex gap-1 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base font-medium leading-8 text-slate-700">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-blue-100 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#38BDF8] font-heading text-base font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-slate-950">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
