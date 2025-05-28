import { HeaderDataType } from "@repo/ui/layouts/header/default";
import { DefaultCustomerLogosSection, DemoSectionData, FormConfig, ImageWithCTAData, MultiStepFormConfig } from "../../../packages/ui/src/types";
import { FooterDataType } from "@repo/ui/layouts/footer/GridFooter";

export interface dataConfigType {
  headerData: HeaderDataType;
  heroSection: ImageWithCTAData;
  featuresSection:DemoSectionData;
  defaultCustomerLogos: DefaultCustomerLogosSection;
  mainForm: FormConfig;
  ms_form: MultiStepFormConfig;
  footer: FooterDataType;
}