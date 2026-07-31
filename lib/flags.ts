/**
 * Thin feature-flag layer. Env today; remote provider later.
 */
const flags = {
  commandPalette: process.env.NEXT_PUBLIC_FLAG_COMMAND_PALETTE !== "0",
  bootSequence: process.env.NEXT_PUBLIC_FLAG_BOOT !== "0",
  newsletter: process.env.NEXT_PUBLIC_FLAG_NEWSLETTER !== "0",
  booking: process.env.NEXT_PUBLIC_FLAG_BOOKING === "1",
  abHomeHero: process.env.NEXT_PUBLIC_AB_HOME_HERO ?? "control",
} as const;

export type FlagKey = keyof typeof flags;

export function isEnabled(key: FlagKey): boolean {
  const value = flags[key];
  return typeof value === "boolean" ? value : Boolean(value);
}

export function getVariant(key: FlagKey): string {
  const value = flags[key];
  return typeof value === "string" ? value : value ? "on" : "off";
}

export function getFlags() {
  return flags;
}
