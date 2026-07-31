import { getVariant } from "@/lib/flags";

/**
 * A/B testing hooks — env variants now, experiment platform later.
 */
export function getHomeHeroVariant(): "control" | "topology-dense" {
  const v = getVariant("abHomeHero");
  return v === "topology-dense" ? "topology-dense" : "control";
}

export function experimentProps(name: string, variant: string) {
  return {
    "data-experiment": name,
    "data-variant": variant,
  } as const;
}
