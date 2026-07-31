import { getTranslations } from "next-intl/server";
import { Button } from "@/components/primitives/Button";

export async function CTABand() {
  const t = await getTranslations("cta");

  return (
    <section className="border-y border-line bg-elevated">
      <div className="bv-container flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="bv-h2">{t("bandTitle")}</h2>
          <p className="mt-3 text-muted">{t("bandBody")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/demo" variant="signal">
            {t("demo")}
          </Button>
          <Button href="/partnership" variant="secondary">
            {t("partner")}
          </Button>
          <Button href="/enterprise" variant="ghost">
            {t("enterprise")}
          </Button>
        </div>
      </div>
    </section>
  );
}
