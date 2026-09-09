type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Kept for backwards compatibility; no longer rendered. */
  icon?: string;
  description?: string;
  /** Chapter number rendered before the eyebrow, e.g. "01". */
  index?: string;
  /** Small pill next to the eyebrow, e.g. "Nowość". */
  badge?: string;
  /** "dark" for headings sitting on dark (pine) sections. */
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  badge,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className="mb-9 max-w-3xl sm:mb-12">
      {eyebrow ? (
        <p
          className={`flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] ${
            dark ? "text-gold-300" : "text-pine-700"
          }`}
        >
          {index ? (
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-medium tracking-normal ${
                dark
                  ? "border-gold-400/45 bg-gold-400/10 text-gold-400"
                  : "border-gold-500/45 bg-gold-500/10 text-gold-500"
              }`}
            >
              {index}
            </span>
          ) : null}
          {eyebrow}
          {badge ? (
            <span className="self-center rounded-full bg-gold-400 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-pine-950">
              {badge}
            </span>
          ) : null}
        </p>
      ) : null}
      <h2
        className={`mt-4 text-balance font-serif text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
        <span aria-hidden className={dark ? "text-gold-400" : "text-gold-500"}>
          .
        </span>
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            dark ? "text-cream/70" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
