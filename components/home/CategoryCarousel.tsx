'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { categoryService } from '@/services/categoryService';
import type { Category } from '@/types/product';
import { Button } from '@/components/ui/button';

export function CategoryCarousel() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    categoryService.getCategories().then((data) => {
      setCategories(data);
      setIsLoading(false);
    }).catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const scrollByDir = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <section className="container-page py-8">
        <SectionHeader title="Shop by Category" viewAllHref="/shop" className="mb-4" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex shrink-0 flex-col gap-2">
              <div className="h-20 w-28 animate-shimmer rounded-lg" />
              <div className="h-3 w-20 animate-shimmer rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-page py-8">
        <SectionHeader title="Shop by Category" viewAllHref="/shop" className="mb-4" />
        <ErrorState onRetry={load} />
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="container-page py-8">
        <SectionHeader title="Shop by Category" viewAllHref="/shop" className="mb-4" />
        <EmptyState title="No categories found" />
      </section>
    );
  }

  return (
    <section className="container-page py-8">
      <SectionHeader title="Shop by Category" viewAllHref="/shop" className="mb-4" />

      <div className="relative">
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
          role="region"
          aria-label="Category carousel"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group flex shrink-0 flex-col gap-2"
              style={{ scrollSnapAlign: 'start', width: '130px' }}
            >
              <div className="relative h-20 w-full overflow-hidden rounded-lg border bg-muted transition-all group-hover:border-primary group-hover:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold leading-tight">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.productCount} items</p>
              </div>
            </a>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -left-3 top-8 z-10 hidden rounded-full bg-background shadow-md md:flex"
          onClick={() => scrollByDir('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-8 z-10 hidden rounded-full bg-background shadow-md md:flex"
          onClick={() => scrollByDir('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
