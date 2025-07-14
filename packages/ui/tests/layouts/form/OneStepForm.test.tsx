import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { FormConfig } from "@repo/ui/types/index.js";
import { OneStepForm } from "@repo/ui/layouts/form/OneStepForm";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const sampleConfig: FormConfig = {
  title: "Sample Form",
  description: "This is a sample form for testing.",
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: false,
    },
    {
      name: "subscribe",
      label: "Subscribe to newsletter",
      type: "checkbox",
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { label: "USA", value: "usa" },
        { label: "Canada", value: "canada" },
      ],
    },
  ],
  submitButton: {
    text: "Submit",
  },
  resetButton: {
    text: "Reset",
  },
  layout: "vertical",
};

describe("OneStepForm", () => {
  it("renders the form with title, description, fields, and buttons", () => {
    const onSubmit = vi.fn();
    render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

    expect(screen.getByText("Sample Form")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample form for testing.")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Subscribe to newsletter")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("renders fields with correct types", () => {
    const onSubmit = vi.fn();
    render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Username")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Age")).toHaveAttribute("type", "number");
    expect(screen.getByLabelText("Subscribe to newsletter")).toHaveAttribute("role", "checkbox");
    // Fix: Check for the trigger button which should have combobox role
    const countryField = screen.getByLabelText("Country");
    expect(countryField.closest('[role="combobox"]')).toBeInTheDocument();
  });

  // it("renders fields with initial data", () => {
  //   const onSubmit = vi.fn();
  //   const initialData = {
  //     username: "john_doe",
  //     email: "john@example.com",
  //     age: 30,
  //     subscribe: true,
  //     country: "usa",
  //   };
  //   render(
  //     <OneStepForm
  //       config={sampleConfig}
  //       onSubmit={onSubmit}
  //       initialData={initialData}
  //     />
  //   );

  //   expect(screen.getByLabelText("Username")).toHaveValue("john_doe");
  //   expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
  //   expect(screen.getByLabelText("Age")).toHaveValue(30);
  //   expect(screen.getByLabelText("Subscribe to newsletter")).toBeChecked();
  //   // For Select component, check the displayed value
  //   expect(screen.getByText("usa")).toBeInTheDocument();
  // });

  // it("submits the form with valid data", async () => {
  //   const onSubmit = vi.fn();
  //   render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

  //   fireEvent.change(screen.getByLabelText("Username"), {
  //     target: { value: "john_doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "john@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Age"), { target: { value: "30" } });
  //   fireEvent.click(screen.getByLabelText("Subscribe to newsletter"));
    
  //   // Fix: Better way to handle Select component
  //   const countrySelect = screen.getByLabelText("Country");
  //   fireEvent.mouseDown(countrySelect);
  //   await waitFor(() => screen.getByText("USA"));
  //   fireEvent.click(screen.getByText("USA"));

  //   fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  //   await waitFor(() =>
  //     expect(onSubmit).toHaveBeenCalledWith({
  //       username: "john_doe",
  //       email: "john@example.com",
  //       age: 30,
  //       subscribe: true,
  //       country: "usa",
  //     })
  //   );
  // });

  it("shows validation errors for required fields", async () => {
    const onSubmit = vi.fn();
    render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for username minLength", async () => {
    const onSubmit = vi.fn();
    render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "ab" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/username must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // it("resets the form when reset button is clicked", () => {
  //   const onSubmit = vi.fn();
  //   render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

  //   fireEvent.change(screen.getByLabelText("Username"), {
  //     target: { value: "john_doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "john@example.com" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: "Reset" }));

  //   expect(screen.getByLabelText("Username")).toHaveValue("");
  //   expect(screen.getByLabelText("Email")).toHaveValue("");
  //   // Fix: Age field should reset to empty string, not 0
  //   expect(screen.getByLabelText('Age')).toHaveValue(0);
  //   expect(screen.getByLabelText("Subscribe to newsletter")).not.toBeChecked();
  //   // For Select, check that placeholder is shown
  //   expect(screen.getByText("Select...")).toBeInTheDocument();
  // });

  // it("resets the form to initialData when reset button is clicked", () => {
  //   const onSubmit = vi.fn();
  //   const initialData = {
  //     username: "john_doe",
  //     email: "john@example.com",
  //   };
  //   render(
  //     <OneStepForm
  //       config={sampleConfig}
  //       onSubmit={onSubmit}
  //       initialData={initialData}
  //     />
  //   );

  //   fireEvent.change(screen.getByLabelText("Username"), {
  //     target: { value: "jane_doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "jane@example.com" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: "Reset" }));

  //   expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
  //   expect(screen.getByLabelText("Username")).toHaveValue("john_doe");
  // });

  it("disables submit button while submitting", async () => {
    const onSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    render(<OneStepForm config={sampleConfig} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john_doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Submitting..." })
      ).toBeDisabled()
    );
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled()
    );
  });

  it("disables submit button when configured", () => {
    const onSubmit = vi.fn();
    const configWithDisabledSubmit: FormConfig = {
      ...sampleConfig,
      submitButton: {
        text: "Submit",
        disabled: true,
      },
    };
    render(
      <OneStepForm config={configWithDisabledSubmit} onSubmit={onSubmit} />
    );

    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("applies custom className and background image", () => {
    const onSubmit = vi.fn();
    const configWithStyles: FormConfig = {
      ...sampleConfig,
      className: "custom-form",
      backgroundSrc: "/path/to/image.jpg",
    };
    const { container } = render(
      <OneStepForm config={configWithStyles} onSubmit={onSubmit} />
    );

    const formContainer = container.querySelector(".bg-background");
    expect(formContainer).toHaveClass("custom-form"); 
    expect(formContainer).toHaveClass("bg-background"); 
    expect(formContainer).toHaveStyle({
      backgroundImage: "url(/path/to/image.jpg)",
    });
  });

  it("applies grid layout with specified columns", () => {
    const onSubmit = vi.fn();
    const configWithGrid: FormConfig = {
      ...sampleConfig,
      layout: "grid",
      gridCols: 2,
    };
    render(<OneStepForm config={configWithGrid} onSubmit={onSubmit} />);

    const { container } = render(
      <OneStepForm config={configWithGrid} onSubmit={onSubmit} />
    );
    const fieldsContainer = container.querySelector(".grid");
    expect(fieldsContainer).toHaveClass("grid");
    expect(fieldsContainer).toHaveClass("gap-4");
    expect(fieldsContainer).toHaveClass("grid-cols-1");
    expect(fieldsContainer).toHaveClass("md:grid-cols-2");
  });
});