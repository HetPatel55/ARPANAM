"use client";

import { LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteInfo } from "@/data/site";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: formData.get("password") })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("The admin password is incorrect.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <div className="bg-sky-50 p-6 text-slate-950">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
            <Image
              src="/assets/arpanam-logo-transparent.png"
              alt={siteInfo.name}
              width={118}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Admin Panel</p>
            <h1 className="font-heading text-xl font-bold">{siteInfo.name}</h1>
          </div>
        </div>
      </div>
      <div className="space-y-5 p-6">
      <div>
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-slate-950">Admin Login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in to manage enquiries and gallery photos.
        </p>
      </div>
      <Input
        aria-label="Admin password"
        name="password"
        placeholder="Admin password"
        required
        type="password"
      />
      <Button type="submit" className="w-full bg-sky-700 text-white shadow-sm hover:bg-sky-800" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
      <p className="text-xs leading-5 text-slate-500">
        Local default password: arpanam-admin. Set ADMIN_PASSWORD before deployment.
      </p>
      </div>
    </form>
  );
}
