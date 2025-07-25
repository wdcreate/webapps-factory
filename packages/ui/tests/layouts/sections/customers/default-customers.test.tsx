import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { DefaultCustomerLogosSection } from "@repo/ui/types";
import { DefaultCustomerLogos } from "@repo/ui/layouts/sections/customers/default";

type PartialSection = Partial<DefaultCustomerLogosSection>;

const makeData = (
  overrides: PartialSection = {},
): DefaultCustomerLogosSection =>
  ({
    sectionId: "test-section",
    heading: "Our Customers",
    paragraph: "Some customers love us",
    backgroundSrc: "https://example.com/bg.png",
    logos: [
      { name: "logo1", src: "https://example.com/logo1.png", alt: "Logo 1" },
      { name: "logo2", src: "https://example.com/logo2.png", alt: "Logo 2" },
    ],
    ...overrides,
  }) as DefaultCustomerLogosSection;

describe("<DefaultCustomerLogos />", () => {
  it("renders a <section> with the correct id and background classes", () => {
    render(<DefaultCustomerLogos data={makeData()} />);
    const sec = document.getElementById("test-section");
    expect(sec).not.toBeNull();
    if (sec) {
      expect(sec).toHaveClass("bg-background", "bg-cover", "bg-center");
    }
  });

  it("applies inline style when backgroundSrc is truthy", () => {
    render(
      <DefaultCustomerLogos
        data={makeData({ backgroundSrc: "https://foo/bar.jpg" })}
      />,
    );
    const sec = document.getElementById("test-section")!;
    expect(sec.style.backgroundImage).toBe('url("https://foo/bar.jpg")');
  });

  it("does not set an inline style when backgroundSrc is falsy", () => {
    render(<DefaultCustomerLogos data={makeData({ backgroundSrc: "" })} />);
    const sec = document.getElementById("test-section")!;
    expect(sec.style.cssText).toBe("");
  });

  it("always renders an <h2> with the heading text", () => {
    render(<DefaultCustomerLogos data={makeData({ heading: "Custom" })} />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Custom" });
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe("H2");
  });

  it("renders the paragraph when provided", () => {
    render(<DefaultCustomerLogos data={makeData({ paragraph: "Hello!" })} />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("omits the paragraph entirely when paragraph is empty or missing", () => {
    // empty string
    render(<DefaultCustomerLogos data={makeData({ paragraph: "" })} />);
    expect(screen.queryByText("Some customers love us")).toBeNull();

    // missing property
    const partial = makeData();
    delete (partial as PartialSection).paragraph;
    render(<DefaultCustomerLogos data={partial} />);
    expect(screen.queryByRole("paragraph")).toBeNull();
  });

  it("renders one <img> per logo with correct src & alt", () => {
    const logos = [
      { name: "a", src: "/a.png", alt: "A" },
      { name: "b", src: "/b.png", alt: "B" },
      { name: "c", src: "/c.png", alt: "C" },
    ];
    render(<DefaultCustomerLogos data={makeData({ logos })} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(3);
    logos.forEach(({ src, alt }) => {
      const img = screen.getByAltText(alt);
      expect(img).toHaveAttribute("src", src);
    });
  });

  it("renders zero <img> when logos is an empty array", () => {
    render(<DefaultCustomerLogos data={makeData({ logos: [] })} />);
    const imgs = document.querySelectorAll("img");
    expect(imgs.length).toBe(0);
  });

  it("throws when logos prop is missing or wrong type", () => {
    // Cast to unknown then to our Section type so TS won’t complain
    const badData = {
      sectionId: "x",
      heading: "x",
    } as unknown as DefaultCustomerLogosSection;
    expect(() => render(<DefaultCustomerLogos data={badData} />)).toThrow(
      TypeError,
    );
  });

  it("does not set a backgroundImage when backgroundSrc is falsy", () => {
    render(<DefaultCustomerLogos data={makeData({ backgroundSrc: "" })} />);
    const sec = document.getElementById("test-section")!;
    expect(sec.style.backgroundImage).toBe("");
  });
});
