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
    <section id="miejsca" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Wokół Izabelina"
          title="W okolicy"
          description="Udogodnienia, atrakcje i miejsca warte odwiedzenia w pobliżu naszej wsi."
        />

        <div className="mb-8 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                selected === cat.id
                  ? "bg-brand-700 text-white shadow-sm"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {selected === "infrastructure" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item) => (
              <AmenityCard key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-105">
          {place.icon}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-slate-900">
          {place.name}
        </h3>
        {place.distance && (
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <Icon name="map-pin" className="h-3.5 w-3.5 text-brand-500" />
            {place.distance}
          </p>
        )}
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
          {place.description}
        </p>
      </div>
    </div>
  );
}

function AmenityCard({ item }: { item: Amenity }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon name={item.icon} className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-serif text-lg font-semibold text-slate-900">
          {item.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}
