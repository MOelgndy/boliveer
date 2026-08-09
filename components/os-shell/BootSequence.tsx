"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { isEnabled } from "@/lib/flags";
import { easeCinematic } from "@/design-system/motion";

const SESSION_KEY = "bv-boot-seen";

export function BootSequence() {
  const t = useTranslations("system");
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled("bootSequence")) return;
    if (reduce) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => finish(), 1200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  function finish() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeCinematic }}
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-7 px-6 text-center">
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeCinematic }}
              className="flex h-20 w-20 items-center justify-center rounded-xl bg-ink text-signal"
              aria-hidden
            >
              <span className="font-display text-3xl font-bold">B</span>
            </m.div>
            <m.p
              className="bv-mono text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {t("bootInit")}
            </m.p>
            <m.div
              className="h-px w-40 origin-left bg-signal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: easeCinematic }}
            />
            <button
              type="button"
              onClick={finish}
              className="bv-mono text-signal underline-offset-4 hover:underline"
            >
              {t("bootSkip")}
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
