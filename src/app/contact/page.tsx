import type { Metadata } from "next";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";

import { ContactForm } from "@/components/common/ContactForm";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { contactCards, imageLibrary, siteContent } from "@/data/site";
import { whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Arpanam Kids School for admissions, campus visits, phone, email, address, and social media details."
};

const socialLinks = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "YouTube", icon: Youtube }
];

export default async function ContactPage() {
  const info = siteContent.siteInfo;
  const cards = contactCards.map((card) => ({
    ...card,
    value:
      card.title === "Admissions Desk"
        ? info.phone
        : card.title === "Email"
          ? info.email
          : card.title === "Campus"
            ? info.address
            : card.value
  }));

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Visit the campus, meet the team, and plan your child's next step."
        description="Reach the admissions desk, book a school visit, or send an enquiry for program availability and campus visit slots."
        image={imageLibrary.building}
        badgeVariant="sky"
      />

      <section className="section-padding bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">
                  Send an Enquiry
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Share your details and the admissions desk will guide you with program
                  availability and visit slots.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.title} className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-slate-950">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{card.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-card">
              <div className="absolute inset-0 soft-grid" />
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-glow">
                <span className="font-heading text-2xl font-extrabold">AK</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/90 p-5 shadow-card backdrop-blur">
                <p className="font-heading text-xl font-bold text-slate-950">{info.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{info.address}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              align="left"
              eyebrow="Map"
              title="Find the Arpanam campus with ease."
              description="Plan your visit and connect with the admissions desk before arriving at the school campus."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-[#16A34A] text-white hover:bg-green-700">
                <a href={whatsappHref(info.whatsappNumber)} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button key={social.label} variant="outline">
                    <Icon className="h-4 w-4" />
                    {social.label}
                  </Button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
