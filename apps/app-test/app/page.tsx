import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";
import { dataConfig } from "./data/dataConfig";
export default function Home() {
  return (
    <main className="">
      <ImageWithCTAButtonSection data={dataConfig.heroSection}/>
    </main>
  );
}
