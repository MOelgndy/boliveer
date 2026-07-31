export const siteConfig = {
  name: "Boliveer",
  legalName: "Boliveer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://boliveer.com",
  domain: "boliveer.com",
  twitter: "@boliveer",
  email: {
    contact: "hello@boliveer.com",
    support: "support@boliveer.com",
    press: "press@boliveer.com",
    partners: "partners@boliveer.com",
    enterprise: "enterprise@boliveer.com",
  },
  locales: ["en", "ar"] as const,
  defaultLocale: "en" as const,
  description: {
    en: "Boliveer builds digital products, platforms, and AI systems. Parent company of Madar 360 — a unified commerce and services platform.",
    ar: "بوليفير تبني المنتجات الرقمية والمنصات وأنظمة الذكاء الاصطناعي. الشركة الأم لمنصة مدار 360 — منصة تجارة وخدمات موحّدة.",
  },
} as const;
