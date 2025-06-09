import { DefaultCustomerLogosSection } from "@repo/ui/types";
import React from "react";

interface Props {
  data: DefaultCustomerLogosSection;
}

export const DefaultCustomerLogos: React.FC<Props> = ({ data }) => {
  
  const sectionStyle = data.backgroundSrc
    ? { backgroundImage: `url(${data.backgroundSrc})` }
    : undefined;

  return (
    <section id={data.sectionId} className="bg-background bg-cover bg-center" style={sectionStyle}>
    <div className="section">
      <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
        {data.heading}
      </h2>

      {data.paragraph && (
        <p className="mb-8 text-center text-foreground text-base max-w-2xl mx-auto">
          {data.paragraph}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4 lg:gap-8 text-text-foreground">
        {data.logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center gap-4 md:gap-12 max-w-[320px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-12 md:h-20 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};