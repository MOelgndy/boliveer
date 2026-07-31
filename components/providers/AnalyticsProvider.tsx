"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { pageview } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return <>{children}</>;
}
