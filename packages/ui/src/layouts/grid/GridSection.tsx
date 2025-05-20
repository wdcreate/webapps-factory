// src/components/GridSection.tsx
import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface GridSectionProps {
  /** Number of columns on md+ screens (2 | 3 | 4) */
  columns?: 2 | 3 | 4;
  /** One or more children to lay out */
  children: ReactNode;
  /** Optional heading text above the grid */
  heading?: string;
  /** Optional sub‑text below the heading */
  text?: string;
  /** Reverse the order of items */
  reverse?: boolean;
  /** id attribute on the section */
  sectionId?: string;
  /** Extra classes on the <section> wrapper */
  wrapperClassName?: string;
  /** Tailwind gap classes for the grid container */
  gridGap?: string;
}

const colClassMap: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export const GridSection: React.FC<GridSectionProps> = ({
  columns = 2,
  children,
  heading,
  text,
  reverse = false,
  sectionId,
  wrapperClassName = '',
  gridGap = 'gap-4 lg:gap-8',
}) => {
  const items = React.Children.toArray(children);
  if (reverse) items.reverse();

  return (
    <section
      id={sectionId}
      className={clsx('section', wrapperClassName)}
    >
      {(heading || text) && (
        <div className="text-center mb-8">
          {heading && (
            <h2 className="text-2xl md:text-4xl text-primary font-extrabold tracking-tight">
              {heading}
            </h2>
          )}
          {text && <p className="mt-2 text-base md:text-lg text-foreground">{text}</p>}
        </div>
      )}

      <div
        className={clsx(
          'mx-auto grid grid-cols-1',   
          colClassMap[columns],                    
          gridGap
        )}
      >
        {items.map((child, idx) => (
          <div key={idx} className="flex justify-center items-center">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridSection;
