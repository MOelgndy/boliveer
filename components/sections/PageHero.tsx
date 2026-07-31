export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="border-b border-line bv-grid-bg">
      <div className="bv-container py-16 md:py-20">
        {eyebrow && <p className="bv-mono mb-3 text-signal">{eyebrow}</p>}
        <h1 className="bv-h1 max-w-3xl">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-lg text-muted">{lede}</p>}
      </div>
    </header>
  );
}
