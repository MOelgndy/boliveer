import type { Locale } from "@/i18n/routing";

export const capabilityLabels: Record<string, Record<Locale, string>> = {
  "ride-hailing": { en: "Ride Hailing", ar: "النقل" },
  "food-delivery": { en: "Food Delivery", ar: "توصيل الطعام" },
  grocery: { en: "Grocery", ar: "البقالة" },
  pharmacy: { en: "Pharmacy", ar: "الصيدلية" },
  marketplace: { en: "Marketplace", ar: "السوق" },
  "merchant-os": { en: "Merchant OS", ar: "نظام التاجر" },
  pos: { en: "POS", ar: "نقاط البيع" },
  booking: { en: "Booking", ar: "الحجوزات" },
  wallet: { en: "Wallet", ar: "المحفظة" },
  "qr-payments": { en: "QR Payments", ar: "مدفوعات QR" },
  "delivery-fleet": { en: "Delivery Fleet", ar: "أسطول التوصيل" },
  "ai-services": { en: "AI Services", ar: "خدمات الذكاء" },
  "business-os": { en: "Business OS", ar: "نظام تشغيل الأعمال" },
  dropshipping: { en: "Dropshipping", ar: "دروبشيبينغ" },
};

export function capabilityLabel(slug: string, locale: Locale) {
  return capabilityLabels[slug]?.[locale] ?? slug;
}
