import baseConfig, { theme as _theme, plugins as _plugins } from '@repo/configs/tailwind';

export default {
  ...baseConfig,
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/**/*.{ts,tsx}',
  ],
  theme: {
    ..._theme,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...(_theme?.extend || {}),
      keyframes: {
        ...(_theme?.extend?.keyframes || {}),
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
        ...(_theme?.extend?.animation || {}),
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    ...(_plugins || []),
  ],
};