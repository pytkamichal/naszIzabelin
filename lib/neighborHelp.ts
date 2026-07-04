import { getSupabase, supabaseEnabled } from "@/lib/supabase";
import { isNeighborKind, type NeighborRequest } from "@/data/neighborHelp";

/**
 * Fetches approved (visible) neighbourly-help entries, newest first. RLS on
 * public.neighbor_help already restricts the anon role to visible rows, so
 * even the anon key cannot leak pending submissions. Returns [] when Supabase
 * isn't configured or on any error — the section then just shows its form.
 */
export async function getVisibleNeighborRequests(): Promise<NeighborRequest[]> {
  if (!supabaseEnabled) return [];

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("neighbor_help")
      .select("id, kind, name, contact, message, created_at")
      .eq("visible", true)
      .order("created_at", { ascending: false })
      .limit(60);

    if (error || !data) return [];

    // Guard against unexpected `kind` values so the UI stays type-safe.
    return data.filter((row): row is NeighborRequest => isNeighborKind(row.kind));
  } catch {
    return [];
  }
}
