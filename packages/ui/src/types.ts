

export interface ImageWithCTAData {
  reverseGrid?: boolean;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  button: {
    label: string;
    variant: "secondary" | "ghost" | "default" | "link" | "destructive" | "outline" | null | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
  };
}

export interface DemoSectionData {
  reverseGrid?: boolean;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    showOnMobile?: boolean;
  };
  features: string[];
  buttons: Array<{
    label: string;
    variant: "secondary" | "ghost" | "default" | "link" | "destructive" | "outline" | null | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    iconPosition?: "before" | "after";
    // for simplicity, we’ll assume arrow icon for primary, none for secondary
    href?: string;
    onClick?: () => void;
  }>;
}

export interface LogoItem {
  name: string;
  src: string;
  alt: string;
}

export interface DefaultCustomerLogosSection {
  heading: string;
  paragraph?: string;
  logos: LogoItem[];
}
