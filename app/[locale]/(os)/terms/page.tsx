import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "legal" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/terms",
    seo: {
      title: { en: tr("termsTitle"), ar: tr("termsTitle") },
      description: { en: tr("termsBody"), ar: tr("termsBody") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("legal");
  return (
    <>
      <PageHero title={tr("termsTitle")} />
      <Section>
        <Container>
          <p className="bv-prose">{tr("termsBody")}</p>
        </Container>
      </Section>
    </>
  );
}
