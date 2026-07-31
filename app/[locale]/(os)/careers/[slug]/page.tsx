import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { CareerForm } from "@/components/forms/forms.client";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, t } from "@/lib/content";
import { buildPageMetadata, jobPostingJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await content.jobs.slugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const job = await content.jobs.bySlug(slug);
  if (!job) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/careers/${slug}`,
    seo: job.seo,
  });
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const job = await content.jobs.bySlug(slug);
  if (!job) notFound();
  const tr = await getTranslations("careers");
  const title = t(job.title, l);

  return (
    <>
      <JsonLd
        data={jobPostingJsonLd({
          title,
          description: t(job.description, l),
          path: `/careers/${slug}`,
          locale: l,
          datePosted: "2026-06-01",
        })}
      />
      <PageHero
        eyebrow={t(job.team, l)}
        title={title}
        lede={`${t(job.location, l)} · ${t(job.type, l)}`}
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="bv-prose">{t(job.summary, l)}</p>
            <p className="bv-prose">{t(job.description, l)}</p>
          </div>
          <div>
            <h2 className="bv-h3 mb-4">{tr("apply")}</h2>
            <CareerForm locale={locale} role={title} />
          </div>
        </Container>
      </Section>
    </>
  );
}
