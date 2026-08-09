"use client";

import { m } from "framer-motion";
import { easeCinematic } from "@/design-system/motion";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="relative border-b border-line">
      <div className="bv-atmosphere absolute inset-0" aria-hidden />
      <m.div
        className="bv-container relative py-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeCinematic }}
      >
        {eyebrow && <p className="bv-mono mb-4 text-signal">{eyebrow}</p>}
        <h1 className="bv-h1 max-w-3xl text-balance">{title}</h1>
        {lede && (
          <p className="mt-4 max-w-xl text-base text-muted md:text-lg">{lede}</p>
        )}
      </m.div>
    </header>
  );
}
