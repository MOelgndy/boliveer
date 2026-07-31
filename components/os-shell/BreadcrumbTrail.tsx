import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

export function BreadcrumbTrail({ items }: { items: Crumb[] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-2 overflow-hidden text-sm text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {index > 0 && <span aria-hidden className="text-line-strong">/</span>}
              {item.href && !last ? (
                <Link href={item.href} className="truncate hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span className="truncate text-ink" aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
