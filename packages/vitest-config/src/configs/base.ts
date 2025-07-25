import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    globals: true,
    setupFiles: "./setupTests.ts",
    passWithNoTests: true,
  },
});
