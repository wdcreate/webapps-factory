"use client";
import { MultiStepForm } from "@repo/ui/layouts/form/MultiStepForm";
import { FormDataType, StepConfig } from "@repo/ui/types/index";
import { dataConfig } from "../data/dataConfig";

export default function BookingForm() {
  const handleSubmit = async (data: FormDataType) => {
    console.log("Form submitted:", data);
    // Handle form submission
    await fetch("/api/travel-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const handleStepChange = (step: number, stepConfig: StepConfig) => {
    console.log(`Moved to step ${step + 1}: ${stepConfig.title}`);
    // Track analytics, save progress, etc.
  };

  return (
    <MultiStepForm
      config={dataConfig.ms_form}
      onSubmit={handleSubmit}
      onStepChange={handleStepChange}
    />
  );
}
