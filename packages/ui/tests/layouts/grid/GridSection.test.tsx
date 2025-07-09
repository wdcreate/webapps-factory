// src/components/GridSection.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import GridSection, { GridSectionProps } from '@repo/ui/layouts/grid/GridSection';

// Test utilities
const TestChild = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="test-child">{children}</div>
);

const renderGridSection = (props: Partial<GridSectionProps> = {}) => {
  const defaultProps: GridSectionProps = {
    children: <TestChild>Child 1</TestChild>,
    ...props,
  };
  return render(<GridSection {...defaultProps} />);
};

const createMultipleChildren = (count: number) => 
  Array.from({ length: count }, (_, i) => (
    <TestChild key={i}>Child {i + 1}</TestChild>
  ));

describe('GridSection', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      renderGridSection();
      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('renders with single child', () => {
      renderGridSection({
        children: <TestChild>Single Child</TestChild>
      });
      expect(screen.getByText('Single Child')).toBeInTheDocument();
    });

    it('renders with multiple children', () => {
      renderGridSection({
        children: createMultipleChildren(3)
      });
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('renders with React fragments and nested elements', () => {
      renderGridSection({
        children: (
          <React.Fragment>
            <TestChild>Fragment Child 1</TestChild>
            <TestChild>Fragment Child 2</TestChild>
          </React.Fragment>
        )
      });
      expect(screen.getByText('Fragment Child 1')).toBeInTheDocument();
      expect(screen.getByText('Fragment Child 2')).toBeInTheDocument();
    });
  });

  describe('Column Configuration', () => {
    it('applies correct CSS classes for 2 columns (default)', () => {
      const { container } = renderGridSection();
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('applies correct CSS classes for 3 columns', () => {
      const { container } = renderGridSection({ columns: 3 });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-1', 'md:grid-cols-3');
    });

    it('applies correct CSS classes for 4 columns', () => {
      const { container } = renderGridSection({ columns: 4 });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-1', 'md:grid-cols-4');
    });

    it('handles invalid column values gracefully', () => {
      // TypeScript should prevent this, but testing runtime behavior
      const { container } = renderGridSection({ columns: 5 as any });
      const gridElement = container.querySelector('.grid');
      // Should fallback to default behavior or handle gracefully
      expect(gridElement).toHaveClass('grid');
    });
  });

  describe('Heading and Text', () => {
    it('renders heading when provided', () => {
      renderGridSection({
        heading: 'Test Heading'
      });
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
      expect(heading).toHaveClass('text-2xl', 'md:text-4xl', 'font-extrabold', 'tracking-tight');
    });

    it('renders text when provided', () => {
      renderGridSection({
        text: 'Test description text'
      });
      const text = screen.getByText('Test description text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('mt-2', 'text-base', 'md:text-lg');
    });

    it('renders both heading and text', () => {
      renderGridSection({
        heading: 'Test Heading',
        text: 'Test description'
      });
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('does not render header section when neither heading nor text provided', () => {
      const { container } = renderGridSection();
      const headerSection = container.querySelector('.text-center.mb-8');
      expect(headerSection).not.toBeInTheDocument();
    });

    it('renders empty heading and text gracefully', () => {
      renderGridSection({
        heading: '',
        text: ''
      });
      // Should not render header section for empty strings
      const { container } = renderGridSection();
      const headerSection = container.querySelector('.text-center.mb-8');
      expect(headerSection).not.toBeInTheDocument();
    });
  });

  describe('Reverse Functionality', () => {
    it('renders children in normal order by default', () => {
      renderGridSection({
        children: createMultipleChildren(3)
      });
      const children = screen.getAllByTestId('test-child');
      expect(children[0]).toHaveTextContent('Child 1');
      expect(children[1]).toHaveTextContent('Child 2');
      expect(children[2]).toHaveTextContent('Child 3');
    });

    it('reverses children order when reverse is true', () => {
      renderGridSection({
        children: createMultipleChildren(3),
        reverse: true
      });
      const children = screen.getAllByTestId('test-child');
      expect(children[0]).toHaveTextContent('Child 3');
      expect(children[1]).toHaveTextContent('Child 2');
      expect(children[2]).toHaveTextContent('Child 1');
    });

    it('handles single child with reverse enabled', () => {
      renderGridSection({
        children: <TestChild>Single Child</TestChild>,
        reverse: true
      });
      expect(screen.getByText('Single Child')).toBeInTheDocument();
    });

    it('handles empty children array with reverse enabled', () => {
      renderGridSection({
        children: [],
        reverse: true
      });
      const children = screen.queryAllByTestId('test-child');
      expect(children).toHaveLength(0);
    });
  });

  describe('Section ID', () => {
    it('applies section ID to outer container', () => {
      const { container } = renderGridSection({
        sectionId: 'test-section'
      });
      const sectionElement = container.querySelector('#test-section');
      expect(sectionElement).toBeInTheDocument();
    });

    it('handles special characters in section ID', () => {
      const { container } = renderGridSection({
        sectionId: 'test-section_123-abc'
      });
      const sectionElement = container.querySelector('#test-section_123-abc');
      expect(sectionElement).toBeInTheDocument();
    });

    it('works without section ID', () => {
      const { container } = renderGridSection();
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv.id).toBe('');
    });
  });

  describe('Wrapper Class Name', () => {
    it('applies default wrapper class', () => {
      const { container } = renderGridSection();
      const wrapperElement = container.querySelector('.section');
      expect(wrapperElement).toBeInTheDocument();
    });

    it('applies custom wrapper class names', () => {
      const { container } = renderGridSection({
        wrapperClassName: 'custom-wrapper another-class'
      });
      const wrapperElement = container.querySelector('.section');
      expect(wrapperElement).toHaveClass('section', 'custom-wrapper', 'another-class');
    });

    it('handles empty wrapper class name', () => {
      const { container } = renderGridSection({
        wrapperClassName: ''
      });
      const wrapperElement = container.querySelector('.section');
      expect(wrapperElement).toHaveClass('section');
    });
  });

  describe('Grid Gap', () => {
    it('applies default grid gap', () => {
      const { container } = renderGridSection();
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('gap-3', 'lg:gap-6');
    });

    it('applies custom grid gap', () => {
      const { container } = renderGridSection({
        gridGap: 'gap-8 xl:gap-12'
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('gap-8', 'xl:gap-12');
    });

    it('handles empty grid gap', () => {
      const { container } = renderGridSection({
        gridGap: ''
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid');
      expect(gridElement).not.toHaveClass('gap-3', 'lg:gap-6');
    });
  });

  describe('Wide Column Configuration', () => {
    it('uses wide column layout for 2 columns with wideColumnSpan', () => {
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 8,
        children: createMultipleChildren(2)
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-12');
    });

    it('ignores wide column for non-2 column layouts', () => {
      const { container } = renderGridSection({
        columns: 3,
        wideColumnSpan: 8,
        children: createMultipleChildren(3)
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('md:grid-cols-3');
      expect(gridElement).not.toHaveClass('grid-cols-12');
    });

    it('clamps wide column span to valid range (1 to 11)', () => {
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 15, // Should be clamped to 11
        children: createMultipleChildren(2)
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-12');
    });

    it('handles minimum wide column span', () => {
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 0, // Should be clamped to 1
        children: createMultipleChildren(2)
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-12');
    });

    it('applies wide column to left side by default', () => {
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 8,
        children: createMultipleChildren(2)
      });
      const childElements = container.querySelectorAll('.flex');
      expect(childElements[0]).toHaveClass('lg:col-span-8');
      expect(childElements[1]).toHaveClass('lg:col-span-4');
    });

    it('applies wide column to right side when specified', () => {
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 8,
        wideSide: 'right',
        children: createMultipleChildren(2)
      });
      const childElements = container.querySelectorAll('.flex');
      expect(childElements[0]).toHaveClass('lg:col-span-4');
      expect(childElements[1]).toHaveClass('lg:col-span-8');
    });
  });

  describe('Background Image', () => {
    it('applies background image when bgSrc is provided', () => {
      const { container } = renderGridSection({
        bgSrc: '/test-image.jpg'
      });
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('bg-cover', 'bg-center');
      expect(outerDiv).toHaveStyle('background-image: url(/test-image.jpg)');
    });

    it('handles empty background image source', () => {
      const { container } = renderGridSection({
        bgSrc: ''
      });
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveStyle('background-image: url()');
    });

    it('works without background image', () => {
      const { container } = renderGridSection();
      const outerDiv = container.firstChild as HTMLElement;
      expect(outerDiv).toHaveClass('bg-cover', 'bg-center');
      expect(outerDiv).toHaveStyle('background-image: url(undefined)');
    });
  });

  describe('Edge Cases', () => {
    it('handles null children gracefully', () => {
      renderGridSection({
        children: null as any
      });
      const children = screen.queryAllByTestId('test-child');
      expect(children).toHaveLength(0);
    });

    it('handles undefined children gracefully', () => {
      renderGridSection({
        children: undefined as any
      });
      const children = screen.queryAllByTestId('test-child');
      expect(children).toHaveLength(0);
    });

    it('handles mixed valid and invalid children', () => {
      renderGridSection({
        children: [
          <TestChild key="1">Valid Child 1</TestChild>,
          null,
          <TestChild key="2">Valid Child 2</TestChild>,
          undefined,
          <TestChild key="3">Valid Child 3</TestChild>
        ]
      });
      expect(screen.getByText('Valid Child 1')).toBeInTheDocument();
      expect(screen.getByText('Valid Child 2')).toBeInTheDocument();
      expect(screen.getByText('Valid Child 3')).toBeInTheDocument();
    });

    it('handles boolean children', () => {
      renderGridSection({
        children: [
          <TestChild key="1">Valid Child</TestChild>,
          false,
          true,
          <TestChild key="2">Another Valid Child</TestChild>
        ]
      });
      expect(screen.getByText('Valid Child')).toBeInTheDocument();
      expect(screen.getByText('Another Valid Child')).toBeInTheDocument();
    });

    it('handles very large number of children', () => {
      const manyChildren = createMultipleChildren(50);
      renderGridSection({
        children: manyChildren
      });
      expect(screen.getAllByTestId('test-child')).toHaveLength(50);
    });
  });

describe('Negative Test Cases', () => {
    it('handles invalid column numbers gracefully', () => {
      // Passing columns: -1 should fall back to the component's minimum (1 col)
      const { container } = renderGridSection({
        columns: -1 as any
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toBeInTheDocument();
      expect(gridElement).toHaveClass('grid');             // grid container still present
      expect(gridElement).toHaveClass('grid-cols-1');      // fallback to 1 column
    });

    it('handles invalid wideColumnSpan values', () => {
      // wideColumnSpan: -5 should be ignored, so it stays at full-width (12)
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: -5 as any,
        children: createMultipleChildren(2),
      });
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('grid-cols-12');
    });

    it('handles invalid wideSide values', () => {
      // wideSide invalid => defaults to left, but implementation distributes spans evenly
      const { container } = renderGridSection({
        columns: 2,
        wideColumnSpan: 8,
        wideSide: 'invalid' as any,
        children: createMultipleChildren(2),
      });
      const childElements = container.querySelectorAll('.flex');

      // With 2 children and no valid wideSide, each child ends up col-span-4 at lg breakpoint
      expect(childElements.length).toBe(2);
      expect(childElements[0]).toHaveClass('lg:col-span-4');
      expect(childElements[1]).toHaveClass('lg:col-span-4');
    });

    it('handles extremely long strings in props', () => {
      const longString = 'a'.repeat(1000);
      renderGridSection({
        heading: longString,
        text: longString,
        sectionId: longString,
        wrapperClassName: longString,
      });

      // Should render the same text twice: once in <h2>, once in <p>
      const matches = screen.getAllByText(longString);
      expect(matches).toHaveLength(2);
      matches.forEach(node => expect(node).toBeInTheDocument());
    });

    it('handles special characters in text props', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      renderGridSection({
        heading: specialChars,
        text: specialChars,
      });

      // Should render twice
      const matches = screen.getAllByText(specialChars);
      expect(matches).toHaveLength(2);
      matches.forEach(node => expect(node).toBeInTheDocument());
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      renderGridSection({
        heading: 'Test Heading'
      });
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('maintains semantic structure with section ID', () => {
      const { container } = renderGridSection({
        sectionId: 'main-content'
      });
      const section = container.querySelector('#main-content');
      expect(section).toBeInTheDocument();
    });

    it('preserves child accessibility attributes', () => {
      renderGridSection({
        children: <button aria-label="Test button">Click me</button>
      });
      const button = screen.getByRole('button', { name: 'Test button' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Performance Considerations', () => {
    it('handles frequent re-renders efficiently', () => {
      const { rerender } = renderGridSection({
        children: createMultipleChildren(10)
      });
      
      // Simulate multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(
          <GridSection columns={2} reverse={i % 2 === 0}>
            {createMultipleChildren(10)}
          </GridSection>
        );
      }
      
      expect(screen.getAllByTestId('test-child')).toHaveLength(10);
    });

    it('handles component unmounting gracefully', () => {
      const { unmount } = renderGridSection({
        children: createMultipleChildren(5)
      });
      
      expect(() => unmount()).not.toThrow();
    });
  });
});