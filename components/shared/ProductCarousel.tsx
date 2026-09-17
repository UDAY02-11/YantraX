'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemsPerView?: { desktop: number; tablet: number; mobile: number };
}

export function ProductCarousel({
  children,
  className,
  itemsPerView = { desktop: 5, tablet: 3, mobile: 2 },
}: ProductCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const carouselId = React.useId().replace(/:/g, '');

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    const handle = () => updateScrollButtons();
    el.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      el.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [updateScrollButtons]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / children.length;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn('relative', className)} data-carousel-id={carouselId}>
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        role="region"
        aria-label="Product carousel"
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="carousel-item shrink-0"
            style={{
              width: `calc((100% - ${(itemsPerView.desktop - 1) * 16}px) / ${itemsPerView.desktop})`,
              scrollSnapAlign: 'start',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          :global([data-carousel-id="${carouselId}"] .carousel-item) {
            width: calc((100% - ${(itemsPerView.tablet - 1) * 16}px) / ${itemsPerView.tablet}) !important;
          }
        }
        @media (max-width: 639px) {
          :global([data-carousel-id="${carouselId}"] .carousel-item) {
            width: calc((100% - ${(itemsPerView.mobile - 1) * 16}px) / ${itemsPerView.mobile}) !important;
          }
        }
      `}</style>

      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md md:flex"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background shadow-md md:flex"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
