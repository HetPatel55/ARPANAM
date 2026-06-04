"use client";

import { ChevronDown, Send } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { programs } from "@/data/site";
import { siteInfo } from "@/data/site";

type ContactFormProps = {
  compact?: boolean;
  buttonLabel?: string;
};

export function ContactForm({ compact = false, buttonLabel = "Send Enquiry" }: ContactFormProps) {
  const [error, setError] = useState("");
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");

  const namePattern = /^[A-Za-z][A-Za-z .'-]*$/;
  const parentNameError =
    parentName && (parentName.length < 2 || !namePattern.test(parentName))
      ? "Use letters only for parent name."
      : "";
  const childNameError = childName && !namePattern.test(childName) ? "Use letters only for child name." : "";
  const phoneError = phone && phone.length !== 10 ? "Enter exactly 10 digits." : "";

  const hasClientError = Boolean(parentNameError || childNameError || phoneError);

  function sanitizeName(value: string) {
    return value.replace(/[^A-Za-z .'-]/g, "").replace(/\s{2,}/g, " ").slice(0, 80);
  }

  function sanitizePhone(value: string) {
    return value.replace(/\D/g, "").slice(0, 10);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setError("");

    if (hasClientError || !parentName || phone.length !== 10) {
      event.preventDefault();
      setError("Please fix the highlighted fields before submitting.");
      return;
    }
  }

  return (
    <form
      action={`https://formsubmit.co/${siteInfo.email}`}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="_subject" value="New Arpanam Kids School Enquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input
            aria-describedby={parentNameError ? "parent-name-error" : undefined}
            aria-invalid={Boolean(parentNameError)}
            aria-label="Parent name"
            maxLength={80}
            name="Parent Name"
            onChange={(event) => setParentName(sanitizeName(event.target.value))}
            placeholder="Parent name"
            required
            value={parentName}
          />
          {parentNameError ? <p id="parent-name-error" className="mt-1 text-xs font-semibold text-red-600">{parentNameError}</p> : null}
        </div>
        <div>
          <Input
            aria-describedby={phoneError ? "phone-error" : undefined}
            aria-invalid={Boolean(phoneError)}
            aria-label="Phone number"
            inputMode="numeric"
            maxLength={10}
            name="Phone"
            onChange={(event) => setPhone(sanitizePhone(event.target.value))}
            pattern="\d{10}"
            placeholder="10 digit phone number"
            required
            type="tel"
            value={phone}
          />
          {phoneError ? <p id="phone-error" className="mt-1 text-xs font-semibold text-red-600">{phoneError}</p> : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input
            aria-describedby={childNameError ? "child-name-error" : undefined}
            aria-invalid={Boolean(childNameError)}
            aria-label="Child name"
            maxLength={80}
            name="Child Name"
            onChange={(event) => setChildName(sanitizeName(event.target.value))}
            placeholder="Child name"
            value={childName}
          />
          {childNameError ? <p id="child-name-error" className="mt-1 text-xs font-semibold text-red-600">{childNameError}</p> : null}
        </div>
        <div className="relative">
          <label htmlFor="program" className="sr-only">
            Programme interested in
          </label>
          <select
            aria-label="Programme interested in"
            className="h-12 w-full appearance-none rounded-lg border border-blue-100 bg-white px-4 py-3 pr-11 text-sm font-medium text-slate-700 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-100"
            id="program"
            name="Programme"
            onChange={(event) => setProgram(event.target.value)}
            required
            value={program}
          >
            <option value="">Select programme</option>
            {programs.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
      </div>
      {!compact ? (
        <Textarea aria-label="Message" maxLength={600} name="Message" placeholder="Tell us how we can help" />
      ) : null}
      <Button
        type="submit"
        variant="sunshine"
        size="lg"
        className="w-full sm:w-auto"
        disabled={hasClientError}
      >
        <Send className="h-4 w-4" />
        {buttonLabel}
      </Button>
      {error ? (
        <p aria-live="polite" className="text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </form>
  );
}
