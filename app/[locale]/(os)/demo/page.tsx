import { setRequestLocale, getTranslations } from "next-intl/server";
import { MissionControl } from "@/components/sections/MissionControl";
import { DemoForm } from "@/components/forms/forms.client";
import { bookingProvider } from "@/lib/booking";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "demo" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/demo",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("demo");
  const slots = await bookingProvider.listSlots();
  const embed = bookingProvider.getEmbedUrl(locale);

  return (
    <MissionControl title={tr("title")} lede={tr("lede")} status="Demo uplink">
      <DemoForm locale={locale} successMessage={tr("success")} slots={slots} />
      {embed && (
        <div className="mt-6 rounded-md border border-line p-4">
          <p className="bv-mono mb-3 text-muted">{tr("booking")}</p>
          <iframe
            title={tr("booking")}
            src={embed}
            className="h-72 w-full rounded-sm border border-line"
          />
        </div>
      )}
    </MissionControl>
  );
}
