export type LocalizedString = {
  en: string;
  ar: string;
};

export type MediaRef = {
  src: string;
  alt: LocalizedString;
  width?: number;
  height?: number;
};

export type SeoBundle = {
  title: LocalizedString;
  description: LocalizedString;
  keywords?: LocalizedString;
};

export type ProductStatus = "live" | "beta" | "coming" | "internal";

export type ProductCta = "demo" | "enterprise" | "partner" | "careers";

export type Product = {
  slug: string;
  status: ProductStatus;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  category: string[];
  capabilities: string[];
  heroMedia: MediaRef;
  seo: SeoBundle;
  relatedIndustries: string[];
  related: string[];
  cta: ProductCta[];
  mark: string;
};

export type Industry = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  relatedProducts: string[];
  relatedCapabilities: string[];
  seo: SeoBundle;
};

export type Job = {
  slug: string;
  title: LocalizedString;
  team: LocalizedString;
  location: LocalizedString;
  type: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  seo: SeoBundle;
};

export type Article = {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  date: string;
  author: string;
  tags: string[];
  related: string[];
  seo: SeoBundle;
};
