import { Link } from "@/i18n/navigation";
import { products } from "@/content/products/registry";
import { t } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export function ProductDock({ locale }: { locale: Locale }) {
  return (
    <aside
      className="fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-md border border-line bg-elevated/90 px-2 py-2 shadow-bv2 backdrop-blur md:flex"
      aria-label="Product dock"
    >
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group flex h-10 items-center gap-2 rounded-sm px-3 transition hover:bg-paper"
          title={t(product.name, locale)}
        >
          <span className="bv-mono text-signal">{product.mark}</span>
          <span className="text-sm text-muted group-hover:text-ink">
            {t(product.name, locale)}
          </span>
        </Link>
      ))}
      <Link
        href="/products/future"
        className="bv-mono flex h-10 items-center rounded-sm border border-dashed border-line px-3 text-muted transition hover:border-signal hover:text-signal"
      >
        +
      </Link>
    </aside>
  );
}
