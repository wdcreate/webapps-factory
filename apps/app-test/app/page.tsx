import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";
import { dataConfig } from "./data/dataConfig";
import {DemoSection} from "@repo/ui/layouts/sections/presentation/DemoSection";
export default function Home() {
  return (
    <main className="">
      <ImageWithCTAButtonSection data={dataConfig.heroSection}/>
      <DemoSection data={dataConfig.featuresSection}/>
    </main>
  );
}
