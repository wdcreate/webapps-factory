import { uiConfig } from "@repo/vitest-config/ui";
export default {
  ...uiConfig,
  test: {
    ...uiConfig.test,
    setupFiles: "@repo/vitest-config/setupTests",   
  }
};