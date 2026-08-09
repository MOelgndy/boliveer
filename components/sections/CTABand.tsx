"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/primitives/Button";
import { cinematicReveal } from "@/design-system/motion";

export function CTABand() {
  const t = useTranslations("cta");

  return (
    <section className="relative border-y border-line">
      <div className="bv-atmosphere absolute inset-0" aria-hidden />
      <m.div
        className="bv-container relative flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between"
        {...cinematicReveal}
      >
        <div className="max-w-xl">
          <p className="bv-mono text-signal">Next move</p>
          <h2 className="bv-h2 mt-3 text-balance">{t("bandTitle")}</h2>
          <p className="mt-3 text-base text-muted">{t("bandBody")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/demo" variant="signal" size="lg">
            {t("demo")}
          </Button>
          <Button href="/partnership" variant="secondary" size="lg">
            {t("partner")}
          </Button>
          <Button href="/enterprise" variant="ghost" size="lg">
            {t("enterprise")}
          </Button>
        </div>
      </m.div>
    </section>
  );
}
