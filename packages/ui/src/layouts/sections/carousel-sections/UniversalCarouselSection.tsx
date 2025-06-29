"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";
import { UniversalCarouselData } from "@repo/ui/types";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@repo/ui/components/ui/carousel";

export interface UniversalCarouselSectionProps<T = unknown> {
  data: UniversalCarouselData<T>;
  renderSlide: (slide: T, index: number) => React.ReactNode;
}

export function UniversalCarouselSection<T = unknown>({ 
  data, 
  renderSlide 
}: UniversalCarouselSectionProps<T>) {
  const {
    sectionId,
    title,
    subtitle,
    slides,
    backgroundSrc,
    autoPlay = false,
    autoPlayDelay = 3000,
    showDots = true,
    showArrows = true,
    slidesToShow = 1,
    className = "",
  } = data;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    autoPlay ? Autoplay({ delay: autoPlayDelay }) : undefined
  );

  const sectionStyle = backgroundSrc
    ? { backgroundImage: `url(${backgroundSrc})` }
    : undefined;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api]
  );

  return (
    <section
      id={sectionId}
      className={`bg-background bg-cover bg-center ${className}`}
      style={sectionStyle}
    >
      <div className={`section ${showArrows ? "md:px-14" : ""}`}>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {title && (
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          plugins={plugin.current ? [plugin.current] : undefined}
          className="w-full"
          onMouseEnter={plugin.current?.stop}
          onMouseLeave={plugin.current?.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {slides.map((slide, index) => (
              <CarouselItem
                key={`slide-${index}`}
                className={`pl-2 md:pl-4 ${
                  slidesToShow === 2
                    ? "md:basis-1/2"
                    : slidesToShow === 3
                    ? "md:basis-1/2 lg:basis-1/3"
                    : slidesToShow === 4
                    ? "md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    : "md:basis-full"
                }`}
              >
                {renderSlide(slide, index)}
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation */}
          {showArrows && slides.length > 1 && (
            <>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </>
          )}
        </Carousel>

        {/* Carousel Dots */}
        {showDots && slides.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index + 1 === current
                    ? "bg-primary"
                    : "bg-ring hover:bg-secondary"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}