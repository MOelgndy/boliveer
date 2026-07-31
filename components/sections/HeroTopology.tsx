"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/primitives/Button";
import { experimentProps } from "@/lib/ab";

export function HeroTopology({
  brand,
  headline,
  support,
  primaryCta,
  secondaryCta,
  variant = "control",
}: {
  brand: string;
  headline: string;
  support: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  variant?: "control" | "topology-dense";
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[calc(100vh-var(--bv-shell-height))] overflow-hidden border-b border-line"
      {...experimentProps("home-hero", variant)}
    >
      <div className="bv-grid-bg absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 40%, color-mix(in srgb, var(--bv-signal) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="bv-container relative grid min-h-[calc(100vh-var(--bv-shell-height))] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl">
          <motion.p
            className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {brand}
          </motion.p>
          <motion.h1
            className="mt-6 max-w-lg text-xl font-medium leading-snug text-ink sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-md text-base text-muted"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            {support}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Button href={primaryCta.href} variant="signal" size="lg">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto aspect-[5/3] w-full max-w-xl"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          aria-hidden
        >
          <div className="absolute inset-0 rounded-md border border-line bg-elevated/40" />
          <Image
            src="/brand/madar-topology.svg"
            alt=""
            fill
            className={variant === "topology-dense" ? "object-cover opacity-95" : "object-contain p-4"}
            priority
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
          {!reduce && (
            <motion.span
              className="absolute left-[48%] top-[48%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
