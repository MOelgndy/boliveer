import { Link } from "@/i18n/navigation";
import { capabilityLabel } from "@/content/capabilities";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export type FlagshipData = {
  name: string;
  tagline: string;
  mark: string;
  href: string;
  capabilities: string[];
};

export type PipelineItem = {
  slug: string;
  name: string;
  tagline: string;
  mark: string;
  href: string;
  statusLabel: string;
};

/**
 * Portfolio panel — flagship + pipeline. Server component.
 */
export function OrbitalProducts({
  title,
  body,
  flagship,
  pipeline = [],
  pipelineTitle,
  liveLabel,
  enterLabel,
  futureLabel,
  futureSlotLabel,
  futureSlotBody,
  locale,
}: {
  title: string;
  body: string;
  flagship: FlagshipData;
  pipeline?: PipelineItem[];
  pipelineTitle?: string;
  liveLabel: string;
  enterLabel: string;
  futureLabel: string;
  futureSlotLabel: string;
  futureSlotBody: string;
  locale: Locale;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      <div>
        <p className="bv-mono text-signal">Portfolio</p>
        <h2 className="bv-h2 mt-3 text-balance">{title}</h2>
        <p className="bv-prose mt-4">{body}</p>

        {pipeline.length > 0 ? (
          <div className="mt-8 space-y-3">
            {pipelineTitle && (
              <p className="bv-mono text-muted">{pipelineTitle}</p>
            )}
            {pipeline.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="bv-surface group flex items-center gap-3 rounded-lg px-4 py-3 transition duration-fast hover:border-signal"
              >
                <span className="bv-mono rounded bg-ink/5 px-2 py-1 text-ink dark:bg-ink/10">
                  {item.mark}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold tracking-tight">
                    {item.name}
                  </p>
                  <p className="truncate text-[12px] text-muted">{item.tagline}</p>
                </div>
                <span className="bv-mono shrink-0 text-signal">
                  {item.statusLabel}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <Link
            href="/products/future"
            className="group mt-8 block rounded-lg border border-dashed border-line-strong p-5 transition duration-fast hover:border-signal"
          >
            <p className="bv-mono text-muted">{futureSlotLabel}</p>
            <p className="mt-1.5 text-sm text-muted">{futureSlotBody}</p>
            <p className="mt-3 text-sm font-medium text-ink transition duration-fast group-hover:text-signal">
              {futureLabel} <span aria-hidden>+</span>
            </p>
          </Link>
        )}
      </div>

      <div className="bv-surface overflow-hidden rounded-lg">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4 md:px-6">
          <span className="bv-mono rounded bg-ink px-2 py-1 text-paper">
            {flagship.mark}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold tracking-tight">
              {flagship.name}
            </p>
            <p className="truncate text-[13px] text-muted">{flagship.tagline}</p>
          </div>
          <span className="bv-mono inline-flex items-center gap-1.5 text-ok">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            {liveLabel}
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
          {flagship.capabilities.map((cap, index) => (
            <li
              key={cap}
              className={cn(
                "bg-elevated px-4 py-3 text-[13px] transition duration-fast hover:bg-paper",
              )}
            >
              <span className="bv-mono me-2 text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              {capabilityLabel(cap, locale)}
            </li>
          ))}
          {flagship.capabilities.length % 3 !== 0 &&
            Array.from({
              length: 3 - (flagship.capabilities.length % 3),
            }).map((_, i) => (
              <li
                key={`pad-${i}`}
                className="hidden bg-elevated sm:block"
                aria-hidden
              />
            ))}
        </ul>

        <div className="border-t border-line px-5 py-4 md:px-6">
          <Link
            href={flagship.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition duration-fast hover:text-signal"
          >
            {enterLabel}
            <span
              aria-hidden
              className="transition-transform duration-fast group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
