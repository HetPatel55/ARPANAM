import type { Metadata } from "next";

import { LightboxGallery } from "@/components/common/LightboxGallery";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { galleryAlbums, imageLibrary } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View the Arpanam Kids School gallery with classroom, activity, event, and celebration moments."
};

export default async function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Bright school memories from everyday learning and celebration days."
        description="Browse classrooms, activities, events, celebrations, and campus moments that show the energy and warmth of Arpanam Kids School."
        image={imageLibrary.art}
        badgeVariant="green"
      />
      <section className="section-padding bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Photo Stories"
              title="Album-style photo stories from school life."
              description="Open an album cover to browse the full collection of classroom, activity, celebration, and campus photos."
            />
          </Reveal>
          <div className="mt-12">
            <LightboxGallery albums={galleryAlbums} />
          </div>
        </div>
      </section>
    </>
  );
}
