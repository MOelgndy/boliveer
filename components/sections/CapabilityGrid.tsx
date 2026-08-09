"use client";

import { m } from "framer-motion";
import { fadeRise, staggerContainer, staggerItem } from "@/design-system/motion";
import { capabilityLabel } from "@/content/capabilities";

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
    <div>
      <m.h2 className="bv-h2" {...fadeRise}>
        {title}
      </m.h2>
      <m.ul
        className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        {...staggerContainer}
      >
        {capabilities.map((cap) => (
          <m.li
            key={cap}
            {...staggerItem}
            className="bv-surface rounded-lg px-4 py-3.5 text-sm transition duration-fast hover:border-signal"
          >
            {capabilityLabel(cap, locale)}
          </m.li>
        ))}
      </m.ul>
    </div>
  );
}
