import { ActivitiesPreviewSection } from "@/components/sections/home/ActivitiesPreviewSection";
import { AdmissionCtaSection } from "@/components/sections/home/AdmissionCtaSection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ProgramsPreviewSection } from "@/components/sections/home/ProgramsPreviewSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { siteContent } from "@/data/site";

export default async function HomePage() {
  return (
    <>
      <HeroSection content={siteContent} />
      <WhyChooseUsSection />
      <ProgramsPreviewSection content={siteContent} />
      <ActivitiesPreviewSection />
      <TestimonialsSection />
      <AdmissionCtaSection content={siteContent} />
    </>
  );
}
