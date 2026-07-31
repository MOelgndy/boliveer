import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, listSolutionPaths, t } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateStaticParams() {
  return listSolutionPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string; capability: string }>;
}) {
  const { locale, industry: industrySlug, capability } = await params;
  const industry = await content.industries.bySlug(industrySlug);
  if (!industry) return {};
  const l = locale as Locale;
  const name = t(industry.name, l);
  return buildPageMetadata({
    locale: l,
    path: `/solutions/${industrySlug}/${capability}`,
    seo: {
      title: {
        en: `${name} × ${capability} — Boliveer`,
        ar: `${name} × ${capability} — بوليفير`,
      },
      description: {
        en: `${name} solutions with ${capability} on Madar 360 by Boliveer.`,
        ar: `حلول ${name} مع ${capability} على مدار 360 من بوليفير.`,
      },
    },
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string; capability: string }>;
}) {
  const { locale, industry: industrySlug, capability } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const industry = await content.industries.bySlug(industrySlug);
  if (!industry || !industry.relatedCapabilities.includes(capability)) {
    notFound();
  }
  const tr = await getTranslations("solutions");
  const name = t(industry.name, l);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Boliveer", path: "/" },
            { name: "Industries", path: "/industries" },
            { name, path: `/industries/${industrySlug}` },
            {
              name: capability,
              path: `/solutions/${industrySlug}/${capability}`,
            },
          ],
          l,
        )}
      />
      <PageHero
        eyebrow={tr("title")}
        title={`${name} · ${capability}`}
        lede={tr("lede")}
      />
      <Section>
        <Container className="space-y-6">
          <p className="bv-prose">{t(industry.description, l)}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/products/madar-360" variant="signal">
              Madar 360
            </Button>
            <Button href="/enterprise" variant="secondary">
              Enterprise
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
