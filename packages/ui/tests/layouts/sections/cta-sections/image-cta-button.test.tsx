import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { ImageWithCTAData } from "@repo/ui/types";
import { ImageWithCTAButtonSection } from "@repo/ui/layouts/sections/cta-sections/image-cta-button";

type PartialData = Partial<ImageWithCTAData>;

const makeData = (overrides: PartialData = {}): ImageWithCTAData =>
  ({
    sectionId: "cta",
    image: {
      src: "/foo.png",
      alt: "Foo image",
    },
    backgroundSrc: "https://bg.example.com/bg.jpg",
    title: "Section Title",
    description: "Some descriptive text.",
    button: {
      label: "Go",
      variant: "primary",
      size: "md",
      href: undefined,
      onClick: vi.fn(),
    },
    reverseGrid: false,
    ...overrides,
  }) as any;

describe("<ImageWithCTAButtonSection />", () => {
  it("renders a <section> with id, default classes, and backgroundImage style", () => {
    render(<ImageWithCTAButtonSection data={makeData()} />);
    const sec = document.getElementById("cta")!;
    expect(sec).toHaveClass("bg-background", "bg-cover", "bg-center");
    // inline style
    expect(sec.style.backgroundImage).toBe(
      'url("https://bg.example.com/bg.jpg")'
    );
  });

  it("omits inline style when backgroundSrc is falsy", () => {
    render(
      <ImageWithCTAButtonSection data={makeData({ backgroundSrc: "" })} />
    );
    const sec = document.getElementById("cta")!;
    expect(sec.style.backgroundImage).toBe("");
  });

  describe("Image container & reverseGrid", () => {
    it("renders image with src & alt and default container classes", () => {
      render(<ImageWithCTAButtonSection data={makeData()} />);
      const img = screen.getByAltText("Foo image") as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain("/foo.png");
      const wrapper = img.parentElement!;
      expect(wrapper).toHaveClass(
        "min-w-[300px]",
        "w-[50%]",
        "sm:w-[75%]",
        "h-auto",
        "lg:w-full",
        "mx-auto"
      );
      expect(wrapper).not.toHaveClass("order-last");
    });

    it('adds "order-last" class when reverseGrid is true', () => {
      render(
        <ImageWithCTAButtonSection data={makeData({ reverseGrid: true })} />
      );
      const wrapper = screen.getByAltText("Foo image").parentElement!;
      expect(wrapper).toHaveClass("order-last");
    });

    it("renders empty alt & decorative image role when alt is omitted", () => {
      render(
        <ImageWithCTAButtonSection
          data={makeData({ image: { src: "/no-alt.png" } as any })}
        />
      );
      const img = screen.getByRole("presentation") as HTMLImageElement;
      expect(img).toHaveAttribute("src", "/no-alt.png");
      expect(img).toHaveAttribute("alt", "");
    });
  });

  describe("Text content", () => {
    it("renders the title in an h2 with expected text", () => {
      render(
        <ImageWithCTAButtonSection data={makeData({ title: "Hello World" })} />
      );
      const h2 = screen.getByRole("heading", { level: 2, name: "Hello World" });
      expect(h2).toBeInTheDocument();
    });

    it("renders the description in a <p>", () => {
      render(
        <ImageWithCTAButtonSection
          data={makeData({ description: "XYZ description" })}
        />
      );
      expect(screen.getByText("XYZ description")).toBeInstanceOf(
        HTMLParagraphElement
      );
    });

    it("handles empty description gracefully", () => {
      render(
        <ImageWithCTAButtonSection data={makeData({ description: "" })} />
      );
      // Still renders a <p> but with empty text
      const p = screen.getByText("", { selector: "p" });
      expect(p).toBeInTheDocument();
    });
  });

  describe("Button / CTA", () => {
    it("renders a clickable <button> when no href is provided", () => {
      const onClick = vi.fn();
      render(
        <ImageWithCTAButtonSection
          data={makeData({
            button: {
              label: "ClickMe",
              variant: "primary",
              size: "md",
              onClick,
            },
          } as any)}
        />
      );
      const btn = screen.getByRole("button", { name: /ClickMe/ });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(onClick).toHaveBeenCalledOnce();
      // ArrowRight icon is present
      expect(btn.querySelector("svg")).toBeInTheDocument();
    });

    it("wraps the button in an <a> when href is provided", () => {
      render(
        <ImageWithCTAButtonSection
          data={makeData({
            button: {
              label: "LinkBtn",
              variant: "secondary",
              size: "sm",
              href: "/xyz",
              onClick: vi.fn(),
            },
          } as any)}
        />
      );
      const link = screen.getByRole("link", { name: /LinkBtn/ });
      expect(link).toHaveAttribute("href", "/xyz");
      // ensure noreferrer is set
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      // the <button> still exists inside
      expect(link.querySelector("button")).toBeInTheDocument();
    });

    it("throws if button prop is missing", () => {
      const bad = makeData();
      delete (bad as any).button;
      expect(() =>
        render(<ImageWithCTAButtonSection data={bad as any} />)
      ).toThrow();
    });
  });

  describe("Invalid/missing required fields", () => {
    it("throws if image is missing", () => {
      const bad = makeData();
      delete (bad as any).image;
      expect(() =>
        render(<ImageWithCTAButtonSection data={bad as any} />)
      ).toThrow();
    });
  });
});
