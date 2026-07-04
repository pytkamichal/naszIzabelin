import { contacts } from "@/data/contacts";
import { SectionHeading } from "./ui/SectionHeading";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function Contacts() {
  return (
    <section id="kontakty" className="bg-sand py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="08"
          eyebrow="Pomoc i usługi"
          icon="📇"
          title="Przydatne kontakty"
          description="Najważniejsze numery i usługi dla mieszkańców."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.role}
              className="flex gap-4 rounded-3xl border border-ink/10 bg-cream p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl hover:shadow-pine-900/10"
            >
              <div
                className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-pine-100 text-2xl ring-1 ring-pine-900/10"
                aria-hidden
              >
                {contact.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-600">
                  {contact.role}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold tracking-tight text-pine-900">
                  {contact.name}
                </p>
                {contact.phone ? (
                  <a
                    href={telHref(contact.phone)}
                    className="mt-1 inline-block font-semibold text-ink/70 underline-offset-2 hover:text-pine-700 hover:underline"
                  >
                    {contact.phone}
                  </a>
                ) : null}
                {contact.note ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                    {contact.note}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
