import "server-only";

import { promises as fs } from "fs";
import path from "path";

import { galleryAlbums as seedAlbums, programs, siteInfo, testimonials } from "@/data/site";
import type { CmsData, Enquiry, GalleryAlbum, GalleryImage, ParentReview, SiteContent } from "@/lib/backend/types";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "cms.json");
export const galleryUploadDir = path.join(process.cwd(), "public", "uploads", "gallery");

function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function now() {
  return new Date().toISOString();
}

function seededGallery(): GalleryAlbum[] {
  const stamp = now();

  return seedAlbums.map((album, albumIndex) => ({
    id: createId(`album${albumIndex}`),
    title: album.title,
    category: album.category,
    description: album.description,
    cover: album.cover,
    accent: album.accent,
    visible: true,
    createdAt: stamp,
    updatedAt: stamp,
    images: album.images.map((image, imageIndex) => ({
      id: createId(`image${albumIndex}${imageIndex}`),
      title: image.title,
      src: image.src,
      createdAt: stamp
    }))
  }));
}

function seededReviews(): ParentReview[] {
  const stamp = now();

  return testimonials.map((review, index) => ({
    id: createId(`review${index}`),
    name: review.name,
    role: review.role,
    quote: review.quote,
    initials: review.initials,
    visible: true,
    createdAt: stamp,
    updatedAt: stamp
  }));
}

export function defaultSiteContent(): SiteContent {
  return {
    siteInfo: {
      name: siteInfo.name,
      shortName: siteInfo.shortName,
      tagline: siteInfo.tagline,
      admissionYear: siteInfo.admissionYear,
      phone: siteInfo.phone,
      whatsappNumber: siteInfo.whatsappNumber,
      email: siteInfo.email,
      address: siteInfo.address
    },
    home: {
      heroTitle: "A Bright Beginning for",
      heroHighlight: "Bright Futures",
      heroDescription:
        "A warm, modern preschool where children feel safe, seen, and excited to learn through purposeful play, early academics, creative expression, and confident daily routines."
    },
    programs: programs.map((program) => ({
      title: program.title,
      age: program.age,
      description: program.description
    }))
  };
}

function mergeSiteContent(content?: Partial<SiteContent>): SiteContent {
  const defaults = defaultSiteContent();
  return {
    siteInfo: { ...defaults.siteInfo, ...content?.siteInfo },
    home: { ...defaults.home, ...content?.home },
    programs: defaults.programs.map((program, index) => ({
      ...program,
      ...(content?.programs?.[index] ?? {})
    }))
  };
}

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(galleryUploadDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    const initialData: CmsData = {
      enquiries: [],
      galleryAlbums: seededGallery(),
      parentReviews: seededReviews(),
      siteContent: defaultSiteContent()
    };
    await fs.writeFile(dataFile, JSON.stringify(initialData, null, 2), "utf8");
  }
}

export async function readCmsData(): Promise<CmsData> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  const data = JSON.parse(raw) as CmsData;
  data.parentReviews = data.parentReviews ?? seededReviews();
  data.siteContent = mergeSiteContent(data.siteContent);
  return data;
}

export async function writeCmsData(data: CmsData) {
  await ensureStore();
  data.siteContent = mergeSiteContent(data.siteContent);
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
}

export async function getSiteContent() {
  const data = await readCmsData();
  return mergeSiteContent(data.siteContent);
}

export async function updateSiteContent(input: Partial<SiteContent>) {
  const data = await readCmsData();
  const current = mergeSiteContent(data.siteContent);
  data.siteContent = mergeSiteContent({
    ...current,
    ...input,
    siteInfo: {
      ...current.siteInfo,
      ...input.siteInfo
    },
    home: {
      ...current.home,
      ...input.home
    },
    programs: input.programs ?? current.programs
  });
  await writeCmsData(data);
  return data.siteContent;
}

export async function listVisibleGalleryAlbums() {
  const data = await readCmsData();
  return data.galleryAlbums.filter((album) => album.visible && album.cover && album.images.length > 0);
}

export async function listVisibleParentReviews() {
  const data = await readCmsData();
  return (data.parentReviews ?? []).filter((review) => review.visible);
}

export async function createParentReview(input: {
  name: string;
  role: string;
  quote: string;
  initials?: string;
  visible?: boolean;
}) {
  const data = await readCmsData();
  const stamp = now();
  const name = input.name.trim();
  const review: ParentReview = {
    id: createId("review"),
    name,
    role: input.role.trim(),
    quote: input.quote.trim(),
    initials: (input.initials?.trim() || name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2) || "PR").toUpperCase(),
    visible: input.visible ?? true,
    createdAt: stamp,
    updatedAt: stamp
  };

  data.parentReviews = data.parentReviews ?? [];
  data.parentReviews.unshift(review);
  await writeCmsData(data);
  return review;
}

export async function updateParentReview(
  id: string,
  input: Partial<Pick<ParentReview, "name" | "role" | "quote" | "initials" | "visible">>
) {
  const data = await readCmsData();
  const review = data.parentReviews?.find((item) => item.id === id);

  if (!review) {
    return null;
  }

  if (typeof input.name === "string") {
    review.name = input.name.trim();
  }
  if (typeof input.role === "string") {
    review.role = input.role.trim();
  }
  if (typeof input.quote === "string") {
    review.quote = input.quote.trim();
  }
  if (typeof input.initials === "string") {
    review.initials = input.initials.trim().slice(0, 3).toUpperCase();
  }
  if (typeof input.visible === "boolean") {
    review.visible = input.visible;
  }
  review.updatedAt = now();
  await writeCmsData(data);
  return review;
}

export async function deleteParentReview(id: string) {
  const data = await readCmsData();
  const initialLength = data.parentReviews?.length ?? 0;
  data.parentReviews = (data.parentReviews ?? []).filter((item) => item.id !== id);
  await writeCmsData(data);
  return data.parentReviews.length !== initialLength;
}

export async function getGalleryAlbum(id: string) {
  const data = await readCmsData();
  return data.galleryAlbums.find((album) => album.id === id) ?? null;
}

export async function createEnquiry(input: {
  parentName: string;
  phone: string;
  childName?: string;
  program?: string;
  message?: string;
}) {
  const data = await readCmsData();
  const stamp = now();
  const enquiry: Enquiry = {
    id: createId("enq"),
    parentName: input.parentName.trim(),
    phone: input.phone.trim(),
    childName: input.childName?.trim() ?? "",
    program: input.program?.trim() ?? "",
    message: input.message?.trim() ?? "",
    status: "New",
    notes: "",
    createdAt: stamp,
    updatedAt: stamp
  };

  data.enquiries.unshift(enquiry);
  await writeCmsData(data);
  return enquiry;
}

export async function updateEnquiry(
  id: string,
  input: Partial<Pick<Enquiry, "status" | "notes">>
) {
  const data = await readCmsData();
  const enquiry = data.enquiries.find((item) => item.id === id);

  if (!enquiry) {
    return null;
  }

  if (input.status) {
    enquiry.status = input.status;
  }
  if (typeof input.notes === "string") {
    enquiry.notes = input.notes;
  }
  enquiry.updatedAt = now();

  await writeCmsData(data);
  return enquiry;
}

export async function deleteEnquiry(id: string) {
  const data = await readCmsData();
  const initialLength = data.enquiries.length;
  data.enquiries = data.enquiries.filter((item) => item.id !== id);
  await writeCmsData(data);
  return data.enquiries.length !== initialLength;
}

export async function createAlbum(input: {
  title: string;
  category: string;
  description: string;
  accent: string;
}) {
  const data = await readCmsData();
  const stamp = now();
  const album: GalleryAlbum = {
    id: createId("album"),
    title: input.title.trim(),
    category: input.category.trim(),
    description: input.description.trim(),
    cover: "",
    accent: input.accent || "#38BDF8",
    visible: false,
    images: [],
    createdAt: stamp,
    updatedAt: stamp
  };

  data.galleryAlbums.unshift(album);
  await writeCmsData(data);
  return album;
}

export async function updateAlbum(
  id: string,
  input: Partial<Pick<GalleryAlbum, "title" | "category" | "description" | "accent" | "visible">>
) {
  const data = await readCmsData();
  const album = data.galleryAlbums.find((item) => item.id === id);

  if (!album) {
    return null;
  }

  if (typeof input.title === "string") {
    album.title = input.title.trim();
  }
  if (typeof input.category === "string") {
    album.category = input.category.trim();
  }
  if (typeof input.description === "string") {
    album.description = input.description.trim();
  }
  if (typeof input.accent === "string") {
    album.accent = input.accent;
  }
  if (typeof input.visible === "boolean") {
    album.visible = input.visible;
  }
  album.updatedAt = now();
  await writeCmsData(data);
  return album;
}

export async function deleteAlbum(id: string) {
  const data = await readCmsData();
  const initialLength = data.galleryAlbums.length;
  data.galleryAlbums = data.galleryAlbums.filter((item) => item.id !== id);
  await writeCmsData(data);
  return data.galleryAlbums.length !== initialLength;
}

export async function addImageToAlbum(albumId: string, image: Omit<GalleryImage, "id" | "createdAt">) {
  const data = await readCmsData();
  const album = data.galleryAlbums.find((item) => item.id === albumId);

  if (!album) {
    return null;
  }

  const newImage: GalleryImage = {
    id: createId("image"),
    title: image.title.trim(),
    src: image.src,
    createdAt: now()
  };

  album.images.unshift(newImage);
  album.cover = album.cover || newImage.src;
  album.visible = true;
  album.updatedAt = now();
  await writeCmsData(data);
  return newImage;
}

export async function deleteGalleryImage(imageId: string) {
  const data = await readCmsData();
  let deleted = false;

  for (const album of data.galleryAlbums) {
    const image = album.images.find((item) => item.id === imageId);
    if (!image) {
      continue;
    }

    album.images = album.images.filter((item) => item.id !== imageId);
    if (album.cover === image.src) {
      album.cover = album.images[0]?.src ?? "";
    }
    album.updatedAt = now();
    deleted = true;
    break;
  }

  await writeCmsData(data);
  return deleted;
}

export async function saveUploadedGalleryFile(file: File) {
  await fs.mkdir(galleryUploadDir, { recursive: true });

  const extension = path.extname(file.name).toLowerCase() || ".jpg";
  const safeName = `${createId("photo")}${extension}`;
  const target = path.join(galleryUploadDir, safeName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(target, bytes);
  return `/uploads/gallery/${safeName}`;
}
