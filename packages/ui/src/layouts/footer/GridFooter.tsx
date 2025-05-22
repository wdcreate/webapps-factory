import React from "react";

export interface LogoData {
  src: string;
  alt: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title?: string;
  links: FooterLink[];
}

export interface SocialLink {
  /** Icon component */
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
  label?: string;
}

export interface FooterDataType {
  logo: LogoData;
  columns: FooterColumn[];
  copyright: string;
  socialLinks?: SocialLink[];
}

interface GridFooterProps {
  data: FooterDataType;
  className?: string;
}

const GridFooter: React.FC<GridFooterProps> = ({ data, className = "" }) => {
  return (
    <footer className={`bg-background text-primary  ${className}`}>
      <div className="container mx-auto pt-4 lg:pt-12 ">
        <div className="gap-4 md:gap-8 flex-wrap flex flex-col md:flex-row justify-between items-start">
          <a href={data.logo.href} className="inline-block mb-4">
            <img src={data.logo.src} alt={data.logo.alt} className="h-8" />
          </a>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            {data.columns.map((col) => (
              <div key={col.title} className="col-span-1">
                {col.title ? (
                  <h5 className="font-semibold text-primary mb-4 uppercase">
                    {col.title}
                  </h5>
                ) : null}
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-foreground hover:text-primary text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {data.socialLinks && (
            <div className="flex space-x-4 justify-center lg:justify-end w-full md:w-auto">
              {data.socialLinks.map((social, i) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="text-secondary hover:text-primary"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          )}
        </div>
        <p className="text-sm text-primary text-center my-6 lg:my-12">
          {data.copyright}
        </p>{" "}
      </div>
    </footer>
  );
};

export default GridFooter;
