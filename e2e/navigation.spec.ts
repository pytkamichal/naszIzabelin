import { test, expect } from "@playwright/test";

// Exercise the header alert button → /strefa-6sp → back to home flow on both
// a phone-sized and a desktop viewport.
const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1280, height: 800 },
};

// Suppress the one-time welcome modal so it never covers the header.
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try {
      localStorage.setItem("izabelin:announce:sasiedzka-pomoc:v1", "1");
    } catch {
      /* ignore */
    }
  });
});

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test(`${name}: alert button opens /strefa-6sp and back returns home`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    // Kill animations/transitions so the pulsing alert button is "stable" for
    // clicks. The <style> persists across Next's client-side navigation.
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation: none !important; transition: none !important; }",
    });

    // Home page rendered.
    await expect(
      page.getByRole("heading", { name: /Witamy na stronie/i }),
    ).toBeVisible();

    // The "STOP … 6SP" alert button lives in the header at every width
    // (matched by href so the responsive label doesn't matter).
    const alertButton = page.locator('header a[href="/strefa-6sp"]');
    await expect(alertButton).toBeVisible();
    await alertButton.click();

    // Landed on the protest subpage (toHaveURL polls until Next finishes the
    // client-side navigation).
    await expect(page).toHaveURL(/\/strefa-6sp$/);
    await expect(
      page.getByRole("heading", { name: /STOP WYSYPISKU ŚMIECI/i }),
    ).toBeVisible();

    // Return to the home page via the back link.
    const backLink = page.getByRole("link", {
      name: /Wróć na stronę główną/i,
    });
    await expect(backLink).toBeVisible();
    await backLink.click();

    // Back home.
    await expect(page).toHaveURL((url) => url.pathname === "/");
    await expect(
      page.getByRole("heading", { name: /Witamy na stronie/i }),
    ).toBeVisible();
  });
}
