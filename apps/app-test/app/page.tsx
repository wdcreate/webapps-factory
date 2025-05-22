import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";
import { dataConfig } from "./data/dataConfig";
import { GridSection } from "@repo/ui/layouts/grid/GridSection";
import { DemoSection } from "@repo/ui/layouts/sections/presentation/DemoSection";
import { DefaultCustomerLogos } from "@repo/ui/layouts/sections/customers/default";

export default function Home() {
  return (
    <main className="">
      <GridSection
        columns={2}
        heading="Our Features"
        reverse={false}
        //text="Everything you need to build custom UIs fast."
      >
        <div>
          <img
            src="/turborepo-dark.svg"
            alt="Illustration"
            className="w-full max-w-sm"
          />
        </div>
        {/* stacking two feature blocks inside one column */}
        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-xl font-semibold">Blazing fast</h3>
            <p className="mt-2">
              Components that ship with zero runtime overhead.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Rock‑solid</h3>
            <p className="mt-2">Fully‑typed and tree‑shakable.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Rock‑solid</h3>
            <p className="mt-2">Fully‑typed and tree‑shakable.</p>
          </div>
        </div>
      </GridSection>
      <GridSection
        columns={2}
        //heading="Our Features"
        wideColumnSpan={9}
        wideSide="right"
        //reverse={false}
        //text="Everything you need to build custom UIs fast."
      >
        <div>
          <img
            src="/turborepo-dark.svg"
            alt="Illustration"
            className="w-full max-w-sm"
          />
        </div>
        {/* stacking two feature blocks inside one column */}
        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-xl font-semibold">Blazing fast</h3>
            <p className="mt-2">
              Components that ship with zero runtime overhead.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Rock‑solid</h3>
            <p className="mt-2">Fully‑typed and tree‑shakable.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Rock‑solid</h3>
            <p className="mt-2">Fully‑typed and tree‑shakable.</p>
          </div>
        </div>
      </GridSection>

      <ImageWithCTAButtonSection data={dataConfig.heroSection} />
      <DemoSection data={dataConfig.featuresSection} />
      <DefaultCustomerLogos data={dataConfig.defaultCustomerLogos} />
     
    </main>
  );
}
