import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-elevated px-3 text-ink placeholder:text-muted transition duration-fast focus:border-signal focus:outline-none",
        className,
      )}
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
