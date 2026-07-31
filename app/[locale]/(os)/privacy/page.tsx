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
    path: "/privacy",
    seo: {
      title: { en: tr("privacyTitle"), ar: tr("privacyTitle") },
      description: { en: tr("privacyBody"), ar: tr("privacyBody") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("legal");
  return (
    <>
      <PageHero title={tr("privacyTitle")} />
      <Section>
        <Container>
          <p className="bv-prose">{tr("privacyBody")}</p>
        </Container>
      </Section>
    </>
  );
}
