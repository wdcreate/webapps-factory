import { ButtonType } from "../../../../packages/ui/src/types";
import { dataConfigType } from "../types";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

export const dataConfig: dataConfigType = {
  headerData: {
    logo: {
      src: "/logo.png",
      alt: "EcoTravel Logo",
      href: "/",
    },
    links: [
      { label: "Home", href: "#home" },
      { label: "Destinations", href: "#destinations" },
      { label: "Stories", href: "#stories" },
      { label: "Tours", href: "#tours" },
      { label: "Partners", href: "#partners" },
    ],
    buttons: [
      { label: "Call now", href: "tel:10101010", variant: "ghost", size: "lg" },
      { label: "Book Now", href: "#contact-us", variant: "default", size: "lg" },
    ],
    mobileContent: {
      label: "Contact Us",
      variant: "default",
      size: "sm",
      href: "#contact-us",
    },
  },
  heroSection: {
    sectionId: "home",
    reverseGrid: false,
    image: {
      src: "/map.avif",
      alt: "World map illustration",
    },
    title: "Explore the World Sustainably with EcoTravel",
    description:
      "Join thousands of eco-conscious travelers on unforgettable journeys that respect our planet. Discover remote destinations, support local communities, and leave only footprints.",
    button: {
      label: "Start Your Adventure",
      variant: "default",
      size: "lg",
    },
  },
  featuresSection: {
    sectionId: "tours",
    reverseGrid: false,
    title: "Why Choose EcoTravel",
    subtitle:
      "Our platform offers tailored eco-tours, carbon offset options, and community-focused experiences.",
    paragraphs: [
      "Curated tours led by local guides committed to sustainable practices.",
      "Transparent carbon offset tracking for every trip you take.",
    ],
    image: {
      src: "/tour.avif",
      alt: "Eco-friendly tour illustration",
      showOnMobile: true,
    },
    features: [
      "Customizable green itineraries",
      "Verified eco-certified accommodations",
      "Real-time impact dashboard",
      "Local community partnerships",
      "24/7 traveler support",
    ],
    buttons: [
      {
        label: "View Tours",
        variant: "secondary",
        size: "default",
        iconPosition: "after",
        href: "/tours",
      },
      {
        label: "Contact Us",
        variant: "default",
        size: "lg",
        href: "/contact",
      },
    ] as ButtonType[],
  },
  defaultCustomerLogos: {
    sectionId: "partners",
    heading: "Trusted by Conscious Travelers",
    paragraph:
      "Our community includes explorers from around the globe who care about the planet.",
    logos: [
      { name: "GreenPeace", src: "/greenpeace.png", alt: "GreenPeace logo" },
      { name: "WWF", src: "/wwf.png", alt: "WWF logo" },
      { name: "UNEP", src: "/unep.png", alt: "UN Environment Programme" },
      {
        name: "Rainforest Alliance",
        src: "/ra.png",
        alt: "Rainforest Alliance logo",
      },
      {
        name: "National Geographic",
        src: "/ng.png",
        alt: "National Geographic logo",
      },
      { name: "Patagonia", src: "/patagonia.svg", alt: "Patagonia logo" },
      { name: "Earthwatch", src: "/ew.png", alt: "Earthwatch logo" },
    ],
  },
  mainForm: {
    sectionId: "contact-us",
    title: "Plan Your Dream Trip",
    description:
      "Tell us about your travel preferences and we'll help you create an amazing experience",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
          pattern: "^[a-zA-Z\\s]+$",
        },
        description: "Your name as it appears on your passport",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        required: true,
        description: "We'll send your travel itinerary to this email",
      },
      {
        name: "destination",
        label: "Preferred Destination",
        type: "select",
        required: true,
        placeholder: "Choose your destination",
        options: [
          { label: "Europe (Paris, Rome, Barcelona)", value: "europe" },
          { label: "Asia (Tokyo, Bangkok, Singapore)", value: "asia" },
          {
            label: "North America (New York, Los Angeles, Toronto)",
            value: "north-america",
          },
          {
            label: "South America (Rio, Buenos Aires, Lima)",
            value: "south-america",
          },
          { label: "Africa (Cape Town, Marrakech, Cairo)", value: "africa" },
          { label: "Oceania (Sydney, Auckland, Fiji)", value: "oceania" },
        ],
      },
      {
        name: "travelStyle",
        label: "Travel Style",
        type: "radio",
        required: true,
        options: [
          { label: "Budget Backpacker", value: "budget" },
          { label: "Comfort Traveler", value: "comfort" },
          { label: "Luxury Explorer", value: "luxury" },
          { label: "Adventure Seeker", value: "adventure" },
        ],
      },
      {
        name: "newsletter",
        label: "Subscribe to travel tips and exclusive deals",
        type: "checkbox",
      },
    ],
    submitButton: {
      text: "Start Planning My Trip",
      className: "w-full sm:w-auto",
    },
    resetButton: {
      text: "Clear Form",
    },
    layout: "vertical",
    className: "max-w-2xl",
  },
  footer: {
    logo: { src: "/logo.png", alt: "EcoTravel", href: "/" },
    columns: [
      /* {
        title: "COMPANY",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" },
        ],
      }, */
      {
        title: "EXPLORE",
        links: [
          { label: "Destinations", href: "#destinations" },
          { label: "Tours", href: "#tours" },
          { label: "Partners", href: "#partners" },
        ],
      },
      {
        title: "LEGAL",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Cookie Policy", href: "/cookies" },
        ],
      },
    ],
    copyright: "© 2025 EcoTravel™. All Rights Reserved.",
    socialLinks: [
      {
        icon: Facebook,
        href: "https://facebook.com/ecotravel",
        label: "Facebook",
      },
      {
        icon: Instagram,
        href: "https://instagram.com/ecotravel",
        label: "Instagram",
      },
      {
        icon: Twitter,
        href: "https://twitter.com/ecotravel",
        label: "Twitter",
      },
      {
        icon: Youtube,
        href: "https://youtube.com/ecotravel",
        label: "YouTube",
      },
      { icon: Github, href: "https://github.com/ecotravel", label: "GitHub" },
    ],
  },
};
