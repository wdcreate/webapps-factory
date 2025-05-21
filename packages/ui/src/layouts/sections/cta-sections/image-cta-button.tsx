import { Button } from "@repo/ui/components/ui/button";
import { ImageWithCTAData } from "@repo/ui/types";
import { ArrowRight } from "lucide-react";
import GridSection from "../../grid/GridSection";

export interface ImageWithCTAProps {
  data: ImageWithCTAData;
}

export function ImageWithCTAButtonSection({ data }: ImageWithCTAProps) {
  const {
    image: { src, alt = "" },
    title,
    description,
    button: { label, variant, size },
    sectionId
  } = data;

  return (
    <section id={sectionId} className="bg-background section">
      <GridSection gridGap="gap-4 lg:gap-8">
        <div className={`min-w-[300px] w-[50%] sm:w-[75%] h-auto lg:w-full mx-auto ${data.reverseGrid ? "order-last" : ""}`}>
          <img src={src} alt={alt} className="w-full" />
        </div>

        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-2xl md:text-4xl font-extrabold tracking-tight text-primary">
            {title}
          </h2>

          <p className="mb-6 text-primary text-base md:text-lg">
            {description}
          </p>

          <Button
            variant={variant}
            size={size}
            className="w-fit [&>span]:items-center"
          >
            {label}
            <ArrowRight />
          </Button>
        </div>
      </GridSection>
    </section>
  );
}
