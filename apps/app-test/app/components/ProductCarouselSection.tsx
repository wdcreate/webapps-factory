"use client";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UniversalCarouselData } from "@repo/ui/types/index";
import { UniversalCarouselSection } from "@repo/ui/layouts/sections/carousel-sections/UniversalCarouselSection";

export interface ProductSlideType {
  id: string;
  image: { src: string; alt: string };
  title: string;
  description: string;
  button: { label: string; variant: string; size: string; href: string };
}

export function ProductCarouselSection({ data }: { data: UniversalCarouselData<ProductSlideType> }) {
  return (
    <UniversalCarouselSection
      data={data}
      renderSlide={(slide: ProductSlideType) => (
        <div className="bg-card rounded-lg overflow-hidden shadow-lg border">
          <div className="relative">
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
              {slide.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {slide.description}
            </p>
            <a href={slide.button.href} className="inline-block">
              <Button className="w-fit">
                {slide.button.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      )}
    />
  );
}