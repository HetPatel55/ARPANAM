"use client";

import { Eye, EyeOff, ImagePlus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GalleryAlbum } from "@/lib/backend/types";

export function GalleryAlbumEditor({ initialAlbum }: { initialAlbum: GalleryAlbum }) {
  const [album, setAlbum] = useState(initialAlbum);
  const [message, setMessage] = useState("");

  async function refreshAlbum() {
    const response = await fetch(`/api/admin/gallery/albums/${album.id}`);
    if (response.ok) {
      const data = (await response.json()) as { album: GalleryAlbum };
      setAlbum(data.album);
    }
  }

  async function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/gallery/albums/${album.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        accent: formData.get("accent")
      })
    });

    if (response.ok) {
      setMessage("Album details saved.");
      await refreshAlbum();
    }
  }

  async function toggleAlbum() {
    const response = await fetch(`/api/admin/gallery/albums/${album.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ visible: !album.visible })
    });

    if (response.ok) {
      setMessage(album.visible ? "Album hidden from website." : "Album set to visible.");
      await refreshAlbum();
    }
  }

  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch("/api/admin/gallery/images", {
      method: "POST",
      body: new FormData(form)
    });

    if (response.ok) {
      form.reset();
      setMessage("Photo uploaded.");
      await refreshAlbum();
    } else {
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      setMessage(data?.message || "Photo upload failed.");
    }
  }

  async function deleteImage(id: string) {
    if (!window.confirm("Remove this photo from the gallery?")) {
      return;
    }

    const response = await fetch(`/api/admin/gallery/images/${id}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("Photo removed.");
      await refreshAlbum();
    }
  }

  const isPublic = album.visible && album.images.length > 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Status</p>
          <p className={`mt-2 font-heading text-2xl font-bold ${isPublic ? "text-sky-700" : "text-red-600"}`}>
            {isPublic ? "Public" : "Draft"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Photos</p>
          <p className="mt-2 font-heading text-2xl font-bold text-slate-950">{album.images.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Category</p>
          <p className="mt-2 font-heading text-2xl font-bold text-slate-950">{album.category || "Unset"}</p>
        </div>
      </div>

      {message ? <p className="rounded-lg bg-sky-50 p-3 text-sm font-semibold text-sky-700">{message}</p> : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-950">Album Details</h2>
            <p className="mt-1 text-sm text-slate-600">Change the title, category, description, and publish status.</p>
          </div>
          <Button type="button" variant="outline" className="border-slate-200 text-sky-700 hover:bg-sky-50" onClick={toggleAlbum}>
            {album.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {album.visible ? "Hide from Website" : "Show on Website"}
          </Button>
        </div>

        <form onSubmit={saveDetails} className="mt-5 grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="Album title" defaultValue={album.title} required />
          <Input name="category" placeholder="Category" defaultValue={album.category} required />
          <Input name="accent" placeholder="Accent color" defaultValue={album.accent} />
          <Textarea name="description" placeholder="Album description" defaultValue={album.description} />
          <Button type="submit" className="bg-sky-700 text-white hover:bg-sky-800 md:col-span-2">
            <Save className="h-4 w-4" />
            Save Details
          </Button>
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-950">Upload Photos</h2>
        <form onSubmit={uploadImage} className="mt-5 grid gap-3 rounded-lg bg-sky-50 p-4 md:grid-cols-[1fr_1fr_auto]">
          <input name="albumId" type="hidden" value={album.id} />
          <Input name="title" placeholder="Photo title" required />
          <Input name="file" type="file" accept="image/*" required />
          <Button type="submit" className="bg-sky-700 text-white hover:bg-sky-800">
            <ImagePlus className="h-4 w-4" />
            Upload
          </Button>
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-slate-950">Photos</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {album.images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="relative h-44 bg-sky-50">
                <Image src={image.src} alt={image.title} fill sizes="25vw" className="object-cover" />
              </div>
              <div className="flex items-center justify-between gap-3 p-3">
                <p className="text-sm font-semibold text-slate-800">{image.title}</p>
                <Button type="button" variant="ghost" size="icon" onClick={() => deleteImage(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {album.images.length === 0 ? (
          <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">
            No photos yet. Upload the first photo to make this album usable on the website.
          </div>
        ) : null}
      </section>
    </div>
  );
}
