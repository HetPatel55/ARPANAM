"use client";

import { Eye, EyeOff, Images, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GalleryAlbum } from "@/lib/backend/types";

export function GalleryManager({ initialAlbums }: { initialAlbums: GalleryAlbum[] }) {
  const [albums, setAlbums] = useState(initialAlbums);
  const [message, setMessage] = useState("");

  const stats = useMemo(
    () => ({
      albums: albums.length,
      visible: albums.filter((album) => album.visible && album.images.length > 0).length,
      photos: albums.reduce((total, album) => total + album.images.length, 0)
    }),
    [albums]
  );

  async function refreshAlbums() {
    const response = await fetch("/api/admin/gallery");
    if (response.ok) {
      const data = (await response.json()) as { albums: GalleryAlbum[] };
      setAlbums(data.albums);
    }
  }

  async function createAlbum(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/admin/gallery", {
      method: "POST",
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
      form.reset();
      setMessage("Album created. Open it to upload photos and publish it.");
      await refreshAlbums();
    }
  }

  async function toggleAlbum(album: GalleryAlbum) {
    const response = await fetch(`/api/admin/gallery/albums/${album.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ visible: !album.visible })
    });

    if (response.ok) {
      await refreshAlbums();
    }
  }

  async function deleteAlbum(id: string) {
    if (!window.confirm("Delete this album and its photo records?")) {
      return;
    }

    const response = await fetch(`/api/admin/gallery/albums/${id}`, { method: "DELETE" });
    if (response.ok) {
      await refreshAlbums();
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Albums</p>
          <p className="mt-2 font-heading text-3xl font-bold text-sky-700">{stats.albums}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Visible Albums</p>
          <p className="mt-2 font-heading text-3xl font-bold text-sky-700">{stats.visible}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Photos</p>
          <p className="mt-2 font-heading text-3xl font-bold text-sky-700">{stats.photos}</p>
        </div>
      </div>

      <form onSubmit={createAlbum} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-950">Create Album</h2>
            <p className="text-sm text-slate-600">Add the album shell first, then open it to manage photos.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="Album title" required />
          <Input name="category" placeholder="Category" required />
          <Input name="accent" placeholder="Accent color, e.g. #38BDF8" defaultValue="#38BDF8" />
          <Textarea name="description" placeholder="Album description" />
        </div>
        <Button type="submit" className="mt-4 bg-sky-700 text-white hover:bg-sky-800">
          <Plus className="h-4 w-4" />
          Create Album
        </Button>
      </form>

      {message ? <p className="rounded-lg bg-sky-50 p-3 text-sm font-semibold text-sky-700">{message}</p> : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {albums.map((album) => {
          const isPublic = album.visible && album.images.length > 0;
          const cover = album.cover || album.images[0]?.src;

          return (
            <article key={album.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(19,84,78,0.14)]">
              <Link href={`/admin/gallery/${album.id}`} className="block">
                <div className="relative h-48 bg-sky-50">
                  {cover ? (
                    <Image src={cover} alt={`${album.title || "Gallery"} cover`} fill sizes="33vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sky-700">
                      <Images className="h-10 w-10" />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                    {album.images.length} photos
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-slate-950">
                        {album.title || "Untitled album"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">{album.category || "Uncategorized"}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        isPublic ? "bg-sky-50 text-sky-700" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {isPublic ? "Public" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {album.description || "No description added yet."}
                  </p>
                </div>
              </Link>
              <div className="flex items-center justify-between border-t p-4">
                <Button type="button" variant="outline" size="sm" className="border-slate-200 text-sky-700 hover:bg-sky-50" onClick={() => toggleAlbum(album)}>
                  {album.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {album.visible ? "Hide" : "Show"}
                </Button>
                <Button type="button" variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => deleteAlbum(album.id)}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
