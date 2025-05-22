export interface ImageWithCTAData {
  sectionId?: string;
  reverseGrid?: boolean;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  button: ButtonType
}
export interface ButtonType {
   label: string;
    variant:
      | "secondary"
      | "ghost"
      | "default"
      | "link"
      | "destructive"
      | "outline"
      | null
      | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    href?: string;
    onClick?: () => void;
}

export interface DemoSectionData {
  sectionId?: string;
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
  buttons: ButtonType[];
}

export interface LogoItem {
  name: string;
  src: string;
  alt: string;
}

export interface DefaultCustomerLogosSection {
  sectionId?: string;
  heading: string;
  paragraph?: string;
  logos: LogoItem[];
}
