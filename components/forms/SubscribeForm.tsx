"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { submitNewsletter } from "@/lib/forms";

export function SubscribeForm({ locale }: { locale: string }) {
  const t = useTranslations("forms");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

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

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        name="email"
        type="email"
        required
        placeholder={t("email")}
        aria-label={t("email")}
        className="flex-1"
      />
      <Button type="submit" variant="secondary" size="sm" disabled={pending}>
        {t("subscribe")}
      </Button>
      {message && <span className="sr-only">{message}</span>}
    </form>
  );
}
