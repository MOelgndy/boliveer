"use client";

import { m } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  easeCinematic,
  staggerContainer,
  staggerItem,
} from "@/design-system/motion";

export type RoleCard = {
  slug: string;
  title: string;
  team: string;
  location: string;
  summary: string;
};

export function CareersMission({
  title,
  lede,
  manifesto,
  rolesTitle,
  applyLabel,
  roles,
}: {
  title: string;
  lede: string;
  manifesto: string[];
  rolesTitle: string;
  applyLabel: string;
  roles: RoleCard[];
}) {
  return (
    <>
      <section className="relative border-b border-line">
        <div className="bv-atmosphere absolute inset-0" aria-hidden />
        <m.div
          className="bv-container relative py-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCinematic }}
        >
          <p className="bv-mono text-signal">Join the control plane</p>
          <h1 className="bv-display mt-5 max-w-3xl text-balance">{title}</h1>
          <p className="bv-prose mt-5 max-w-xl">{lede}</p>
        </m.div>
      </section>

      <section className="bv-section">
        <div className="bv-container">
          <m.ul className="grid gap-4 md:grid-cols-3" {...staggerContainer}>
            {manifesto.map((line) => (
              <m.li
                key={line}
                {...staggerItem}
                className="bv-surface rounded-lg p-5 md:p-6"
              >
                <p className="text-base font-semibold tracking-tight">{line}</p>
              </m.li>
            ))}
          </m.ul>

          <div className="mt-14">
            <h2 className="bv-h2">{rolesTitle}</h2>
            <ul className="mt-8 space-y-3">
              {roles.map((role) => (
                <li key={role.slug}>
                  <Link
                    href={`/careers/${role.slug}`}
                    className="bv-surface group flex flex-col gap-4 rounded-lg p-5 transition duration-fast hover:border-signal md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="bv-mono text-muted">{role.team}</p>
                      <h3 className="mt-1.5 text-lg font-semibold tracking-tight transition duration-fast group-hover:text-signal">
                        {role.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl text-sm text-muted">
                        {role.summary}
                      </p>
                      <p className="mt-1.5 text-xs text-muted">{role.location}</p>
                    </div>
                    <span className="inline-flex h-9 shrink-0 items-center rounded-full border border-line-strong px-4 text-sm font-medium transition duration-fast group-hover:border-signal group-hover:text-signal">
                      {applyLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
