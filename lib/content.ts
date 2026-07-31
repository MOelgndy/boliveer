/**
 * Content adapter — MDX/registries today, headless CMS later.
 * Keep page code depending on this boundary only.
 */

import { products, getProduct, getAllProductSlugs } from "@/content/products/registry";
import {
  industries,
  getIndustry,
  getAllIndustrySlugs,
} from "@/content/industries/registry";
import { jobs, getJob, getAllJobSlugs } from "@/content/jobs/registry";
import {
  articles,
  getArticle,
  getAllArticleSlugs,
} from "@/content/blog/registry";
import type { Locale } from "@/i18n/routing";
import type { LocalizedString } from "@/lib/types";

export type ContentSource = "registry" | "cms";

export function getContentSource(): ContentSource {
  return process.env.CONTENT_SOURCE === "cms" ? "cms" : "registry";
}

export function t(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value.en;
}

export const content = {
  products: {
    list: async () => products,
    bySlug: async (slug: string) => getProduct(slug),
    slugs: async () => getAllProductSlugs(),
  },
  industries: {
    list: async () => industries,
    bySlug: async (slug: string) => getIndustry(slug),
    slugs: async () => getAllIndustrySlugs(),
  },
  jobs: {
    list: async () => jobs,
    bySlug: async (slug: string) => getJob(slug),
    slugs: async () => getAllJobSlugs(),
  },
  articles: {
    list: async () => articles,
    bySlug: async (slug: string) => getArticle(slug),
    slugs: async () => getAllArticleSlugs(),
  },
};

/** Programmatic SEO: industry × capability solution paths */
export async function listSolutionPaths() {
  const all = await content.industries.list();
  return all.flatMap((industry) =>
    industry.relatedCapabilities.map((capability) => ({
      industry: industry.slug,
      capability,
    })),
  );
}
