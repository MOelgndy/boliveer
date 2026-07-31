import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/routing";
import { content, listSolutionPaths } from "@/lib/content";

const staticPaths = [
  "",
  "/about",
  "/vision",
  "/products",
  "/products/future",
  "/technology",
  "/ai",
  "/engineering",
  "/industries",
  "/partners",
  "/investors",
  "/careers",
  "/blog",
  "/media",
  "/press-kit",
  "/contact",
  "/support",
  "/demo",
  "/partnership",
  "/enterprise",
  "/privacy",
  "/terms",
  "/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const productSlugs = await content.products.slugs();
  const industrySlugs = await content.industries.slugs();
  const jobSlugs = await content.jobs.slugs();
  const articleSlugs = await content.articles.slugs();
  const solutions = await listSolutionPaths();

  const paths = [
    ...staticPaths,
    ...productSlugs.map((s) => `/products/${s}`),
    ...industrySlugs.map((s) => `/industries/${s}`),
    ...jobSlugs.map((s) => `/careers/${s}`),
    ...articleSlugs.map((s) => `/blog/${s}`),
    ...solutions.map((s) => `/solutions/${s.industry}/${s.capability}`),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path.startsWith("/blog") ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.includes("madar") ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
