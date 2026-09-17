export type EnquiryStatus = "New" | "Contacted" | "Admitted" | "Closed";

export type Enquiry = {
  id: string;
  parentName: string;
  phone: string;
  childName: string;
  program: string;
  message: string;
  status: EnquiryStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  src: string;
  createdAt: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  category: string;
  description: string;
  cover: string;
  accent: string;
  visible: boolean;
  images: GalleryImage[];
  createdAt: string;
  updatedAt: string;
};

export type ParentReview = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SiteContent = {
  siteInfo: {
    name: string;
    shortName: string;
    tagline: string;
    admissionYear: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
  };
  home: {
    heroTitle: string;
    heroHighlight: string;
    heroDescription: string;
  };
  programs: {
    title: string;
    age: string;
    description: string;
  }[];
};

export type CmsData = {
  enquiries: Enquiry[];
  galleryAlbums: GalleryAlbum[];
  parentReviews?: ParentReview[];
  siteContent?: SiteContent;
};
