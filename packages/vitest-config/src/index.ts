export const sharedConfig = {
  test: {
    globals: true,
  },
};

// Re-export specific configs for backwards compatibility
export { baseConfig } from "./configs/base.js";
export { uiConfig } from "./configs/ui-config.js";
