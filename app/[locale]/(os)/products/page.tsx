import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { OrbitalProducts } from "@/components/sections/OrbitalProducts";
import { CTABand } from "@/components/sections/CTABand";
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

function statusKey(status: string) {
  if (status === "coming") return "statusComing";
  if (status === "beta") return "statusBeta";
  return "statusLive";
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
  const home = await getTranslations("home");
  const products = await content.products.list();
  const flagship = products.find((p) => p.slug === "madar-360") ?? products[0];
  const pipeline = products.filter((p) => p.slug !== flagship.slug);

  return (
    <>
      <PageHero title={tr("title")} lede={tr("lede")} />
      <section className="bv-section">
        <div className="bv-container">
          <OrbitalProducts
            title={home("registryTitle")}
            body={home("registryBody")}
            liveLabel={home("flagshipLive")}
            enterLabel={home("flagshipEnter")}
            futureLabel={tr("futureTitle")}
            futureSlotLabel={home("futureSlot")}
            futureSlotBody={home("futureSlotBody")}
            pipelineTitle={home("pipelineTitle")}
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
              statusLabel: tr(statusKey(product.status)),
            }))}
          />
        </div>
      </section>
      <CTABand />
    </>
  );
}
