"use client";

import { useState } from "react";
import { useActionState } from "react";
import {
  submitNeighborRequest,
  type NeighborRequestState,
} from "@/app/actions/submitNeighborRequest";
import { neighborKinds, neighborKindLabels } from "@/data/neighborHelp";

const initialState: NeighborRequestState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/30";

export function NeighborHelpForm() {
  const [state, formAction, pending] = useActionState(
    submitNeighborRequest,
    initialState,
  );
  // Controlled so the hidden `kind` field always submits a value and the
  // segmented control shows the active choice.
  const [kind, setKind] = useState<(typeof neighborKinds)[number]>("offer");

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-pine-600/25 bg-pine-50 p-6 text-center">
        <p className="text-3xl" aria-hidden>
          ⏳
        </p>
        <p className="mt-3 font-semibold text-pine-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot — hidden field for bots */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Nie wypełniaj tego pola
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Kind: offer vs need */}
      <input type="hidden" name="kind" value={kind} />
      <div
        role="radiogroup"
        aria-label="Rodzaj zgłoszenia"
        className="grid grid-cols-2 gap-2"
      >
        {neighborKinds.map((k) => {
          const active = kind === k;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setKind(k)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                active
                  ? "border-pine-700 bg-pine-900 text-cream shadow-sm"
                  : "border-ink/15 bg-cream text-ink/70 hover:border-pine-500/50 hover:text-pine-800"
              }`}
            >
              <span aria-hidden>{neighborKindLabels[k].icon}</span>
              {neighborKindLabels[k].label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nh-name" className="sr-only">
            Imię (opcjonalnie)
          </label>
          <input
            id="nh-name"
            name="name"
            type="text"
            placeholder="Imię (opcjonalnie)"
            maxLength={120}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="nh-contact" className="sr-only">
            Kontakt — telefon lub Messenger (opcjonalnie)
          </label>
          <input
            id="nh-contact"
            name="contact"
            type="text"
            placeholder="Telefon / Messenger (opcjonalnie)"
            maxLength={200}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="nh-message" className="sr-only">
          Opis sprawy
        </label>
        <textarea
          id="nh-message"
          name="message"
          required
          rows={4}
          maxLength={1000}
          placeholder="W czym możesz pomóc albo jakiej pomocy szukasz?"
          className={inputClass}
        />
      </div>

      {state.status === "error" ? (
        <p
          role="alert"
          className="rounded-2xl bg-blood/10 px-4 py-3 text-sm font-medium text-blood-dark ring-1 ring-blood/25"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-pine-900 px-7 py-3 font-extrabold text-cream transition hover:bg-pine-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Wysyłanie…" : "Dodaj zgłoszenie"}
        </button>
        <p className="text-xs text-ink/55">
          Zgłoszenie pojawi się na tablicy dopiero po akceptacji administratora.
        </p>
      </div>
    </form>
  );
}
