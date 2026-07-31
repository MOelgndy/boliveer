"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

export function LocaleSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("system");

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        onChange={(e) =>
          router.replace(pathname, { locale: e.target.value as Locale })
        }
        className="bv-mono h-8 rounded-md border border-line bg-transparent px-2 text-muted transition hover:border-ink hover:text-ink"
        aria-label={t("language")}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
