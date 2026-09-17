"use client";

import { MessageCircle, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { whatsappHref } from "@/lib/contact";
import type { Enquiry, EnquiryStatus } from "@/lib/backend/types";

const statuses: EnquiryStatus[] = ["New", "Contacted", "Admitted", "Closed"];

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata"
});

export function EnquiryManager({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return enquiries;
    }

    return enquiries.filter((enquiry) =>
      [enquiry.parentName, enquiry.phone, enquiry.childName, enquiry.program, enquiry.status]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [enquiries, query]);

  async function updateEnquiry(id: string, patch: Partial<Pick<Enquiry, "status" | "notes">>) {
    const response = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patch)
    });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { enquiry: Enquiry };
    setEnquiries((items) => items.map((item) => (item.id === id ? data.enquiry : item)));
  }

  async function deleteEnquiry(id: string) {
    if (!window.confirm("Delete this enquiry?")) {
      return;
    }

    const response = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    if (response.ok) {
      setEnquiries((items) => items.filter((item) => item.id !== id));
    }
  }

  async function contactOnWhatsApp(enquiry: Enquiry) {
    await updateEnquiry(enquiry.id, { status: "Contacted" });
    window.open(
      whatsappHref(
        enquiry.phone,
        `Hello ${enquiry.parentName}, thank you for contacting Arpanam Kids School. We received your enquiry and would like to help you with admissions.`
      ),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="space-y-5">
      <input
        className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-sky-700 focus:ring-4 focus:ring-sky-50"
        placeholder="Search by name, phone, programme, or status"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="space-y-4">
        {filtered.map((enquiry) => (
          <article key={enquiry.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-[0_18px_45px_rgba(19,84,78,0.12)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-heading text-xl font-bold text-slate-950">{enquiry.parentName}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {enquiry.phone} {enquiry.childName ? `- Child: ${enquiry.childName}` : ""}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Programme: {enquiry.program || "Not specified"}
                </p>
                {enquiry.message ? (
                  <p className="mt-3 rounded-lg bg-sky-50 p-3 text-sm leading-6 text-slate-700">
                    {enquiry.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-sky-700 shadow-sm outline-none"
                  value={enquiry.status}
                  onChange={(event) =>
                    updateEnquiry(enquiry.id, { status: event.target.value as EnquiryStatus })
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button type="button" variant="outline" size="sm" className="border-slate-200 text-red-600 hover:bg-red-50" onClick={() => deleteEnquiry(enquiry.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
                <Button type="button" variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50" onClick={() => contactOnWhatsApp(enquiry)}>
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Textarea
                aria-label={`Notes for ${enquiry.parentName}`}
                defaultValue={enquiry.notes}
                placeholder="Internal notes"
                onBlur={(event) => updateEnquiry(enquiry.id, { notes: event.target.value })}
              />
              <p className="mt-2 text-xs text-slate-500">
                Received {dateFormatter.format(new Date(enquiry.createdAt))}
              </p>
            </div>
          </article>
        ))}
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
            No enquiries found.
          </div>
        ) : null}
      </div>
    </div>
  );
}
