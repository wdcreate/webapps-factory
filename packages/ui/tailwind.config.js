const baseConfig = require('@repo/css-config/tailwind');

module.exports = {
  ...baseConfig,
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/**/*.{ts,tsx}',
  ],
  theme: {
    ...baseConfig.theme,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...(baseConfig.theme?.extend || {}),
      keyframes: {
        ...(baseConfig.theme?.extend?.keyframes || {}),
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        ...(baseConfig.theme?.extend?.animation || {}),
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    ...(baseConfig.plugins || []),
  ],
};