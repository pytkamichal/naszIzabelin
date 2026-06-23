// Nearby interesting places for kids, culture, and nature around Jakubów, miński, Mazowieckie

export type Place = {
  name: string;
  category: "kids" | "culture" | "nature";
  icon: string;
  description: string;
  distance?: string;
  image?: string;
};

export const nearbyPlaces: Place[] = [
  {
    name: "Mińsk Mazowiecki - Muzeum Historii",
    category: "culture",
    icon: "🏛️",
    description:
      "Muzeum poświęcone historii miasta i regionu mińskiego. Kolekcja eksponatów dokumentujących życie mieszkańców od średniowiecza do współczesności.",
    distance: "~10 km",
  },
  {
    name: "Park Miejski w Mińsku Mazowieckim",
    category: "nature",
    icon: "🌳",
    description:
      "Piękny zabytkowy park z drzewami, alejkami spacerowymi i ławkami do odpoczynku. Idealne miejsce na wycieczkę rodzinną.",
    distance: "~10 km",
  },
  {
    name: "Jezioro Łabie",
    category: "nature",
    icon: "🏞️",
    description:
      "Naturalne jezioro otoczone lasami i łąkami. Świetne miejsce do obserwacji ptaków i przyrody, idealne na przechadzki.",
    distance: "~15 km",
  },
  {
    name: "Kościół Piotra i Pawła w Mińsku Mazowieckim",
    category: "culture",
    icon: "⛪",
    description:
      "Zabytkowy kościół z XVI wieku. Piękna architektura i bogate wyposażenie wnętrza. Ważny punkt orientacyjny miasta.",
    distance: "~10 km",
  },
  {
    name: "Biblioteka Publiczna Gminy Jakubów",
    category: "kids",
    icon: "📚",
    description:
      "Biblioteka oferująca bogatą kolekcję książek dla dzieci i dorosłych. Organizuje lekcje biblioteczne i spotkania edukacyjne.",
    distance: "~3 km",
  },
  {
    name: "Ścieżki rowerowe nad Narwią",
    category: "nature",
    icon: "🚴",
    description:
      "Piękne ścieżki rowerowe wzdłuż rzeki Narwi. Idealne dla amatorów wycieczek na rowerze i obserwacji przyrody.",
    distance: "~8 km",
  },
  {
    name: "Plac zabaw w Jakubowie",
    category: "kids",
    icon: "🎪",
    description:
      "Nowoczesny plac zabaw z rozmaicie urządzeniami dla dzieci. Bezpieczne miejsce do zabawy na świeżym powietrzu.",
    distance: "~3 km",
  },
  {
    name: "Rezerwat 'Radzanów'",
    category: "nature",
    icon: "🦅",
    description:
      "Przyrodni rezerwat chronujący cenny ekosystem. Doskonałe miejsce do obserwacji ptaków i zrozumienia ochrony przyrody.",
    distance: "~20 km",
  },
  {
    name: "Sala zabaw w Mińsku Mazowieckim",
    category: "kids",
    icon: "🎠",
    description:
      "Kryta sala zabaw z dmuchańcami, zjeżdżalniami i strefą malucha. Idealna na deszczowe dni oraz na urodziny i imprezy dla dzieci.",
    distance: "~10 km",
  },
  {
    name: "Mini ZOO w okolicy",
    category: "kids",
    icon: "🦓",
    description:
      "Niewielki ogród zoologiczny z domowymi i egzotycznymi zwierzętami. Dzieci mogą z bliska poznać, a często też nakarmić zwierzęta.",
    distance: "~15 km",
  },
  {
    name: "Stodoła Alpaki w Jędrzejowie",
    category: "kids",
    icon: "🦙",
    description:
      "Hodowla sympatycznych alpak. Można poznać te łagodne zwierzęta, wybrać się z nimi na spacer i spędzić czas na łonie natury.",
    distance: "~15 km",
  },
];
