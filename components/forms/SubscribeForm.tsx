"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { submitNewsletter } from "@/lib/forms";

export function SubscribeForm({ locale }: { locale: string }) {
  const t = useTranslations("forms");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  // Mount after hydration so password-manager extensions (LastPass) cannot
  // inject DOM nodes into the SSR markup and trigger a false mismatch.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const res = await submitNewsletter({ email, locale });
    setMessage(res.message);
    setPending(false);
    if (res.ok) e.currentTarget.reset();
  }

  if (!ready) {
    return (
      <div className="flex gap-2" aria-hidden>
        <div className="h-11 min-w-0 flex-1 rounded-md border border-line bg-elevated" />
        <div className="h-8 w-20 shrink-0 rounded-full border border-line-strong bg-elevated" />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2"
      data-lpignore="true"
      data-1p-ignore="true"
      data-bwignore="true"
      autoComplete="off"
    >
      <Input
        name="email"
        type="email"
        required
        autoComplete="off"
        placeholder={t("email")}
        aria-label={t("email")}
        className="min-w-0 flex-1"
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={pending}
        className="shrink-0"
      >
        {t("subscribe")}
      </Button>
      {message && (
        <span className="sr-only" role="status" aria-live="polite">
          {message}
        </span>
      )}
    </form>
  );
}
