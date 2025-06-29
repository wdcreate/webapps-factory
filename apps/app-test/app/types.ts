import { HeaderDataType } from "@repo/ui/layouts/header/default";
import { UniversalCarouselData, DefaultCustomerLogosSection, DemoSectionData, FormConfig, ImageWithCTAData, MultiStepFormConfig } from "@repo/ui/types/index";
import { FooterDataType } from "@repo/ui/layouts/footer/GridFooter";
import { ProductSlideType } from "./components/ProductCarouselSection";
import { ImagesSlideType } from "./components/ImagesCarousel";

export interface dataConfigType {
  headerData: HeaderDataType;
  heroSection: ImageWithCTAData;
  productsCarousel: UniversalCarouselData<ProductSlideType>,
  imagesCarousel: UniversalCarouselData<ImagesSlideType>,
  featuresSection:DemoSectionData;
  defaultCustomerLogos: DefaultCustomerLogosSection;
  mainForm: FormConfig;
  ms_form: MultiStepFormConfig;
  footer: FooterDataType;
}