type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  icon?: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  icon,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {icon ? <span className="mr-2">{icon}</span> : null}
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
