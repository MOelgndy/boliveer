import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
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
    path: "/products/future",
    seo: {
      title: {
        en: `${tr("futureTitle")} — Boliveer`,
        ar: `${tr("futureTitle")} — بوليفير`,
      },
      description: { en: tr("futureLede"), ar: tr("futureLede") },
    },
  });
}

export default async function FutureProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("products");

  return (
    <>
      <PageHero title={tr("futureTitle")} lede={tr("futureLede")} />
      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-line text-muted"
              >
                <span className="bv-mono">Slot {String(slot).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
