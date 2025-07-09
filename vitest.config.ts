// vitest.config.js
import { defineConfig } from "vitest/config";
import { sharedConfig } from "@repo/vitest-config";

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    include: [
      "apps/**/tests/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "packages/**/tests/**/*.{test,spec}.{js,ts,jsx,tsx}",
      // "packages/**/tests/**/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    environment: "jsdom",
    globals: true,
    setupFiles: "@repo/vitest-config/setupTests",
  },
});
