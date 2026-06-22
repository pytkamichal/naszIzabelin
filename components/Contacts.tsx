import { contacts } from "@/data/contacts";
import { SectionHeading } from "./ui/SectionHeading";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function Contacts() {
  return (
    <section id="kontakty" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Pomoc i usługi"
          icon="📇"
          title="Przydatne kontakty"
          description="Najważniejsze numery i usługi dla mieszkańców."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.role}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-2xl"
                aria-hidden
              >
                {contact.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  {contact.role}
                </p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {contact.name}
                </p>
                {contact.phone ? (
                  <a
                    href={telHref(contact.phone)}
                    className="mt-1 inline-block text-slate-600 underline-offset-2 hover:text-brand-700 hover:underline"
                  >
                    {contact.phone}
                  </a>
                ) : null}
                {contact.note ? (
                  <p className="mt-1 text-sm text-slate-600">{contact.note}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
