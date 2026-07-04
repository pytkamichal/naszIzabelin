import { getVisibleNeighborRequests } from "@/lib/neighborHelp";
import { neighborKindLabels, type NeighborRequest } from "@/data/neighborHelp";
import { formatShortDatePL } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";
import { NeighborHelpForm } from "./NeighborHelpForm";

function telHref(contact: string): string | null {
  // Offer a tel: link when the contact looks like a phone number.
  const digits = contact.replace(/[\s()-]/g, "");
  return /^\+?\d{6,}$/.test(digits) ? `tel:${digits}` : null;
}

function RequestCard({ request }: { request: NeighborRequest }) {
  const { label, icon } = neighborKindLabels[request.kind];
  const offer = request.kind === "offer";
  const contactHref = request.contact ? telHref(request.contact) : null;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ring-1 ring-inset ${
            offer
              ? "bg-pine-100 text-pine-800 ring-pine-600/25"
              : "bg-gold-300/40 text-gold-600 ring-gold-500/30"
          }`}
        >
          <span aria-hidden>{icon}</span>
          {label}
        </span>
        <time className="text-xs text-ink/45">
          {formatShortDatePL(request.created_at.slice(0, 10))}
        </time>
      </div>

      <p className="mt-4 flex-1 leading-relaxed text-ink/80">
        {request.message}
      </p>

      {(request.name || request.contact) && (
        <div className="mt-5 border-t border-ink/10 pt-4 text-sm">
          {request.name ? (
            <p className="font-serif text-lg font-semibold tracking-tight text-pine-900">
              {request.name}
            </p>
          ) : null}
          {request.contact ? (
            contactHref ? (
              <a
                href={contactHref}
                className="font-semibold text-pine-700 underline-offset-2 hover:underline"
              >
                {request.contact}
              </a>
            ) : (
              <p className="text-ink/70">{request.contact}</p>
            )
          ) : null}
        </div>
      )}
    </article>
  );
}

export async function NeighborHelp() {
  const requests = await getVisibleNeighborRequests();

  return (
    <section id="sasiedzka-pomoc" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="09"
          eyebrow="Wspólnota"
          title="Sąsiedzka pomoc"
          description="Zaoferuj pomoc sąsiadom albo poproś o wsparcie — od podwiezienia, przez pożyczenie narzędzi, po opiekę nad zwierzętami. Dobre sąsiedztwo zaczyna się od małych gestów."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* Approved board */}
          <div>
            {requests.length === 0 ? (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-3xl border border-dashed border-ink/20 bg-sand/60 p-8 text-center">
                <p className="text-4xl" aria-hidden>
                  🌻
                </p>
                <p className="mt-3 max-w-sm text-ink/70">
                  Nie ma jeszcze żadnych zgłoszeń. Bądź pierwszą osobą, która
                  zaoferuje lub poprosi o sąsiedzką pomoc!
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {requests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </div>

          {/* Submission form */}
          <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-md shadow-pine-900/5">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-pine-900">
              Dodaj zgłoszenie
            </h3>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-ink/65">
              Napisz krótko, w czym możesz pomóc lub czego potrzebujesz. Każde
              zgłoszenie sprawdza administrator, zanim trafi na tablicę — dzięki
              temu unikamy spamu i nieporozumień.
            </p>
            <NeighborHelpForm />
          </div>
        </div>
      </div>
    </section>
  );
}
