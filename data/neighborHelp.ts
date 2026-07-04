// Types and labels for the "Sąsiedzka pomoc" board. Rows live in Supabase
// (public.neighbor_help) and are only shown once an admin sets visible = true.

export type NeighborKind = "offer" | "need";

export const neighborKinds: NeighborKind[] = ["offer", "need"];

export const neighborKindLabels: Record<
  NeighborKind,
  { label: string; short: string; icon: string }
> = {
  offer: { label: "Oferuję pomoc", short: "Oferuję", icon: "🤝" },
  need: { label: "Szukam pomocy", short: "Szukam", icon: "🙏" },
};

export function isNeighborKind(value: unknown): value is NeighborKind {
  return value === "offer" || value === "need";
}

// A single approved entry as shown publicly on the board.
export type NeighborRequest = {
  id: string;
  kind: NeighborKind;
  name: string | null;
  contact: string | null;
  message: string;
  created_at: string;
};
