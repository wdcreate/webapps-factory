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
    backgroundSrc,
    title,
    description,
    button: { label, variant, size, href, onClick },
    sectionId,
    reverseGrid,
  } = data;
  
  const sectionStyle = backgroundSrc
    ? { backgroundImage: `url(${backgroundSrc})` }
    : undefined;

  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className="w-fit [&>span]:items-center"
    >
      {label}
      <ArrowRight />
    </Button>
  );

  return (
    <section
      id={sectionId}
      className="bg-background bg-cover bg-center"
      style={sectionStyle}
    >
      <GridSection gridGap="gap-4 lg:gap-8">
        <div
          className={`min-w-[300px] w-[50%] sm:w-[75%] h-auto lg:w-full mx-auto ${
            reverseGrid ? "order-last" : ""
          }`}
        >
          <img src={src} alt={alt} className="w-full" />
        </div>

        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-2xl md:text-4xl font-extrabold tracking-tight text-primary">
            {title}
          </h2>

          <p className="mb-6 text-primary text-base md:text-lg">
            {description}
          </p>

          {href ? (
            <a href={href} rel="noopener noreferrer">
              {buttonElement}
            </a>
          ) : (
            buttonElement
          )}
        </div>
      </GridSection>
    </section>
  );
}
