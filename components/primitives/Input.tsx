import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

/** Reduce password-manager icon injection that breaks React hydration (LastPass, 1Password). */
const vaultIgnore = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
} as const;

export function Input({ className, type, ...props }: ComponentProps<"input">) {
  const ignoreVault =
    type === "email" || type === "password" || type === "text";

  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-md border border-line bg-elevated px-3 text-ink placeholder:text-muted transition duration-fast focus:border-signal focus:outline-none",
        className,
      )}
      {...(ignoreVault ? vaultIgnore : {})}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md border border-line bg-elevated px-3 py-2 text-ink placeholder:text-muted transition duration-fast focus:border-signal focus:outline-none",
        className,
      )}
      {...vaultIgnore}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("bv-mono mb-2 block text-muted", className)}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-md border border-line bg-elevated px-3 text-ink transition duration-fast focus:border-signal focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
