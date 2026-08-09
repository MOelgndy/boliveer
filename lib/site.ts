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
    en: "Boliveer finds real business gaps, builds full applications and platforms, and takes them to market success. Parent company of Madar 360.",
    ar: "بوليفير تكتشف فجوات الأعمال الحقيقية، وتبني تطبيقات ومنصات كاملة، وتوصلها إلى النجاح في السوق. الشركة الأم لمدار 360.",
  },
} as const;
