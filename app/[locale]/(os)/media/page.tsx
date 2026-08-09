import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Link } from "@/i18n/navigation";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "media" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/media",
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
  const tr = await getTranslations("media");
  const press = await getTranslations("press");

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bv-surface rounded-lg p-6 md:p-8">
            <p className="bv-mono text-signal">{tr("storyTitle")}</p>
            <p className="mt-4 text-lg font-semibold tracking-tight">
              {tr("storyBody")}
            </p>
            <p className="bv-prose mt-4">{tr("body")}</p>
          </div>

          <div>
            <p className="bv-mono mb-4 text-muted">{tr("assetsTitle")}</p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/press-kit"
                  className="bv-surface block rounded-lg px-4 py-3 text-sm font-medium transition duration-fast hover:border-signal"
                >
                  {tr("pressCta")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="bv-surface block rounded-lg px-4 py-3 text-sm font-medium transition duration-fast hover:border-signal"
                >
                  {tr("blogCta")}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${press("contact")}`}
                  className="bv-surface block rounded-lg px-4 py-3 text-sm font-medium transition duration-fast hover:border-signal"
                >
                  {tr("contactCta")} — {press("contact")}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
      <CTABand />
    </>
  );
}
