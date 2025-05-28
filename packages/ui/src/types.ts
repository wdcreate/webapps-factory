export interface ImageWithCTAData {
  sectionId?: string;
  reverseGrid?: boolean;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  button: ButtonType
}
export interface ButtonType {
   label: string;
    variant:
      | "secondary"
      | "ghost"
      | "default"
      | "link"
      | "destructive"
      | "outline"
      | null
      | undefined;
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    href?: string;
    onClick?: () => void;
}

export interface DemoSectionData {
  sectionId?: string;
  reverseGrid?: boolean;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
    showOnMobile?: boolean;
  };
  features: string[];
  buttons: ButtonType[];
}

export interface LogoItem {
  name: string;
  src: string;
  alt: string;
}

export interface DefaultCustomerLogosSection {
  sectionId?: string;
  heading: string;
  paragraph?: string;
  logos: LogoItem[];
}
//onestepform

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'file';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: string | number | boolean) => string | null;
  };
  className?: string;
  description?: string;
}

export interface FormConfig {
  sectionId?: string;
  title?: string;
  description?: string;
  fields: FormFieldConfig[];
  submitButton?: {
    text: string;
    className?: string;
    disabled?: boolean;
  };
  resetButton?: {
    text: string;
    className?: string;
  };
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridCols?: 1 | 2 | 3 | 4;
  className?: string;
}

export interface FormDataType {
  [key: string]: string | number | boolean | File | null;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormReturn {
  data: FormDataType;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (name: string, value: string | number | boolean | File | null) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
  validateField: (name: string, value: string | number | boolean | File | null) => string | null;
  validateForm: () => boolean;
}

//multistepform
export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  validation?: 'onNext' | 'onSubmit' | 'disabled'; // When to validate this step
}

export interface MultiStepFormConfig {
  formId?: string;
  title?: string;
  description?: string;
  steps: StepConfig[];
  submitButton?: {
    text: string;
    className?: string;
    disabled?: boolean;
  };
  navigation?: {
    showStepNumbers?: boolean;
    showStepTitles?: boolean;
    allowSkipSteps?: boolean;
    showProgressBar?: boolean;
    onlyProgressBar?: boolean; 
  };
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridCols?: 1 | 2 | 3 | 4;
  className?: string;
}

export interface UseMultiStepFormReturn extends Omit<UseFormReturn, 'handleSubmit'> {
  currentStep: number;
  currentStepConfig: StepConfig;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  handleStepSubmit: (e: React.FormEvent) => Promise<void>;
  canGoToStep: (step: number) => boolean;
  stepErrors: { [stepId: string]: boolean };
  completedSteps: Set<number>;
}

export interface MultiStepFormProps {
  config: MultiStepFormConfig;
  onSubmit: (data: FormDataType) => Promise<void> | void;
  onStepChange?: (step: number, stepConfig: StepConfig) => void;
  initialData?: Partial<FormDataType>;
  className?: string;
}