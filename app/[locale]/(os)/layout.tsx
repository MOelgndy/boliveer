import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { SystemBar } from "@/components/os-shell/SystemBar";
import { Footer } from "@/components/os-shell/Footer";
import { BootSequence } from "@/components/os-shell/BootSequence";
import { ProductDock } from "@/components/os-shell/ProductDock";
import type { Locale } from "@/i18n/routing";

export default async function OSLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <BootSequence />
      <SystemBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <ProductDock locale={locale as Locale} />
    </div>
  );
}
