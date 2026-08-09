import { setRequestLocale, getTranslations } from "next-intl/server";
import { CareersMission } from "@/components/sections/CareersMission";
import { CTABand } from "@/components/sections/CTABand";
import { content, t } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "careers" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/careers",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations("careers");
  const jobs = await content.jobs.list();

  return (
    <>
      <CareersMission
        title={tr("title")}
        lede={tr("lede")}
        manifesto={[tr("manifesto1"), tr("manifesto2"), tr("manifesto3")]}
        rolesTitle={tr("openRoles")}
        applyLabel={tr("apply")}
        roles={jobs.map((job) => ({
          slug: job.slug,
          title: t(job.title, l),
          team: t(job.team, l),
          location: `${t(job.location, l)} · ${t(job.type, l)}`,
          summary: t(job.summary, l),
        }))}
      />
      <CTABand />
    </>
  );
}
