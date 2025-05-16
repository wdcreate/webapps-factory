import type { Config } from "tailwindcss";
import baseConfig from "@repo/ui/tailwind.config";
import uiConfig from "./uiConfig";

const webConfig = {
  ...baseConfig,
  presets: [baseConfig],
  theme: {
    extend: {
      spacing: {
        "section-y": uiConfig.spacing.sectionPaddingY.default,
        "section-x": uiConfig.spacing.sectionPaddingX.default,
        "hero-y": uiConfig.spacing.heroPaddingY.default,
      },
      gridTemplateColumns: {
        "cards": `repeat(${uiConfig.gridCols.cards.default}, minmax(300px, 1fr))`,
        "cards-md": `repeat(${uiConfig.gridCols.cards.md},      minmax(300px, 1fr))`,
        "cards-lg": `repeat(${uiConfig.gridCols.cards.lg},      minmax(300px, 1fr))`,
      },
      colors: {
        primary: uiConfig.colors.primary,
        secondary: uiConfig.colors.secondary,
        accent: uiConfig.colors.accent,
        background: uiConfig.colors.background,
        text: uiConfig.colors.text,
        muted: uiConfig.colors.muted,
      },
      fontFamily: {
        heading: uiConfig.fonts.heading,
        body: uiConfig.fonts.body,
      },
      borderRadius: {
        md: uiConfig.radii.md,
      },
      boxShadow: {
        md: uiConfig.shadows.md,
      },
      fontSize: {
        base: uiConfig.fontSizes.base,
        xl: uiConfig.fontSizes.xl,
        "2xl": uiConfig.fontSizes["2xl"],
        "4xl": uiConfig.fontSizes["4xl"],
      },
    },
  },
} satisfies Config;

export default webConfig;
