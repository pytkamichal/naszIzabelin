type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Kept for backwards compatibility; no longer rendered. */
  icon?: string;
  description?: string;
  /** Chapter number rendered before the eyebrow, e.g. "01". */
  index?: string;
  /** "dark" for headings sitting on pine/graphite sections. */
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow ? (
        <p
          className={`flex items-baseline gap-4 text-xs font-extrabold uppercase tracking-[0.28em] ${
            dark ? "text-gold-300" : "text-pine-700"
          }`}
        >
          {index ? (
            <span
              className={`font-serif text-2xl font-semibold italic tracking-normal ${
                dark ? "text-gold-400" : "text-gold-500"
              }`}
            >
              {index}
            </span>
          ) : null}
          <span
            aria-hidden
            className={`h-px w-10 self-center ${dark ? "bg-gold-400/60" : "bg-gold-500/70"}`}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl ${
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
