import type { Job } from "@/lib/types";

export const jobs: Job[] = [
  {
    slug: "principal-platform-engineer",
    title: {
      en: "Principal Platform Engineer",
      ar: "مهندس منصات أول",
    },
    team: { en: "Engineering", ar: "الهندسة" },
    location: {
      en: "Remote / Egypt / GCC",
      ar: "عن بُعد / مصر / الخليج",
    },
    type: { en: "Full-time", ar: "دوام كامل" },
    summary: {
      en: "Design and harden the multi-service platform substrate behind Madar 360.",
      ar: "صمّم وطوّر طبقة المنصة متعددة الخدمات خلف مدار 360.",
    },
    description: {
      en: "You will own critical platform primitives — services boundaries, reliability, and developer experience — for a commerce OS that must scale across markets.",
      ar: "ستتولى أساسيات المنصة الحرجة — حدود الخدمات والموثوقية وتجربة المطوّرين — لنظام تشغيل تجاري يتوسّع عبر الأسواق.",
    },
    seo: {
      title: {
        en: "Principal Platform Engineer — Boliveer Careers",
        ar: "مهندس منصات أول — وظائف بوليفير",
      },
      description: {
        en: "Join Boliveer engineering to build the platform behind Madar 360.",
        ar: "انضم لهندسة بوليفير لبناء المنصة خلف مدار 360.",
      },
    },
  },
  {
    slug: "product-designer-os",
    title: {
      en: "Product Designer — Company OS",
      ar: "مصمم منتجات — نظام الشركة",
    },
    team: { en: "Design", ar: "التصميم" },
    location: {
      en: "Remote / Egypt / GCC",
      ar: "عن بُعد / مصر / الخليج",
    },
    type: { en: "Full-time", ar: "دوام كامل" },
    summary: {
      en: "Shape interaction systems for Boliveer surfaces and Madar operator tools.",
      ar: "شكّل أنظمة التفاعل لواجهات بوليفير وأدوات مشغّلي مدار.",
    },
    description: {
      en: "You design with restraint and precision — systems that feel like serious technology, not startup theater.",
      ar: "تصمّم بانضباط ودقة — أنظمة تبدو تقنية جادة، لا مسرح شركات ناشئة.",
    },
    seo: {
      title: {
        en: "Product Designer — Boliveer Careers",
        ar: "مصمم منتجات — وظائف بوليفير",
      },
      description: {
        en: "Design Boliveer's product surfaces and Madar operator experiences.",
        ar: "صمّم واجهات منتجات بوليفير وتجارب مشغّلي مدار.",
      },
    },
  },
];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}

export function getAllJobSlugs() {
  return jobs.map((j) => j.slug);
}
