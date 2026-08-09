import { setRequestLocale, getTranslations } from "next-intl/server";
import { MissionControl } from "@/components/sections/MissionControl";
import { FAQ } from "@/components/sections/FAQ";
import { EnterpriseForm } from "@/components/forms/forms.client";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tr = await getTranslations({ locale, namespace: "enterprise" });
  return buildPageMetadata({
    locale: locale as Locale,
    path: "/enterprise",
    seo: {
      title: { en: `${tr("title")} — Boliveer`, ar: `${tr("title")} — بوليفير` },
      description: { en: tr("lede"), ar: tr("lede") },
    },
  });
}

export default async function EnterprisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = await getTranslations("enterprise");
  const faq = await getTranslations("faq");

  return (
    <>
      <MissionControl title={tr("title")} lede={tr("lede")} status="Enterprise priority">
        <EnterpriseForm locale={locale} successMessage={tr("success")} />
      </MissionControl>
      <section className="bv-section">
        <div className="bv-container max-w-3xl">
          <FAQ
            items={[
              {
                question: faq("whatIsMadarQ"),
                answer: faq("whatIsMadarA"),
              },
              {
                question: faq("regionsQ"),
                answer: faq("regionsA"),
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
