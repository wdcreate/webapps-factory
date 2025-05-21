import { HeaderDataType } from "@repo/ui/layouts/header/default";
import { DefaultCustomerLogosSection, DemoSectionData, ImageWithCTAData } from "../../../packages/ui/src/types";

export interface dataConfigType {
  headerData: HeaderDataType;
  heroSection: ImageWithCTAData;
  featuresSection:DemoSectionData;
  defaultCustomerLogos: DefaultCustomerLogosSection;
}