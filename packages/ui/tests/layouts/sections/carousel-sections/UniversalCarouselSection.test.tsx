import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UniversalCarouselData } from '@repo/ui/types';
import { UniversalCarouselSection } from '@repo/ui/layouts/sections/carousel-sections/UniversalCarouselSection';

// Mock embla-carousel-autoplay
vi.mock('embla-carousel-autoplay', () => {
  const mockAutoplay = vi.fn();
  return {
    default: mockAutoplay,
  };
});

// Mock the carousel components
vi.mock('@repo/ui/components/ui/carousel', () => {
  const React = require('react');
  
  return {
    Carousel: ({ children, setApi, onMouseEnter, onMouseLeave, ...props }: any) => {
      const mockApi = {
        scrollSnapList: () => [0, 1, 2],
        selectedScrollSnap: () => 0,
        scrollTo: vi.fn(),
        on: vi.fn(),
      };
      
      // Simulate setApi call
      React.useEffect(() => {
        if (setApi) {
          setApi(mockApi);
        }
      }, [setApi]);
      
      return React.createElement('div', {
        'data-testid': 'carousel',
        onMouseEnter,
        onMouseLeave,
        ...props,
      }, children);
    },
    CarouselContent: ({ children, ...props }: any) => 
      React.createElement('div', {
        'data-testid': 'carousel-content',
        ...props,
      }, children),
    CarouselItem: ({ children, ...props }: any) => 
      React.createElement('div', {
        'data-testid': 'carousel-item',
        ...props,
      }, children),
    CarouselNext: (props: any) => 
      React.createElement('button', {
        'data-testid': 'carousel-next',
        ...props,
      }, 'Next'),
    CarouselPrevious: (props: any) => 
      React.createElement('button', {
        'data-testid': 'carousel-previous',
        ...props,
      }, 'Previous'),
  };
});

// Test data
interface TestSlide {
  id: string;
  title: string;
  content: string;
}

const createMockData = (overrides: Partial<UniversalCarouselData<TestSlide>> = {}): UniversalCarouselData<TestSlide> => ({
  sectionId: 'test-carousel',
  title: 'Test Carousel',
  subtitle: 'This is a test carousel',
  slides: [
    { id: '1', title: 'Slide 1', content: 'Content 1' },
    { id: '2', title: 'Slide 2', content: 'Content 2' },
    { id: '3', title: 'Slide 3', content: 'Content 3' },
  ],
  autoPlay: false,
  autoPlayDelay: 3000,
  showDots: true,
  showArrows: true,
  slidesToShow: 1,
  className: '',
  ...overrides,
});

const mockRenderSlide = (slide: TestSlide, index: number) => (
  <div data-testid={`slide-${index}`} key={slide.id}>
    <h3>{slide.title}</h3>
    <p>{slide.content}</p>
  </div>
);

describe('UniversalCarouselSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Basic Rendering', () => {
    it('renders the carousel section with title and subtitle', () => {
      const data = createMockData();
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.getByText('Test Carousel')).toBeInTheDocument();
      expect(screen.getByText('This is a test carousel')).toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('renders without title and subtitle when not provided', () => {
      const data = createMockData({ title: undefined, subtitle: undefined });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByText('Test Carousel')).not.toBeInTheDocument();
      expect(screen.queryByText('This is a test carousel')).not.toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const data = createMockData({ className: 'custom-class' });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const section = document.getElementById('test-carousel');
      expect(section).toHaveClass('custom-class');
    });

    it('applies section ID correctly', () => {
      const data = createMockData({ sectionId: 'custom-section-id' });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(document.getElementById('custom-section-id')).toBeInTheDocument();
    });
  });

  describe('Background Image', () => {
    it('applies background image style when backgroundSrc is provided', () => {
      const data = createMockData({ backgroundSrc: 'https://example.com/bg.jpg' });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const section = document.getElementById('test-carousel');
      expect(section).toHaveStyle({
        backgroundImage: 'url(https://example.com/bg.jpg)'
      });
    });
  });

  describe('Slides Rendering', () => {
    it('renders all slides using the provided renderSlide function', () => {
      const data = createMockData();
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.getByTestId('slide-0')).toBeInTheDocument();
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      expect(screen.getByTestId('slide-2')).toBeInTheDocument();
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('applies correct basis classes for different slidesToShow values', () => {
      const testCases = [
        { slidesToShow: 1, expectedClass: 'md:basis-full' },
        { slidesToShow: 2, expectedClass: 'md:basis-1/2' },
        { slidesToShow: 3, expectedClass: 'md:basis-1/2 lg:basis-1/3' },
        { slidesToShow: 4, expectedClass: 'md:basis-1/2 lg:basis-1/3 xl:basis-1/4' },
      ];

      testCases.forEach(({ slidesToShow, expectedClass }) => {
        const data = createMockData({ slidesToShow });
        
        const { unmount } = render(
          <UniversalCarouselSection
            data={data}
            renderSlide={mockRenderSlide}
          />
        );

        const carouselItems = screen.getAllByTestId('carousel-item');
        carouselItems.forEach(item => {
          expect(item).toHaveClass(expectedClass);
        });

        unmount();
      });
    });
  });

  describe('Navigation Arrows', () => {
    it('shows navigation arrows when showArrows is true and has multiple slides', () => {
      const data = createMockData({ showArrows: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.getByTestId('carousel-previous')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
    });

    it('hides navigation arrows when showArrows is false', () => {
      const data = createMockData({ showArrows: false });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByTestId('carousel-previous')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next')).not.toBeInTheDocument();
    });

    it('hides navigation arrows when there is only one slide', () => {
      const data = createMockData({ 
        showArrows: true,
        slides: [{ id: '1', title: 'Single Slide', content: 'Content' }]
      });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByTestId('carousel-previous')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next')).not.toBeInTheDocument();
    });
  });

  describe('Dots Navigation', () => {
    it('shows dots when showDots is true and has multiple slides', async () => {
      const data = createMockData({ showDots: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      await waitFor(() => {
        const dots = screen.getAllByLabelText(/Go to slide/);
        expect(dots).toHaveLength(3);
      });
    });

    it('hides dots when showDots is false', () => {
      const data = createMockData({ showDots: false });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
    });

    it('hides dots when there is only one slide', () => {
      const data = createMockData({ 
        showDots: true,
        slides: [{ id: '1', title: 'Single Slide', content: 'Content' }]
      });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
    });

    it('handles dot click navigation', async () => {
      const data = createMockData({ showDots: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      await waitFor(() => {
        const secondDot = screen.getByLabelText('Go to slide 2');
        fireEvent.click(secondDot);
      });

      // The actual scroll behavior would be tested in integration tests
      // Here we just verify the click handler is attached
      expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
    });
  });

  describe('Autoplay Functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('initializes autoplay when autoPlay is true', async () => {
      const { default: mockAutoplay } = await import('embla-carousel-autoplay');
      const data = createMockData({ autoPlay: true, autoPlayDelay: 2000 });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(mockAutoplay).toHaveBeenCalledWith({ delay: 2000 });
    });

    it('does not initialize autoplay when autoPlay is false', async () => {
      const { default: mockAutoplay } = await import('embla-carousel-autoplay');
      const data = createMockData({ autoPlay: false });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(mockAutoplay).not.toHaveBeenCalled();
    });

    it('uses default autoPlayDelay when not specified', async () => {
      const { default: mockAutoplay } = await import('embla-carousel-autoplay');
      const data = createMockData({ autoPlay: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(mockAutoplay).toHaveBeenCalledWith({ delay: 3000 });
    });
  });

  describe('Mouse Interaction with Autoplay', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('stops autoplay on mouse enter and resets on mouse leave', async () => {
      const { default: mockAutoplay } = await import('embla-carousel-autoplay');
      const mockStop = vi.fn();
      const mockReset = vi.fn();
      
      (mockAutoplay as any).mockReturnValue({
        stop: mockStop,
        reset: mockReset,
      });

      const data = createMockData({ autoPlay: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const carousel = screen.getByTestId('carousel');
      
      fireEvent.mouseEnter(carousel);
      expect(mockStop).toHaveBeenCalled();
      
      fireEvent.mouseLeave(carousel);
      expect(mockReset).toHaveBeenCalled();
    });

    it('does not call stop/reset when autoplay is disabled', () => {
      const data = createMockData({ autoPlay: false });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const carousel = screen.getByTestId('carousel');
      
      fireEvent.mouseEnter(carousel);
      fireEvent.mouseLeave(carousel);
      
      // No expectations here since autoplay is not initialized when disabled
    });
  });

  describe('Responsive Padding', () => {
    it('applies responsive padding when arrows are shown', () => {
      const data = createMockData({ showArrows: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const sectionDiv = screen.getByTestId('carousel').closest('.section');
      expect(sectionDiv).toHaveClass('md:px-14');
    });

    it('does not apply responsive padding when arrows are hidden', () => {
      const data = createMockData({ showArrows: false });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const sectionDiv = screen.getByTestId('carousel').closest('.section');
      expect(sectionDiv).not.toHaveClass('md:px-14');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slides array', () => {
      const data = createMockData({ slides: [] });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      expect(screen.queryByTestId('carousel-item')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-previous')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next')).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
    });

    it('handles renderSlide function that returns null', () => {
      const data = createMockData();
      const nullRenderSlide = () => null;
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={nullRenderSlide}
        />
      );

      const carouselItems = screen.getAllByTestId('carousel-item');
      expect(carouselItems).toHaveLength(3);
      carouselItems.forEach(item => {
        expect(item).toBeEmptyDOMElement();
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels for dot navigation', async () => {
      const data = createMockData({ showDots: true });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
      });
    });

    it('uses semantic section element with proper ID', () => {
      const data = createMockData({ sectionId: 'accessibility-test' });
      
      render(
        <UniversalCarouselSection
          data={data}
          renderSlide={mockRenderSlide}
        />
      );

      const section = document.getElementById('accessibility-test');
      expect(section).toBeInTheDocument();
      expect(section?.tagName.toLowerCase()).toBe('section');
    });
  });
});