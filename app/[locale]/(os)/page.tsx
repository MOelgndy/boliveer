import { setRequestLocale, getTranslations } from "next-intl/server";
import { CinematicHero } from "@/components/sections/CinematicHero";
import { OrbitalProducts } from "@/components/sections/OrbitalProducts";
import { ImmersiveIndustries } from "@/components/sections/ImmersiveIndustries";
import { BuilderMethod } from "@/components/sections/BuilderMethod";
import { VisionStrip } from "@/components/sections/VisionStrip";
import { StoryChapter } from "@/components/experience/StoryChapter";
import { CTABand } from "@/components/sections/CTABand";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/primitives/Button";
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
        en: "Boliveer — Technology Company | Parent of Madar 360",
        ar: "بوليفير — شركة تقنية | الشركة الأم لمدار 360",
      },
      description: {
        en: siteConfig.description.en,
        ar: siteConfig.description.ar,
      },
    },
  });
}

const industryAccents = ["signal", "ice", "ember", "signal", "ice"] as const;

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
  const industries = await content.industries.list();
  const variant = getHomeHeroVariant();
  const flagship = products.find((p) => p.slug === "madar-360") ?? products[0];
  const pipeline = products.filter((p) => p.slug !== flagship.slug);

  return (
    <>
      <JsonLd data={websiteJsonLd(l)} />
      <CinematicHero
        preface={[tr("home.beat1"), tr("home.beat2")]}
        headline={tr("home.finale")}
        support={tr("home.support")}
        primaryCta={{ label: tr("home.ctaPrimary"), href: "/about" }}
        secondaryCta={{ label: tr("home.ctaSecondary"), href: "/products/madar-360" }}
        readout={[
          { label: tr("home.readoutFlagship"), value: tr("home.readoutFlagshipValue") },
          { label: tr("home.readoutServices"), value: tr("home.readoutServicesValue") },
          { label: tr("home.readoutRegion"), value: tr("home.readoutRegionValue") },
          { label: tr("home.readoutStatus"), value: tr("home.readoutStatusValue") },
        ]}
        variant={variant}
      />

      <VisionStrip
        lines={[
          tr("home.strip1"),
          tr("home.strip2"),
          tr("home.strip3"),
          tr("home.strip4"),
        ]}
      />

      <section className="bv-section border-b border-line">
        <div className="bv-container">
          <BuilderMethod
            eyebrow={tr("home.methodEyebrow")}
            title={tr("home.methodTitle")}
            body={tr("home.methodBody")}
            ctaLabel={tr("home.methodCta")}
            ctaHref="/about"
            steps={[
              {
                index: "01",
                title: tr("home.method1Title"),
                body: tr("home.method1Body"),
              },
              {
                index: "02",
                title: tr("home.method2Title"),
                body: tr("home.method2Body"),
              },
              {
                index: "03",
                title: tr("home.method3Title"),
                body: tr("home.method3Body"),
              },
              {
                index: "04",
                title: tr("home.method4Title"),
                body: tr("home.method4Body"),
              },
            ]}
          />
        </div>
      </section>

      <StoryChapter
        eyebrow="Company"
        title={tr("home.visionTitle")}
        body={tr("home.visionBody")}
        align="center"
      >
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          <Button href="/vision" variant="secondary">
            {tr("nav.vision")}
          </Button>
          <Button href="/media" variant="ghost">
            {tr("nav.media")}
          </Button>
          <Button href="/technology" variant="ghost">
            {tr("nav.technology")}
          </Button>
        </div>
      </StoryChapter>

      <section className="bv-section border-y border-line bg-elevated/40">
        <div className="bv-container">
          <OrbitalProducts
            title={tr("home.registryTitle")}
            body={tr("home.registryBody")}
            liveLabel={tr("home.flagshipLive")}
            enterLabel={tr("home.flagshipEnter")}
            futureLabel={tr("nav.future")}
            futureSlotLabel={tr("home.futureSlot")}
            futureSlotBody={tr("home.futureSlotBody")}
            pipelineTitle={tr("home.pipelineTitle")}
            locale={l}
            flagship={{
              name: t(flagship.name, l),
              tagline: t(flagship.tagline, l),
              mark: flagship.mark,
              href: `/products/${flagship.slug}`,
              capabilities: flagship.capabilities,
            }}
            pipeline={pipeline.map((product) => ({
              slug: product.slug,
              name: t(product.name, l),
              tagline: t(product.tagline, l),
              mark: product.mark,
              href: `/products/${product.slug}`,
              statusLabel:
                product.status === "coming"
                  ? tr("products.statusComing")
                  : product.status === "beta"
                    ? tr("products.statusBeta")
                    : tr("products.statusLive"),
            }))}
          />
        </div>
      </section>

      <section className="bv-section">
        <div className="bv-container">
          <ImmersiveIndustries
            title={tr("home.industriesTitle")}
            body={tr("home.industriesBody")}
            items={industries.map((industry, i) => ({
              slug: industry.slug,
              name: t(industry.name, l),
              summary: t(industry.summary, l),
              accent: industryAccents[i % industryAccents.length],
            }))}
          />
        </div>
      </section>

      <StoryChapter
        eyebrow="Trust"
        title={tr("home.proofTitle")}
        body={tr("home.proofBody")}
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-wrap gap-3">
            <Button href="/about" variant="secondary">
              {tr("nav.about")}
            </Button>
            <Button href="/careers" variant="ghost">
              {tr("nav.careers")}
            </Button>
            <Button href="/partners" variant="ghost">
              {tr("nav.partners")}
            </Button>
          </div>
          <div className="bv-surface rounded-xl p-6 md:p-8">
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
          </div>
        </div>
      </StoryChapter>

      <CTABand />
    </>
  );
}
