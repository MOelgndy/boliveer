"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { easeCinematic } from "@/design-system/motion";

export function MissionControl({
  title,
  lede,
  status = "Uplink ready",
  children,
}: {
  title: string;
  lede: string;
  status?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative border-b border-line">
      <div className="bv-atmosphere absolute inset-0" aria-hidden />
      <m.div
        className="bv-container relative grid gap-10 py-8 lg:grid-cols-[1fr_1.05fr]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeCinematic }}
      >
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            <span className="bv-mono text-muted">{status}</span>
          </div>
          <h1 className="bv-h1 max-w-xl text-balance">{title}</h1>
          <p className="bv-prose mt-4">{lede}</p>
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {[
              ["Channel", "Direct"],
              ["Latency", "< 24h"],
              ["Priority", "Enterprise"],
              ["Region", "MENA → Global"],
            ].map(([k, v]) => (
              <div key={k} className="bv-surface rounded-lg px-3.5 py-2.5">
                <dt className="bv-mono text-muted">{k}</dt>
                <dd className="mt-0.5 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bv-surface relative rounded-lg p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-line pb-3.5">
            <span className="bv-mono text-signal">Mission Control</span>
            <span className="bv-mono text-muted">Secure form</span>
          </div>
          {children}
        </div>
      </m.div>
    </section>
  );
}
