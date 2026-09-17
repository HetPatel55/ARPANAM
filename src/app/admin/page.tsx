import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { readCmsData } from "@/lib/backend/storage";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await readCmsData();
  const newEnquiries = data.enquiries.filter((enquiry) => enquiry.status === "New").length;
  const photoCount = data.galleryAlbums.reduce((total, album) => total + album.images.length, 0);

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Backend"
          title="Admin Dashboard"
          description="Manage enquiries, gallery albums, and school website content from one secure workspace."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Total Enquiries</p>
            <p className="mt-2 font-heading text-4xl font-bold text-sky-700">{data.enquiries.length}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">New Enquiries</p>
            <p className="mt-2 font-heading text-4xl font-bold text-sky-700">{newEnquiries}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Gallery Photos</p>
            <p className="mt-2 font-heading text-4xl font-bold text-sky-700">{photoCount}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-950">Enquiries</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              View submitted forms, update status, add internal notes, and remove old entries.
            </p>
            <Button asChild className="mt-5 bg-sky-700 text-white hover:bg-sky-800">
              <Link href="/admin/enquiries">Manage Enquiries</Link>
            </Button>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-950">Gallery</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create albums, upload school photos, hide albums, and remove old images.
            </p>
            <Button asChild className="mt-5 bg-sky-700 text-white hover:bg-sky-800">
              <Link href="/admin/gallery">Manage Gallery</Link>
            </Button>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-950">Parent Reviews</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add approved parent responses and control which reviews appear on the website.
            </p>
            <Button asChild className="mt-5 bg-sky-700 text-white hover:bg-sky-800">
              <Link href="/admin/reviews">Manage Reviews</Link>
            </Button>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-slate-950">Website Content</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Update school details, homepage text, contact info, WhatsApp number, and programme copy.
            </p>
            <Button asChild className="mt-5 bg-sky-700 text-white hover:bg-sky-800">
              <Link href="/admin/content">Edit Content</Link>
            </Button>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
