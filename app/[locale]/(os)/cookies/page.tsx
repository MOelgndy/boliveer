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
    path: "/cookies",
    seo: {
      title: { en: tr("cookiesTitle"), ar: tr("cookiesTitle") },
      description: { en: tr("cookiesBody"), ar: tr("cookiesBody") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("legal");
  return (
    <>
      <PageHero title={tr("cookiesTitle")} />
      <Section>
        <Container>
          <p className="bv-prose">{tr("cookiesBody")}</p>
        </Container>
      </Section>
    </>
  );
}
