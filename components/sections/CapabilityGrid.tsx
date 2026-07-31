"use client";

import { motion } from "framer-motion";
import { fadeRise, staggerContainer, staggerItem } from "@/design-system/motion";

const labels: Record<string, { en: string; ar: string }> = {
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

export function CapabilityGrid({
  title,
  capabilities,
  locale,
}: {
  title: string;
  capabilities: string[];
  locale: "en" | "ar";
}) {
  return (
    <motion.div {...fadeRise}>
      <h2 className="bv-h2">{title}</h2>
      <motion.ul
        className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        {...staggerContainer}
      >
        {capabilities.map((cap) => (
          <motion.li
            key={cap}
            {...staggerItem}
            className="rounded-md border border-line bg-elevated px-4 py-3 text-sm transition hover:border-signal"
          >
            {labels[cap]?.[locale] ?? cap}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
