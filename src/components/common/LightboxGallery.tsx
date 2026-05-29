"use client";

import { motion } from "framer-motion";
import { Images } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { galleryAlbums } from "@/data/site";
import { cn } from "@/lib/utils";

type GalleryAlbum = (typeof galleryAlbums)[number];

type LightboxGalleryProps = {
  albums?: GalleryAlbum[];
  showFilters?: boolean;
  limit?: number;
};

export function LightboxGallery({
  albums = galleryAlbums,
  showFilters = true,
  limit
}: LightboxGalleryProps) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryAlbum | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(albums.map((album) => album.category)))],
    [albums]
  );

  const filtered = useMemo(() => {
    const list = category === "All" ? albums : albums.filter((album) => album.category === category);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [albums, category, limit]);

  const activeImage = selected?.images[activeIndex];

  const openAlbum = (album: GalleryAlbum) => {
    setSelected(album);
    setActiveIndex(0);
  };

  return (
    <>
      {showFilters ? (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                category === item
                  ? "border-primary bg-primary text-white shadow-soft"
                  : "border-blue-100 bg-white text-slate-600 hover:border-primary hover:text-primary"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((album, index) => (
          <motion.button
            key={`${album.title}-${category}`}
            type="button"
            onClick={() => openAlbum(album)}
            className="group relative overflow-hidden rounded-lg bg-blue-50 text-left shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <span
              className="absolute inset-x-5 top-5 z-10 h-1.5 rounded-full"
              style={{ backgroundColor: album.accent }}
            />
            <span className="relative block h-72 overflow-hidden">
              <Image
                src={album.cover}
                alt={`${album.title} album cover`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent" />
              <span className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-bold uppercase backdrop-blur">
                  <Images className="h-3.5 w-3.5" />
                  {album.images.length} Photos
                </span>
                <span className="mt-3 block font-heading text-2xl font-bold">{album.title}</span>
                <span className="mt-2 block text-sm leading-6 text-white/82">{album.description}</span>
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && activeImage ? (
          <DialogContent className="max-h-[92vh] max-w-7xl overflow-y-auto p-4 sm:p-5">
            <DialogHeader className="pr-10">
              <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="relative overflow-hidden rounded-lg bg-blue-50">
                <Image
                  src={activeImage.src}
                  alt={activeImage.title}
                  width={1400}
                  height={900}
                  className="max-h-[68vh] w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/82 to-transparent p-5 text-white">
                  <p className="text-xs font-bold uppercase text-white/75">{selected.category}</p>
                  <h3 className="mt-1 font-heading text-2xl font-bold">{activeImage.title}</h3>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                  Album Photos
                </p>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                  {selected.images.map((image, index) => (
                    <button
                      key={`${selected.title}-${image.title}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "group grid grid-cols-[5.5rem_1fr] items-center gap-3 rounded-lg border bg-white p-2 text-left transition-all",
                        activeIndex === index
                          ? "border-primary shadow-soft"
                          : "border-blue-100 hover:border-primary/50"
                      )}
                    >
                      <span className="relative h-16 overflow-hidden rounded-md bg-blue-50">
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          sizes="6rem"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </span>
                      <span className="text-sm font-bold leading-5 text-slate-800">{image.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
