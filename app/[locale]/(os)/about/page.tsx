import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { CTABand } from "@/components/sections/CTABand";
import { BuilderMethod } from "@/components/sections/BuilderMethod";
import { Button } from "@/components/primitives/Button";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "about" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/about",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("about");
  const home = await getTranslations("home");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-10">
          <p className="bv-prose max-w-3xl text-base md:text-lg">{tr("body")}</p>

          <ul className="grid gap-3 md:grid-cols-3">
            {[
              [tr("pillar1Title"), tr("pillar1Body")],
              [tr("pillar2Title"), tr("pillar2Body")],
              [tr("pillar3Title"), tr("pillar3Body")],
            ].map(([title, body]) => (
              <li key={title} className="bv-surface rounded-lg p-5">
                <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button href="/products/madar-360" variant="signal">
              {nav("madar")}
            </Button>
            <Button href="/products" variant="secondary">
              {nav("products")}
            </Button>
            <Button href="/media" variant="ghost">
              {nav("media")}
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-elevated/40">
        <Container>
          <BuilderMethod
            eyebrow={home("methodEyebrow")}
            title={home("methodTitle")}
            body={home("methodBody")}
            ctaLabel={nav("contact")}
            ctaHref="/contact"
            steps={[
              {
                index: "01",
                title: home("method1Title"),
                body: home("method1Body"),
              },
              {
                index: "02",
                title: home("method2Title"),
                body: home("method2Body"),
              },
              {
                index: "03",
                title: home("method3Title"),
                body: home("method3Body"),
              },
              {
                index: "04",
                title: home("method4Title"),
                body: home("method4Body"),
              },
            ]}
          />
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
