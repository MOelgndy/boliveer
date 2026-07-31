import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "vision" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/vision",
    seo: {
      title: { en: tr("title") + " — Boliveer", ar: tr("title") + " — بوليفير" },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("vision");
  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container>
          <p className="bv-prose">{tr("body")}</p>
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
