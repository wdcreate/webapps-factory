import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base.js";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "@repo/vitest-config/setupTests",
    },
  }),
);
