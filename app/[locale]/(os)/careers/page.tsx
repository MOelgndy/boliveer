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
  const tr = await getTranslations({ locale, namespace: "careers" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/careers",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations("careers");
  const jobs = await content.jobs.list();

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container>
          <h2 className="bv-h3 mb-6">{tr("openRoles")}</h2>
          <ul className="space-y-3">
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="block rounded-md border border-line bg-elevated p-5 transition hover:border-signal"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{t(job.title, l)}</h3>
                    <span className="bv-mono text-muted">{t(job.team, l)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{t(job.summary, l)}</p>
                  <p className="mt-2 text-xs text-muted">
                    {t(job.location, l)} · {t(job.type, l)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
