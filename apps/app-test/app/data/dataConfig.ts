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
      { label: "Home", href: "/#home" },
      { label: "Destinations", href: "/#destinations" },
      { label: "Stories", href: "/#stories" },
      { label: "Tours", href: "/#tours" },
      { label: "Partners", href: "/#partners" },
    ],
    buttons: [
      { label: "Call now", href: "tel:10101010", variant: "ghost", size: "lg" },
      {
        label: "Book Now",
        href: "/#contact-us",
        variant: "default",
        size: "lg",
      },
    ],
    mobileContent: {
      label: "Contact Us",
      variant: "default",
      size: "sm",
      href: "/#contact-us",
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
    backgroundSrc: "/hero-bg.jpg",
  },
  featuresSection: {
    backgroundSrc: "/hero-bg.jpg",
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
     backgroundSrc: "/hero-bg.jpg",
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
    backgroundSrc: "/hero-bg.jpg",
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
  ms_form: {
    backgroundSrc: "/hero-bg.jpg",
    sectionId: "travel-booking",
    title: "Plan Your Dream Trip",
    description:
      "Complete this form to help us create the perfect travel experience for you",

    steps: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Tell us about yourself",
        validation: "onNext", // Validate when moving to next step
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
            name: "phone",
            label: "Phone Number",
            type: "text",
            placeholder: "+1 (555) 123-4567",
            required: true,
            validation: {
              pattern: "^\\+?[1-9]\\d{1,14}$",
            },
          },
          {
            name: "dateOfBirth",
            label: "Date of Birth",
            type: "date",
            required: true,
          },
        ],
      },

      {
        id: "travel-preferences",
        title: "Travel Preferences",
        description: "Help us understand what kind of trip you're looking for",
        validation: "onNext",
        fields: [
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
              {
                label: "Africa (Cape Town, Marrakech, Cairo)",
                value: "africa",
              },
              { label: "Oceania (Sydney, Auckland, Fiji)", value: "oceania" },
            ],
          },
          {
            name: "travelStyle1",
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
            name: "duration",
            label: "Trip Duration (days)",
            type: "number",
            required: true,
            placeholder: "7",
            validation: {
              min: 1,
              max: 365,
            },
          },
          {
            name: "groupSize",
            label: "Group Size",
            type: "select",
            required: true,
            options: [
              { label: "Solo Traveler", value: "1" },
              { label: "Couple", value: "2" },
              { label: "Small Group (3-5)", value: "3-5" },
              { label: "Large Group (6+)", value: "6+" },
            ],
          },
        ],
      },
      {
        id: "accommodation-transport",
        title: "Accommodation & Transport",
        description:
          "Let us know your preferences for stays and getting around",
        validation: "onNext",
        fields: [
          {
            name: "accommodationType",
            label: "Preferred Accommodation",
            type: "radio",
            required: true,
            options: [
              { label: "Hotels", value: "hotel" },
              { label: "Hostels", value: "hostel" },
              { label: "Vacation Rentals", value: "rental" },
              { label: "Mix of Options", value: "mix" },
            ],
          },
          {
            name: "transportPreference",
            label: "Transportation Preference",
            type: "select",
            required: true,
            options: [
              { label: "Public Transportation", value: "public" },
              { label: "Rental Car", value: "car" },
              { label: "Private Driver", value: "driver" },
              { label: "Walking/Cycling", value: "active" },
              { label: "Mix of Options", value: "mix" },
            ],
          },
          {
            name: "budget",
            label: "Budget per Person (USD)",
            type: "select",
            required: true,
            options: [
              { label: "Under $1,000", value: "under-1000" },
              { label: "$1,000 - $2,500", value: "1000-2500" },
              { label: "$2,500 - $5,000", value: "2500-5000" },
              { label: "$5,000 - $10,000", value: "5000-10000" },
              { label: "Over $10,000", value: "over-10000" },
            ],
          },
        ],
      },

      {
        id: "additional-preferences",
        title: "Additional Preferences",
        description: "Any special requirements or preferences?",
        validation: "onSubmit", // Only validate on final submit
        fields: [
          {
            name: "specialRequirements",
            label: "Special Requirements",
            type: "textarea",
            placeholder:
              "Any dietary restrictions, accessibility needs, or special occasions?",
            description:
              "Let us know about any special needs or occasions we should consider",
          },
          {
            name: "interests",
            label: "Main Interests",
            type: "textarea",
            placeholder:
              "What activities or experiences are you most excited about?",
            description: "Help us tailor recommendations to your interests",
          },
          {
            name: "newsletter",
            label: "Subscribe to travel tips and exclusive deals",
            type: "checkbox",
          },
          {
            name: "marketingConsent",
            label: "I agree to receive marketing communications",
            type: "checkbox",
          },
        ],
      },
    ],

    submitButton: {
      text: "Submit Travel Request",
      className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg",
    },

    navigation: {
      showStepNumbers: true,
      showStepTitles: true,
      allowSkipSteps: false, // Force users to go through steps in order
      showProgressBar: true,
      onlyProgressBar: false,
    },

    layout: "vertical", // Horizontal layout for better step visibility
    className: "bg-gray-50 min-h-screen py-8",
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
          { label: "Destinations", href: "/#destinations" },
          { label: "Tours", href: "/#tours" },
          { label: "Partners", href: "/#partners" },
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
