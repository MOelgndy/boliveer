import type { Article } from "@/lib/types";

export const articles: Article[] = [
  {
    slug: "building-a-commerce-operating-system",
    title: {
      en: "Building a commerce operating system",
      ar: "بناء نظام تشغيل للتجارة",
    },
    excerpt: {
      en: "Why Boliveer treats Madar 360 as infrastructure — not a collection of apps.",
      ar: "لماذا تعامل بوليفير مدار 360 كبنية تحتية — لا كمجموعة تطبيقات.",
    },
    date: "2026-06-01",
    author: "Boliveer",
    tags: ["platform", "madar-360", "engineering"],
    related: ["madar-360", "technology", "engineering"],
    seo: {
      title: {
        en: "Building a commerce operating system — Boliveer",
        ar: "بناء نظام تشغيل للتجارة — بوليفير",
      },
      description: {
        en: "Boliveer's view on multi-service platforms, Merchant OS, and the long arc of commerce infrastructure in the Middle East.",
        ar: "رؤية بوليفير حول المنصات متعددة الخدمات ونظام التاجر ومسار بنية التجارة في الشرق الأوسط.",
      },
    },
  },
  {
    slug: "ai-inside-the-control-plane",
    title: {
      en: "AI inside the control plane",
      ar: "الذكاء الاصطناعي داخل مستوى التحكم",
    },
    excerpt: {
      en: "How Boliveer embeds AI services into product operations — not as a side feature.",
      ar: "كيف تدمج بوليفير خدمات الذكاء الاصطناعي في تشغيل المنتجات — لا كميزة جانبية.",
    },
    date: "2026-07-12",
    author: "Boliveer",
    tags: ["ai", "platform"],
    related: ["ai", "madar-360"],
    seo: {
      title: {
        en: "AI inside the control plane — Boliveer",
        ar: "الذكاء الاصطناعي داخل مستوى التحكم — بوليفير",
      },
      description: {
        en: "Boliveer's approach to AI services across Madar 360 and future platforms.",
        ar: "نهج بوليفير لخدمات الذكاء الاصطناعي عبر مدار 360 والمنصات القادمة.",
      },
    },
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs() {
  return articles.map((a) => a.slug);
}
