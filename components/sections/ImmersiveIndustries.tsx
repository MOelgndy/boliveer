import { Link } from "@/i18n/navigation";

export type IndustryScene = {
  slug: string;
  name: string;
  summary: string;
  accent: "signal" | "ice" | "ember";
};

/**
 * Editorial index rows — hairlines, large type, CSS-only hover.
 * Server component: ships zero client JS.
 */
export function ImmersiveIndustries({
  title,
  body,
  items,
}: {
  title: string;
  body: string;
  items: IndustryScene[];
}) {
  return (
    <div>
      <div className="mb-10 max-w-2xl">
        <p className="bv-mono text-signal">Markets</p>
        <h2 className="bv-h2 mt-3">{title}</h2>
        <p className="bv-prose mt-4">{body}</p>
      </div>

      <ul className="border-t border-line">
        {items.map((item, index) => (
          <li key={item.slug} className="border-b border-line">
            <Link
              href={`/industries/${item.slug}`}
              className="group grid items-baseline gap-x-8 gap-y-1.5 py-5 transition duration-fast md:grid-cols-[3rem_1fr_minmax(0,20rem)_2rem] md:py-6"
            >
              <span className="bv-mono text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold tracking-tight transition duration-fast group-hover:text-signal md:text-2xl">
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-end">
                {item.summary}
              </p>
              <span
                aria-hidden
                className="hidden self-center text-base text-muted transition duration-fast group-hover:translate-x-1 group-hover:text-signal md:block rtl:rotate-180 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
