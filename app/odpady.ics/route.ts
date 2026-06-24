import { buildCalendar, type IcsEvent } from "@/lib/ics";
import { wasteEvents, wasteKindLabels, wastePutOutBy } from "@/data/waste";

// The schedule is static source data, so this feed can be prerendered/cached.
export const dynamic = "force-static";

export function GET() {
  const events: IcsEvent[] = wasteEvents.map((e) => {
    const { icon, label } = wasteKindLabels[e.kind];
    return {
      uid: `waste-${e.date}-${e.kind}@nasz-izabelin`,
      date: e.date,
      title: `${icon} ${label}`,
      description:
        e.kind === "bags"
          ? `Wystaw worki sprzed nieruchomości w dniu odbioru do godziny ${wastePutOutBy}.`
          : undefined,
      // Remind at 18:00 the day before each collection.
      reminderHoursBefore: 6,
    };
  });

  const body = buildCalendar({
    name: "Wywóz śmieci — Izabelin",
    events,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="odpady-izabelin.ics"',
    },
  });
}
