import { content, t } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const revalidate = 600;

export async function GET() {
  const articles = await content.articles.list();
  const base = siteConfig.url.replace(/\/$/, "");

  const items = articles
    .map((article) => {
      const title = t(article.title, "en");
      const description = t(article.excerpt, "en");
      const link = `${base}/en/blog/${article.slug}`;
      return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(article.date).toUTCString()}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${base}</link>
      <description>${siteConfig.description.en}</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
