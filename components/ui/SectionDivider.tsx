// Organic "rolling fields" transition between two page sections. Drawn wide
// (2880) with `slice` so hills and trees keep their shape on any screen —
// the sides crop instead of stretching.

type SectionDividerProps = {
  /** Background of the section above (fills the divider band). */
  from: string;
  /** Background of the section below (the hills rise in this color). */
  to: string;
  /** Sprinkle a few conifer silhouettes along the crest. */
  trees?: boolean;
  className?: string;
};

export function SectionDivider({
  from,
  to,
  trees = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={`relative -mb-px h-16 w-full sm:h-20 ${className ?? ""}`}
      style={{ backgroundColor: from }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 2880 120"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faint back hill for depth */}
        <path
          d="M0,78 Q360,38 720,64 T1440,52 T2160,66 T2880,48 L2880,120 L0,120 Z"
          fill={to}
          opacity="0.45"
        />
        {trees ? (
          <g fill={to} opacity="0.55">
            <polygon points="430,66 452,104 408,104" />
            <polygon points="430,50 448,84 412,84" />
            <polygon points="1180,58 1204,98 1156,98" />
            <polygon points="1180,42 1200,76 1160,76" />
            <polygon points="1930,64 1952,102 1908,102" />
            <polygon points="2520,56 2544,96 2496,96" />
            <polygon points="2520,40 2540,74 2500,74" />
          </g>
        ) : null}
        {/* Main hill line — the color of the next section */}
        <path
          d="M0,96 Q360,60 720,84 T1440,74 T2160,88 T2880,70 L2880,120 L0,120 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
