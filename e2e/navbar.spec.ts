import { test, expect } from "@playwright/test";

// The header (logo · » menu / nav links · alert button) must render in full and
// never be clipped or overlap itself at any of these widths.
const WIDTHS = [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440];

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try {
      localStorage.setItem("izabelin:announce:sasiedzka-pomoc:v1", "1");
    } catch {
      /* ignore */
    }
  });
});

for (const width of WIDTHS) {
  test(`navbar renders fully (not clipped) at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "load" });
    // Let hydration + the priority-nav measuring pass settle.
    await page.waitForTimeout(400);

    const info = await page.evaluate(() => {
      const header = document.querySelector("header");
      if (!header) return null;
      const rect = (el: Element | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, width: r.width };
      };
      const bar = header.firstElementChild;
      const logo = header.querySelector('a[href="/"]');
      const alert = header.querySelector('a[href="/strefa-6sp"]');
      const moreBtn = header.querySelector(
        'button[aria-label="Więcej odnośników"]',
      );
      const inlineNavLinks = header.querySelectorAll("nav a");

      const alertR = alert!.getBoundingClientRect();
      const moreR = moreBtn?.getBoundingClientRect() ?? null;
      const logoR = logo!.getBoundingClientRect();

      return {
        vw: document.documentElement.clientWidth,
        bar: rect(bar),
        logo: rect(logo),
        alert: rect(alert),
        more: rect(moreBtn),
        inlineNavLinkCount: inlineNavLinks.length,
        // The » menu (when present) must sit clear of the alert button…
        moreOverlapsAlert: moreR ? moreR.right > alertR.left + 0.5 : false,
        // …and the logo must sit clear of whatever follows it.
        logoOverlapsNext:
          logoR.right > (moreR ? moreR.left : alertR.left) + 0.5,
      };
    });

    expect(info, "header present").not.toBeNull();
    const h = info!;

    // Nothing clipped off the left or right edge of the viewport.
    expect(h.logo!.left, "logo clipped on the left").toBeGreaterThanOrEqual(
      -0.5,
    );
    expect(
      h.alert!.right,
      "alert button clipped on the right",
    ).toBeLessThanOrEqual(h.vw + 0.5);
    expect(h.bar!.right, "header bar wider than viewport").toBeLessThanOrEqual(
      h.vw + 0.5,
    );

    // Key elements actually rendered.
    expect(h.logo!.width, "logo not rendered").toBeGreaterThan(0);
    expect(h.alert!.width, "alert button not rendered").toBeGreaterThan(0);

    // No overlapping header items.
    expect(h.moreOverlapsAlert, "» menu overlaps the alert button").toBe(false);
    expect(h.logoOverlapsNext, "logo overlaps the next item").toBe(false);

    // Navigation stays reachable: inline links (desktop) or the » menu (mobile).
    expect(
      h.inlineNavLinkCount > 0 || h.more !== null,
      "no inline nav links and no » overflow menu",
    ).toBe(true);
  });
}
