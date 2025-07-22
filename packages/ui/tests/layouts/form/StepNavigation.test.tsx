import { render, screen, fireEvent } from "@testing-library/react";
import { StepNavigation } from "../../../src/layouts/form/StepNavigation";

const steps = [
  { id: "step1", title: "Step 1", description: "First step", fields: [] },
  { id: "step2", title: "Step 2", description: "Second step", fields: [] },
  { id: "step3", title: "Step 3", description: "Third step", fields: [] },
];

describe("StepNavigation", () => {
  const defaultProps = {
    steps,
    currentStep: 1,
    progress: 50,
    onStepClick: vi.fn(),
    canGoToStep: (step: number) => step <= 1,
    stepErrors: { step2: false, step3: true },
    showStepNumbers: true,
    showStepTitles: true,
    showProgressBar: true,
    completedSteps: new Set([0]),
    onlyProgressBar: false,
  };

  it("renders progress bar and step information", () => {
    render(<StepNavigation {...defaultProps} />);
    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    expect(screen.getByText("50% Complete")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders step numbers and titles", () => {
    render(<StepNavigation {...defaultProps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("Second step")).toBeInTheDocument();
    expect(screen.getByText("Third step")).toBeInTheDocument();
  });

  it("disables steps that cannot be clicked", () => {
    render(<StepNavigation {...defaultProps} />);
    const step3Button = screen.getByText("Step 3").closest("button");
    expect(step3Button).toBeDisabled();
  });

  it("calls onStepClick when a clickable step is clicked", () => {
    render(<StepNavigation {...defaultProps} />);
    const step1Button = screen.getByText("Step 1").closest("button");
    fireEvent.click(step1Button!);
    expect(defaultProps.onStepClick).toHaveBeenCalledWith(0);
  });

  it("shows current step with blue color", () => {
    render(<StepNavigation {...defaultProps} />);
    const currentStepNumber = screen.getByText("2");
    expect(currentStepNumber).toHaveClass("bg-blue-500");
  });

  it("renders only progress bar if onlyProgressBar is true", () => {
    render(<StepNavigation {...defaultProps} onlyProgressBar={true} />);
    expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    expect(screen.queryByText("Step 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Step 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Step 3")).not.toBeInTheDocument();
  });
});
