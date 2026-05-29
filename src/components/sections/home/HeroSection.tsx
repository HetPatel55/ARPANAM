"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteInfo } from "@/data/site";

const programBadges = ["Jr KG", "Sr KG", "Balvatika"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFF] pt-32 sm:pt-36">
      <div className="absolute inset-0 soft-grid opacity-55" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white via-white to-transparent" />
      <div
        aria-hidden
        className="absolute right-0 top-28 hidden h-[34rem] w-[44rem] -translate-y-6 rotate-[-8deg] rounded-[3rem] bg-gradient-to-br from-[#DBF3FF] via-white to-[#FEF3C7] opacity-80 lg:block"
      />
      <motion.div
        aria-hidden
        className="absolute left-[4%] top-44 hidden h-28 w-4 rounded-full bg-[#FACC15] lg:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-24 right-[5%] hidden h-4 w-32 rounded-full bg-[#EC4899]/80 lg:block"
        animate={{ x: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-28 pt-8 lg:grid-cols-[0.98fr_1.02fr] lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Badge variant="sky" className="mb-5 gap-2 bg-white text-[#1D4ED8] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Premium preschool admissions {siteInfo.admissionYear}
          </Badge>
          <h1 className="font-heading text-5xl font-extrabold leading-[1.04] text-slate-950 sm:text-6xl lg:text-7xl">
            A Bright Beginning for{" "}
            <span className="premium-gradient-text animate-shimmer block sm:inline">
              Bright Futures
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            A warm, modern preschool where children feel safe, seen, and excited to
            learn through purposeful play, early academics, creative expression, and
            confident daily routines.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {programBadges.map((badge, index) => (
              <span
                key={badge}
                className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
              >
                <span
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                  style={{
                    backgroundColor: ["#38BDF8", "#F59E0B", "#22C55E"][index]
                  }}
                />
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[#1D4ED8] hover:bg-blue-800">
              <Link href="/admissions">
                Apply for Admission
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <MapPin className="h-4 w-4" />
                Book a Visit
              </Link>
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
              Secure campus
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-[#F59E0B]" />
              Guided visits open
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[470px] lg:min-h-[590px]"
        >
          <div className="absolute inset-x-6 bottom-2 top-16 rotate-3 rounded-[2rem] border border-[#BFDBFE] bg-white" />
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border-[10px] border-white bg-white shadow-[0_28px_90px_rgba(29,78,216,0.18)]">
            <Image
              src="/assets/arpanam-hero-building.png"
              alt="Bright school campus for Arpanam Kids School"
              width={900}
              height={980}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/92 p-4 text-slate-900 shadow-card backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#1D4ED8]">Arpanam Kids School</p>
                  <p className="mt-1 font-heading text-lg font-bold text-slate-950">
                    Warm campus, confident starts
                  </p>
                </div>
                <span className="rounded-full bg-[#22C55E]/12 px-3 py-1 text-xs font-bold text-green-700">
                  Safe
                </span>
              </div>
            </div>
          </div>
          <motion.div
            className="absolute right-0 top-12 hidden rounded-lg border border-amber-200 bg-white px-5 py-4 text-sm font-bold text-slate-800 shadow-card md:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block text-xs uppercase tracking-[0.18em] text-[#F59E0B]">
              Admissions Open
            </span>
            <span className="mt-1 block font-heading text-xl text-[#1D4ED8]">
              {siteInfo.admissionYear}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
