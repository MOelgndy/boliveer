import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export function FAQ({
  title,
  items,
}: {
  title?: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <div>
      <JsonLd data={faqJsonLd(items)} />
      {title && <h2 className="bv-h2 mb-6">{title}</h2>}
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.question} className="border-b border-line pb-4">
            <dt className="font-medium text-ink">{item.question}</dt>
            <dd className="mt-2 text-sm text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
