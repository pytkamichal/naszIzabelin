"use client";

import { useState } from "react";
import { nearbyPlaces, type Place } from "@/data/places";
import { SectionHeading } from "./ui/SectionHeading";

type Category = "kids" | "culture" | "nature";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "kids", label: "Dla dzieci", emoji: "👶" },
  { id: "culture", label: "Kultura", emoji: "🏛️" },
  { id: "nature", label: "Przyroda", emoji: "🌲" },
];

export function Places() {
  const [selected, setSelected] = useState<Category>("nature");

  const filtered = nearbyPlaces.filter((place) => place.category === selected);

  return (
    <section id="miejsca" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Atrakcje okolicy"
          icon="📍"
          title="Ciekawe miejsca w pobliżu"
        />

        <div className="mb-8 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                selected === cat.id
                  ? "bg-brand-600 text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place) => (
            <PlaceCard key={place.name} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {place.icon}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{place.name}</h3>
        {place.distance && (
          <p className="text-xs text-slate-500">{place.distance}</p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {place.description}
        </p>
      </div>
    </div>
  );
}
