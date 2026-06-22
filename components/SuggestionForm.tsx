"use client";

import { useActionState } from "react";
import {
  submitSuggestion,
  type SuggestionState,
} from "@/app/actions/submitSuggestion";

const initialState: SuggestionState = { status: "idle", message: "" };

export function SuggestionForm() {
  const [state, formAction, pending] = useActionState(
    submitSuggestion,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 p-6 text-center">
        <p className="text-2xl" aria-hidden>
          ✅
        </p>
        <p className="mt-2 font-semibold text-white">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      {/* Honeypot — hidden field for bots */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Nie wypełniaj tego pola
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label htmlFor="contact" className="sr-only">
          Twoje imię lub e-mail
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="Twoje imię / e-mail"
          maxLength={200}
          className="w-full rounded-lg border border-white/15 bg-graphite-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      <div>
        <label htmlFor="idea" className="sr-only">
          Pomysł na rozwój strony
        </label>
        <textarea
          id="idea"
          name="idea"
          required
          rows={4}
          maxLength={2000}
          placeholder="Pomysł na rozwój (co dodać do strony?)"
          className="w-full rounded-lg border border-white/15 bg-graphite-700 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      {state.status === "error" ? (
        <p
          role="alert"
          className="rounded-lg bg-blood/15 px-4 py-2 text-sm text-red-200 ring-1 ring-blood/40"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Wysyłanie…" : "Wyślij"}
      </button>
    </form>
  );
}
