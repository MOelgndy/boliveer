import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "media" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/media",
    seo: {
      title: { en: tr("title") + " — Boliveer", ar: tr("title") + " — بوليفير" },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("media");
  const nav = await getTranslations("nav");
  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-3">
          <Link href="/blog" className="block rounded-md border border-line px-4 py-3 hover:border-signal">{nav("blog")}</Link>
          <Link href="/press-kit" className="block rounded-md border border-line px-4 py-3 hover:border-signal">{nav("pressKit")}</Link>
        </Container>
      </Section>
    </>
  );
}
