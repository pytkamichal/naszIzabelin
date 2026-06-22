// Editorial graphic for the "Strefa 6SP" section: a healthy forest on the left
// threatened by a production zone on the right (smokestacks, toxic smog, waste
// drums and a "6.SP" hazard sign). Palette matches the section: graphite +
// toxic yellow-green + blood red. Decorative only (aria-hidden).

type Props = { className?: string };

export function Zone6SP({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 440"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="z6-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16191f" />
          <stop offset="100%" stopColor="#0d0f12" />
        </linearGradient>
        <radialGradient id="z6-toxic" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#c4dd00" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c4dd00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="z6-blood" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d11f2a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#d11f2a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="z6-smoke" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c4dd00" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#c4dd00" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background + colored hazes */}
      <rect width="1440" height="440" fill="url(#z6-bg)" />
      <ellipse cx="820" cy="150" rx="520" ry="240" fill="url(#z6-toxic)" />
      <ellipse cx="1080" cy="300" rx="360" ry="200" fill="url(#z6-blood)" />

      {/* Toxic smog drifting left toward the forest */}
      <g fill="#c4dd00" opacity="0.10">
        <ellipse cx="560" cy="150" rx="180" ry="60" />
        <ellipse cx="430" cy="190" rx="150" ry="52" />
        <ellipse cx="700" cy="120" rx="170" ry="58" />
      </g>

      {/* Ground */}
      <rect y="360" width="1440" height="80" fill="#0a0c0f" />
      <rect y="356" width="1440" height="6" fill="#23272e" />

      {/* ---- Forest (left), healthy but in shadow ---- */}
      <g>
        {[
          { x: 90, h: 150, w: 70 },
          { x: 175, h: 195, w: 86 },
          { x: 268, h: 165, w: 76 },
          { x: 350, h: 210, w: 92 },
        ].map((t) => (
          <g key={t.x}>
            <rect
              x={t.x - 7}
              y={360 - t.h * 0.18}
              width="14"
              height={t.h * 0.18}
              fill="#2a2118"
            />
            <polygon
              points={`${t.x},${360 - t.h} ${t.x + t.w / 2},${360 - t.h * 0.16} ${t.x - t.w / 2},${360 - t.h * 0.16}`}
              fill="#1f3f2c"
            />
            <polygon
              points={`${t.x},${360 - t.h + 18} ${t.x + t.w / 2.4},${360 - t.h * 0.42} ${t.x - t.w / 2.4},${360 - t.h * 0.42}`}
              fill="#284f38"
            />
          </g>
        ))}
      </g>

      {/* Chain-link fence at the boundary */}
      <g stroke="#3a3f48" strokeWidth="3" opacity="0.9">
        <line x1="452" y1="250" x2="452" y2="360" />
        <line x1="560" y1="250" x2="560" y2="360" />
        <line x1="452" y1="250" x2="560" y2="250" />
        <g stroke="#2c3037" strokeWidth="1.5" opacity="0.8">
          <line x1="452" y1="260" x2="560" y2="320" />
          <line x1="452" y1="290" x2="560" y2="350" />
          <line x1="452" y1="320" x2="540" y2="360" />
          <line x1="560" y1="260" x2="452" y2="320" />
          <line x1="560" y1="290" x2="452" y2="350" />
        </g>
      </g>

      {/* ---- Production zone (right) ---- */}
      {/* Factory block */}
      <rect x="600" y="250" width="300" height="110" fill="#1b1f25" />
      <rect x="600" y="250" width="300" height="8" fill="#2a2f38" />
      {/* sawtooth roof */}
      <g fill="#22272f">
        <polygon points="610,250 650,224 650,250" />
        <polygon points="670,250 710,224 710,250" />
        <polygon points="730,250 770,224 770,250" />
        <polygon points="790,250 830,224 830,250" />
        <polygon points="850,250 890,224 890,250" />
      </g>
      {/* lit windows */}
      <g fill="#c4dd00" opacity="0.55">
        <rect x="624" y="300" width="18" height="22" />
        <rect x="664" y="300" width="18" height="22" />
        <rect x="820" y="300" width="18" height="22" />
        <rect x="860" y="300" width="18" height="22" />
      </g>

      {/* Smokestacks + plumes */}
      {[640, 720].map((cx, i) => (
        <g key={cx}>
          <rect x={cx} y={150 - i * 20} width="34" height={210 + i * 20} fill="#23272e" />
          <rect x={cx} y={150 - i * 20} width="34" height="14" fill="#d11f2a" opacity="0.8" />
          <path
            d={`M${cx + 17},${150 - i * 20} C${cx - 40},${90 - i * 20} ${cx + 70},${60 - i * 20} ${cx + 6},${10} L${cx + 28},${10} C${cx + 90},${60 - i * 20} ${cx - 18},${90 - i * 20} ${cx + 17},${150 - i * 20} Z`}
            fill="url(#z6-smoke)"
          />
          <g fill="#c4dd00" opacity="0.22">
            <circle cx={cx + 17} cy={120 - i * 20} r="26" />
            <circle cx={cx - 4} cy={96 - i * 20} r="22" />
            <circle cx={cx + 36} cy={92 - i * 20} r="20" />
          </g>
        </g>
      ))}

      {/* Waste pile + drums */}
      <path d="M980,360 Q1080,288 1200,360 Z" fill="#171b20" />
      <g>
        {/* scattered trash */}
        <rect x="1010" y="330" width="22" height="18" fill="#3a4049" transform="rotate(-12 1021 339)" />
        <rect x="1060" y="316" width="20" height="20" fill="#2c3138" transform="rotate(8 1070 326)" />
        <rect x="1120" y="332" width="24" height="16" fill="#444b54" transform="rotate(-6 1132 340)" />
        <rect x="1150" y="320" width="18" height="18" fill="#30353c" transform="rotate(14 1159 329)" />
      </g>
      {/* hazard drums */}
      {[1230, 1280].map((x) => (
        <g key={x}>
          <rect x={x} y="312" width="40" height="48" rx="4" fill="#2a2f38" />
          <rect x={x} y="324" width="40" height="8" fill="#c4dd00" opacity="0.85" />
          <rect x={x} y="344" width="40" height="6" fill="#c4dd00" opacity="0.5" />
          <text
            x={x + 20}
            y="342"
            textAnchor="middle"
            fontSize="16"
            fill="#0d0f12"
            fontWeight="700"
          >
            ☣
          </text>
        </g>
      ))}

      {/* ---- "6.SP" hazard sign (focal point) ---- */}
      <g>
        <rect x="498" y="196" width="9" height="164" fill="#3a3f48" />
        <g transform="rotate(45 502 150)">
          <rect x="446" y="94" width="112" height="112" rx="10" fill="#e4ff1a" stroke="#0d0f12" strokeWidth="6" />
        </g>
        <text x="502" y="142" textAnchor="middle" fontSize="22" fill="#0d0f12" fontWeight="800">
          ⚠
        </text>
        <text x="502" y="176" textAnchor="middle" fontSize="34" fill="#0d0f12" fontWeight="900" letterSpacing="1">
          6.SP
        </text>
      </g>

      {/* Hazard tape along the bottom */}
      <g>
        <rect y="424" width="1440" height="16" fill="#e4ff1a" />
        <g fill="#0d0f12">
          {Array.from({ length: 30 }).map((_, i) => (
            <polygon
              key={i}
              points={`${i * 48},424 ${i * 48 + 24},424 ${i * 48},440`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
