/// <reference types="vitest" />

import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { FormEvent } from "react";

import { useMultiStepForm } from "@repo/ui/hooks/useMultiStepForm";
import type {
  StepConfig,
  MultiStepFormConfig,
  FormDataType,
  FormFieldConfig,
} from "@repo/ui/types";

// 1) Mock the useForm module
vi.mock("@repo/ui/hooks/useForm", () => ({
  useForm: vi.fn(),
}));

// 2) Grab the mocked useForm so we can control its return
import { useForm as mockedUseForm } from "@repo/ui/hooks/useForm";

// 3) Fake form methods interface
interface MockFormMethods {
  data: Record<string, unknown>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleChange: Mock;
  handleSubmit: Mock;
  handleReset: Mock;
  setErrors: Mock;
  clearErrors: Mock;
  validateField: Mock;
  validateForm: Mock;
}

let mockFormMethods: MockFormMethods;

beforeEach(() => {
  vi.clearAllMocks();

  mockFormMethods = {
    data: {},
    errors: {},
    isSubmitting: false,
    handleChange: vi.fn(),
    handleSubmit: vi.fn(),
    handleReset: vi.fn(),
    setErrors: vi.fn((errs: Record<string, string>) => {
      mockFormMethods.errors = { ...errs };
    }),
    clearErrors: vi.fn(() => {
      mockFormMethods.errors = {};
    }),
    validateField: vi.fn(() => null),
    validateForm: vi.fn(() => true),
  };

  // Return our fake methods from useForm()
  (mockedUseForm as Mock).mockReturnValue(mockFormMethods);
});

// --- Sample Step Configs ---

const step1: StepConfig = {
  id: "step1",
  title: "Step One",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "age", label: "Age", type: "number" },
  ],
  validation: "onNext",
};

const step2: StepConfig = {
  id: "step2",
  title: "Step Two",
  fields: [{ name: "email", label: "Email", type: "email", required: true }],
  validation: "onSubmit",
};

function makeConfig(
  steps: StepConfig[],
  allowSkip = false,
): MultiStepFormConfig {
  return {
    sectionId: "test-section",
    title: "Test Form",
    description: "Testing multi-step form",
    steps,
    navigation: { allowSkipSteps: allowSkip },
  };
}

// --- Tests ---

describe("useMultiStepForm", () => {
  it("flattens config and initializes defaults", () => {
    const onSubmit = vi.fn();
    const onStepChange = vi.fn();
    const initialData: Partial<FormDataType> = { name: "Alice" };

    const { result } = renderHook(() =>
      useMultiStepForm(
        makeConfig([step1, step2]),
        onSubmit,
        onStepChange,
        initialData,
      ),
    );

    // Ensure useForm was called exactly once
    expect(mockedUseForm).toHaveBeenCalledTimes(1);

    // Safely grab the first call (coalesce undefined to empty array)
    const calls = (mockedUseForm as Mock).mock.calls ?? [];
    expect(calls.length).toBe(1);

    // Destructure the first call tuple
    const [flatConfig, submitCb, initData] = calls[0] as [
      { fields: FormFieldConfig[] },
      typeof onSubmit,
      typeof initialData,
    ];

    // Assert initialData and onSubmit passed through
    expect(initData).toEqual(initialData);
    expect(submitCb).toBe(onSubmit);

    // Check that the flattened fields are correct
    const names = flatConfig.fields.map((f) => f.name);
    expect(names).toEqual(["name", "age", "email"]);

    // Default hook state
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
    expect(result.current.progress).toBe(50);
    expect(result.current.completedSteps.size).toBe(0);
    expect(result.current.stepErrors).toEqual({ step1: false, step2: false });
  });

  it("nextStep advances on valid step", () => {
    const onSubmit = vi.fn();
    const onStepChange = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2]), onSubmit, onStepChange),
    );

    act(() => {
      mockFormMethods.data.name = "Bob";
      mockFormMethods.data.age = 30;
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(onStepChange).toHaveBeenCalledWith(1, step2);
    expect(result.current.completedSteps.has(0)).toBe(true);
    expect(mockFormMethods.setErrors).toHaveBeenCalledWith({});
  });

  it("blocks nextStep when validation fails", () => {
    mockFormMethods.validateField.mockImplementationOnce(() => "Required");

    const onSubmit = vi.fn();
    const onStepChange = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2]), onSubmit, onStepChange),
    );

    act(() => {
      mockFormMethods.data.name = "";
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(0);
    expect(mockFormMethods.setErrors).toHaveBeenCalled();
    const errs = mockFormMethods.setErrors.mock.calls.slice(-1)[0]![0];
    expect(errs).toHaveProperty("name", "Required");
    expect(result.current.completedSteps.size).toBe(0);
  });

  it("skips validation when disabled", () => {
    // Cast validation to the exact union literal
    const disabledStep: StepConfig = {
      ...step1,
      validation: "disabled",
    };

    const onSubmit = vi.fn();
    const onStepChange = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm(
        makeConfig([disabledStep, step2]),
        onSubmit,
        onStepChange,
      ),
    );

    // Even if validateField returns an error, we should skip validation
    mockFormMethods.validateField.mockImplementationOnce(() => "Error");

    act(() => {
      mockFormMethods.data.name = "";
      result.current.nextStep();
    });

    // Should have advanced despite the 'error'
    expect(result.current.currentStep).toBe(1);
    expect(result.current.completedSteps.has(0)).toBe(true);
  });

  it("prevStep navigates back but not before 0", () => {
    const onSubmit = vi.fn();
    const onStepChange = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2]), onSubmit, onStepChange),
    );

    act(() => result.current.prevStep());
    expect(result.current.currentStep).toBe(0);

    act(() => {
      mockFormMethods.data.name = "X";
      result.current.nextStep();
    });
    act(() => result.current.prevStep());
    expect(result.current.currentStep).toBe(0);
    expect(onStepChange).toHaveBeenLastCalledWith(0, step1);
  });

  it("goToStep & canGoToStep respect allowSkipSteps flag", () => {
    const onSubmit = vi.fn();
    const { result: noSkip } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2], false), onSubmit),
    );

    expect(noSkip.current.canGoToStep(1)).toBe(false);
    act(() => noSkip.current.goToStep(1));
    expect(noSkip.current.currentStep).toBe(0);

    act(() => {
      mockFormMethods.data.name = "Y";
      noSkip.current.nextStep();
    });
    expect(noSkip.current.canGoToStep(1)).toBe(true);
    act(() => noSkip.current.goToStep(1));
    expect(noSkip.current.currentStep).toBe(1);

    const { result: skip } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2], true), onSubmit),
    );
    expect(skip.current.canGoToStep(1)).toBe(true);
    act(() => skip.current.goToStep(1));
    expect(skip.current.currentStep).toBe(1);
    // allowSkipSteps bypasses bounds => 99 is allowed
    act(() => skip.current.goToStep(99));
    expect(skip.current.currentStep).toBe(99);
  });

  it("handleStepSubmit advances or submits correctly", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useMultiStepForm(makeConfig([step1, step2]), onSubmit),
    );
    const fakeEvt = { preventDefault: vi.fn() } as unknown as FormEvent;

    // intermediate step: currentStep should increment
    await act(async () => {
      await result.current.handleStepSubmit(fakeEvt);
    });
    expect(fakeEvt.preventDefault).toHaveBeenCalled();
    expect(result.current.currentStep).toBe(1);

    // move to last
    act(() => {
      mockFormMethods.data.name = "Z";
      result.current.nextStep();
    });

    mockFormMethods.validateForm.mockReturnValueOnce(false);
    await act(async () => {
      await result.current.handleStepSubmit(fakeEvt);
    });
    expect(mockFormMethods.handleSubmit).not.toHaveBeenCalled();

    mockFormMethods.validateForm.mockReturnValueOnce(true);
    await act(async () => {
      await result.current.handleStepSubmit(fakeEvt);
    });
    expect(mockFormMethods.handleSubmit).toHaveBeenCalledWith(fakeEvt);
  });

  it("calculates progress over N steps", () => {
    const three = [
      { ...step1, id: "s1" },
      { ...step2, id: "s2" },
      { ...step1, id: "s3" },
    ];
    const { result } = renderHook(() =>
      useMultiStepForm(makeConfig(three), vi.fn()),
    );

    expect(result.current.progress).toBeCloseTo(100 / 3, 5);
    act(() => {
      mockFormMethods.data.name = "A";
      result.current.nextStep();
    });
    expect(result.current.progress).toBeCloseTo((2 / 3) * 100, 5);
  });
});
