import { test, expect, type Page } from "@playwright/test";

// End-to-end cover for the automatic seasonal theming. Rather than setting
// `data-season` by hand, these tests fake the browser clock before any page
// script runs, so the real public/season-init.js decides the season — i.e. the
// same path a visitor hits in September. Mobile widths are covered first-class
// because that is how most residents open the site.

type Season = "spring" | "summer" | "autumn" | "winter";

const SEASONS: Array<{
  season: Season;
  /** A date inside that season (month is 0-indexed). */
  date: [number, number, number];
  /** pine-950 — the dark section background, the palette's signature colour. */
  pine950: string;
  /** The hero particle layer that must be the visible one. */
  layer: string;
}> = [
  { season: "spring", date: [2026, 3, 15], pine950: "#123a24", layer: ".hero-petals" },
  { season: "summer", date: [2026, 6, 15], pine950: "#0c1d12", layer: ".hero-fireflies" },
  { season: "autumn", date: [2026, 9, 15], pine950: "#33190e", layer: ".hero-leaves" },
  { season: "winter", date: [2026, 11, 15], pine950: "#0c1a17", layer: ".hero-snow" },
];

const ALL_LAYERS = [
  ".hero-petals",
  ".hero-fireflies",
  ".hero-leaves",
  ".hero-snow",
];

const MOBILE = { width: 375, height: 812 }; // iPhone X/11/12-class
const SMALL_MOBILE = { width: 320, height: 640 }; // smallest realistic phone
const DESKTOP = { width: 1280, height: 800 };

/** Freeze the clock before any page script, so season-init.js sees this date. */
async function freezeClock(page: Page, [y, m, d]: [number, number, number]) {
  await page.addInitScript(
    ([year, month, day]) => {
      const fixed = new Date(year, month, day, 12, 0, 0).getTime();
      const Original = Date;
      class FixedDate extends Original {
        constructor(...args: unknown[]) {
          if (args.length === 0) super(fixed);
          // @ts-expect-error — forwarding the original overloads verbatim.
          else super(...args);
        }
        static now() {
          return fixed;
        }
      }
      // @ts-expect-error — swapping the global for the page under test.
      window.Date = FixedDate;
    },
    [y, m, d] as const,
  );
}

/** Suppress the one-time welcome modal (it locks scrolling). */
async function suppressWelcomeModal(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("izabelin:announce:sasiedzka-pomoc:v1", "1");
    } catch {
      /* ignore */
    }
  });
}

async function gotoSeason(
  page: Page,
  date: [number, number, number],
  viewport: { width: number; height: number },
  // Set explicitly on every navigation rather than relying on the config's
  // `use.reducedMotion`, which this Playwright version does not apply to the
  // context — `page.emulateMedia` is what actually reaches the page.
  reducedMotion: "reduce" | "no-preference" = "no-preference",
) {
  await page.emulateMedia({ reducedMotion });
  await page.setViewportSize(viewport);
  await suppressWelcomeModal(page);
  await freezeClock(page, date);
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(400); // hydration + priority-nav measuring pass
}

// The particle layers are deliberately hidden under reduced motion, so these
// assertions run with animations enabled (gotoSeason defaults to
// "no-preference" and sets it explicitly on the page).
test.describe("seasonal theming", () => {
  for (const { season, date, pine950, layer } of SEASONS) {
    for (const [label, viewport] of [
      ["mobile", MOBILE],
      ["desktop", DESKTOP],
    ] as const) {
      test(`${season} applies automatically on ${label}`, async ({ page }) => {
        await gotoSeason(page, date, viewport);

        // The clock alone drove the season — nothing set the attribute for us.
        await expect(page.locator("html")).toHaveAttribute("data-season", season);

        // The palette actually reached the rendered page.
        const appliedPine = await page.evaluate(() =>
          getComputedStyle(document.documentElement)
            .getPropertyValue("--color-pine-950")
            .trim(),
        );
        expect(appliedPine, `${season} pine-950`).toBe(pine950);

        // Exactly one particle layer is visible: this season's.
        for (const candidate of ALL_LAYERS) {
          const display = await page.evaluate((sel) => {
            const el = document.querySelector(sel);
            return el ? getComputedStyle(el).display : "MISSING";
          }, candidate);

          if (candidate === layer) {
            expect(display, `${season}: ${candidate} should show`).not.toBe("none");
            expect(display, `${season}: ${candidate} missing`).not.toBe("MISSING");
          } else {
            expect(display, `${season}: ${candidate} should be hidden`).toBe("none");
          }
        }

        // Summer keeps the photographic hero; the other seasons reveal the
        // season-tinted illustration underneath it.
        const photoDisplay = await page.evaluate(() => {
          const el = document.querySelector(".hero-photo");
          return el ? getComputedStyle(el).display : "MISSING";
        });
        if (season === "summer") {
          expect(photoDisplay, "summer should keep the hero photo").not.toBe("none");
        } else {
          expect(photoDisplay, `${season} should hide the hero photo`).toBe("none");
        }

        // The hero headline stays rendered and legible in every season.
        await expect(page.locator("h1")).toBeVisible();
      });
    }
  }
});

test.describe("seasonal theming — mobile layout integrity", () => {
  for (const { season, date } of SEASONS) {
    for (const [label, viewport] of [
      ["375px", MOBILE],
      ["320px", SMALL_MOBILE],
    ] as const) {
      test(`${season} does not break mobile layout at ${label}`, async ({ page }) => {
        await gotoSeason(page, date, viewport);

        const result = await page.evaluate(() => {
          window.scrollTo(9999, 0);
          const scrolledX = window.scrollX;
          window.scrollTo(0, 0);
          const doc = document.documentElement;
          return {
            scrolledX,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
          };
        });

        // Falling particles drift sideways (`--sway`) — they must stay clipped
        // by the hero and never widen the page.
        expect(result.scrolledX, `${season}: page scrolled sideways`).toBe(0);
        expect(
          result.scrollWidth,
          `${season}: content wider than viewport`,
        ).toBeLessThanOrEqual(result.clientWidth + 1);
      });

      test(`${season} keeps the header usable at ${label}`, async ({ page }) => {
        await gotoSeason(page, date, viewport);

        const header = page.locator("header");
        await expect(header).toBeVisible();

        const info = await page.evaluate(() => {
          const el = document.querySelector("header");
          if (!el) return null;
          const bar = el.firstElementChild!.getBoundingClientRect();
          const logo = el.querySelector('a[href="/"]')!.getBoundingClientRect();
          const more = el.querySelector('button[aria-label="Więcej odnośników"]');
          const inline = el.querySelectorAll("nav a").length;
          return {
            vw: document.documentElement.clientWidth,
            barRight: bar.right,
            logoLeft: logo.left,
            logoWidth: logo.width,
            reachableNav: inline > 0 || more !== null,
          };
        });

        expect(info, "header present").not.toBeNull();
        // Re-theming must not push the header off-screen or hide the branding.
        expect(info!.logoLeft, "logo clipped left").toBeGreaterThanOrEqual(-0.5);
        expect(info!.barRight, "header wider than viewport").toBeLessThanOrEqual(
          info!.vw + 0.5,
        );
        expect(info!.logoWidth, "logo not rendered").toBeGreaterThan(0);
        expect(info!.reachableNav, "navigation unreachable").toBe(true);
      });
    }
  }

  // Contrast guard: the hero headline is cream and sits on top of the seasonal
  // scene. Winter and spring are the light-scene seasons, so this is where a
  // washed-out headline would show up first.
  for (const { season, date } of SEASONS) {
    test(`${season} hero headline is opaque and on-screen (mobile)`, async ({
      page,
    }) => {
      await gotoSeason(page, date, MOBILE);

      const h1 = await page.evaluate(() => {
        const el = document.querySelector("h1");
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          width: r.width,
          left: r.left,
          right: r.right,
          vw: document.documentElement.clientWidth,
          opacity: Number(cs.opacity),
          color: cs.color,
        };
      });

      expect(h1, "h1 present").not.toBeNull();
      expect(h1!.opacity, `${season}: headline faded out`).toBeGreaterThan(0.9);
      expect(h1!.width, `${season}: headline not laid out`).toBeGreaterThan(0);
      expect(h1!.left, `${season}: headline clipped left`).toBeGreaterThanOrEqual(-0.5);
      expect(h1!.right, `${season}: headline overflows right`).toBeLessThanOrEqual(
        h1!.vw + 0.5,
      );
    });
  }
});

test.describe("seasonal particles respect reduced motion", () => {
  for (const { season, date, layer } of SEASONS) {
    test(`${season}: decorative particles are not animated under reduce`, async ({
      page,
    }) => {
      await gotoSeason(page, date, MOBILE, "reduce");

      // The season still themes the page…
      await expect(page.locator("html")).toHaveAttribute("data-season", season);

      // …but the individual falling particles are hidden, so nothing sits
      // frozen mid-screen. (Summer's fireflies are hidden by the same rule.)
      const particleDisplays = await page.evaluate((sel) => {
        const root = document.querySelector(sel);
        if (!root) return [];
        return [...root.children].map((c) => getComputedStyle(c).display);
      }, layer);

      for (const display of particleDisplays) {
        expect(display, `${season}: particle visible under reduced motion`).toBe(
          "none",
        );
      }
    });
  }
});

test.describe("hero particle layers are decorative only", () => {
  test("particle layers are aria-hidden and non-interactive", async ({ page }) => {
    await gotoSeason(page, [2026, 9, 15], MOBILE); // autumn

    for (const sel of ALL_LAYERS) {
      const info = await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        return {
          ariaHidden: el.getAttribute("aria-hidden"),
          pointerEvents: getComputedStyle(el).pointerEvents,
        };
      }, sel);

      expect(info, `${sel} present`).not.toBeNull();
      expect(info!.ariaHidden, `${sel} not aria-hidden`).toBe("true");
      expect(info!.pointerEvents, `${sel} intercepts clicks`).toBe("none");
    }
  });
});
