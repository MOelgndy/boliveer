"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { cinematicReveal } from "@/design-system/motion";

/**
 * One reveal per chapter. Content never drifts with scroll — the camera is fixed.
 */
export function StoryChapter({
  eyebrow,
  title,
  body,
  children,
  align = "start",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  align?: "start" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("bv-section", className)}>
      <div className="bv-container">
        <m.div
          {...cinematicReveal}
          className={cn(
            "max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && <p className="bv-mono mb-4 text-signal">{eyebrow}</p>}
          <h2 className="bv-h2 text-balance">{title}</h2>
          {body && (
            <p className={cn("bv-prose mt-4", align === "center" && "mx-auto")}>
              {body}
            </p>
          )}
        </m.div>
        {children && <div className="mt-10 md:mt-12">{children}</div>}
      </div>
    </section>
  );
}
