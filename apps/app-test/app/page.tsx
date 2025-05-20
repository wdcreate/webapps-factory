import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";
import { dataConfig } from "./data/dataConfig";
import { DemoSection } from "@repo/ui/layouts/sections/presentation/DemoSection";
import { DefaultCustomerLogos } from "@repo/ui/layouts/sections/customers/default";

export default function Home() {
  return (
    <main className="">
      <ImageWithCTAButtonSection data={dataConfig.heroSection} />
      <DemoSection data={dataConfig.featuresSection} />
      <DefaultCustomerLogos data={dataConfig.defaultCustomerLogos}/>
    </main>
  );
}
