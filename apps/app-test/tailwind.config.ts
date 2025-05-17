import type { Config } from "tailwindcss";
import baseConfig from "@repo/ui/tailwind.config";
import uiConfig from "./uiConfig";

const webConfig = {
  ...baseConfig,
  presets: [baseConfig],
  theme: {
    extend: {
      //common
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",

        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",

        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      fontSize: {
        md: uiConfig.fonts.size.md,
        lg: uiConfig.fonts.size.lg,
        xl: uiConfig.fonts.size.xl,
        "2xl": uiConfig.fonts.size["2xl"],
        "4xl": uiConfig.fonts.size["4xl"],
      },
      spacing: {
        "section-y": uiConfig.spacing.sectionY.default,
        "section-y-lg": uiConfig.spacing.sectionY.lg,
        "section-y-xl": uiConfig.spacing.sectionY.xl,
        "section-x": uiConfig.spacing.sectionX.default,
        "section-x-lg": uiConfig.spacing.sectionX.lg,
        "section-x-xl": uiConfig.spacing.sectionX.xl,
        "section-gap": uiConfig.spacing.sectionGap.default,
        "section-gap-lg": uiConfig.spacing.sectionGap.lg,
        "section-gap-xl": uiConfig.spacing.sectionGap.xl,
      },
    },
  },
} satisfies Config;

export default webConfig;
