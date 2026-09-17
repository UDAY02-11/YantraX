'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bannerService } from '@/services/bannerService';
import type { HeroBanner } from '@/types/product';
import { cn } from '@/lib/utils';

const variantStyles: Record<string, { bg: string; badge: string; accent: string }> = {
  primary: { bg: 'from-blue-900/85 to-blue-700/50', badge: 'bg-primary/90', accent: 'text-blue-200' },
  flash: { bg: 'from-orange-900/85 to-red-700/50', badge: 'bg-flash/90', accent: 'text-orange-200' },
  offer: { bg: 'from-cyan-900/85 to-teal-700/50', badge: 'bg-offer/90', accent: 'text-cyan-200' },
  learn: { bg: 'from-green-900/85 to-emerald-700/50', badge: 'bg-learn/90', accent: 'text-green-200' },
};

export function HeroCarousel() {
  const [banners, setBanners] = React.useState<HeroBanner[]>([]);
  const [current, setCurrent] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    bannerService.getHeroBanners().then((data) => {
      setBanners(data);
      setIsLoading(false);
    });
  }, []);

  const next = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  React.useEffect(() => {
    if (isPaused || banners.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused, banners.length]);

  if (isLoading) {
    return (
      <div className="container-page py-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="aspect-[16/9] animate-shimmer rounded-xl lg:aspect-[16/8]" />
          <div className="hidden gap-4 lg:flex lg:flex-col">
            <div className="flex-1 animate-shimmer rounded-xl" />
            <div className="flex-1 animate-shimmer rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) return null;

  const sideCards = banners.slice(1, 3);

  return (
    <section className="container-page py-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        {/* Main carousel */}
        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Featured promotions"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/8]">
            {banners.map((banner, idx) => {
              const styles = variantStyles[banner.variant] ?? variantStyles.primary;
              return (
                <div
                  key={banner.id}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700',
                    idx === current ? 'opacity-100' : 'pointer-events-none opacity-0'
                  )}
                  aria-hidden={idx !== current}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${idx + 1} of ${banners.length}`}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className={cn('absolute inset-0 bg-gradient-to-r', styles.bg)} />
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full max-w-lg space-y-2 p-6 sm:space-y-3 sm:p-8 lg:p-10">
                        {banner.badge && (
                          <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-bold text-white', styles.badge)}>
                            {banner.badge}
                          </span>
                        )}
                        <p className={cn('text-xs font-semibold uppercase tracking-wide sm:text-sm', styles.accent)}>
                          {banner.subtitle}
                        </p>
                        <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
                          {banner.title}
                        </h1>
                        <p className="hidden text-sm text-white/90 sm:block lg:text-base">
                          {banner.description}
                        </p>
                        <div className="pt-1 sm:pt-2">
                          <Button asChild size="lg" className="gap-2">
                            <a href={banner.ctaHref}>
                              {banner.ctaText}
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-4 sm:h-10 sm:w-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-4 sm:h-10 sm:w-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  idx === current ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side promo cards */}
        <div className="hidden gap-4 lg:flex lg:flex-col">
          {sideCards.map((card) => {
            const styles = variantStyles[card.variant] ?? variantStyles.primary;
            return (
              <a
                key={card.id}
                href={card.ctaHref}
                className="group relative flex flex-1 overflow-hidden rounded-xl"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={cn('absolute inset-0 bg-gradient-to-t', styles.bg)} />
                <div className="relative flex flex-col justify-end gap-1 p-5">
                  {card.badge && (
                    <span className={cn('w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white', styles.badge)}>
                      {card.badge}
                    </span>
                  )}
                  <h2 className="text-lg font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-jakarta)' }}>
                    {card.title}
                  </h2>
                  <p className="line-clamp-1 text-xs text-white/85">{card.description}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-white">
                    {card.ctaText}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
