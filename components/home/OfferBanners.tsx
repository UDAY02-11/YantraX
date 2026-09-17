'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bannerService } from '@/services/bannerService';
import type { OfferBanner } from '@/types/product';
import { cn } from '@/lib/utils';

const accentMap: Record<string, { gradient: string; badge: string }> = {
  deal: { gradient: 'from-orange-500/90 to-red-600/90', badge: 'bg-white/20' },
  offer: { gradient: 'from-cyan-500/90 to-blue-600/90', badge: 'bg-white/20' },
  flash: { gradient: 'from-red-500/90 to-rose-700/90', badge: 'bg-white/20' },
  learn: { gradient: 'from-green-500/90 to-emerald-700/90', badge: 'bg-white/20' },
};

export function OfferBanners() {
  const [banners, setBanners] = React.useState<OfferBanner[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    bannerService.getOfferBanners().then((data) => {
      setBanners(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="container-page py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-shimmer rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="container-page py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => {
          const styles = accentMap[banner.accent] ?? accentMap.deal;
          return (
            <a
              key={banner.id}
              href={banner.ctaHref}
              className="group relative flex h-44 overflow-hidden rounded-xl sm:h-48"
            >
              <img
                src={banner.image}
                alt={banner.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={cn('absolute inset-0 bg-gradient-to-r', styles.gradient)} />
              <div className="relative flex flex-col justify-center gap-2 p-5">
                <h3 className="text-xl font-bold text-white sm:text-2xl" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {banner.title}
                </h3>
                <p className="max-w-[200px] text-sm text-white/90">
                  {banner.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-sm font-semibold text-white">
                  {banner.ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
