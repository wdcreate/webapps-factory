// MultiStepForm.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi, describe, it, beforeEach, expect, MockedFunction } from "vitest";

import {
  MultiStepForm,
  MultiStepFormProps,
} from "@repo/ui/layouts/form/MultiStepForm";
import { useMultiStepForm } from "@repo/ui/hooks/useMultiStepForm";
import type {
  MultiStepFormConfig,
  StepConfig,
  UseMultiStepFormReturn,
  FormFieldConfig,
} from "@repo/ui/types/index.js";

vi.mock("@repo/ui/hooks/useMultiStepForm");
vi.mock("./StepNavigation.js", () => ({
  StepNavigation: ({
    steps,
    currentStep,
    onStepClick,
  }: {
    steps: StepConfig[];
    currentStep: number;
    onStepClick: (step: number) => void;
  }) => (
    <nav data-testid="step-navigation">
      {steps.map((_, idx) => (
        <button
          key={idx}
          data-testid={`nav-step-${idx}`}
          disabled={idx === currentStep}
          onClick={() => onStepClick(idx)}
        >
          {`Go to ${idx + 1}`}
        </button>
      ))}
    </nav>
  ),
}));
vi.mock("./FormFiled.js", () => ({
  FormField: ({
    field,
    value,
    error,
    onChange,
  }: {
    field: FormFieldConfig;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid={`field-${field.name}`}
      name={field.name}
      value={value}
      aria-invalid={!!error}
      onChange={onChange}
    />
  ),
}));

describe("MultiStepForm", () => {
  const step1: StepConfig = {
    id: "step1",
    title: "Step One",
    description: "First name",
    fields: [{ name: "firstName", label: "First Name", type: "text" }],
    validation: "onNext",
  };
  const step2: StepConfig = {
    id: "step2",
    title: "Step Two",
    fields: [{ name: "lastName", label: "Last Name", type: "text" }],
  };

  let mockUse: MockedFunction<typeof useMultiStepForm>;
  let baseHook: Partial<UseMultiStepFormReturn>;

  beforeEach(() => {
    mockUse = vi.mocked(useMultiStepForm);

    baseHook = {
      data: { firstName: "", lastName: "" },
      errors: {},
      isSubmitting: false,
      handleChange: vi.fn(),
      currentStep: 0,
      currentStepConfig: step1,
      isFirstStep: true,
      isLastStep: false,
      progress: 0,
      prevStep: vi.fn(),
      goToStep: vi.fn(),
      handleStepSubmit: vi.fn().mockResolvedValue(undefined),
      canGoToStep: () => false,
      stepErrors: {},
      completedSteps: new Set<number>(),
    };

    // Cast through unknown to skip extra fields
    mockUse.mockReturnValue(baseHook as unknown as UseMultiStepFormReturn);
  });

  function renderForm(
    cfgOverride: Partial<MultiStepFormConfig> = {},
    propsOverride: Partial<MultiStepFormProps> = {},
  ) {
    const config: MultiStepFormConfig = {
      sectionId: "my-section",
      backgroundSrc: "/bg.png",
      title: "Title",
      description: "Desc",
      className: "custom-form-class",
      layout: "grid",
      gridCols: 2,
      navigation: {
        showStepNumbers: true,
        showStepTitles: true,
        showProgressBar: true,
        allowSkipSteps: false,
        onlyProgressBar: false,
      },
      submitButton: {
        text: "Finish",
        className: "btn-primary",
        disabled: false,
      },
      steps: [step1, step2],
      ...cfgOverride,
    };
    const onSubmit = vi.fn();
    const props: MultiStepFormProps = { config, onSubmit, ...propsOverride };
    return { ...render(<MultiStepForm {...props} />), config, onSubmit };
  }

  it("renders root with id, custom class and background", () => {
    const { container, config } = renderForm();
    const root = container.querySelector(`#${config.sectionId}`);
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("custom-form-class");
    expect(root).toHaveStyle(`background-image: url(${config.backgroundSrc})`);
  });

  // it("shows only first step field (via its label) and Next button", () => {
  //   renderForm();

  //   const firstLabel = screen.getByText(/first name/i, { selector: "label" });
  //   expect(firstLabel).toBeInTheDocument();
  //   expect(firstLabel).toHaveAttribute("for", "firstName");

  //   const firstInput = screen.getByLabelText(/first name/i);
  //   expect(firstInput).toBeInTheDocument();

  //   expect(screen.queryByLabelText(/last name/i)).toBeNull();

  //   const next = screen.getByRole("button", { name: /next/i });
  //   expect(next).toBeEnabled();

  //   userEvent.click(next);
  //   expect(baseHook.handleStepSubmit).toHaveBeenCalled();
  // });

  it("does not render Previous on first step", () => {
    renderForm();
    expect(screen.queryByRole("button", { name: /previous/i })).toBeNull();
  });

  // it("renders second step with Previous and Submit", async () => {
  //   // Next render: simulate last step
  //   mockUse.mockReturnValueOnce({
  //     ...(baseHook as UseMultiStepFormReturn),
  //     currentStep: 1,
  //     currentStepConfig: step2,
  //     isFirstStep: false,
  //     isLastStep: true,
  //     progress: 50,
  //     canGoToStep: () => true,
  //   });

  //   const { config } = renderForm();
  //   expect(screen.getByTestId("field-lastName")).toBeInTheDocument();

  //   const prev = screen.getByRole("button", { name: /previous/i });
  //   userEvent.click(prev);
  //   expect(baseHook.prevStep).toHaveBeenCalled();

  //   const submit = screen.getByRole("button", { name: config.submitButton!.text });
  //   expect(submit).toBeEnabled();
  //   expect(submit).toHaveClass("btn-primary");
  //   userEvent.click(submit);
  //   await waitFor(() =>
  //     expect(baseHook.handleStepSubmit).toHaveBeenCalled()
  //   );
  // });

  // it("blocks nav clicks when canGoToStep is false", () => {
  //   renderForm();
  //   const btn = screen.getByTestId("nav-step-1");
  //   userEvent.click(btn);
  //   expect(baseHook.goToStep).not.toHaveBeenCalled();
  // });

  // it("allows nav clicks when canGoToStep is true", () => {
  //   mockUse.mockReturnValueOnce({
  //     ...(baseHook as UseMultiStepFormReturn),
  //     canGoToStep: (n) => n === 1,
  //   });

  //   renderForm();
  //   userEvent.click(screen.getByTestId("nav-step-0"));
  //   expect(baseHook.goToStep).not.toHaveBeenCalled();
  //   userEvent.click(screen.getByTestId("nav-step-1"));
  //   expect(baseHook.goToStep).toHaveBeenCalledWith(1);
  // });

  it("applies correct grid classes for grid layout", () => {
    const { container } = renderForm({ layout: "grid", gridCols: 3 });
    const grid = container.querySelector("form > div");
    expect(grid).toHaveClass(
      "grid",
      "gap-4",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
    );
  });

  it("falls back to vertical layout when not grid", () => {
    const { container } = renderForm({ layout: "vertical" });
    const div = container.querySelector("form > div");
    expect(div).toHaveClass("space-y-4");
  });

  it("disables submit when submitButton.disabled is true", () => {
    // keep isSubmitting false
    mockUse.mockReturnValueOnce({
      ...(baseHook as UseMultiStepFormReturn),
      currentStep: 1,
      currentStepConfig: step2,
      isFirstStep: false,
      isLastStep: true,
    });
    const { config } = renderForm({
      submitButton: { text: "Go", className: "", disabled: true },
    });
    const btn = screen.getByRole("button", { name: /go/i });
    expect(btn).toBeDisabled();
  });

  it("disables and shows 'Submitting...' when isSubmitting is true", () => {
    mockUse.mockReturnValueOnce({
      ...(baseHook as UseMultiStepFormReturn),
      currentStep: 1,
      currentStepConfig: step2,
      isFirstStep: false,
      isLastStep: true,
      isSubmitting: true,
    });
    renderForm();
    const btn = screen.getByRole("button", { name: /submitting/i });
    expect(btn).toBeDisabled();
  });

  it("uses onlyProgressBar layout when enabled", () => {
    const { container } = renderForm({
      navigation: { onlyProgressBar: true },
    });
    const onlyBarDiv = container.querySelector(".flex.flex-col.gap-8");
    expect(onlyBarDiv).toBeInTheDocument();
  });
});
