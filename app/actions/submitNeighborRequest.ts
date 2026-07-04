"use server";

import { z } from "zod";
import { getSupabase, supabaseEnabled } from "@/lib/supabase";

const schema = z.object({
  kind: z.enum(["offer", "need"], {
    message: "Wybierz, czy oferujesz, czy szukasz pomocy.",
  }),
  name: z.string().trim().max(120, "Imię jest za długie (maks. 120 znaków)."),
  contact: z
    .string()
    .trim()
    .max(200, "Pole kontaktowe jest za długie (maks. 200 znaków)."),
  message: z
    .string()
    .trim()
    .min(3, "Opisz proszę krótko sprawę (min. 3 znaki).")
    .max(1000, "Opis jest za długi (maks. 1000 znaków)."),
});

export type NeighborRequestState = {
  status: "idle" | "success" | "error";
  message: string;
};

// The submission is hidden until an admin approves it, so tell the user to wait.
const SUCCESS_MESSAGE =
  "Dziękujemy! Twoje zgłoszenie czeka na akceptację administratora i pojawi się na tablicy po zatwierdzeniu.";

export async function submitNeighborRequest(
  _prevState: NeighborRequestState,
  formData: FormData,
): Promise<NeighborRequestState> {
  // Honeypot: hidden from humans — if filled, treat as a bot
  // (silently "accept" but store nothing).
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = schema.safeParse({
    kind: String(formData.get("kind") ?? ""),
    name: String(formData.get("name") ?? ""),
    contact: String(formData.get("contact") ?? ""),
    message: String(formData.get("message") ?? ""),
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
    // `visible` is intentionally omitted — the column defaults to false and
    // RLS forbids anon from inserting an already-approved row.
    const { error } = await supabase.from("neighbor_help").insert({
      kind: parsed.data.kind,
      name: parsed.data.name || null,
      contact: parsed.data.contact || null,
      message: parsed.data.message,
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
