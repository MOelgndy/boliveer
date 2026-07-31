import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Link } from "@/i18n/navigation";
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
      <Section>
        <Container className="grid gap-4 md:grid-cols-2">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="rounded-md border border-line bg-elevated p-6 transition hover:border-signal"
            >
              <h2 className="bv-h3">{t(industry.name, l)}</h2>
              <p className="mt-2 text-sm text-muted">{t(industry.summary, l)}</p>
            </Link>
          ))}
        </Container>
      </Section>
    </>
  );
}
