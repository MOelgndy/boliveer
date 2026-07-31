import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "investors" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/investors",
    seo: {
      title: { en: tr("title") + " — Boliveer", ar: tr("title") + " — بوليفير" },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("investors");
  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-4">
          <p className="bv-prose">{tr("body")}</p>
          <Button href="/contact" variant="secondary">Contact</Button>
        </Container>
      </Section>
    </>
  );
}
