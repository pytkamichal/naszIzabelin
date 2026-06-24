import { buildCalendar, type IcsEvent } from "@/lib/ics";
import { calendarEvents } from "@/data/calendar";
import { wasteEvents, wasteKindLabels, wastePutOutBy } from "@/data/waste";

// Full village calendar: events + the waste schedule, all with reminders.
export const dynamic = "force-static";

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function GET() {
  const events: IcsEvent[] = [
    ...calendarEvents.map((e) => ({
      uid: `event-${e.date}-${slug(e.title)}@nasz-izabelin`,
      date: e.date,
      title: `${e.icon} ${e.title}`,
      reminderHoursBefore: 6,
    })),
    ...wasteEvents.map((e) => {
      const { icon, label } = wasteKindLabels[e.kind];
      return {
        uid: `waste-${e.date}-${e.kind}@nasz-izabelin`,
        date: e.date,
        title: `${icon} ${label}`,
        description:
          e.kind === "bags"
            ? `Wystaw worki sprzed nieruchomości w dniu odbioru do godziny ${wastePutOutBy}.`
            : undefined,
        reminderHoursBefore: 6,
      };
    }),
  ];

  const body = buildCalendar({
    name: "Kalendarz wsi Izabelin",
    events,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="kalendarz-izabelin.ics"',
    },
  });
}
