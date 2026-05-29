"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  compact?: boolean;
  buttonLabel?: string;
};

export function ContactForm({ compact = false, buttonLabel = "Send Enquiry" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input aria-label="Parent name" placeholder="Parent name" required />
        <Input aria-label="Phone number" placeholder="Phone number" required type="tel" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input aria-label="Child name" placeholder="Child name" />
        <Input aria-label="Program interested in" placeholder="Program interested in" />
      </div>
      {!compact ? (
        <Textarea aria-label="Message" placeholder="Tell us how we can help" />
      ) : null}
      <Button type="submit" variant="sunshine" size="lg" className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {buttonLabel}
      </Button>
      {submitted ? (
        <p aria-live="polite" className="text-sm font-semibold text-green-700">
          Thank you. Your enquiry has been noted for the admissions team.
        </p>
      ) : null}
    </form>
  );
}
