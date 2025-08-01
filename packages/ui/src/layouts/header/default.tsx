"use client";
import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Menu, X } from "lucide-react";
import { ButtonType } from "@repo/ui/types";

export interface LogoData {
  src: string;
  alt: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderDataType {
  logo: LogoData;
  links: NavLink[];
  buttons?: ButtonType[];
  mobileContent?: ButtonType;
}

interface HeaderProps {
  data: HeaderDataType;
  /** If true, makes the header fixed to the top */
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ data, fixed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerClass = fixed ? "fixed inset-x-0 top-0 z-50" : "relative";

  return (
    <>
      <header className={`${containerClass} bg-white shadow`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href={data.logo.href} className="flex-shrink-0">
            <img
              src={data.logo.src}
              alt={data.logo.alt}
              className="h-8 md:h-12"
            />
          </a>

          {/* Desktop nav on lg+ */}
          <nav className="hidden lg:flex space-x-6">
            {data.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary hover:text-gray-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop buttons on lg+ */}
          {data.buttons?.length && (
            <div className="hidden lg:flex space-x-2">
              {data.buttons.map((btn) => {
                const ButtonEl = btn.href ? (
                  <a key={btn.label} href={btn.href}>
                    <Button variant={btn.variant} size={btn.size}>
                      {btn.label}
                    </Button>
                  </a>
                ) : (
                  <button key={btn.label} onClick={btn.onClick}>
                    <Button variant={btn.variant} size={btn.size}>
                      {btn.label}
                    </Button>
                  </button>
                );
                return ButtonEl;
              })}
            </div>
          )}

          {/* Mobile controls below lg: optional mobileContent + menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            {data.mobileContent && (
              <a href={data.mobileContent.href}>
                <Button
                  variant={data.mobileContent.variant}
                  size={data.mobileContent.size}
                >
                  {data.mobileContent.label}
                </Button>
              </a>
            )}
            <button
              className="focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-background">
            <a href={data.logo.href}>
              <img src={data.logo.src} alt={data.logo.alt} className="h-8" />
            </a>
            <button
              className="focus:outline-none"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow flex flex-col items-center justify-center space-y-4">
            {data.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xl text-primary hover:text-gray-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {data.buttons?.length && (
            <div className="p-4 flex justify-center space-x-2">
              {data.buttons.map((btn) => {
                const ButtonEl = btn.href ? (
                  <a key={btn.label} href={btn.href}>
                    <Button variant={btn.variant} size={btn.size}>
                      {btn.label}
                    </Button>
                  </a>
                ) : (
                  <Button
                    key={btn.label}
                    onClick={btn.onClick}
                    variant={btn.variant}
                    size={btn.size}
                  >
                    {btn.label}
                  </Button>
                );
                return ButtonEl;
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
