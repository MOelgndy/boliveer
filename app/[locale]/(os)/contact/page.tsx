import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { ContactForm } from "@/components/forms/forms.client";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "contact" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/contact",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("contact");

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="max-w-xl">
          <ContactForm locale={locale} successMessage={tr("success")} />
        </Container>
      </Section>
    </>
  );
}
