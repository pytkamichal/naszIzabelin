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
    <div className="mb-12 max-w-3xl">
      {eyebrow ? (
        <p
          className={`flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.28em] ${
            dark ? "text-gold-300" : "text-pine-700"
          }`}
        >
          {index ? (
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border font-serif text-base font-semibold italic tracking-normal ${
                dark
                  ? "border-gold-400/45 bg-gold-400/10 text-gold-400"
                  : "border-gold-500/45 bg-gold-500/10 text-gold-500"
              }`}
            >
              {index}
            </span>
          ) : null}
          <span aria-hidden className="inline-flex items-center gap-[5px] self-center">
            <span className={`h-[5px] w-[5px] rotate-45 ${dark ? "bg-gold-300" : "bg-gold-500"}`} />
            <span className={`h-2 w-2 rotate-45 ${dark ? "bg-gold-300" : "bg-gold-500"}`} />
            <span className={`h-[5px] w-[5px] rotate-45 ${dark ? "bg-gold-300" : "bg-gold-500"}`} />
          </span>
          {eyebrow}
          {badge ? (
            <span className="self-center rounded-full bg-gold-400 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-pine-950">
              {badge}
            </span>
          ) : null}
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
