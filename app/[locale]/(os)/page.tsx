import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroTopology } from "@/components/sections/HeroTopology";
import { CTABand } from "@/components/sections/CTABand";
import { FAQ } from "@/components/sections/FAQ";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Link } from "@/i18n/navigation";
import { content, t } from "@/lib/content";
import { buildPageMetadata, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeHeroVariant } from "@/lib/ab";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/",
    seo: {
      title: {
        en: "Boliveer — Technology Company | Control Plane",
        ar: "بوليفير — شركة تقنية | مستوى التحكم",
      },
      description: {
        en: siteConfig.description.en,
        ar: siteConfig.description.ar,
      },
    },
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations();
  const products = await content.products.list();
  const variant = getHomeHeroVariant();

  return (
    <>
      <JsonLd data={websiteJsonLd(l)} />
      <HeroTopology
        brand={tr("home.brand")}
        headline={tr("home.headline")}
        support={tr("home.support")}
        primaryCta={{ label: tr("home.ctaPrimary"), href: "/products/madar-360" }}
        secondaryCta={{ label: tr("home.ctaSecondary"), href: "/demo" }}
        variant={variant}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="bv-mono text-signal">{tr("home.registryTitle")}</p>
              <h2 className="bv-h2 mt-3">{tr("home.registryTitle")}</h2>
              <p className="mt-3 text-muted">{tr("home.registryBody")}</p>
            </div>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between rounded-md border border-line bg-elevated px-4 py-4 transition hover:border-signal"
                  >
                    <div>
                      <p className="font-medium">{t(product.name, l)}</p>
                      <p className="text-sm text-muted">{t(product.tagline, l)}</p>
                    </div>
                    <span className="bv-mono text-signal">{product.mark}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products/future"
                  className="flex items-center justify-between rounded-md border border-dashed border-line px-4 py-4 text-muted transition hover:border-signal hover:text-signal"
                >
                  <span>{tr("nav.future")}</span>
                  <span className="bv-mono">+</span>
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-elevated">
        <Container className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="bv-h2">{tr("home.proofTitle")}</h2>
            <p className="mt-3 text-muted">{tr("home.proofBody")}</p>
            <div className="mt-6">
              <Button href="/about" variant="secondary">
                {tr("nav.about")}
              </Button>
            </div>
          </div>
          <FAQ
            items={[
              {
                question: tr("faq.whatIsBoliveerQ"),
                answer: tr("faq.whatIsBoliveerA"),
              },
              {
                question: tr("faq.whatIsMadarQ"),
                answer: tr("faq.whatIsMadarA"),
              },
              {
                question: tr("faq.regionsQ"),
                answer: tr("faq.regionsA"),
              },
            ]}
          />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
