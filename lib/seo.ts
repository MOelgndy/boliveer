import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import type { LocalizedString, SeoBundle } from "@/lib/types";

function pick(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value.en;
}

export function absoluteUrl(path = "", locale?: Locale) {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale) return `${base}/${locale}${normalized === "/" ? "" : normalized}`;
  return `${base}${normalized}`;
}

export function buildPageMetadata({
  locale,
  path,
  seo,
  type = "website",
}: {
  locale: Locale;
  path: string;
  seo: SeoBundle;
  type?: "website" | "article";
}): Metadata {
  const title = pick(seo.title, locale);
  const description = pick(seo.description, locale);
  const keywords = seo.keywords ? pick(seo.keywords, locale) : undefined;
  const canonical = absoluteUrl(path === "/" ? "" : path, locale);
  const languages = Object.fromEntries(
    siteConfig.locales.map((l) => [
      l,
      absoluteUrl(path === "/" ? "" : path, l),
    ]),
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": absoluteUrl(path === "/" ? "" : path, siteConfig.defaultLocale),
      },
    },
    openGraph: {
      type,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/boliveer-mark.svg"),
    email: siteConfig.email.contact,
    sameAs: [],
    description: siteConfig.description.en,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("", locale),
    inLanguage: locale === "ar" ? "ar" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("", locale)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path === "/" ? "" : item.path, locale),
    })),
  };
}

export function productJsonLd({
  name,
  description,
  path,
  locale,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path, locale),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  date,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  date: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/boliveer-mark.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(path, locale),
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

export function jobPostingJsonLd({
  title,
  description,
  path,
  locale,
  datePosted,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  datePosted: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocationType: "TELECOMMUTE",
    url: absoluteUrl(path, locale),
  };
}
