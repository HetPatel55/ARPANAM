import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/common/ContactForm";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { siteInfo } from "@/data/site";

export function ContactPreviewSection() {
  return (
    <section className="section-padding bg-blue-50/70">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Plan a visit and meet the world your child will grow in."
            description="Reach the admissions desk, schedule a campus visit, or send an enquiry for the next academic session."
          />
          <div className="mt-8 space-y-4">
            {[
              { icon: Phone, label: siteInfo.phone },
              { icon: Mail, label: siteInfo.email },
              { icon: MapPin, label: siteInfo.address }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-bold text-slate-950">Enquiry Form</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your details and the admissions team will guide you through the next step.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
