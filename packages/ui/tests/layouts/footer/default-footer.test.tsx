import { Footer } from "@repo/ui/layouts/footer/default";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("renders the footer element", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the copyright text", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2025 My App. All rights reserved."),
    ).toBeInTheDocument();
  });

  it("applies the correct CSS classes", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "py-sectionPaddingYCompact",
      "text-center",
      "text-sm",
      "text-muted",
    );
  });

  it("has proper semantic structure", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer.tagName).toBe("FOOTER");
  });
});
