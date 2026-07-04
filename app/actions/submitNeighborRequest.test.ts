import { describe, it, expect, beforeEach, vi } from "vitest";

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

import {
  submitNeighborRequest,
  type NeighborRequestState,
} from "./submitNeighborRequest";

const idle: NeighborRequestState = { status: "idle", message: "" };

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

describe("submitNeighborRequest", () => {
  it("stores a valid offer and tells the user to await approval", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({
        kind: "offer",
        name: "Marek",
        contact: "+48 500 600 700",
        message: "Mogę podwieźć do Mińska w piątki.",
      }),
    );

    expect(result.status).toBe("success");
    expect(result.message).toMatch(/akceptacj/i);
    expect(h.from).toHaveBeenCalledWith("neighbor_help");
    expect(h.insert).toHaveBeenCalledWith({
      kind: "offer",
      name: "Marek",
      contact: "+48 500 600 700",
      message: "Mogę podwieźć do Mińska w piątki.",
    });
  });

  it("never lets the client set the visible flag", async () => {
    await submitNeighborRequest(
      idle,
      formData({ kind: "need", message: "Szukam opieki nad kotem." }),
    );

    const payload = h.insert.mock.calls[0][0];
    expect(payload).not.toHaveProperty("visible");
  });

  it("accepts a 'need' request with empty optional fields as null", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "need", name: "", contact: "", message: "Pożyczę drabinę?" }),
    );

    expect(result.status).toBe("success");
    expect(h.insert).toHaveBeenCalledWith({
      kind: "need",
      name: null,
      contact: null,
      message: "Pożyczę drabinę?",
    });
  });

  it("rejects an invalid kind", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "whatever", message: "Treść zgłoszenia" }),
    );

    expect(result.status).toBe("error");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("rejects a message that is too short", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "offer", message: "no" }),
    );

    expect(result.status).toBe("error");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("rejects a message that exceeds the length limit", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "offer", message: "x".repeat(1001) }),
    );

    expect(result.status).toBe("error");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("silently accepts and stores nothing when the honeypot is filled", async () => {
    const result = await submitNeighborRequest(
      idle,
      formData({ website: "bot", kind: "offer", message: "spam treść" }),
    );

    expect(result.status).toBe("success");
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("reports a configuration error when Supabase is disabled", async () => {
    h.state.enabled = false;
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "offer", message: "Sensowna treść zgłoszenia" }),
    );

    expect(result.status).toBe("error");
    expect(result.message).toMatch(/baz/i);
    expect(h.insert).not.toHaveBeenCalled();
  });

  it("reports a generic error when the insert fails", async () => {
    h.insert.mockResolvedValue({ error: { message: "boom" } });
    const result = await submitNeighborRequest(
      idle,
      formData({ kind: "need", message: "Poprawna treść" }),
    );

    expect(result.status).toBe("error");
    expect(result.message).toMatch(/spróbuj ponownie/i);
  });
});
