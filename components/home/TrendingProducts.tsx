'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCarousel } from '@/components/shared/ProductCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';

export function TrendingProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    productService.getTrendingProducts().then((data) => {
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
      <SectionHeader
        title="Trending Now"
        viewAllHref="/shop?sort=trending"
        icon={<TrendingUp className="h-5 w-5 text-accent" />}
        accent="32 95% 44%"
        className="mb-4"
      />

      {isLoading ? (
        <ProductCarousel>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ProductCarousel>
      ) : error ? (
        <ErrorState onRetry={load} />
      ) : products.length === 0 ? (
        <EmptyState title="No trending products" description="Trending products are being updated." />
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
