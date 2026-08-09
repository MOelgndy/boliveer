import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ImmersiveIndustries } from "@/components/sections/ImmersiveIndustries";
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
  const tr = await getTranslations({ locale, namespace: "industries" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/industries",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

const accents = ["signal", "ice", "ember", "signal", "ice"] as const;

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations("industries");
  const industries = await content.industries.list();

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <section className="bv-section">
        <div className="bv-container">
          <ImmersiveIndustries
            title={tr("title")}
            body={tr("lede")}
            items={industries.map((industry, i) => ({
              slug: industry.slug,
              name: t(industry.name, l),
              summary: t(industry.summary, l),
              accent: accents[i % accents.length],
            }))}
          />
        </div>
      </section>
      <CTABand />
    </>
  );
}
