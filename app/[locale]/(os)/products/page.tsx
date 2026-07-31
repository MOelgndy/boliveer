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
  const tr = await getTranslations({ locale, namespace: "products" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/products",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const tr = await getTranslations("products");
  const products = await content.products.list();

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <Section>
        <Container className="space-y-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="block rounded-md border border-line bg-elevated p-6 transition hover:border-signal"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="bv-mono text-signal">
                    {product.status === "live"
                      ? tr("statusLive")
                      : product.status === "beta"
                        ? tr("statusBeta")
                        : tr("statusComing")}
                  </p>
                  <h2 className="bv-h3 mt-2">{t(product.name, l)}</h2>
                  <p className="mt-2 text-muted">{t(product.tagline, l)}</p>
                </div>
                <span className="bv-mono">{product.mark}</span>
              </div>
            </Link>
          ))}
          <Link
            href="/products/future"
            className="block rounded-md border border-dashed border-line p-6 text-muted transition hover:border-signal hover:text-signal"
          >
            {tr("futureTitle")}
          </Link>
        </Container>
      </Section>
    </>
  );
}
