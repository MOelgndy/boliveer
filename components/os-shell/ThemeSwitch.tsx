"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("system");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="bv-mono h-8 rounded-md border border-line px-2 text-muted"
        aria-hidden
      >
        —
      </button>
    );
  }

  const next =
    resolvedTheme === "dark"
      ? "light"
      : theme === "system"
        ? "dark"
        : "system";

  const label =
    resolvedTheme === "dark"
      ? t("themeDark")
      : theme === "system"
        ? t("themeSystem")
        : t("themeLight");

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="bv-mono h-8 rounded-md border border-line px-2 text-muted transition hover:border-ink hover:text-ink"
      aria-label={label}
    >
      {label}
    </button>
  );
}
