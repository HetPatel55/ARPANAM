"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/site";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const move = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-blue-100 bg-white p-6 shadow-card sm:p-8">
      <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-sunshine/40" />
      <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full bg-sky-brand/25" />
      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.32 }}
          className="relative"
        >
          <div className="mb-5 flex gap-1 text-sunshine-deep">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star key={starIndex} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-xl font-semibold leading-9 text-slate-800 sm:text-2xl">
            “{active.quote}”
          </p>
          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-brand font-heading text-lg font-bold text-white shadow-soft">
                {active.initials}
              </div>
              <div>
                <p className="font-heading font-bold text-slate-950">{active.name}</p>
                <p className="text-sm text-slate-500">{active.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button aria-label="Previous testimonial" variant="outline" size="icon" onClick={() => move(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button aria-label="Next testimonial" variant="outline" size="icon" onClick={() => move(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
