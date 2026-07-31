"use client";

import Image from "next/image";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="bv-container flex h-shell items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Boliveer">
          <Image
            src="/brand/boliveer-mark.svg"
            alt=""
            width={28}
            height={28}
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight">Boliveer</span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block">
          <BreadcrumbTrail items={crumbs} />
        </div>

        <nav className="ms-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-sm text-muted transition hover:text-ink"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="bv-mono hidden text-[0.65rem] text-ok xl:inline">
            {ts("statusOnline")}
          </span>
          <CommandPalette />
          <ThemeSwitch />
          <LocaleSwitch />
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted lg:hidden"
            aria-expanded={open}
            aria-label={ts("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-line bg-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="bv-container flex flex-col gap-1 py-3" aria-label="Mobile">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm text-ink"
              onClick={() => setOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" className="rounded-md px-2 py-2 text-sm text-ink" onClick={() => setOpen(false)}>
            {t("contact")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
