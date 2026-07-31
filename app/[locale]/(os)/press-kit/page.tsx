import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "press" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/press-kit",
    seo: {
      title: { en: tr("title") + " — Boliveer", ar: tr("title") + " — بوليفير" },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("press");
  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-6">
          <ul className="space-y-3 text-muted">
            <li>Brand mark: /brand/boliveer-mark.svg</li>
            <li>Product topology: /brand/madar-topology.svg</li>
            <li>Press: {tr("contact")}</li>
          </ul>
          <Button href="/contact" variant="secondary">Contact</Button>
        </Container>
      </Section>
    </>
  );
}
