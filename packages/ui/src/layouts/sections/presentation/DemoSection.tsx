import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import { DemoSectionData } from "@repo/ui/types";
import GridSection from "../../grid/GridSection";

export interface DemoSectionProps {
  data: DemoSectionData;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ data }) => {
  return (
    <section  id={data.sectionId} className="bg-background section">
      <GridSection columns={2}>
        {data.image && (
          <div className={data.image.showOnMobile ? "min-w-[300px] w-[50%] sm:w-[75%] h-auto lg:w-full mx-auto" : "hidden md:block "}>
            <img
              className="w-full object-cover rounded-[var(--radius)]"
              src={data.image.src}
              alt={data.image.alt}
            />
          </div>
        )}

        <div className={`space-y-6 ${data.reverseGrid ? "order-first" : ""}`}>
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight text-primary">
              {data.title}
            </h2>

            {data.subtitle && (
              <p className="mt-2 text-base md:text-lg font-semibold text-secondary-foreground">
                {data.subtitle}
              </p>
            )}

            {data.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-base font-normal text-foreground"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <ul className="space-y-4">
              {data.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-6">
            {data.buttons.map((btn, i) => {
              const btnElem = (
                <Button
                  variant={btn.variant}
                  size={btn.size}
                  className="[&>span]:px-5 [&>span]:py-2.5"
                  onClick={btn.onClick}
                  key={i}
                >
                  {btn.iconPosition === "before" && <ChevronLeft />}
                  {btn.label}
                  {btn.iconPosition === "after" && (
                    <ArrowRight/>
                  )}
                </Button>
              );

              return btn.href ? (
                <a href={btn.href} key={i} className="flex itenms-center">
                  {btnElem}
                </a>
              ) : (
                btnElem
              );
            })}
          </div>
        </div>
      </GridSection>
    </section>
  );
};
