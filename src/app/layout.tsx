import type { Metadata } from "next";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { PageTransition } from "@/components/common/PageTransition";
import { siteInfo } from "@/data/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arpanamkids.school"),
  title: {
    default: `${siteInfo.name} | Premium Preschool`,
    template: `%s | ${siteInfo.name}`
  },
  description:
    "A warm, modern preschool website for Arpanam Kids School with admissions, programs, activities, gallery, and contact information.",
  keywords: [
    "Arpanam Kids School",
    "preschool",
    "kindergarten",
    "Jr KG",
    "Sr KG",
    "Balvatika",
    "admissions 2026"
  ],
  openGraph: {
    title: `${siteInfo.name} | A Bright Beginning`,
    description: siteInfo.tagline,
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
