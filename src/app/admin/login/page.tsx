import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/backend/auth";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-sky-50/70" />
      <div className="container relative flex min-h-screen items-center justify-center py-12">
        <AdminLoginForm />
      </div>
    </main>
  );
}
