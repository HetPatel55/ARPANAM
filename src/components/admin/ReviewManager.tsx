"use client";

import { Eye, EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ParentReview } from "@/lib/backend/types";

export function ReviewManager({ initialReviews }: { initialReviews: ParentReview[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [drafts, setDrafts] = useState<Record<string, ParentReview>>(
    Object.fromEntries(initialReviews.map((review) => [review.id, review]))
  );
  const [message, setMessage] = useState("");

  async function refreshReviews() {
    const response = await fetch("/api/admin/reviews");
    if (response.ok) {
      const data = (await response.json()) as { reviews: ParentReview[] };
      setReviews(data.reviews);
      setDrafts(Object.fromEntries(data.reviews.map((review) => [review.id, review])));
    }
  }

  async function createReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        initials: formData.get("initials"),
        quote: formData.get("quote"),
        visible: true
      })
    });

    if (response.ok) {
      form.reset();
      setMessage("Parent review added to the website.");
      await refreshReviews();
    } else {
      setMessage("Could not add review. Parent name and review are required.");
    }
  }

  async function updateReview(id: string, patch: Partial<ParentReview>) {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });

    if (response.ok) {
      const data = (await response.json()) as { review: ParentReview };
      setReviews((items) => items.map((item) => (item.id === id ? data.review : item)));
      setDrafts((items) => ({ ...items, [id]: data.review }));
      setMessage("Review updated.");
    }
  }

  function updateDraft(id: string, patch: Partial<ParentReview>) {
    setDrafts((items) => ({
      ...items,
      [id]: { ...(items[id] ?? reviews.find((review) => review.id === id)!), ...patch }
    }));
  }

  async function deleteReview(id: string) {
    if (!window.confirm("Delete this parent review?")) {
      return;
    }

    const response = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (response.ok) {
      setReviews((items) => items.filter((item) => item.id !== id));
      setMessage("Review deleted.");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={createReview} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-950">Add Parent Review</h2>
            <p className="text-sm text-slate-600">Approved reviews appear in the Parent Voices section.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input maxLength={80} name="name" placeholder="Parent name" required />
          <Input maxLength={100} name="role" placeholder="Role, e.g. Parent of Sr. KG. student" />
          <Input maxLength={3} name="initials" placeholder="Initials, e.g. PS" />
          <Textarea className="md:col-span-2" maxLength={500} name="quote" placeholder="Parent review" required />
        </div>
        <Button type="submit" className="mt-4 bg-sky-700 text-white hover:bg-sky-800">
          <Plus className="h-4 w-4" />
          Add Review
        </Button>
      </form>

      {message ? <p className="rounded-lg bg-sky-50 p-3 text-sm font-semibold text-sky-800">{message}</p> : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-[4rem_1fr]">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sky-50 font-heading text-lg font-bold text-sky-700">
                {drafts[review.id]?.initials || review.initials}
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input value={drafts[review.id]?.name ?? review.name} onChange={(event) => updateDraft(review.id, { name: event.target.value })} />
                  <Input value={drafts[review.id]?.role ?? review.role} onChange={(event) => updateDraft(review.id, { role: event.target.value })} />
                </div>
                <Textarea value={drafts[review.id]?.quote ?? review.quote} onChange={(event) => updateDraft(review.id, { quote: event.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <Button type="button" variant="outline" size="sm" className="border-slate-200 text-sky-700 hover:bg-sky-50" onClick={() => updateReview(review.id, { visible: !review.visible })}>
                {review.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {review.visible ? "Hide" : "Show"}
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => updateReview(review.id, drafts[review.id] ?? review)}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button type="button" variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => deleteReview(review.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
