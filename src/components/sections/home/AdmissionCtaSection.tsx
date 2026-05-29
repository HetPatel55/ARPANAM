"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, Phone, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteInfo } from "@/data/site";

const admissionHighlights = ["Jr KG", "Sr KG", "Balvatika"];

export function AdmissionCtaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#1D4ED8_0%,#2563EB_38%,#38BDF8_100%)] px-6 py-10 text-white shadow-[0_32px_95px_rgba(29,78,216,0.24)] sm:px-10 sm:py-12 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(250,204,21,0.24),transparent_24rem),radial-gradient(circle_at_88%_18%,rgba(236,72,153,0.20),transparent_21rem),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_48%)]" />
          <div className="absolute inset-0 soft-grid opacity-[0.12]" />
          <motion.div
            aria-hidden
            className="absolute right-12 top-10 hidden h-2.5 w-36 rounded-full bg-[#FACC15] shadow-[0_16px_35px_rgba(250,204,21,0.36)] lg:block"
            animate={{ x: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-10 right-24 hidden h-24 w-2.5 rounded-full bg-white/45 lg:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/12 blur-2xl" />
          <div className="absolute -right-12 top-20 h-56 w-56 rounded-full bg-[#A855F7]/20 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-center xl:grid-cols-[1fr_30rem]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/16 px-4 py-2 text-sm font-bold shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Admissions Open
              </div>
              <h2 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Admissions Open {siteInfo.admissionYear}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
                Give your child a joyful, secure, and inspiring start at Arpanam Kids School.
                Limited seats are open for Jr KG, Sr KG, and Balvatika.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {admissionHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-sm font-bold shadow-sm backdrop-blur"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#FACC15]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-white/22 bg-white/16 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-5">
              <div className="rounded-2xl bg-white p-5 text-slate-950 shadow-card">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F59E0B]">
                  New Session
                </p>
                <p className="mt-2 font-heading text-3xl font-extrabold text-[#1D4ED8]">
                  {siteInfo.admissionYear}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Schedule a campus visit and meet our admissions team for program guidance.
                </p>
                <div className="mt-5 grid gap-3">
                  <Button asChild size="lg" className="bg-[#1D4ED8] text-white hover:bg-blue-800">
                    <Link href="/admissions">
                      Enquire Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-blue-100 bg-blue-50/60">
                    <Link href="/contact">
                      <CalendarCheck className="h-4 w-4" />
                      Book a Visit
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-blue-100 bg-white">
                    <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}>
                      <Phone className="h-4 w-4" />
                      Call Admissions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
