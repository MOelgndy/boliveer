import { Link } from "@/i18n/navigation";

export type MethodStep = {
  index: string;
  title: string;
  body: string;
};

/**
 * Boliveer operating method as a bento grid — discover → build → launch → media.
 * Server component: zero client JS.
 */
export function BuilderMethod({
  eyebrow,
  title,
  body,
  steps,
  ctaLabel,
  ctaHref = "/about",
}: {
  eyebrow: string;
  title: string;
  body: string;
  steps: MethodStep[];
  ctaLabel: string;
  ctaHref?: string;
}) {
  return (
    <div>
      <div className="mb-8 max-w-2xl">
        <p className="bv-mono text-signal">{eyebrow}</p>
        <h2 className="bv-h2 mt-3 text-balance">{title}</h2>
        <p className="bv-prose mt-4">{body}</p>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li
            key={step.index}
            className="bv-surface group flex min-h-[11rem] flex-col justify-between rounded-lg p-5 transition duration-fast hover:border-signal"
          >
            <div>
              {/* In-flow index — avoid absolute watermarks + overflow-hidden clipping glyphs */}
              <p className="font-display text-3xl font-semibold leading-none tracking-tight text-signal/80">
                {step.index}
              </p>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {step.body}
              </p>
            </div>

            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="mt-4 hidden text-sm text-muted lg:block rtl:rotate-180"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition duration-fast hover:text-signal"
        >
          {ctaLabel}
          <span
            aria-hidden
            className="transition-transform duration-fast group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
