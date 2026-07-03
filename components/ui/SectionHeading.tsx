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
          {/* Little wheat-sprig flourish before the eyebrow */}
          <svg
            aria-hidden
            width="40"
            height="14"
            viewBox="0 0 40 14"
            fill="none"
            className="text-brand-400"
          >
            <path
              d="M1 7 H24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Leaves staggered along the stem, like a little sprig */}
            <g fill="currentColor">
              <path d="M24 7 Q26 2 31 1 Q30 6 24 7 Z" />
              <path d="M27 7 Q29 12 34 13 Q33 8 27 7 Z" />
              <path d="M30 7 Q33 3 38 2 Q36 7 30 7 Z" />
            </g>
          </svg>
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
