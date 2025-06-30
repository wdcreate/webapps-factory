"use client";
import React from "react";
import clsx from "clsx";
import { Button } from "@repo/ui/components/ui/button";
import { StepNavigation } from "./StepNavigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMultiStepForm } from "@repo/ui/hooks/useMultiStepForm";
import { FormField } from "./FormFiled";
import { MultiStepFormProps } from "@repo/ui/types";

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  config,
  onSubmit,
  onStepChange,
  initialData,
  className,
}) => {
  const {
    data,
    errors,
    isSubmitting,
    handleChange,
    currentStep,
    currentStepConfig,
    isFirstStep,
    isLastStep,
    progress,
    prevStep,
    goToStep,
    handleStepSubmit,
    canGoToStep,
    stepErrors,
    completedSteps,
  } = useMultiStepForm(config, onSubmit, onStepChange, initialData);

  const getGridCols = () => {
    switch (config.gridCols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  const getLayoutClass = () => {
    if (config.layout === "grid") {
      return clsx("grid gap-4", getGridCols());
    }
    return "space-y-4";
  };

  const handleStepClick = (step: number) => {
    if (canGoToStep(step)) {
      goToStep(step);
    }
  };

  const sectionStyle = config.backgroundSrc
    ? { backgroundImage: `url(${config.backgroundSrc})` }
    : undefined;

  return (
    <div
      id={config.sectionId}
      className={clsx(" bg-background bg-cover bg-center", className)}
      style={sectionStyle}
    >
      <div className="section">
        {/* Header */}
        {(config.title || config.description) && (
          <div className="text-center mb-8">
            {config.title && (
              <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
                {config.title}
              </h2>
            )}
            {config.description && (
              <p className="text-lg text-gray-600">{config.description}</p>
            )}
          </div>
        )}

        <div
          className={clsx({
            "flex flex-col gap-8": config.navigation?.onlyProgressBar,
            "grid grid-cols-1 lg:grid-cols-4 gap-8":
              !config.navigation?.onlyProgressBar,
          })}
        >
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky top-[85px]">
              <StepNavigation
                steps={config.steps}
                currentStep={currentStep}
                progress={progress}
                onStepClick={handleStepClick}
                canGoToStep={canGoToStep}
                stepErrors={stepErrors}
                showStepNumbers={config.navigation?.showStepNumbers}
                showStepTitles={config.navigation?.showStepTitles}
                showProgressBar={config.navigation?.showProgressBar}
                completedSteps={completedSteps}
                onlyProgressBar={config.navigation?.onlyProgressBar}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm lg:border lg:p-6">
              {/* Current Step Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentStepConfig.title}
                </h3>
                {currentStepConfig.description && (
                  <p className="text-gray-600">
                    {currentStepConfig.description}
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleStepSubmit} className="space-y-6">
                <div className={getLayoutClass()}>
                  {currentStepConfig.fields.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      value={data[field.name] ?? ""}
                      error={errors[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                </div>

                {/* Form Navigation */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <div>
                    {!isFirstStep && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="text-sm text-gray-500">
                      Step {currentStep + 1} of {config.steps.length}
                    </span>

                    {isLastStep ? (
                      <Button
                        type="submit"
                        disabled={isSubmitting || config.submitButton?.disabled}
                        className={clsx(
                          "flex items-center gap-2",
                          config.submitButton?.className
                        )}
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : config.submitButton?.text || "Submit"}
                      </Button>
                    ) : (
                      <Button type="submit" className="flex items-center gap-2">
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
