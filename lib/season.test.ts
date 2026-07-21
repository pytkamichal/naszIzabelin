import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// These tests exercise the *actual shipped artifacts* rather than a copy of the
// logic: the static script that tags <html data-season> on every page load, and
// the season token blocks in globals.css that the tag switches between. If
// either is edited in a way that breaks the calendar rollover or drops a colour
// token, these fail.

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../${rel}`, import.meta.url)), "utf8");

const SEASON_SCRIPT = read("public/season-init.js");
const GLOBALS_CSS = read("app/globals.css");

const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
type Season = (typeof SEASONS)[number];

/**
 * Runs public/season-init.js exactly as a browser would, with the clock fixed
 * to `date`, and returns whatever it set on <html>.
 */
function seasonOn(date: Date): string | undefined {
  const attrs: Record<string, string> = {};
  const documentStub = {
    documentElement: {
      setAttribute: (name: string, value: string) => {
        attrs[name] = value;
      },
    },
  };
  // The script only ever evaluates `new Date().getMonth()`, so a constructor
  // that hands back the fixed date is a faithful stand-in. (Returning an object
  // from a constructor overrides the newly created `this`.)
  const FixedDate = function () {
    return date;
  } as unknown as DateConstructor;

  new Function("document", "Date", SEASON_SCRIPT)(documentStub, FixedDate);
  return attrs["data-season"];
}

describe("season-init.js — calendar rollover", () => {
  // Meteorological seasons: the month is what decides, so mid-month is
  // representative of the whole month.
  const BY_MONTH: Array<[number, Season]> = [
    [0, "winter"], // January
    [1, "winter"], // February
    [2, "spring"], // March
    [3, "spring"], // April
    [4, "spring"], // May
    [5, "summer"], // June
    [6, "summer"], // July
    [7, "summer"], // August
    [8, "autumn"], // September
    [9, "autumn"], // October
    [10, "autumn"], // November
    [11, "winter"], // December
  ];

  it.each(BY_MONTH)("month index %i resolves to %s", (month, expected) => {
    expect(seasonOn(new Date(2026, month, 15))).toBe(expected);
  });

  it("only ever emits one of the four known seasons", () => {
    for (let month = 0; month < 12; month++) {
      expect(SEASONS).toContain(seasonOn(new Date(2026, month, 15)));
    }
  });

  // The switchover days are the whole point of the feature — pin them so a
  // refactor can't shift a season by a day.
  const BOUNDARIES: Array<[string, Date, Season]> = [
    ["last day of winter", new Date(2026, 1, 28), "winter"],
    ["first day of spring", new Date(2026, 2, 1), "spring"],
    ["last day of spring", new Date(2026, 4, 31), "spring"],
    ["first day of summer", new Date(2026, 5, 1), "summer"],
    ["last day of summer", new Date(2026, 7, 31), "summer"],
    ["first day of autumn", new Date(2026, 8, 1), "autumn"],
    ["last day of autumn", new Date(2026, 10, 30), "autumn"],
    ["first day of winter", new Date(2026, 11, 1), "winter"],
    ["new year's day", new Date(2027, 0, 1), "winter"],
  ];

  it.each(BOUNDARIES)("%s → %s", (_label, date, expected) => {
    expect(seasonOn(date)).toBe(expected);
  });

  it("handles a leap-year 29 February", () => {
    expect(seasonOn(new Date(2028, 1, 29))).toBe("winter");
  });

  it("sets the attribute on every month (never leaves <html> untagged)", () => {
    for (let month = 0; month < 12; month++) {
      expect(seasonOn(new Date(2026, month, 15))).toBeDefined();
    }
  });
});

/** Body of the `html[data-season="<season>"]` rule in globals.css. */
function seasonBlock(season: Season): string | null {
  const match = GLOBALS_CSS.match(
    new RegExp(`html\\[data-season="${season}"\\]\\s*\\{([^}]*)\\}`),
  );
  return match ? match[1] : null;
}

/** Custom-property names declared in a block, e.g. `--color-pine-950`. */
function declaredTokens(css: string): string[] {
  return [...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]).sort();
}

describe("globals.css — season token blocks", () => {
  // Summer is the site's original palette and intentionally has no override
  // block: it *is* the @theme default, so an untagged page still looks right.
  const OVERRIDE_SEASONS = ["spring", "autumn", "winter"] as const;

  it.each(OVERRIDE_SEASONS)("defines a token block for %s", (season) => {
    expect(seasonBlock(season)).not.toBeNull();
  });

  it("does not define an override block for summer (it is the default)", () => {
    expect(seasonBlock("summer")).toBeNull();
  });

  // The important invariant: every overriding season must redefine exactly the
  // same set of tokens. A token present in one season but missing in another
  // would silently fall back to summer's green in that season.
  it("every season overrides an identical set of tokens", () => {
    const [first, ...rest] = OVERRIDE_SEASONS.map((season) => ({
      season,
      tokens: declaredTokens(seasonBlock(season)!),
    }));

    for (const other of rest) {
      expect(other.tokens, `${other.season} differs from ${first.season}`).toEqual(
        first.tokens,
      );
    }
  });

  it("each season redefines the core surface + accent tokens", () => {
    const required = [
      "--color-pine-950", // dark section backgrounds
      "--color-pine-50",
      "--color-gold-400", // accent
      "--color-cream", // light sections / text on dark
      "--color-sand",
      "--color-ink", // body text
      "--background",
      "--foreground",
    ];
    for (const season of OVERRIDE_SEASONS) {
      const tokens = declaredTokens(seasonBlock(season)!);
      for (const token of required) {
        expect(tokens, `${season} is missing ${token}`).toContain(token);
      }
    }
  });

  it("each season retints the hero illustration", () => {
    const heroTokens = [
      "--hero-sky-top",
      "--hero-sky-mid",
      "--hero-sky-bot",
      "--hero-sun",
      "--hero-tree-far",
      "--hero-tree-near",
      "--hero-tree-conifer",
      "--hero-field-top",
      "--hero-field-mid",
      "--hero-field-bot",
    ];
    for (const season of OVERRIDE_SEASONS) {
      const tokens = declaredTokens(seasonBlock(season)!);
      for (const token of heroTokens) {
        expect(tokens, `${season} is missing ${token}`).toContain(token);
      }
    }
  });

  // Spot-check the signature colour of each season so a palette can't be
  // swapped out by accident.
  it.each([
    ["spring", "#123a24"],
    ["autumn", "#33190e"],
    ["winter", "#0c1a17"],
  ] as const)("%s uses the specified pine-950 %s", (season, hex) => {
    expect(seasonBlock(season)!).toContain(`--color-pine-950: ${hex}`);
  });

  it("keeps summer's original pine-950 as the @theme default", () => {
    expect(GLOBALS_CSS).toContain("--color-pine-950: #0c1d12");
  });

  it("scopes season blocks to html[...] so they outrank the :root defaults", () => {
    // Equal specificity would make the cascade order-dependent, and the
    // production CSS is minified/reordered — the `html` prefix is what
    // guarantees the override always wins.
    for (const season of OVERRIDE_SEASONS) {
      expect(GLOBALS_CSS).toContain(`html[data-season="${season}"]`);
    }
  });

  it("gates the falling-particle animations behind reduced-motion", () => {
    expect(GLOBALS_CSS).toMatch(/@media \(prefers-reduced-motion: no-preference\)/);
    expect(GLOBALS_CSS).toMatch(/@keyframes fall-leaf/);
    expect(GLOBALS_CSS).toMatch(/@keyframes fall-snow/);
  });
});
