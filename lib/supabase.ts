import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Whether Supabase is configured (env vars are set). */
export const supabaseEnabled = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/**
 * Returns the Supabase client (anon key). Used server-side only, in the form
 * action. Throws a readable error when configuration is missing.
 */
export function getSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      "Supabase nie jest skonfigurowany. Ustaw NEXT_PUBLIC_SUPABASE_URL oraz NEXT_PUBLIC_SUPABASE_ANON_KEY w pliku .env.local.",
    );
  }
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return client;
}
