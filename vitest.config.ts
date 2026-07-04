import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Node-environment unit tests for server actions and pure helpers.
// `@/...` resolves to the project root, mirroring tsconfig paths.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
