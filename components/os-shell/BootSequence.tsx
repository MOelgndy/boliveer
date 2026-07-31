"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { isEnabled } from "@/lib/flags";

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
    const timer = window.setTimeout(() => finish(), 1100);
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
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-live="polite"
        >
          <div className="bv-grid-bg absolute inset-0 opacity-70" />
          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-16 w-16 items-center justify-center rounded-md bg-ink text-signal"
              aria-hidden
            >
              <span className="font-display text-2xl font-bold">B</span>
            </motion.div>
            <motion.p
              className="bv-mono text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {t("bootInit")}
            </motion.p>
            <button
              type="button"
              onClick={finish}
              className="bv-mono text-signal underline-offset-4 hover:underline"
            >
              {t("bootSkip")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
