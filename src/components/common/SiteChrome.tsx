"use client";

import { Footer } from "@/components/common/Footer";
import { MobileStickyCta } from "@/components/common/MobileStickyCta";
import { Navbar } from "@/components/common/Navbar";
import { PageTransition } from "@/components/common/PageTransition";
import type { SiteInfo } from "@/types/site";

export function SiteChrome({
  children,
  siteInfo
}: {
  children: React.ReactNode;
  siteInfo?: SiteInfo;
}) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <MobileStickyCta info={siteInfo} />
    </>
  );
}
