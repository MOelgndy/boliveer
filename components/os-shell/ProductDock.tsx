import { Link } from "@/i18n/navigation";
import { products } from "@/content/products/registry";
import { t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export function ProductDock({ locale }: { locale: Locale }) {
  const live = products.filter((p) => p.status === "live" || p.status === "beta");

  return (
    <aside
      className="fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bv-glass px-2 py-2 shadow-bv2 md:flex"
      aria-label="Product dock"
    >
      {live.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group flex h-11 items-center gap-2 rounded-full px-4 transition hover:bg-paper/70"
          title={t(product.name, locale)}
        >
          <span className="bv-mono text-signal">{product.mark}</span>
          <span className="text-sm text-muted group-hover:text-ink">
            {t(product.name, locale)}
          </span>
        </Link>
      ))}
      <Link
        href="/products"
        className="bv-mono flex h-11 items-center rounded-full border border-dashed border-line px-4 text-muted transition hover:border-signal hover:text-signal"
        title="All products"
      >
        +
      </Link>
    </aside>
  );
}
