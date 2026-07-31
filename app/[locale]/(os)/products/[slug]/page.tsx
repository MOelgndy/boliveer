import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, t } from "@/lib/content";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  productJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await content.products.slugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await content.products.bySlug(slug);
  if (!product) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/products/${slug}`,
    seo: product.seo,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const product = await content.products.bySlug(slug);
  if (!product) notFound();

  const tr = await getTranslations("madar");
  const faq = await getTranslations("faq");
  const name = t(product.name, l);
  const description = t(product.description, l);

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name,
          description,
          path: `/products/${slug}`,
          locale: l,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Boliveer", path: "/" },
            { name: "Products", path: "/products" },
            { name, path: `/products/${slug}` },
          ],
          l,
        )}
      />
      <PageHero
        eyebrow={product.mark}
        title={name}
        lede={t(product.tagline, l)}
      />
      <Section>
        <Container className="space-y-12">
          <p className="bv-prose text-lg">{description}</p>
          <CapabilityGrid
            title={tr("capabilitiesTitle")}
            capabilities={product.capabilities}
            locale={l}
          />
          <div className="flex flex-wrap gap-3">
            {product.cta.includes("demo") && (
              <Button href="/demo" variant="signal">
                {tr("ctaDemo")}
              </Button>
            )}
            {product.cta.includes("enterprise") && (
              <Button href="/enterprise" variant="secondary">
                {tr("ctaEnterprise")}
              </Button>
            )}
            {product.cta.includes("partner") && (
              <Button href="/partnership" variant="ghost">
                {tr("ctaPartner")}
              </Button>
            )}
          </div>
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
      <CTABand />
    </>
  );
}
