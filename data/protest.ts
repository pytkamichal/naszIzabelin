// Content for the "Strefa 6SP" protest section.
// All user-facing strings are Polish on purpose; code/comments are English.
// NOTE: copy below is a researched draft about the "plan ogólny" / "strefa SP"
// (production zone). Verify local specifics (gmina, exact location, consultation
// dates) against the official documents before publishing.

export const protest = {
  // Label used in the header alert button and nav.
  navLabel: "STOP STREFIE 6SP!",
  // Compact label for the tightest phone widths (keeps the button from
  // crowding out the logo and the » menu).
  navLabelShort: "STOP 6SP!",

  heading: "STOP WYSYPISKU ŚMIECI W NASZYM LESIE!",

  // Short punchy intro shown under the heading.
  lead: "Projekt planu ogólnego gminy przewiduje strefę produkcyjną „6.SP” tuż przy naszym lesie. To realne zagrożenie wysypiskiem śmieci, smrodem i hałasem. Nie pozwólmy na to!",

  // Explainer: what the "plan ogólny" is and why it matters to everyone.
  planOgolny: {
    title:
      "Plan ogólny — dokument, który zdecyduje o Twojej działce, domu i sąsiedztwie",
    paragraphs: [
      "Gmina przygotowuje plan ogólny — nowy, obowiązkowy dokument planistyczny, który zastępuje dotychczasowe studium. To on przesądzi, jak nasza okolica będzie wyglądać przez najbliższe lata.",
      "Plan ogólny dzieli całą gminę na strefy planistyczne i ustala zasady zabudowy dla każdej działki. Dotyczy więc wprost Twojego domu, Twojej działki i Twojego najbliższego sąsiedztwa.",
    ],
    // "The plan ogólny decides:"
    decides: [
      "Co i gdzie wolno wybudować na poszczególnych działkach.",
      "Gdzie powstaną tereny produkcyjne, usługowe, mieszkaniowe i zielone.",
      "Jak zmieni się najbliższe otoczenie Twojego domu.",
    ],
  },

  // The specific threat: the "6.SP" production zone.
  threat: {
    title: "Czym jest strefa „6.SP”?",
    paragraphs: [
      "Symbol „SP” w planie ogólnym oznacza strefę produkcyjną. Projekt planu przewiduje taką strefę („6.SP”) w bezpośrednim sąsiedztwie naszego lasu i domów.",
      "Otwiera to drogę do uciążliwej działalności — w tym składowania i przetwarzania odpadów — tuż obok terenów, na których mieszkamy i odpoczywamy.",
    ],
    consequences: [
      "🗑️ Ryzyko wysypiska i przetwarzania odpadów przy samym lesie.",
      "🌫️ Smród, hałas i zanieczyszczenie powietrza.",
      "🌳 Zniszczenie „zielonych płuc” naszej okolicy.",
      "📉 Spadek wartości naszych działek i domów.",
    ],
  },

  // Call to action — what residents can do.
  cta: {
    title: "Co możesz zrobić?",
    points: [
      "📝 Podpisz petycję przeciwko strefie 6.SP.",
      "🗳️ Złóż uwagę do projektu planu ogólnego w urzędzie gminy.",
      "📅 Przyjdź na spotkanie mieszkańców.",
      "📣 Udostępniaj informacje i powiedz o tym sąsiadom.",
    ],
  },

  meeting: {
    date: "2026-06-25",
    time: "18:00",
    place: "pod świetlicą",
    title: "Spotkanie mieszkańców",
    // Set to false once this is a confirmed, real meeting. While true the
    // section shows a clear "test / example event" warning instead of a
    // countdown, so nobody mistakes it for a genuine date.
    isExample: true,
  },

  // Paste the Facebook video URL here (e.g. https://www.facebook.com/.../videos/123...).
  // Empty value renders a placeholder.
  facebookVideoUrl: "",
  facebookCaption: "Podsumowanie sesji rady gminy dotyczącej strefy 6SP",

  // Source / "read more" link.
  sourceUrl:
    "https://www.facebook.com/SzkielkoJakubow/posts/122202782438339737/",
  sourceLabel: "Szkiełko Jakubów — Facebook",
};
