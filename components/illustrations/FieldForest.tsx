// Peaceful golden-hour scene: an open field with a forest treeline on the
// horizon. Used as the hero background. Darker foreground keeps overlaid
// white text readable. Decorative only (aria-hidden).

type Props = { className?: string };

export function FieldForest({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ff-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9d4e6" />
          <stop offset="45%" stopColor="#e6dcc4" />
          <stop offset="72%" stopColor="#f4d8a4" />
          <stop offset="100%" stopColor="#f6cd90" />
        </linearGradient>
        <radialGradient id="ff-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff5da" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#ffe7ad" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffe7ad" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ff-field" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ea85b" />
          <stop offset="55%" stopColor="#517d3c" />
          <stop offset="100%" stopColor="#2f4f27" />
        </linearGradient>
        <linearGradient id="ff-scrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1f14" stopOpacity="0" />
          <stop offset="100%" stopColor="#0c1f14" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Sky + sun */}
      <rect width="1440" height="760" fill="url(#ff-sky)" />
      <circle cx="1050" cy="250" r="330" fill="url(#ff-sun)" />
      <circle cx="1050" cy="250" r="58" fill="#fff3cf" opacity="0.9" />

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.45">
        <ellipse cx="300" cy="170" rx="120" ry="24" />
        <ellipse cx="372" cy="152" rx="78" ry="18" />
        <ellipse cx="780" cy="120" rx="150" ry="22" />
      </g>

      {/* Birds */}
      <g stroke="#5b6b63" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55">
        <path d="M560 210 q12 -10 24 0 q12 -10 24 0" />
        <path d="M652 238 q9 -8 18 0 q9 -8 18 0" />
        <path d="M512 248 q8 -7 16 0 q8 -7 16 0" />
      </g>

      {/* Far treeline */}
      <path
        d="M0,442 Q120,420 240,434 T480,432 T720,426 T960,434 T1200,424 T1440,432 L1440,540 L0,540 Z"
        fill="#3f6f53"
        opacity="0.8"
      />

      {/* Near forest band */}
      <path
        d="M0,476 Q90,458 180,472 T360,470 T540,476 T720,466 T900,476 T1080,468 T1260,476 T1440,468 L1440,580 L0,580 Z"
        fill="#2b5640"
      />

      {/* A few conifer silhouettes for "forest" texture */}
      <g fill="#234b36">
        <polygon points="150,452 176,500 124,500" />
        <polygon points="150,432 172,472 128,472" />
        <polygon points="470,458 498,508 442,508" />
        <polygon points="470,436 492,478 448,478" />
        <polygon points="980,456 1008,506 952,506" />
        <polygon points="980,434 1002,476 958,476" />
        <polygon points="1230,460 1256,508 1204,508" />
      </g>

      {/* Field */}
      <path
        d="M0,506 Q360,476 720,502 T1440,498 L1440,760 L0,760 Z"
        fill="url(#ff-field)"
      />
      {/* Furrows (perspective) */}
      <g stroke="#3d6130" strokeWidth="2" opacity="0.45">
        <path d="M716 524 L260 760" />
        <path d="M736 524 L600 760" />
        <path d="M760 524 L1000 760" />
        <path d="M784 524 L1360 760" />
      </g>

      {/* Foreground scrim for text contrast */}
      <rect y="360" width="1440" height="400" fill="url(#ff-scrim)" />
    </svg>
  );
}
