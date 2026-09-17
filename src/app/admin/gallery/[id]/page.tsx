import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AdminPageHeading } from "@/components/admin/AdminPageHeading";
import { AdminShell } from "@/components/admin/AdminShell";
import { GalleryAlbumEditor } from "@/components/admin/GalleryAlbumEditor";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/backend/auth";
import { getGalleryAlbum } from "@/lib/backend/storage";

type AlbumPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminGalleryAlbumPage({ params }: AlbumPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const album = await getGalleryAlbum(id);

  if (!album) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="space-y-8">
        <AdminPageHeading
          eyebrow="Album Editor"
          title={album.title || "Untitled album"}
          description="Edit album information, upload photos, and manage public visibility."
          actions={
            <Button asChild variant="outline" className="border-slate-200 bg-white text-sky-700 hover:bg-sky-50">
              <Link href="/admin/gallery">Back to Albums</Link>
            </Button>
          }
        />
        <GalleryAlbumEditor initialAlbum={album} />
      </div>
    </AdminShell>
  );
}
