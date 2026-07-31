import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { content, t } from "@/lib/content";
import { articleJsonLd, buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await content.articles.slugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await content.articles.bySlug(slug);
  if (!article) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    seo: article.seo,
    type: "article",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const article = await content.articles.bySlug(slug);
  if (!article) notFound();
  const title = t(article.title, l);
  const excerpt = t(article.excerpt, l);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title,
          description: excerpt,
          path: `/blog/${slug}`,
          date: article.date,
          locale: l,
        })}
      />
      <PageHero eyebrow={article.date} title={title} lede={excerpt} />
      <Section>
        <Container className="prose prose-neutral dark:prose-invert max-w-3xl">
          <p>{excerpt}</p>
          <p>
            Boliveer builds platforms as infrastructure. Madar 360 is the first
            full expression of that thesis — a commerce and services operating
            system for operators across Egypt, Saudi Arabia, the GCC, and beyond.
          </p>
          <p>
            This article is served from the content registry with ISR. MDX and
            CMS adapters plug into the same `lib/content` boundary.
          </p>
          <hr />
          <p className="not-prose text-sm">
            Related:{" "}
            {article.related.map((rel, i) => (
              <span key={rel}>
                {i > 0 && " · "}
                <Link
                  href={
                    rel === "madar-360"
                      ? "/products/madar-360"
                      : `/${rel}`
                  }
                  className="text-signal"
                >
                  {rel}
                </Link>
              </span>
            ))}
          </p>
        </Container>
      </Section>
    </>
  );
}
