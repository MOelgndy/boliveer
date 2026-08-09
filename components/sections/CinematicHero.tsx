import { Button } from "@/components/primitives/Button";
import { experimentProps } from "@/lib/ab";

export type HeroReadoutItem = { label: string; value: string };

/**
 * Static editorial hero — server component so SSR HTML matches the client
 * (no framer-motion style injection / client-only attributes).
 */
export function CinematicHero({
  preface,
  headline,
  support,
  primaryCta,
  secondaryCta,
  readout,
  variant = "control",
}: {
  preface: string[];
  headline: string;
  support: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  readout: HeroReadoutItem[];
  variant?: "control" | "topology-dense";
}) {
  return (
    <section
      className="relative overflow-hidden border-b border-line"
      {...experimentProps("home-hero", variant)}
    >
      <div className="bv-atmosphere absolute inset-0" aria-hidden />

      {/* Architectural arcs — static, painted once */}
      <div
        aria-hidden
        className="pointer-events-none absolute -end-[20rem] -top-[20rem] hidden lg:block"
      >
        <div className="h-[42rem] w-[42rem] rounded-full border border-line" />
        <div className="absolute inset-12 rounded-full border border-line" />
        <div className="absolute inset-24 rounded-full border border-line-strong" />
        <div className="absolute inset-36 rounded-full border border-signal/25" />
      </div>

      <div className="bv-container relative py-8">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          <span className="bv-mono text-muted">{preface.join("  ·  ")}</span>
        </div>

        <h1 className="bv-display mt-6 max-w-3xl text-balance">{headline}</h1>

        <p className="mt-5 max-w-lg text-base text-muted md:text-lg">{support}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={primaryCta.href} variant="signal" size="lg">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" size="lg">
            {secondaryCta.label}
          </Button>
        </div>
      </div>

      <dl className="bv-container relative grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line py-5 md:grid-cols-4">
        {readout.map((item) => (
          <div key={item.label}>
            <dt className="bv-mono text-muted">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
