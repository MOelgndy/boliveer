import { setRequestLocale, getTranslations } from "next-intl/server";
import { MissionControl } from "@/components/sections/MissionControl";
import { PartnershipForm } from "@/components/forms/forms.client";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "partnership" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/partnership",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("partnership");

  return (
    <MissionControl title={tr("title")} lede={tr("lede")} status="Alliance channel">
      <PartnershipForm locale={locale} successMessage={tr("success")} />
    </MissionControl>
  );
}
