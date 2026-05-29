import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { ContactForm } from "@/components/common/ContactForm";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { admissionSteps, documents, eligibility, faqs, imageLibrary, siteInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions Open 2026-2027 at Arpanam Kids School. View admission process, eligibility, documents, inquiry form, and FAQs."
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Admissions Open ${siteInfo.admissionYear}`}
        title="A simple, warm admission process for your child's bright beginning."
        description="Explore eligibility, required documents, inquiry steps, and FAQs for Jr. KG., Sr. KG., and Balvatika admissions."
        image={imageLibrary.building}
        badgeVariant="sunshine"
      />

      <section className="section-padding bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Admission Process"
              title="From enquiry to welcome kit, every step is clear and family-friendly."
              description="The admissions experience is designed to be easy, transparent, and reassuring for parents and children."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <Card className="relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="font-heading text-4xl font-extrabold text-blue-100">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Eligibility"
              title="Choose the program that matches your child's foundational stage."
              description="Age and readiness details can be confirmed during the admission interaction."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4">
              {eligibility.map((item) => (
                <Card key={item.program}>
                  <CardContent className="grid gap-4 p-5 sm:grid-cols-[0.45fr_0.45fr_1fr] sm:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase text-primary">Program</p>
                      <h3 className="font-heading text-xl font-bold text-slate-950">{item.program}</h3>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-primary">Age</p>
                      <p className="font-semibold text-slate-700">{item.age}</p>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item.focus}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardContent className="p-6 sm:p-8">
                <Badge variant="purple" className="mb-4">
                  Documents
                </Badge>
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">
                  Required Documents
                </h2>
                <div className="mt-6 space-y-4">
                  {documents.map((document) => (
                    <div key={document} className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-slate-700">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="font-semibold">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <CardContent className="p-6 sm:p-8">
                <Badge variant="sunshine" className="mb-4">
                  Inquiry
                </Badge>
                <h2 className="font-heading text-3xl font-extrabold text-slate-950">
                  Start Your Enquiry
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Share your details and the admissions desk will help with program availability,
                  visit slots, and next steps.
                </p>
                <div className="mt-6">
                  <ContactForm buttonLabel="Submit Inquiry" />
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-blue-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="FAQs"
              title="Answers to common admission questions."
              description="Quick clarity for families exploring Arpanam Kids School."
            />
          </Reveal>
          <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-blue-100 bg-white px-6 shadow-card">
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
