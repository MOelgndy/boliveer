"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { isEnabled } from "@/lib/flags";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Command = {
  id: string;
  label: string;
  href: string;
  group: string;
};

export function CommandPalette() {
  const t = useTranslations();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      { id: "home", label: t("nav.home"), href: "/", group: "System" },
      { id: "about", label: t("nav.about"), href: "/about", group: "System" },
      { id: "vision", label: t("nav.vision"), href: "/vision", group: "System" },
      { id: "products", label: t("nav.products"), href: "/products", group: "Products" },
      { id: "madar", label: t("nav.madar"), href: "/products/madar-360", group: "Products" },
      { id: "future", label: t("nav.future"), href: "/products/future", group: "Products" },
      { id: "technology", label: t("nav.technology"), href: "/technology", group: "Capability" },
      { id: "ai", label: t("nav.ai"), href: "/ai", group: "Capability" },
      { id: "engineering", label: t("nav.engineering"), href: "/engineering", group: "Capability" },
      { id: "industries", label: t("nav.industries"), href: "/industries", group: "Market" },
      { id: "partners", label: t("nav.partners"), href: "/partners", group: "Market" },
      { id: "careers", label: t("nav.careers"), href: "/careers", group: "Company" },
      { id: "blog", label: t("nav.blog"), href: "/blog", group: "Company" },
      { id: "demo", label: t("nav.demo"), href: "/demo", group: "Action" },
      { id: "partnership", label: t("nav.partnership"), href: "/partnership", group: "Action" },
      { id: "enterprise", label: t("nav.enterprise"), href: "/enterprise", group: "Action" },
      { id: "contact", label: t("nav.contact"), href: "/contact", group: "Action" },
    ],
    [t],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!isEnabled("commandPalette")) return;

    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  function run(cmd: Command) {
    track({ name: "command_run", props: { id: cmd.id } });
    setOpen(false);
    setQuery("");
    router.push(cmd.href);
  }

  if (!isEnabled("commandPalette")) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bv-mono hidden h-8 items-center gap-2 rounded-md border border-line px-2 text-muted transition hover:border-ink hover:text-ink md:inline-flex"
        aria-label={t("system.commandHint")}
      >
        <span>{t("system.commandHint")}</span>
        <kbd className="rounded border border-line px-1">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-overlay/80 px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label={t("system.commandHint")}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-md border border-line bg-elevated shadow-bv2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i) => Math.min(i + 1, filtered.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i) => Math.max(i - 1, 0));
                }
                if (e.key === "Enter" && filtered[active]) run(filtered[active]);
              }}
              placeholder={t("system.commandPlaceholder")}
              className="h-14 w-full border-b border-line bg-transparent px-4 text-ink outline-none placeholder:text-muted"
            />
            <ul className="max-h-80 overflow-auto p-2" role="listbox">
              {filtered.map((cmd, index) => (
                <li key={cmd.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-3 py-2 text-start text-sm transition",
                      index === active ? "bg-paper text-ink" : "text-muted hover:bg-paper hover:text-ink",
                    )}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => run(cmd)}
                  >
                    <span>{cmd.label}</span>
                    <span className="bv-mono text-[0.7rem]">{cmd.group}</span>
                  </button>
                </li>
              ))}
              {!filtered.length && (
                <li className="px-3 py-6 text-center text-sm text-muted">—</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
