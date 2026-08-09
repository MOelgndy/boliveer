"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/primitives/Button";
import { Input, Label, Select, Textarea } from "@/components/primitives/Input";
import type { FormResult } from "@/lib/forms";

export type Field =
  | { name: string; labelKey: string; type: "text" | "email" | "url"; required?: boolean }
  | { name: string; labelKey: string; type: "textarea"; required?: boolean }
  | {
      name: string;
      labelKey: string;
      type: "select";
      required?: boolean;
      options: { value: string; label: string }[];
    };

export function ActionForm({
  locale,
  fields,
  successMessage,
  onSubmit,
  submitLabel,
}: {
  locale: string;
  fields: Field[];
  successMessage: string;
  submitLabel?: string;
  onSubmit: (data: Record<string, string>) => Promise<FormResult>;
}) {
  const t = useTranslations("forms");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = { locale };
    fields.forEach((field) => {
      data[field.name] = String(fd.get(field.name) ?? "");
    });
    const res = await onSubmit(data);
    setResult(res);
    setPending(false);
    if (res.ok) e.currentTarget.reset();
  }

  if (result?.ok) {
    return (
      <div
        className="rounded-md border border-ok/40 bg-elevated p-6 text-ok"
        role="status"
      >
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <Label htmlFor={field.name}>{t(field.labelKey)}</Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              name={field.name}
              required={field.required}
            />
          ) : field.type === "select" ? (
            <Select id={field.name} name={field.name} required={field.required}>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
            />
          )}
        </div>
      ))}
      {result && !result.ok && (
        <p className="text-sm text-danger" role="alert">
          {result.message}
        </p>
      )}
      <Button type="submit" variant="signal" disabled={pending}>
        {pending ? t("sending") : submitLabel ?? t("submit")}
      </Button>
    </form>
  );
}
