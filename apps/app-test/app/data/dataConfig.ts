import { ButtonType } from "../../../../packages/ui/src/types";
import { dataConfigType } from "../types";

export const dataConfig: dataConfigType = {
  headerData: {
    logo: {
      src: "/turborepo-dark.svg",
      alt: "Logo",
      href: "/",
    },
    links: [
      { label: "Home", href: "/" },
      { label: "Company", href: "/company" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Features", href: "/features" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
    buttons: [
      { label: "Log in", href: "/login", variant: "ghost", size: "lg" },
      {
        label: "Get started",
        href: "/signup",
        variant: "secondary",
        size: "lg",
      },
    ],
    mobileContent: {
      label: "Get a demo",
      variant: "secondary",
      size: "sm",
      href: "/demo",
    },
  },
  heroSection: {
    reverseGrid: false,
    image: {
      src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg",
      alt: "Arrow",
    },
    title: "Let’s create more tools and ideas that brings us together.",
    description:
      "Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.",
    button: {
      label: "Get started",
      variant: "secondary",
      size: "lg",
    },
  },
  featuresSection: {
    reverseGrid: false,
    title: "We invest in the world’s potential",
    subtitle:
      "Flowbite Budget is a mobile app that helps users easily track their expenses and create a budget.",
    paragraphs: [
      "With a user-friendly interface, the app allows users to quickly input their income and expenses, and then automatically categorizes them for easy tracking.",
      "Spend less time on paperwork and more time growing your business.",
    ],
    image: {
      src: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-tabs-2.png",
      alt: "Feature illustration",
      showOnMobile: true,
    },
    features: [
      "Dynamic reports and dashboards",
      "Templates for everyone",
      "Development workflow",
      "Limitless business automation",
      "Knowledge management",
    ],
    buttons: [
      {
        label: "Start building",
        variant: "primary",
        size: "md",
        iconPosition: "after",
        href: "/start",
      },
      {
        label: "Get a demo",
        variant: "secondary",
        size: "lg",
        href: "/demo",
      },
    ] as ButtonType[],
  },
  defaultCustomerLogos: {
    heading: "You’ll be in good company",
    paragraph: "Trusted by thousands of customers worldwide.",
    logos: [
      {
        name: "Airbnb",
        src: "/turborepo-dark.svg",
        alt: "Airbnb logo",
      },
      {
        name: "Google",
        src: "/turborepo-dark.svg",
        alt: "Google logo",
      },
      {
        name: "Microsoft",
        src: "/turborepo-dark.svg",
        alt: "Microsoft logo",
      },
      {
        name: "Spotify",
        src: "/turborepo-dark.svg",
        alt: "Spotify logo",
      },
      {
        name: "Airbnb",
        src: "/turborepo-dark.svg",
        alt: "Airbnb logo",
      },
      {
        name: "Google",
        src: "/turborepo-dark.svg",
        alt: "Google logo",
      },
      {
        name: "Microsoft",
        src: "/turborepo-dark.svg",
        alt: "Microsoft logo",
      },
    ],
  },
};
