'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCarousel } from '@/components/shared/ProductCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';

export function FeaturedProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    productService.getFeaturedProducts().then((data) => {
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
        title="Featured Products"
        viewAllHref="/shop?sort=featured"
        icon={<Star className="h-5 w-5 text-primary" />}
        accent="221 83% 53%"
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
        <EmptyState title="No featured products" description="Check back soon for curated picks." />
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
