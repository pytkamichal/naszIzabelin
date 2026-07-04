import { defineConfig } from "@playwright/test";

// Dedicated port so the e2e server never clashes with a running `next dev`.
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Stop CSS animations (e.g. the pulsing alert button) so elements are
    // "stable" for clicks and measurements — the app honours reduced motion.
    reducedMotion: "reduce",
  },
  webServer: {
    // Production build + start (Node ≥ 20 on PATH, same as the app). Using
    // `next start` avoids the single-instance lock of `next dev`, so the e2e
    // suite runs even while a dev server is open. Reuses an already-running
    // instance on this port locally so repeated runs are fast.
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
