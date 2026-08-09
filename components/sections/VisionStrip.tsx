export function VisionStrip({ lines }: { lines: string[] }) {
  return (
    <div className="border-y border-line">
      <div className="bv-container flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-8">
        {lines.map((line, i) => (
          <p
            key={line}
            className="text-xl font-semibold tracking-tight text-ink md:text-2xl"
          >
            <span className="bv-mono me-2.5 align-middle text-signal">
              {String(i + 1).padStart(2, "0")}
            </span>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
