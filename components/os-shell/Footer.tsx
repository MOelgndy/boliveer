"use client";

import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { Button } from "@/components/primitives/Button";
import { isEnabled } from "@/lib/flags";
import { cinematicReveal } from "@/design-system/motion";

const columns = [
  {
    titleKey: "products" as const,
    links: [
      { href: "/products", key: "products" as const },
      { href: "/products/madar-360", key: "madar" as const },
      { href: "/products/future", key: "future" as const },
    ],
  },
  {
    titleKey: "technology" as const,
    links: [
      { href: "/technology", key: "technology" as const },
      { href: "/ai", key: "ai" as const },
      { href: "/engineering", key: "engineering" as const },
    ],
  },
  {
    titleKey: "about" as const,
    links: [
      { href: "/about", key: "about" as const },
      { href: "/careers", key: "careers" as const },
      { href: "/blog", key: "blog" as const },
      { href: "/press-kit", key: "pressKit" as const },
      { href: "/investors", key: "investors" as const },
    ],
  },
  {
    titleKey: "demo" as const,
    links: [
      { href: "/demo", key: "demo" as const },
      { href: "/partnership", key: "partnership" as const },
      { href: "/enterprise", key: "enterprise" as const },
      { href: "/contact", key: "contact" as const },
      { href: "/support", key: "support" as const },
    ],
  },
];

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="bv-atmosphere absolute inset-0" aria-hidden />

      <div className="bv-container relative py-8">
        <m.div {...cinematicReveal} className="max-w-3xl">
          <p className="bv-mono text-signal">{t("footer.finalScene")}</p>
          <p className="bv-h1 mt-5 text-balance">
            {t("footer.finaleTitle")}
            <br />
            {t("footer.finaleTitle2")}
          </p>
          <p className="mt-4 max-w-lg text-base text-muted">{t("footer.tagline")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/demo" variant="signal" size="lg">
              {t("nav.demo")}
            </Button>
            <Button href="/careers" variant="secondary" size="lg">
              {t("nav.careers")}
            </Button>
            <Button href="/investors" variant="ghost" size="lg">
              {t("nav.investors")}
            </Button>
          </div>
        </m.div>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.1fr_2fr]">
          <div className="space-y-4">
            <p className="text-lg font-semibold tracking-tight">Boliveer</p>
            {isEnabled("newsletter") && (
              <div className="max-w-sm space-y-2">
                <p className="bv-mono text-muted">{t("footer.newsletter")}</p>
                <SubscribeForm locale={locale} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.titleKey}>
                <p className="bv-mono mb-3 text-muted">{t(`nav.${col.titleKey}`)}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-ink/90 transition duration-fast hover:text-signal"
                      >
                        {t(`nav.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="bv-container flex flex-col gap-3 py-4 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Boliveer. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">{t("nav.privacy")}</Link>
            <Link href="/terms">{t("nav.terms")}</Link>
            <Link href="/cookies">{t("nav.cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
