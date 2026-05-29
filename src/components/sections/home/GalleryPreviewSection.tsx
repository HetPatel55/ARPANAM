import Link from "next/link";

import { LightboxGallery } from "@/components/common/LightboxGallery";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";

export function GalleryPreviewSection() {
  return (
    <section className="section-padding bg-blue-50/60">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Gallery"
              title="Moments from classrooms, celebrations, events, and activity days."
              description="A visual glimpse of the warm, colorful, and confident world children experience at Arpanam."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Button asChild variant="outline">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-10">
          <LightboxGallery showFilters={false} limit={6} />
        </div>
      </div>
    </section>
  );
}
