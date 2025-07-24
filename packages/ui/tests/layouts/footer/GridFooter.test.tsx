import GridFooter, { FooterDataType } from "@repo/ui/layouts/footer/GridFooter";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock icon component for testing
const MockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg data-testid="mock-icon" {...props}>
    <path d="M0 0h24v24H0z" />
  </svg>
);

const mockFooterData: FooterDataType = {
  logo: {
    src: "/logo.png",
    alt: "Company Logo",
    href: "/",
  },
  columns: [
    {
      title: "Products",
      links: [
        { label: "Web App", href: "/web-app" },
        { label: "Mobile App", href: "/mobile-app" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      // Column without title
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  copyright: "© 2025 My Company. All rights reserved.",
  socialLinks: [
    { icon: MockIcon, href: "https://twitter.com/company", label: "Twitter" },
    { icon: MockIcon, href: "https://linkedin.com/company", label: "LinkedIn" },
  ],
};

describe("GridFooter", () => {
  it("renders the footer element", () => {
    render(<GridFooter data={mockFooterData} />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("applies default and custom CSS classes", () => {
    const customClass = "custom-footer-class";
    render(<GridFooter data={mockFooterData} className={customClass} />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-background", "text-primary", customClass);
  });

  describe("Logo", () => {
    it("renders the logo image with correct attributes", () => {
      render(<GridFooter data={mockFooterData} />);

      const logo = screen.getByAltText("Company Logo");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/logo.png");
      expect(logo).toHaveClass("h-[55px]", "md:h-[100px]");
    });

    it("wraps logo in a link with correct href", () => {
      render(<GridFooter data={mockFooterData} />);

      const logoLink = screen.getByRole("link", { name: "Company Logo" });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Footer Columns", () => {
    it("renders all footer columns", () => {
      render(<GridFooter data={mockFooterData} />);

      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
    });

    it("renders column titles when provided", () => {
      render(<GridFooter data={mockFooterData} />);

      const productTitle = screen.getByText("Products");
      expect(productTitle).toBeInTheDocument();
      expect(productTitle.tagName).toBe("H5");
      expect(productTitle).toHaveClass(
        "font-semibold",
        "text-primary",
        "mb-4",
        "uppercase"
      );
    });

    it("does not render title when not provided", () => {
      render(<GridFooter data={mockFooterData} />);

      // The third column has no title, so we check that Privacy and Terms links exist
      // but no title is rendered for that column
      expect(screen.getByText("Privacy")).toBeInTheDocument();
      expect(screen.getByText("Terms")).toBeInTheDocument();
    });

    it("renders all footer links with correct attributes", () => {
      render(<GridFooter data={mockFooterData} />);

      const webAppLink = screen.getByRole("link", { name: "Web App" });
      expect(webAppLink).toHaveAttribute("href", "/web-app");
      expect(webAppLink).toHaveClass(
        "text-foreground",
        "hover:text-primary",
        "text-sm"
      );

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveAttribute("href", "/about");

      const privacyLink = screen.getByRole("link", { name: "Privacy" });
      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });

    it("renders links in proper list structure", () => {
      render(<GridFooter data={mockFooterData} />);

      const lists = screen.getAllByRole("list");
      expect(lists).toHaveLength(mockFooterData.columns.length);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBeGreaterThan(0);

      // Verify specific link exists within list structure
      const webAppLink = screen.getByRole("link", { name: "Web App" });
      expect(webAppLink.closest("li")).toBeInTheDocument();
    });
  });

  describe("Social Links", () => {
    it("renders social links when provided", () => {
      render(<GridFooter data={mockFooterData} />);

      const twitterLink = screen.getByRole("link", { name: "Twitter" });
      expect(twitterLink).toHaveAttribute(
        "href",
        "https://twitter.com/company"
      );
      expect(twitterLink).toHaveAttribute("aria-label", "Twitter");

      const linkedinLink = screen.getByRole("link", { name: "LinkedIn" });
      expect(linkedinLink).toHaveAttribute(
        "href",
        "https://linkedin.com/company"
      );
    });

    it("renders social link icons", () => {
      render(<GridFooter data={mockFooterData} />);

      const icons = screen.getAllByTestId("mock-icon");
      expect(icons).toHaveLength(2);
    });

    it("applies correct CSS classes to social links", () => {
      render(<GridFooter data={mockFooterData} />);

      const twitterLink = screen.getByRole("link", { name: "Twitter" });
      expect(twitterLink).toHaveClass("text-secondary", "hover:text-primary");
    });

    it("does not render social links section when not provided", () => {
      const dataWithoutSocial = {
        ...mockFooterData,
        socialLinks: undefined,
      };

      render(<GridFooter data={dataWithoutSocial} />);

      // Should not find any social links
      expect(
        screen.queryByRole("link", { name: "Twitter" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "LinkedIn" })
      ).not.toBeInTheDocument();
    });
  });

  describe("Copyright", () => {
    it("renders copyright text", () => {
      render(<GridFooter data={mockFooterData} />);

      expect(
        screen.getByText("© 2025 My Company. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("applies correct CSS classes to copyright", () => {
      render(<GridFooter data={mockFooterData} />);

      const copyright = screen.getByText(
        "© 2025 My Company. All rights reserved."
      );
      expect(copyright).toHaveClass(
        "text-sm",
        "text-primary",
        "text-center",
        "my-6",
        "lg:my-12"
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<GridFooter data={mockFooterData} />);

      const footer = screen.getByRole("contentinfo");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("provides aria-labels for social links", () => {
      render(<GridFooter data={mockFooterData} />);

      const twitterLink = screen.getByLabelText("Twitter");
      const linkedinLink = screen.getByLabelText("LinkedIn");

      expect(twitterLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty columns array", () => {
      const dataWithEmptyColumns = {
        ...mockFooterData,
        columns: [],
      };

      render(<GridFooter data={dataWithEmptyColumns} />);

      // Should still render logo and copyright
      expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
      expect(
        screen.getByText("© 2025 My Company. All rights reserved.")
      ).toBeInTheDocument();
    });

    it("handles column with empty links array", () => {
      const dataWithEmptyLinks = {
        ...mockFooterData,
        columns: [
          {
            title: "Empty Column",
            links: [],
          },
        ],
      };

      render(<GridFooter data={dataWithEmptyLinks} />);

      expect(screen.getByText("Empty Column")).toBeInTheDocument();
      // Should render empty list
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("handles missing social link labels", () => {
      const dataWithoutLabels = {
        ...mockFooterData,
        socialLinks: [{ icon: MockIcon, href: "https://twitter.com/company" }],
      };

      render(<GridFooter data={dataWithoutLabels} />);

      // Find all links and filter by href
      const allLinks = screen.getAllByRole("link");
      const socialLink = allLinks.find(
        (link) => link.getAttribute("href") === "https://twitter.com/company"
      );

      expect(socialLink).toBeDefined();
      expect(socialLink).toHaveAttribute("href", "https://twitter.com/company");
      expect(socialLink).not.toHaveAttribute("aria-label");
    });
  });
});
