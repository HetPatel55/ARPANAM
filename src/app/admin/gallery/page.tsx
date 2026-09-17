import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { readCmsData } from "@/lib/backend/storage";

export default async function AdminGalleryPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const data = await readCmsData();

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Gallery"
          title="Album Manager"
          description="Create albums, open an album to edit its photos, and control what appears on the public website."
          actions={
            <Button asChild variant="outline" className="border-slate-200 bg-white text-sky-700 hover:bg-sky-50">
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          }
        />
        <GalleryManager initialAlbums={data.galleryAlbums} />
      </div>
    </AdminShell>
  );
}
