import { test, expect } from "@playwright/test";

// Regression guard for the "white strip on the right" bug: the page must never
// overflow horizontally (nothing wider than the viewport, no sideways scroll)
// at any of these common phone/tablet/desktop widths.
const WIDTHS = [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440];

// Suppress the one-time welcome modal so it never locks scrolling mid-measurement.
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
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "load" });
    // Let hydration + the priority-nav measuring pass settle.
    await page.waitForTimeout(400);

    const result = await page.evaluate(() => {
      // Try to scroll sideways — a page with no overflow can't move.
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

    // The page must not be horizontally scrollable at all.
    expect(result.scrolledX, "page scrolled sideways").toBe(0);
    // …and its content must fit within the viewport (1px rounding tolerance).
    expect(
      result.scrollWidth,
      "content wider than viewport",
    ).toBeLessThanOrEqual(result.clientWidth + 1);
  });
}
