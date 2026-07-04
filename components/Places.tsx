"use client";

import { useState } from "react";
import { nearbyPlaces, type Place } from "@/data/places";
import { infrastructure, type Amenity } from "@/data/infrastructure";
import { SectionHeading } from "./ui/SectionHeading";
import { Icon } from "./ui/Icon";

type Category = "infrastructure" | "kids" | "culture" | "nature";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "infrastructure", label: "Infrastruktura", emoji: "🏪" },
  { id: "kids", label: "Dla dzieci", emoji: "👶" },
  { id: "culture", label: "Kultura", emoji: "🏛️" },
  { id: "nature", label: "Przyroda", emoji: "🌲" },
];

export function Places() {
  const [selected, setSelected] = useState<Category>("infrastructure");

  const filtered = nearbyPlaces.filter((place) => place.category === selected);

  return (
    <section id="miejsca" className="bg-sand py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="03"
          eyebrow="Wokół Izabelina"
          title="W okolicy"
          description="Udogodnienia, atrakcje i miejsca warte odwiedzenia w pobliżu naszej wsi."
        />

        <div className="mb-10 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                selected === cat.id
                  ? "bg-pine-900 text-cream shadow-lg shadow-pine-900/25"
                  : "border border-ink/15 bg-cream text-ink/70 hover:border-pine-500/50 hover:text-pine-800"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {selected === "infrastructure" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item) => (
              <AmenityCard key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place) => (
              <PlaceCard key={place.name} place={place} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-xl hover:shadow-pine-900/10">
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-pine-100 to-sand">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {place.icon}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold tracking-tight text-pine-900">
          {place.name}
        </h3>
        {place.distance && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-ink/50">
            <Icon name="map-pin" className="h-3.5 w-3.5 text-gold-500" />
            {place.distance}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {place.description}
        </p>
      </div>
    </div>
  );
}

function AmenityCard({ item }: { item: Amenity }) {
  return (
    <div className="group flex items-start gap-4 rounded-3xl border border-ink/10 bg-cream p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl hover:shadow-pine-900/10">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pine-100 to-gold-300/50 text-pine-600 ring-1 ring-pine-600/10 transition-transform duration-300 group-hover:scale-105">
        <Icon name={item.icon} className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-serif text-xl font-semibold tracking-tight text-pine-900">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
          {item.description}
        </p>
      </div>
    </div>
  );
}
