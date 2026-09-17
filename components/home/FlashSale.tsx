'use client';

import * as React from 'react';
import { Zap } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCarousel } from '@/components/shared/ProductCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { productService } from '@/services/productService';
import { FLASH_SALE_END_OFFSET_HOURS } from '@/lib/constants';
import type { Product } from '@/types/product';

export function FlashSale() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const endTime = React.useMemo(() => {
    const d = new Date();
    d.setHours(d.getHours() + FLASH_SALE_END_OFFSET_HOURS);
    d.setMinutes(42);
    d.setSeconds(18);
    return d;
  }, []);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    productService.getFlashSaleProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    }).catch(() => {
      setError(true);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <section className="bg-flash/5 py-8">
      <div className="container-page">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="Flash Sale"
            viewAllHref="/deals?tab=flash"
            icon={<Zap className="h-5 w-5 text-flash" />}
            accent="0 72% 51%"
          />
          <CountdownTimer endTime={endTime} variant="flash" />
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
          <EmptyState title="No flash sale items" description="Flash sale deals are coming soon." />
        ) : (
          <ProductCarousel>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductCarousel>
        )}
      </div>
    </section>
  );
}
