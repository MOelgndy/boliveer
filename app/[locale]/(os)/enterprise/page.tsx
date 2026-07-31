import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { FAQ } from "@/components/sections/FAQ";
import { EnterpriseForm } from "@/components/forms/forms.client";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "enterprise" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/enterprise",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function EnterprisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("enterprise");
  const faq = await getTranslations("faq");

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <EnterpriseForm locale={locale} successMessage={tr("success")} />
          <FAQ
            items={[
              {
                question: faq("whatIsMadarQ"),
                answer: faq("whatIsMadarA"),
              },
              {
                question: faq("regionsQ"),
                answer: faq("regionsA"),
              },
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
