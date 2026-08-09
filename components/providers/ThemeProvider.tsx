import { ThemeProvider as WrkszThemeProvider } from "@wrksz/themes/next";
import type { ReactNode } from "react";

/**
 * Server ThemeProvider (from @wrksz/themes/next).
 * Injects the FOUC-prevention script via useServerInsertedHTML — no React 19 warning.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <WrkszThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </WrkszThemeProvider>
  );
}
