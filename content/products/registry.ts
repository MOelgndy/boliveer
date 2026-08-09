import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "madar-360",
    status: "live",
    name: { en: "Madar 360", ar: "مدار 360" },
    tagline: {
      en: "Unified commerce and services platform.",
      ar: "منصة تجارة وخدمات موحّدة.",
    },
    description: {
      en: "Madar 360 is Boliveer's flagship enterprise multi-service platform — ride hailing, food, grocery, pharmacy, marketplace, Merchant OS, POS, booking, wallet, QR payments, delivery fleet, AI services, business operating system, dropshipping, and the services still being built.",
      ar: "مدار 360 هي المنصة الرائدة لبوليفير — متعددة الخدمات للمؤسسات: النقل، الطعام، البقالة، الصيدلية، السوق، نظام التاجر، نقاط البيع، الحجوزات، المحفظة، مدفوعات QR، أسطول التوصيل، خدمات الذكاء الاصطناعي، نظام تشغيل الأعمال، والدروبشيبينغ، والخدمات القادمة.",
    },
    category: ["commerce", "mobility", "payments", "ai", "enterprise"],
    capabilities: [
      "ride-hailing",
      "food-delivery",
      "grocery",
      "pharmacy",
      "marketplace",
      "merchant-os",
      "pos",
      "booking",
      "wallet",
      "qr-payments",
      "delivery-fleet",
      "ai-services",
      "business-os",
      "dropshipping",
    ],
    heroMedia: {
      src: "/brand/madar-topology.svg",
      alt: {
        en: "Madar 360 capability constellation",
        ar: "كوكبة قدرات مدار 360",
      },
    },
    seo: {
      title: {
        en: "Madar 360 — Unified Commerce & Services Platform",
        ar: "مدار 360 — منصة تجارة وخدمات موحّدة",
      },
      description: {
        en: "Explore Madar 360 by Boliveer: enterprise ride hailing, delivery, marketplace, payments, Merchant OS, AI, and more — one platform for modern commerce.",
        ar: "استكشف مدار 360 من بوليفير: النقل، التوصيل، السوق، المدفوعات، نظام التاجر، والذكاء الاصطناعي — منصة واحدة للتجارة الحديثة.",
      },
      keywords: {
        en: "Madar 360, Boliveer, commerce platform, ride hailing, delivery, wallet, Merchant OS, POS, Middle East",
        ar: "مدار 360, بوليفير, منصة تجارة, نقل, توصيل, محفظة, نظام تاجر, الشرق الأوسط",
      },
    },
    relatedIndustries: [
      "retail",
      "food-hospitality",
      "mobility",
      "healthcare",
      "enterprise",
    ],
    related: ["technology", "ai", "enterprise"],
    cta: ["demo", "enterprise", "partner"],
    mark: "M360",
  },
  {
    slug: "boliveer-studio",
    status: "coming",
    name: {
      en: "Boliveer Studio",
      ar: "بوليفير ستوديو",
    },
    tagline: {
      en: "Venture build system for the next Boliveer products.",
      ar: "نظام بناء المشاريع لمنتجات بوليفير التالية.",
    },
    description: {
      en: "Boliveer Studio is our internal venture system — discovery, product design, full-stack build, and launch readiness for new applications beyond Madar 360.",
      ar: "بوليفير ستوديو نظام المشاريع الداخلي — اكتشاف وتصميم منتج وبناء كامل وجاهزية إطلاق للتطبيقات الجديدة بعد مدار 360.",
    },
    category: ["venture", "platform"],
    capabilities: ["business-os", "ai-services"],
    heroMedia: {
      src: "/brand/boliveer-mark.svg",
      alt: {
        en: "Boliveer Studio",
        ar: "بوليفير ستوديو",
      },
    },
    seo: {
      title: {
        en: "Boliveer Studio — Next Ventures",
        ar: "بوليفير ستوديو — المشاريع القادمة",
      },
      description: {
        en: "How Boliveer discovers gaps and builds the next generation of products.",
        ar: "كيف تكتشف بوليفير الفجوات وتبني الجيل التالي من المنتجات.",
      },
    },
    relatedIndustries: ["enterprise"],
    related: ["products", "technology"],
    cta: ["partner", "enterprise"],
    mark: "STD",
  },
  {
    slug: "signal-media",
    status: "coming",
    name: {
      en: "Signal Media",
      ar: "سيجنال ميديا",
    },
    tagline: {
      en: "Go-to-market and media engine for Boliveer products.",
      ar: "محرك دخول السوق والإعلام لمنتجات بوليفير.",
    },
    description: {
      en: "Signal Media prepares Boliveer products for public success — narrative, brand systems, press readiness, and growth surfaces so launches are seen and trusted.",
      ar: "سيجنال ميديا تجهّز منتجات بوليفير للنجاح العام — سرد وأنظمة علامة وجاهزية صحافة وأسطح نمو حتى تُرى الإطلاقات وتُوثق.",
    },
    category: ["media", "growth"],
    capabilities: ["ai-services"],
    heroMedia: {
      src: "/brand/boliveer-mark.svg",
      alt: {
        en: "Signal Media",
        ar: "سيجنال ميديا",
      },
    },
    seo: {
      title: {
        en: "Signal Media — Boliveer",
        ar: "سيجنال ميديا — بوليفير",
      },
      description: {
        en: "Media and go-to-market capability inside Boliveer.",
        ar: "قدرة الإعلام ودخول السوق داخل بوليفير.",
      },
    },
    relatedIndustries: ["enterprise"],
    related: ["media", "press-kit"],
    cta: ["partner"],
    mark: "SIG",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getLiveProducts() {
  return products.filter((p) => p.status === "live" || p.status === "beta");
}

export function getAllProductSlugs() {
  return products.map((p) => p.slug);
}
