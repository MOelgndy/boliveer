"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { isEnabled } from "@/lib/flags";

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
    <footer className="border-t border-line bg-elevated">
      <div className="bv-container grid gap-10 py-14 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <p className="font-display text-2xl font-bold">Boliveer</p>
          <p className="max-w-sm text-sm text-muted">{t("footer.tagline")}</p>
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
                    <Link href={link.href} className="text-sm text-ink/90 hover:text-signal">
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="bv-container flex flex-col gap-3 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
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
