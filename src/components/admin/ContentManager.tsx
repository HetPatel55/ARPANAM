"use client";

import { FormEvent, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContent } from "@/lib/backend/types";

export function ContentManager({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateSiteInfo(key: keyof SiteContent["siteInfo"], value: string) {
    setContent((current) => ({
      ...current,
      siteInfo: { ...current.siteInfo, [key]: value }
    }));
  }

  function updateHome(key: keyof SiteContent["home"], value: string) {
    setContent((current) => ({
      ...current,
      home: { ...current.home, [key]: value }
    }));
  }

  function updateProgram(index: number, key: keyof SiteContent["programs"][number], value: string) {
    setContent((current) => ({
      ...current,
      programs: current.programs.map((program, programIndex) =>
        programIndex === index ? { ...program, [key]: value } : program
      )
    }));
  }

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    setIsSaving(false);
    if (!response.ok) {
      setMessage("Could not save content. Please try again.");
      return;
    }

    const data = (await response.json()) as { content: SiteContent };
    setContent(data.content);
    setMessage("Website content saved.");
  }

  return (
    <form onSubmit={saveContent} className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-slate-950">School & Contact Details</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input value={content.siteInfo.name} onChange={(event) => updateSiteInfo("name", event.target.value)} placeholder="School name" />
          <Input value={content.siteInfo.shortName} onChange={(event) => updateSiteInfo("shortName", event.target.value)} placeholder="Short name" />
          <Input value={content.siteInfo.admissionYear} onChange={(event) => updateSiteInfo("admissionYear", event.target.value)} placeholder="Admission year" />
          <Input value={content.siteInfo.phone} onChange={(event) => updateSiteInfo("phone", event.target.value)} placeholder="Phone number" />
          <Input value={content.siteInfo.whatsappNumber} onChange={(event) => updateSiteInfo("whatsappNumber", event.target.value)} placeholder="WhatsApp number" />
          <Input value={content.siteInfo.email} onChange={(event) => updateSiteInfo("email", event.target.value)} placeholder="Email" />
          <Textarea className="md:col-span-2" value={content.siteInfo.address} onChange={(event) => updateSiteInfo("address", event.target.value)} placeholder="Campus address" />
          <Textarea className="md:col-span-2" value={content.siteInfo.tagline} onChange={(event) => updateSiteInfo("tagline", event.target.value)} placeholder="Tagline" />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-slate-950">Homepage Hero</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input value={content.home.heroTitle} onChange={(event) => updateHome("heroTitle", event.target.value)} placeholder="Hero title" />
          <Input value={content.home.heroHighlight} onChange={(event) => updateHome("heroHighlight", event.target.value)} placeholder="Highlighted words" />
          <Textarea className="md:col-span-2" value={content.home.heroDescription} onChange={(event) => updateHome("heroDescription", event.target.value)} placeholder="Hero description" />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-slate-950">Programmes</h2>
        <div className="mt-5 grid gap-5">
          {content.programs.map((program, index) => (
            <div key={`${program.title}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input value={program.title} onChange={(event) => updateProgram(index, "title", event.target.value)} placeholder="Programme title" />
                <Input value={program.age} onChange={(event) => updateProgram(index, "age", event.target.value)} placeholder="Age" />
                <Textarea className="md:col-span-2" value={program.description} onChange={(event) => updateProgram(index, "description", event.target.value)} placeholder="Programme description" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {message ? <p className="rounded-lg bg-sky-50 p-3 text-sm font-semibold text-sky-800">{message}</p> : null}
      <Button type="submit" className="bg-sky-700 text-white hover:bg-sky-800" disabled={isSaving}>
        <Save className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save Website Content"}
      </Button>
    </form>
  );
}
