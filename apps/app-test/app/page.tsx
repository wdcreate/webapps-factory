import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";
import { dataConfig } from "./data/dataConfig";
import { GridSection } from "@repo/ui/layouts/grid/GridSection";
import { DemoSection } from "@repo/ui/layouts/sections/presentation/DemoSection";
import { DefaultCustomerLogos } from "@repo/ui/layouts/sections/customers/default";
import MainForm from "./components/MainForm";
import BookingForm from "./components/BookingForm";
import { ProductCarouselSection } from "./components/ProductCarouselSection";
import { ImagesCarouselSection } from "./components/ImagesCarousel";

export default function Home() {
  const handleLogin = async (data: FormData) => {
    console.log("Login data:", data);
    // Handle login logic
  };
  return (
    <main className="">

      <ImageWithCTAButtonSection data={dataConfig.heroSection} />
      <ProductCarouselSection data={dataConfig.productsCarousel} />

      <GridSection
        sectionId="destinations"
        columns={2}
        heading="Top Eco Destinations"
        reverse={false}
        wideColumnSpan={7}
        wideSide="left"
        bgSrc="/hero-bg.jpg"
      >
        <div className="w-full">
          <img
            src="/collage.jpg"
            alt="Collage of eco destinations"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6 text-left flex flex-col justify-center">
          <div>
            <h3 className="text-xl font-semibold">Amazon Rainforest</h3>
            <p className="mt-2">
              Journey deep into lush greenery, stay in eco-lodges, and support
              reforestation projects.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Himalayan Village Trek</h3>
            <p className="mt-2">
              Trek alongside local Sherpa communities, learn traditional crafts,
              and reduce your footprint.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Coral Reef Conservation</h3>
            <p className="mt-2">
              Snorkel in protected marine parks and help fund coral restoration
              with every dive.
            </p>
          </div>
        </div>
      </GridSection>
      <GridSection
        sectionId="stories"
        columns={2}
        heading="Traveler Stories"
        wideColumnSpan={7}
        wideSide="right"
        reverse={false}
      >
        <div className="space-y-6 text-left flex flex-col justify-center">
          <div>
            <h3 className="text-xl font-semibold">“A Life-Changing Journey”</h3>
            <p className="mt-2">
              “Our trip to Costa Rica not only thrilled us—it funded a local
              turtle release program. Truly unforgettable!”
              <span className="font-medium">– Sarah & Jason</span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">“Sustainable & Seamless”</h3>
            <p className="mt-2">
              “EcoTravel handled every detail, from carbon offsets to zero-waste
              accommodations. Five stars!”
              <span className="font-medium">– Marcus L.</span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              “Connecting with Communities”
            </h3>
            <p className="mt-2">
              “Staying in a Malagasy homestay was a highlight—authentic,
              respectful, and life-enriching.”
              <span className="font-medium">– Amina K.</span>
            </p>
          </div>
        </div>
        <div className="w-full">
          <img
            src="/travellers.avif"
            alt="Happy eco-traveler"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </GridSection>
      <ImagesCarouselSection data={dataConfig.imagesCarousel} />

      <DemoSection data={dataConfig.featuresSection} />
      <DefaultCustomerLogos data={dataConfig.defaultCustomerLogos} />
      <MainForm />
      <BookingForm />
    </main>
  );
}
