"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeSwitch } from "./ThemeSwitch";
import { LocaleSwitch } from "./LocaleSwitch";
import { CommandPalette } from "./CommandPalette";
import { BreadcrumbTrail, type Crumb } from "./BreadcrumbTrail";
import { cn } from "@/lib/cn";

const primaryLinks = [
  { href: "/products", key: "products" },
  { href: "/technology", key: "technology" },
  { href: "/industries", key: "industries" },
  { href: "/careers", key: "careers" },
  { href: "/demo", key: "demo" },
] as const;

export function SystemBar({ crumbs = [] }: { crumbs?: Crumb[] }) {
  const t = useTranslations("nav");
  const ts = useTranslations("system");
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setElevated(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-fast",
        elevated
          ? "bv-glass border-line"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="bv-container flex h-shell items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Boliveer">
          <Image src="/brand/boliveer-mark.svg" alt="" width={24} height={24} priority />
          <span className="text-[15px] font-semibold tracking-tight">Boliveer</span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block">
          <BreadcrumbTrail items={crumbs} />
        </div>

        <nav className="ms-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-[13px] text-muted transition duration-fast hover:text-ink"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="bv-mono hidden items-center gap-2 text-[0.65rem] text-ok xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            {ts("statusOnline")}
          </span>
          <CommandPalette />
          <ThemeSwitch />
          <LocaleSwitch />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted lg:hidden"
            aria-expanded={open}
            aria-label={ts("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      <div className={cn("border-t border-line bg-paper lg:hidden", open ? "block" : "hidden")}>
        <nav className="bv-container flex flex-col gap-1 py-3" aria-label="Mobile">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2.5 text-sm text-ink"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md px-2 py-2.5 text-sm text-ink"
            onClick={() => setOpen(false)}
          >
            {t("contact")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
