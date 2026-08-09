import { setRequestLocale, getTranslations } from "next-intl/server";
import { MissionControl } from "@/components/sections/MissionControl";
import { ContactForm } from "@/components/forms/forms.client";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("contact");

  return (
    <MissionControl title={tr("title")} lede={tr("lede")}>
      <ContactForm locale={locale} successMessage={tr("success")} />
    </MissionControl>
  );
}
