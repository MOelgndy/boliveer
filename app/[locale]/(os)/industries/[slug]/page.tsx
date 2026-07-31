import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, t } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await content.industries.slugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const industry = await content.industries.bySlug(slug);
  if (!industry) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/industries/${slug}`,
    seo: industry.seo,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const industry = await content.industries.bySlug(slug);
  if (!industry) notFound();
  const name = t(industry.name, l);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Boliveer", path: "/" },
            { name: "Industries", path: "/industries" },
            { name, path: `/industries/${slug}` },
          ],
          l,
        )}
      />
      <PageHero title={name} lede={t(industry.summary, l)} />
      <Section>
        <Container className="space-y-6">
          <p className="bv-prose">{t(industry.description, l)}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/demo" variant="signal">
              Demo
            </Button>
            <Button href="/enterprise" variant="secondary">
              Enterprise
            </Button>
            {industry.relatedProducts.map((product) => (
              <Button
                key={product}
                href={`/products/${product}`}
                variant="ghost"
              >
                {product}
              </Button>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
