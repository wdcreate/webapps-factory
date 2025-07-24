import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { DemoSectionData } from '@repo/ui/types';
import { DemoSection } from '@repo/ui/layouts/sections/presentation/DemoSection';

type PartialDemo = Partial<DemoSectionData>;

const makeData = (overrides: PartialDemo = {}): DemoSectionData => ({
  sectionId: 'demo',
  title: 'Awesome Demo',
  subtitle: 'Subheading here',
  paragraphs: ['First paragraph.', 'Second paragraph.'],
  features: ['Feature A', 'Feature B'],
  buttons: [
    {
      label: 'Click me',
      variant: 'primary',
      size: 'md',
      onClick: vi.fn(),
    },
    {
      label: 'Link me',
      variant: 'secondary',
      size: 'sm',
      href: '/path',
      onClick: vi.fn(),
    },
  ],
  grid: {},
  ...overrides,
} as DemoSectionData);

describe('<DemoSection />', () => {
  it('renders the section with given id and default bg class', () => {
    render(<DemoSection data={makeData()} />);
    const section = document.getElementById('demo');
    expect(section).not.toBeNull();
    expect(section).toHaveClass('bg-background');
  });

  describe('Grid ordering and image layout', () => {
    it('renders the image container with mobile-visible classes when showOnMobile=true', () => {
      const imgData = {
        src: '/img.png',
        alt: 'Demo image',
        showOnMobile: true,
      };
      render(<DemoSection data={makeData({ image: imgData })} />);
      const imgDiv = screen.getByAltText('Demo image').parentElement!;
      expect(imgDiv).toHaveClass('min-w-[300px]', 'lg:w-full');
      expect(imgDiv).not.toHaveClass('hidden');
    });

    it('hides the image on mobile when showOnMobile=false', () => {
      const imgData = {
        src: '/img.png',
        alt: 'Demo image',
        showOnMobile: false,
      };
      render(<DemoSection data={makeData({ image: imgData })} />);
      const imgDiv = screen.getByAltText('Demo image').parentElement!;
      expect(imgDiv).toHaveClass('hidden', 'md:block');
    });

    it('omits the image entirely when data.image is undefined', () => {
      render(<DemoSection data={makeData({ image: undefined })} />);
      expect(screen.queryByRole('img')).toBeNull();
    });

    it('adds "order-first" to content wrapper when reverseGrid=true', () => {
      const { container } = render(
        <DemoSection data={makeData({ reverseGrid: true })} />
      );
      const wrapper = container.querySelector('.space-y-6')!;
      expect(wrapper).toHaveClass('order-first');
    });
    it('does not add "order-first" when reverseGrid=false', () => {
      render(<DemoSection data={makeData({ reverseGrid: false })} />);
      const wrapper = screen.getByText('Awesome Demo').closest('div')!;
      expect(wrapper).not.toHaveClass('order-first');
    });
  });

  describe('Text content', () => {
    it('always renders title in an h2', () => {
      render(<DemoSection data={makeData({ title: 'My Title' })} />);
      const h2 = screen.getByRole('heading', { level: 2, name: 'My Title' });
      expect(h2).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      render(<DemoSection data={makeData({ subtitle: 'A subtitle' })} />);
      expect(screen.getByText('A subtitle')).toBeInTheDocument();
    });

    it('renders each paragraph in order', () => {
      const paras = ['P1', 'P2', 'P3'];
      render(<DemoSection data={makeData({ paragraphs: paras })} />);
      paras.forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('renders no paragraphs when paragraphs array is empty', () => {
      render(<DemoSection data={makeData({ paragraphs: [] })} />);
      expect(screen.queryByText('P1')).toBeNull();
    });
  });

  describe('Features list', () => {
    it('renders one <li> per feature with a Check icon', () => {
      const feats = ['A', 'B', 'C'];
      render(<DemoSection data={makeData({ features: feats })} />);
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
      feats.forEach((f, i) => {
        expect(items[i]).toHaveTextContent(f);
        // ensure the Check SVG is inside
        expect(items[i]?.querySelector('svg')).toBeInTheDocument();
      });
    });

    it('renders no list when features is empty', () => {
      render(<DemoSection data={makeData({ features: [] })} />);
      expect(screen.queryByRole('listitem')).toBeNull();
    });

    it('throws if features is missing', () => {
      const bad = makeData();
      delete (bad as PartialDemo).features;
      expect(() => render(<DemoSection data={bad as any} />)).toThrow();
    });
  });

  describe('Buttons', () => {
    it('renders a Button for each entry, wrapping in <a> when href is present', () => {
      const data = makeData();
      render(<DemoSection data={data} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(data.buttons.length);

      // second button has href
      const link = screen.getByRole('link', { name: /Link me/i });
      expect(link).toHaveAttribute('href', '/path');
      expect(link.querySelector('button')).toBeInTheDocument();
    });

    it('calls onClick when a non-link button is clicked', () => {
      const fn = vi.fn();
      const data = makeData({
        buttons: [
          { label: 'X', variant: 'ghost', size: 'lg', onClick: fn },
        ],
      });
      render(<DemoSection data={data} />);
      fireEvent.click(screen.getByRole('button', { name: 'X' }));
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when a non-link button is clicked', () => {
      const spy = vi.fn();
      // Cast to any so TS stops complaining about the union mismatch
      const data = makeData({
        buttons: [{ label: 'X', variant: 'ghost', size: 'lg', onClick: spy }] as any,
      });
      render(<DemoSection data={data} />);
      fireEvent.click(screen.getByRole('button', { name: 'X' }));
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('throws if buttons prop is missing', () => {
      const bad = makeData();
      delete (bad as any).buttons;
      expect(() => render(<DemoSection data={bad as any} />)).toThrow();
    });

    it('renders no buttons when buttons array is empty', () => {
      render(<DemoSection data={makeData({ buttons: [] })} />);
      expect(screen.queryByRole('button')).toBeNull();
    });

    it('throws if buttons prop is missing', () => {
      const bad = makeData();
      delete (bad as PartialDemo).buttons;
      expect(() => render(<DemoSection data={bad as any} />)).toThrow();
    });
  });
});
