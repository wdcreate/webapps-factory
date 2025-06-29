"use client";
import { UniversalCarouselData } from "@repo/ui/types/index";
import { UniversalCarouselSection } from "@repo/ui/layouts/sections/carousel-sections/UniversalCarouselSection";

export interface ImagesSlideType {
  id: string;
  image: { src: string; alt: string };
 }

export function ImagesCarouselSection({ data }: { data: UniversalCarouselData<ImagesSlideType> }) {
  return (
    <UniversalCarouselSection
      data={data}
      renderSlide={(slide: ImagesSlideType) => (
        <div className="bg-card rounded-lg overflow-hidden shadow-lg border">
          <div className="relative">
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
        </div>
      )}
    />
  );
}