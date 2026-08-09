import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--bv-paper)",
        elevated: "var(--bv-paper-elevated)",
        ink: "var(--bv-ink)",
        muted: "var(--bv-ink-muted)",
        line: "var(--bv-line)",
        "line-strong": "var(--bv-line-strong)",
        signal: "var(--bv-signal)",
        "signal-strong": "var(--bv-signal-strong)",
        ice: "var(--bv-ice)",
        ember: "var(--bv-ember)",
        void: "var(--bv-void)",
        glass: "var(--bv-glass)",
        ok: "var(--bv-ok)",
        warn: "var(--bv-warn)",
        danger: "var(--bv-danger)",
      },
      borderRadius: {
        sm: "var(--bv-radius-sm)",
        md: "var(--bv-radius-md)",
        lg: "var(--bv-radius-lg)",
        xl: "var(--bv-radius-xl)",
      },
      fontFamily: {
        display: ["var(--bv-font-display)"],
        body: ["var(--bv-font-body)"],
        arabic: ["var(--bv-font-arabic)"],
        mono: ["var(--bv-font-mono)"],
      },
      boxShadow: {
        bv1: "var(--bv-shadow-1)",
        bv2: "var(--bv-shadow-2)",
      },
      maxWidth: {
        bv: "var(--bv-max)",
      },
      spacing: {
        shell: "var(--bv-shell-height)",
      },
      transitionTimingFunction: {
        out: "var(--bv-ease-out)",
      },
      transitionDuration: {
        fast: "var(--bv-duration-fast)",
        DEFAULT: "var(--bv-duration)",
        slow: "var(--bv-duration-slow)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
