type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Kept for backwards compatibility; no longer rendered. We dropped the
   *  decorative emoji in favour of a calmer, typographic treatment. */
  icon?: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          <span aria-hidden className="h-px w-8 bg-brand-300" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
