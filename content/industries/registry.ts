import type { Industry } from "@/lib/types";

export const industries: Industry[] = [
  {
    slug: "retail",
    name: { en: "Retail", ar: "التجزئة" },
    summary: {
      en: "Unified storefronts, inventory, and fulfillment across physical and digital.",
      ar: "واجهات ومتاجر ومخزون وتنفيذ موحّد عبر القنوات الفعلية والرقمية.",
    },
    description: {
      en: "Retail operators use Madar 360 for marketplace presence, POS, wallet checkout, and fleet-backed delivery — one operating surface instead of fragmented tools.",
      ar: "يستخدم تجار التجزئة مدار 360 للسوق ونقاط البيع والدفع بالمحفظة والتوصيل — سطح تشغيل واحد بدل أدوات متفرقة.",
    },
    relatedProducts: ["madar-360"],
    relatedCapabilities: ["marketplace", "pos", "wallet", "delivery-fleet"],
    seo: {
      title: {
        en: "Retail Solutions — Boliveer",
        ar: "حلول التجزئة — بوليفير",
      },
      description: {
        en: "How Boliveer and Madar 360 power modern retail commerce across Egypt, Saudi Arabia, and the GCC.",
        ar: "كيف تمكّن بوليفير ومدار 360 تجارة التجزئة الحديثة في مصر والسعودية والخليج.",
      },
    },
  },
  {
    slug: "food-hospitality",
    name: { en: "Food & Hospitality", ar: "الطعام والضيافة" },
    summary: {
      en: "Ordering, kitchen ops, and last-mile delivery in one stack.",
      ar: "الطلبات وتشغيل المطابخ والتوصيل في منظومة واحدة.",
    },
    description: {
      en: "From food delivery to booking and merchant tools, Madar 360 connects diners, kitchens, and fleets with real-time orchestration.",
      ar: "من توصيل الطعام إلى الحجوزات وأدوات التاجر، يربط مدار 360 الضيوف والمطابخ والأسطول بتنسيق لحظي.",
    },
    relatedProducts: ["madar-360"],
    relatedCapabilities: ["food-delivery", "booking", "merchant-os"],
    seo: {
      title: {
        en: "Food & Hospitality — Boliveer",
        ar: "الطعام والضيافة — بوليفير",
      },
      description: {
        en: "Enterprise food delivery, booking, and merchant operations powered by Madar 360.",
        ar: "توصيل طعام وحجوزات وتشغيل تجاري للمؤسسات عبر مدار 360.",
      },
    },
  },
  {
    slug: "mobility",
    name: { en: "Mobility", ar: "التنقّل" },
    summary: {
      en: "Ride hailing and fleet intelligence at city scale.",
      ar: "نقل ذكي وإدارة أساطيل على مستوى المدن.",
    },
    description: {
      en: "Madar 360 ride hailing and delivery fleet capabilities give operators dispatch, matching, and payments in a single platform layer.",
      ar: "قدرات النقل وأسطول التوصيل في مدار 360 تمنح المشغّلين التوزيع والمطابقة والمدفوعات في طبقة منصة واحدة.",
    },
    relatedProducts: ["madar-360"],
    relatedCapabilities: ["ride-hailing", "delivery-fleet", "wallet"],
    seo: {
      title: { en: "Mobility — Boliveer", ar: "التنقّل — بوليفير" },
      description: {
        en: "City-scale ride hailing and fleet operations with Madar 360 by Boliveer.",
        ar: "نقل وإدارة أساطيل على نطاق المدن مع مدار 360 من بوليفير.",
      },
    },
  },
  {
    slug: "healthcare",
    name: { en: "Healthcare & Pharmacy", ar: "الرعاية والصيدلة" },
    summary: {
      en: "Pharmacy fulfillment and trusted last-mile for health commerce.",
      ar: "تنفيذ صيدلي وتوصيل موثوق لتجارة الصحة.",
    },
    description: {
      en: "Pharmacy and health-adjacent commerce demand precision. Madar 360 supports catalog, payments, and delivery with enterprise controls.",
      ar: "تجارة الصيدلة والصحة تتطلب دقة. يدعم مدار 360 الكتالوج والمدفوعات والتوصيل بضوابط مؤسسية.",
    },
    relatedProducts: ["madar-360"],
    relatedCapabilities: ["pharmacy", "delivery-fleet", "qr-payments"],
    seo: {
      title: {
        en: "Healthcare & Pharmacy — Boliveer",
        ar: "الرعاية والصيدلة — بوليفير",
      },
      description: {
        en: "Pharmacy and health commerce capabilities on Madar 360.",
        ar: "قدرات تجارة الصيدلة والصحة على مدار 360.",
      },
    },
  },
  {
    slug: "enterprise",
    name: { en: "Enterprise", ar: "المؤسسات" },
    summary: {
      en: "Business OS, Merchant OS, and AI services for operators at scale.",
      ar: "نظام تشغيل الأعمال ونظام التاجر وخدمات الذكاء الاصطناعي للمشغّلين الكبار.",
    },
    description: {
      en: "Enterprises adopt Boliveer platforms to consolidate commerce, payments, fleet, and AI into a coherent operating system — not a pile of apps.",
      ar: "تتبنّى المؤسسات منصات بوليفير لدمج التجارة والمدفوعات والأسطول والذكاء الاصطناعي في نظام تشغيل متماسك — لا مجموعة تطبيقات.",
    },
    relatedProducts: ["madar-360"],
    relatedCapabilities: ["business-os", "merchant-os", "ai-services"],
    seo: {
      title: { en: "Enterprise — Boliveer", ar: "المؤسسات — بوليفير" },
      description: {
        en: "Enterprise commerce and business operating systems from Boliveer.",
        ar: "أنظمة تجارة وتشغيل أعمال للمؤسسات من بوليفير.",
      },
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs() {
  return industries.map((i) => i.slug);
}
