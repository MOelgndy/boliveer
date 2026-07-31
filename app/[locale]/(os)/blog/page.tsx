import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Link } from "@/i18n/navigation";
import { content, t } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "blog" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/blog",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations("blog");
  const articles = await content.articles.list();

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-4">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-line pb-6">
              <p className="bv-mono text-muted">{article.date}</p>
              <h2 className="bv-h3 mt-2">
                <Link href={`/blog/${article.slug}`} className="hover:text-signal">
                  {t(article.title, l)}
                </Link>
              </h2>
              <p className="mt-2 text-muted">{t(article.excerpt, l)}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="mt-3 inline-block text-sm text-signal"
              >
                {tr("read")} →
              </Link>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
