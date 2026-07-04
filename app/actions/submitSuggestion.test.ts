import { describe, it, expect, beforeEach, vi } from "vitest";

// Shared, hoisted mock state so the factory below can close over it.
const h = vi.hoisted(() => ({
  from: vi.fn(),
  insert: vi.fn(),
  state: { enabled: true },
}));

vi.mock("@/lib/supabase", () => ({
  get supabaseEnabled() {
    return h.state.enabled;
  },
  getSupabase: () => ({ from: h.from }),
}));

import { submitSuggestion, type SuggestionState } from "./submitSuggestion";

const idle: SuggestionState = { status: "idle", message: "" };

function formData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.append(key, value);
  return fd;
}

beforeEach(() => {
  h.state.enabled = true;
  h.from.mockReset();
  h.insert.mockReset();
  h.from.mockReturnValue({ insert: h.insert });
  h.insert.mockResolvedValue({ error: null });
});

describe("submitSuggestion", () => {
  it("stores a valid suggestion and reports success", async () => {
    const result = await submitSuggestion(
      idle,
      formData({ contact: "Anna", idea: "Dodajcie mapę wsi." }),
    );

    expect(result.status).toBe("success");
    expect(h.from).toHaveBeenCalledWith("suggestions");
    expect(h.insert).toHaveBeenCalledWith({
      contact: "Anna",
      idea: "Dodajcie mapę wsi.",
    });
  });

  it("passes null contact when the contact field is empty", async () => {
    await submitSuggestion(idle, formData({ contact: "", idea: "Pomysł X" }));
    expect(h.insert).toHaveBeenCalledWith({ contact: null, idea: "Pomysł X" });
  });

  it("silently accepts and stores nothing when the honeypot is filled", async () => {
    const result = await submitSuggestion(
      idle,
      formData({ website: "bot", idea: "spam spam spam" }),
    );

    expect(result.status).toBe("success");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("rejects an idea that is too short", async () => {
    const result = await submitSuggestion(idle, formData({ idea: "hi" }));
    expect(result.status).toBe("error");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("rejects an idea that exceeds the length limit", async () => {
    const result = await submitSuggestion(
      idle,
      formData({ idea: "x".repeat(2001) }),
    );
    expect(result.status).toBe("error");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("reports a configuration error when Supabase is disabled", async () => {
    h.state.enabled = false;
    const result = await submitSuggestion(
      idle,
      formData({ idea: "Coś sensownego" }),
    );

    expect(result.status).toBe("error");
    expect(result.message).toMatch(/baz/i);
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("reports a generic error when the insert fails", async () => {
    h.insert.mockResolvedValue({ error: { message: "boom" } });
    const result = await submitSuggestion(
      idle,
      formData({ idea: "Poprawny pomysł" }),
    );

    expect(result.status).toBe("error");
    expect(result.message).toMatch(/spróbuj ponownie/i);
  });

  it("trims surrounding whitespace before validating", async () => {
    const result = await submitSuggestion(
      idle,
      formData({ contact: "  ", idea: "   Realny pomysł   " }),
    );

    expect(result.status).toBe("success");
    expect(h.insert).toHaveBeenCalledWith({
      contact: null,
      idea: "Realny pomysł",
    });
  });
});
