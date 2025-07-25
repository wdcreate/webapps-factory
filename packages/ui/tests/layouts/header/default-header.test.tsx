import { ButtonProps } from "@repo/ui/components/ui/button";
import Header, { HeaderDataType } from "@repo/ui/layouts/header/default";
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

// Mock the Button component
vi.mock("@repo/ui/components/ui/button", () => ({
  Button: ({ children, variant, size, ...props }: ButtonProps) => (
    <button data-variant={variant} data-size={size} {...props}>
      {children}
    </button>
  ),
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Menu: ({ size, ...props }: any) => (
    <svg data-testid="menu-icon" width={size} height={size} {...props}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  X: ({ size, ...props }: any) => (
    <svg data-testid="x-icon" width={size} height={size} {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
}));

const mockHeaderData: HeaderDataType = {
  logo: { src: "/logo.png", alt: "Company Logo", href: "/" },
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  buttons: [
    {
      label: "Sign In",
      href: "/signin",
      variant: "outline" as const,
      size: "sm" as const,
    },
    {
      label: "Sign Up",
      href: "/signup",
      variant: "default" as const,
      size: "sm" as const,
    },
  ],
  mobileContent: {
    label: "Get Started",
    href: "/get-started",
    variant: "default" as const,
    size: "sm" as const,
  },
};

describe("Header", () => {
  // ensure clean DOM & mocks between tests
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders only one logo initially", () => {
    render(<Header data={mockHeaderData} />);
    expect(screen.getAllByAltText("Company Logo")).toHaveLength(1);
  });

  it('logo is wrapped in a link to "/"', () => {
    render(<Header data={mockHeaderData} />);
    expect(screen.getByRole("link", { name: "Company Logo" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  describe("Desktop nav & buttons", () => {
    beforeEach(() => render(<Header data={mockHeaderData} />));

    it("has exactly one desktop nav with correct links", () => {
      const navs = screen.getAllByRole("navigation");
      expect(navs).toHaveLength(1);
      const desktopNav = navs[0];
      for (const { label, href } of mockHeaderData.links) {
        expect(
          within(desktopNav!).getByRole("link", { name: label })
        ).toHaveAttribute("href", href);
      }
    });

    it("renders desktop buttons and they have the right attrs", () => {
      // querySelector can return null, so assert not-null then cast
      const banner = screen.getByRole("banner");
      const containerElem = banner.querySelector(".hidden.lg\\:flex.space-x-2");
      expect(containerElem).not.toBeNull();
      const container = containerElem! as HTMLElement;

      // Sign In link & button
      const signInLink = within(container).getByRole("link", {
        name: "Sign In",
      });
      expect(signInLink).toHaveAttribute("href", "/signin");

      const buttons = within(container).getAllByRole("button", {
        name: "Sign In",
      });
      expect(buttons).toHaveLength(1); // there's only the inner <button>

      const innerBtn = buttons[0];
      expect(innerBtn).toHaveAttribute("data-variant", "outline");
      expect(innerBtn).toHaveAttribute("data-size", "sm");
    });
  });

  describe("Mobile menu behavior", () => {
    beforeEach(() => render(<Header data={mockHeaderData} />));

    it("shows only the hamburger icon before opening", () => {
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("x-icon")).toBeNull();
    });

    it("toggles open & close correctly", () => {
      // open
      fireEvent.click(screen.getByLabelText("Toggle menu"));
      const closeBtn = screen.getByLabelText("Close menu");
      expect(closeBtn).toBeInTheDocument();
      expect(within(closeBtn).getByTestId("x-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("menu-icon")).toBeNull();

      // close
      fireEvent.click(closeBtn);
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
      expect(screen.queryByLabelText("Close menu")).toBeNull();
    });

    it("renders mobile links & mobile Sign In inside panel", () => {
      fireEvent.click(screen.getByLabelText("Toggle menu"));
      const closeButton = screen.getByLabelText("Close menu");
      const panel = closeButton.closest(".fixed") as HTMLElement;

      const mobileNav = within(panel).getByRole("navigation");
      for (const { label, href } of mockHeaderData.links) {
        expect(
          within(mobileNav).getByRole("link", { name: label })
        ).toHaveAttribute("href", href);
      }

      // Exactly one mobile Sign In button inside panel
      const mobileSignIns = within(panel).getAllByRole("button", {
        name: "Sign In",
      });
      expect(mobileSignIns).toHaveLength(1);
    });
  });

  describe("Click handlers", () => {
    it("fires desktop onClick when provided", () => {
      const onClick = vi.fn();
      const data: HeaderDataType = {
        ...mockHeaderData,
        buttons: [
          {
            label: "Click Me",
            onClick,
            variant: "default" as const,
            size: "sm" as const,
          },
        ],
      };
      render(<Header data={data} />);

      const container = screen
        .getByRole("banner")
        .querySelector(".hidden.lg\\:flex.space-x-2") as HTMLElement;

      const clickButtons = within(container).getAllByRole("button", {
        name: "Click Me",
      });
      fireEvent.click(clickButtons[0]!); // Click the button directly
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("fires mobile onClick when provided", () => {
      const onClick = vi.fn();
      const data: HeaderDataType = {
        ...mockHeaderData,
        buttons: [
          {
            label: "Mobile Click",
            onClick,
            variant: "default" as const,
            size: "sm" as const,
          },
        ],
      };
      render(<Header data={data} />);

      fireEvent.click(screen.getByLabelText("Toggle menu"));
      const closeButton = screen.getByLabelText("Close menu");
      const panel = closeButton.closest(".fixed") as HTMLElement;

      const mobileButtons = within(panel).getAllByRole("button", {
        name: "Mobile Click",
      });
      fireEvent.click(mobileButtons[0]!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge & fixed cases", () => {
    it("is relative by default and fixed when asked", () => {
      // render once, then rerender — this keeps only one <header> in the DOM
      const { rerender } = render(<Header data={mockHeaderData} />);
      expect(screen.getByRole("banner")).toHaveClass("relative");

      rerender(<Header data={mockHeaderData} fixed />);
      expect(screen.getByRole("banner")).toHaveClass(
        "fixed",
        "inset-x-0",
        "top-0",
        "z-50"
      );
    });

    it("renders minimal data without crashing", () => {
      const minimal: HeaderDataType = {
        logo: { src: "/a.png", alt: "A", href: "/" },
        links: [],
      };
      render(<Header data={minimal} />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByAltText("A")).toBeInTheDocument();
    });
  });
});
