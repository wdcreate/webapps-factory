import { Button } from "@repo/ui/components/ui/button";
import { ImageWithCTAData } from "@repo/ui/types";
import { ArrowRight } from "lucide-react";

export interface ImageWithCTAProps {
  data: ImageWithCTAData;
}

export function ImageWithCTAButtonSection({ data }: ImageWithCTAProps) {
  const {
    image: { src, alt= "" },
    title,
    description,
    button: { text, variant, size },
  } = data;


  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl items-center md:grid md:grid-cols-2 grid2-gap section">
        <img src={src} alt={alt} className="w-full" />

        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">
            {title}
          </h2>

          <p className="mb-6 text-primary md:text-lg">
            {description}
          </p>

          <Button
            variant={variant}
            size={size}
            className="w-fit [&>span]:items-center"
          >
            {text}
    <ArrowRight/>
          </Button>
        </div>
      </div>
    </section>
  );
}
