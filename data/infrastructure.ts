// Everyday amenities and public services in nearby Jakubów (the gmina centre,
// a few kilometres from Izabelin). Icons map to names in components/ui/Icon.tsx.

import type { IconName } from "@/components/ui/Icon";

export type Amenity = {
  name: string;
  icon: IconName;
  description: string;
};

export const infrastructure: Amenity[] = [
  {
    name: "Szkoła Podstawowa",
    icon: "school",
    description:
      "Najbliższa placówka oświatowa dla dzieci z Izabelina i okolicznych wsi.",
  },
  {
    name: "Urząd Gminy Jakubów",
    icon: "building",
    description:
      "Siedziba władz gminy — sprawy administracyjne, meldunkowe i urzędowe.",
  },
  {
    name: "Kościół parafialny",
    icon: "church",
    description:
      "Msze święte, nabożeństwa i życie wspólnoty lokalnej w Jakubowie.",
  },
  {
    name: "Apteka",
    icon: "pharmacy",
    description:
      "Leki, środki opatrunkowe i podstawowa pomoc farmaceutyczna pod ręką.",
  },
  {
    name: "Poczta",
    icon: "mail",
    description:
      "Placówka pocztowa — przesyłki, listy oraz usługi finansowe i kurierskie.",
  },
  {
    name: "Delikatesy",
    icon: "store",
    description:
      "Lokalny sklep spożywczy z podstawowymi produktami na co dzień.",
  },
  {
    name: "Żabka",
    icon: "store",
    description:
      "Sklep typu convenience czynny do późna — szybkie zakupy i przekąski.",
  },
  {
    name: "Dino",
    icon: "cart",
    description:
      "Market spożywczy z szerszym wyborem produktów i artykułów codziennego użytku.",
  },
  {
    name: "Sklep budowlany",
    icon: "tools",
    description:
      "Materiały budowlane, narzędzia oraz artykuły do domu i ogrodu.",
  },
];
