

export interface ImageWithCTAData {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  button: {
    text: string;
    variant: "secondary" | "ghost" | "default" | "link" | "destructive" | "outline" | null | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
  };
}
