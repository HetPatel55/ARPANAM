export type SiteInfo = {
  name: string;
  shortName: string;
  tagline: string;
  admissionYear: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
};

export type SiteContent = {
  siteInfo: SiteInfo;
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

export type ParentReview = {
  id?: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
};
