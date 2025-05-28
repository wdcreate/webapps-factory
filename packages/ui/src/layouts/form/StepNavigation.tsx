import React from "react";
import clsx from "clsx";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { StepConfig } from "@repo/ui/types";

interface StepNavigationProps {
  steps: StepConfig[];
  currentStep: number;
  progress: number;
  onStepClick: (step: number) => void;
  canGoToStep: (step: number) => boolean;
  stepErrors: { [stepId: string]: boolean };
  showStepNumbers?: boolean;
  showStepTitles?: boolean;
  showProgressBar?: boolean;
  completedSteps: Set<number>;
  onlyProgressBar?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  progress,
  onStepClick,
  canGoToStep,
  stepErrors,
  showStepNumbers = true,
  showStepTitles = true,
  showProgressBar = true,
  completedSteps,
  onlyProgressBar,
}) => {
  const getStepIcon = (index: number, id: string) => {
    const isCompleted = completedSteps.has(index);
    const isCurrent = index === currentStep;
    const hasError = stepErrors[id];

    if (hasError && !isCurrent) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return (
      <Circle
        className={clsx("w-5 h-5", {
          "text-blue-500 fill-blue-500": isCurrent && showStepNumbers,
          "text-blue-500": isCurrent && !showStepNumbers,
          "text-gray-300": !isCurrent,
        })}
      />
    );
  };

  const getButtonClasses = (index: number, id: string) => {
    const isCompleted = completedSteps.has(index);
    const isCurrent = index === currentStep;
    const hasError = stepErrors[id];
    const clickable = canGoToStep(index);

    return clsx(
      "flex items-center gap-2 p-2 rounded-lg transition-colors",
      {
        "w-full": showStepTitles,
        "cursor-not-allowed opacity-50": !clickable,
        "cursor-pointer hover:bg-gray-50": clickable,
        "bg-blue-50 border-2 border-blue-200": isCurrent,
        "bg-green-50": isCompleted && !isCurrent,
        "bg-red-50": hasError && !isCurrent,
        "bg-gray-50": !isCurrent && !isCompleted && !hasError,
      }
    );
  };

  return (
    <div className="space-y-4">
      {showProgressBar && (
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!onlyProgressBar && (
        <div className="space-y-2">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => canGoToStep(idx) && onStepClick(idx)}
              className={getButtonClasses(idx, step.id)}
              disabled={!canGoToStep(idx)}
            >
              <div className="flex items-center gap-2">
                {getStepIcon(idx, step.id)}
                {showStepNumbers && (
                  <span
                    className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                      {
                        "bg-blue-500 text-white": idx === currentStep,
                        "bg-green-500 text-white": completedSteps.has(idx),
                        "bg-red-500 text-white": stepErrors[step.id],
                        "bg-gray-300 text-gray-700":
                          !completedSteps.has(idx) && !stepErrors[step.id] && idx !== currentStep,
                      }
                    )}
                  >
                    {idx + 1}
                  </span>
                )}
              </div>

              {showStepTitles && (
                <div className="flex-1 text-left">
                  <div
                    className={clsx("font-medium text-sm", {
                      "text-blue-700": idx === currentStep,
                      "text-green-700": completedSteps.has(idx),
                      "text-red-700": stepErrors[step.id],
                      "text-gray-600":
                        !completedSteps.has(idx) &&
                        !stepErrors[step.id] &&
                        idx !== currentStep,
                    })}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};