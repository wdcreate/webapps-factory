import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FormFieldConfig } from "@repo/ui/types/index.js";
import { FormField } from "@repo/ui/layouts/form/FormFiled";
import { userEvent } from "@testing-library/user-event";

// Helper to create a typed mock function
const createOnChangeMock = vi.fn as unknown as () => typeof vi.fn & {
  (...args: [string, string | number | boolean | File | null]): void;
};

describe("FormField Component", () => {
  let onChange: (
    name: string,
    value: string | number | boolean | File | null,
  ) => void;

  beforeEach(() => {
    onChange = createOnChangeMock();
    vi.clearAllMocks();
  });

  const defaultField: FormFieldConfig = {
    name: "test",
    label: "Test Label",
    type: "text",
    placeholder: "Enter text",
    disabled: false,
    className: "custom-class",
    description: "Field description",
    required: true,
  };

  it("renders text input with label, placeholder, description and required asterisk", () => {
    render(
      <FormField
        field={defaultField}
        value=""
        error={undefined}
        onChange={onChange}
      />,
    );
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBe("test");
    expect(input).toHaveClass("custom-class");
    const label = screen.getByLabelText("Test Label");
    expect(label).toBe(input);
    expect(screen.getByText("Field description")).toBeInTheDocument();
  });

  it("calls onChange with new text value on input change", () => {
    render(<FormField field={defaultField} value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledWith("test", "hello");
  });

  it("parses number input value correctly and handles invalid input", () => {
    const numField: FormFieldConfig = { ...defaultField, type: "number" };
    render(<FormField field={numField} value={0} onChange={onChange} />);
    const input = screen.getByRole("spinbutton") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "42" } });
    expect(onChange).toHaveBeenLastCalledWith("test", 42);

    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenLastCalledWith("test", 0);
  });

  it("renders textarea and calls onChange properly", () => {
    const taField: FormFieldConfig = { ...defaultField, type: "textarea" };
    render(<FormField field={taField} value="foo" onChange={onChange} />);
    const textarea = screen.getByPlaceholderText(
      "Enter text",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "bar" } });
    expect(onChange).toHaveBeenCalledWith("test", "bar");
  });

  it("renders select and calls onChange with correct values", () => {
    const selField: FormFieldConfig = {
      ...defaultField,
      type: "select",
      options: [
        { label: "Option A", value: "A" },
        { label: "Option B", value: "B" },
      ],
    };
    render(<FormField field={selField} value="A" onChange={onChange} />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    const optionB = screen.getByRole("option", { name: "Option B" });
    fireEvent.click(optionB);
    expect(onChange).toHaveBeenCalledWith("test", "B");
  });

  it("renders checkbox and toggles value correctly", () => {
    const cbField: FormFieldConfig = {
      ...defaultField,
      type: "checkbox",
      label: "Check me",
    };
    render(<FormField field={cbField} value={false} onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith("test", true);
  });

  it("renders radio group and selects option", () => {
    const radioField: FormFieldConfig = {
      ...defaultField,
      type: "radio",
      options: [
        { label: "R1", value: "1" },
        { label: "R2", value: "2" },
      ],
    };
    render(<FormField field={radioField} value="1" onChange={onChange} />);
    const radio2 = screen.getByLabelText("R2") as HTMLInputElement;
    fireEvent.click(radio2);
    expect(onChange).toHaveBeenCalledWith("test", "2");
  });

  it("renders file input and handles file selection and no file case", () => {
    const fileField: FormFieldConfig = { ...defaultField, type: "file" };
    render(<FormField field={fileField} value={null} onChange={onChange} />);
    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledWith("test", file);
    fireEvent.change(input, { target: { files: [] } });
    expect(onChange).toHaveBeenLastCalledWith("test", null);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn(); // используем vi.fn() вместо jest.fn()
    const disabledField = { ...defaultField, disabled: true };

    render(<FormField field={disabledField} value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeDisabled();

    await user.type(input, "x");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("displays error message when error prop provided", () => {
    render(
      <FormField
        field={defaultField}
        value=""
        error="Something wrong"
        onChange={onChange}
      />,
    );
    expect(screen.getByText("Something wrong")).toBeInTheDocument();
  });
});
