"use server";

import { z } from "zod";
import { getSupabase, supabaseEnabled } from "@/lib/supabase";

const schema = z.object({
  contact: z.string().trim().max(200, "Pole kontaktowe jest za długie."),
  idea: z
    .string()
    .trim()
    .min(3, "Napisz proszę kilka słów (min. 3 znaki).")
    .max(2000, "Wiadomość jest za długa (maks. 2000 znaków)."),
});

export type SuggestionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const SUCCESS_MESSAGE = "Dziękujemy! Twoja propozycja została wysłana.";

export async function submitSuggestion(
  _prevState: SuggestionState,
  formData: FormData,
): Promise<SuggestionState> {
  // Honeypot: hidden from humans — if filled, treat as a bot
  // (silently "accept" but store nothing).
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = schema.safeParse({
    contact: String(formData.get("contact") ?? ""),
    idea: String(formData.get("idea") ?? ""),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Sprawdź wprowadzone dane.",
    };
  }

  if (!supabaseEnabled) {
    return {
      status: "error",
      message:
        "Formularz nie jest jeszcze podłączony do bazy. Skonfiguruj Supabase w pliku .env.local, aby zapisywać zgłoszenia.",
    };
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("suggestions").insert({
      contact: parsed.data.contact || null,
      idea: parsed.data.idea,
    });
    if (error) throw error;
    return { status: "success", message: SUCCESS_MESSAGE };
  } catch {
    return {
      status: "error",
      message: "Nie udało się wysłać. Spróbuj ponownie później.",
    };
  }
}
