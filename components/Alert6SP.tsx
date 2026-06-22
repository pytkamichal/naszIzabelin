import { protest } from "@/data/protest";
import { documents } from "@/data/documents";
import { formatDayMonthPL } from "@/lib/format";
import { FacebookEmbed } from "./FacebookEmbed";
import { Zone6SP } from "./illustrations/Zone6SP";

// Grainy "smog" texture (SVG feTurbulence) as a data URI.
const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Alert6SP() {
  const { meeting, planOgolny, threat, cta } = protest;

  return (
    <section
      id="strefa-6sp"
      className="relative isolate overflow-hidden bg-graphite text-zinc-200"
    >
      {/* Drifting smog (colored hazes) */}
      <div
        aria-hidden
        className="smog-layer pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 18% 0%, rgba(196,221,0,0.12), transparent 70%), radial-gradient(45% 40% at 88% 12%, rgba(209,31,42,0.14), transparent 70%), radial-gradient(80% 70% at 50% 115%, rgba(0,0,0,0.65), transparent 70%)",
          animation: "smog-drift 18s ease-in-out infinite",
        }}
      />
      {/* Grain / grit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE_URI }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20">
        <span className="inline-flex items-center gap-2 rounded border border-toxic/40 bg-toxic/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-toxic">
          ⚠️ Alarm dla mieszkańców
        </span>

        <h2 className="mt-5 max-w-4xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-toxic-bright drop-shadow-[0_2px_12px_rgba(196,221,0,0.25)] sm:text-4xl lg:text-5xl">
          {protest.heading}
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-200">
          {protest.lead}
        </p>

        {/* Graphic banner */}
        <div className="mt-10 overflow-hidden rounded-xl border border-graphite-600 shadow-lg ring-1 ring-black/40">
          <Zone6SP className="h-44 w-full sm:h-56 lg:h-64" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Left column: plan ogólny + threat */}
          <div className="space-y-8">
            <article className="rounded-xl border border-graphite-600 bg-graphite-800 p-6">
              <h3 className="text-xl font-bold leading-snug text-toxic-bright">
                {planOgolny.title}
              </h3>
              {planOgolny.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-zinc-300">
                  {paragraph}
                </p>
              ))}
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                Plan ogólny przesądza o:
              </p>
              <ul className="mt-2 space-y-2">
                {planOgolny.decides.map((item) => (
                  <li key={item} className="flex gap-2 text-zinc-300">
                    <span className="text-toxic" aria-hidden>
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-graphite-600 border-l-4 border-l-blood bg-graphite-800 p-6">
              <h3 className="text-xl font-bold text-white">{threat.title}</h3>
              {threat.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-zinc-300">
                  {paragraph}
                </p>
              ))}
              <ul className="mt-4 space-y-2">
                {threat.consequences.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-graphite-700 px-3 py-2 text-zinc-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Right column: documents + meeting + call to action */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Dokumenty do pobrania
              </h3>
              <ul className="mt-4 space-y-3">
                {documents.map((doc) => (
                  <li key={doc.href}>
                    <a
                      href={doc.href}
                      download
                      className="group flex items-center gap-3 rounded-lg border border-graphite-600 bg-graphite-800 p-4 transition hover:border-toxic/60 hover:bg-graphite-700"
                    >
                      <span className="text-2xl" aria-hidden>
                        📄
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-zinc-100 group-hover:text-toxic-bright">
                          {doc.label}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-zinc-500">
                          Pobierz ({doc.type})
                        </span>
                      </span>
                      <span
                        className="rounded bg-graphite-600 px-2 py-1 text-[11px] font-bold text-zinc-300"
                        aria-hidden
                      >
                        ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border-l-4 border-blood bg-graphite-800 p-5">
              <p className="text-sm font-bold uppercase tracking-wider text-blood">
                Ważne wydarzenie
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-100">
                📅 {meeting.title}: {formatDayMonthPL(meeting.date)}, godz.{" "}
                {meeting.time} {meeting.place}.
              </p>
            </div>

            <div className="rounded-xl border border-toxic/30 bg-toxic/5 p-6">
              <h3 className="text-lg font-bold text-toxic-bright">{cta.title}</h3>
              <ul className="mt-3 space-y-2">
                {cta.points.map((point) => (
                  <li key={point} className="text-zinc-200">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Nagranie z sesji rady gminy
          </h3>
          <div className="mx-auto mt-4 max-w-3xl">
            <FacebookEmbed
              url={protest.facebookVideoUrl}
              caption={protest.facebookCaption}
            />
          </div>
        </div>

        {/* Source */}
        <p className="mt-8 text-sm text-zinc-500">
          Źródło i więcej informacji:{" "}
          <a
            href={protest.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-toxic underline underline-offset-2 hover:text-toxic-bright"
          >
            {protest.sourceLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
