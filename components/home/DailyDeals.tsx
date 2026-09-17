'use client';

import * as React from 'react';
import { Flame } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCarousel } from '@/components/shared/ProductCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { productService } from '@/services/productService';
import { DAILY_DEALS_END_OFFSET_HOURS } from '@/lib/constants';
import type { Product } from '@/types/product';

export function DailyDeals() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const endTime = React.useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + DAILY_DEALS_END_OFFSET_HOURS);
    d.setMinutes(32);
    d.setSeconds(15);
    return d;
  }, []);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    productService.getDailyDeals().then((data) => {
      setProducts(data);
      setIsLoading(false);
    }).catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <section className="container-page py-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          title="Daily Deals"
          viewAllHref="/deals"
          icon={<Flame className="h-5 w-5 text-deal" />}
          accent="32 95% 44%"
        />
        <CountdownTimer endTime={endTime} variant="deal" />
      </div>

      {isLoading ? (
        <ProductCarousel>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ProductCarousel>
      ) : error ? (
        <ErrorState onRetry={load} />
      ) : products.length === 0 ? (
        <EmptyState title="No deals available right now" description="Check back soon for exciting new offers." />
      ) : (
        <ProductCarousel>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductCarousel>
      )}
    </section>
  );
}
