// src/components/GridSection.tsx
import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface GridSectionProps {
  columns?: 2 | 3 | 4;
  children: ReactNode;
  heading?: string;
  text?: string;
  reverse?: boolean;
  sectionId?: string;
  wrapperClassName?: string;
  gridGap?: string;
  wideColumnSpan?: number;
  wideSide?: 'left' | 'right';
}

const colClassMap: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

// Predefined lg span map to satisfy Tailwind’s static scanning
const lgSpanMap: Record<number, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
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
  wideColumnSpan,
  wideSide = 'left',
}) => {
  let items = React.Children.toArray(children);
  if (reverse) items = items.reverse();

  const useWide = columns === 2 && typeof wideColumnSpan === 'number';
  const total = 12;
  const wideSpan = useWide
    ? Math.min(Math.max(wideColumnSpan, 1), total - 1)
    : undefined;
  const narrowSpan = useWide ? total - wideSpan! : undefined;

  return (
    <section
      id={sectionId}
      className={clsx('section', wrapperClassName)}
    >
      {(heading || text) && (
        <div className="text-center mb-8">
          {heading && (
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {heading}
            </h2>
          )}
          {text && <p className="mt-2 text-base md:text-lg">{text}</p>}
        </div>
      )}

      <div
        className={clsx(
          'grid',
          useWide ? 'grid-cols-12' : clsx('grid-cols-1', colClassMap[columns]),
          gridGap
        )}
      >
        {items.map((child, idx) => {
          const spanClass = useWide
            ? clsx(
                'col-span-12',    // mobile full width
                'md:col-span-6',   // two-equal on md
                // static lg spans from lgSpanMap
                lgSpanMap[
                  (wideSide === 'left' && idx === 0) ||
                  (wideSide === 'right' && idx === 1)
                    ? wideSpan!
                    : narrowSpan!
                ]
              )
            : undefined;

          return (
            <div
              key={idx}
              className={clsx('flex items-center', spanClass)}
            >
              {child}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GridSection;
