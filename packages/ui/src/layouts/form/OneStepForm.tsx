"use client";
import React from "react";
import { FormConfig, FormDataType } from "@repo/ui/types";
import { FormField } from "./FormFiled";
import { Button } from "@repo/ui/components/ui/button";
import { useForm } from "@repo/ui/hooks/useForm";
interface OneStepFormProps {
  config: FormConfig;
  onSubmit: (data: FormDataType) => Promise<void> | void;
  initialData?: Partial<FormDataType>;
  className?: string;
}
export const OneStepForm: React.FC<OneStepFormProps> = ({
  config,
  onSubmit,
  initialData,
  className,
}) => {
  const {
    data,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
  } = useForm(config, onSubmit, initialData);

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
    switch (config.layout) {
      case "horizontal":
        return "space-y-4";
      case "grid":
        return `grid gap-4 ${getGridCols()}`;
      default:
        return "space-y-4";
    }
  };
  const sectionStyle = config.backgroundSrc
    ? { backgroundImage: `url(${config.backgroundSrc})` }
    : undefined;

  return (
    <div
      id={config.sectionId}
      className={`bg-background bg-cover bg-center ${config.className || ""}`}
      style={sectionStyle}
    >
      <div className="section">
        {(config.title || config.description) && (
          <div className="py-4">
            {config.title && (
              <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl">
                {config.title}
              </h2>
            )}
            {config.description && (
              <p className="text-center">{config.description}</p>
            )}
          </div>
        )}
        <div className="lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={getLayoutClass()}>
              {config.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={data[field.name] ?? ""}
                  error={errors[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || config.submitButton?.disabled}
                className={`${config.submitButton?.className || ""}`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : config.submitButton?.text || "Submit"}
              </Button>

              {config.resetButton && (
                <Button
                  type="reset"
                  variant="outline"
                  onClick={handleReset}
                  className={` ${config.resetButton.className || ""}`}
                >
                  {config.resetButton.text}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
