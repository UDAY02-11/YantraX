'use client';

import * as React from 'react';
import { Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCarousel } from '@/components/shared/ProductCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { recommendationService } from '@/services/recommendationService';
import type { Product } from '@/types/product';

export function RecommendedProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [reason, setReason] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const load = React.useCallback(() => {
    setIsLoading(true);
    setError(false);
    recommendationService.getRecommendations().then((data) => {
      setProducts(data.products);
      setReason(data.reason);
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
        title="Recommended For You"
        icon={<Sparkles className="h-5 w-5 text-primary" />}
        accent="221 83% 53%"
        className="mb-1"
      />
      {!isLoading && !error && reason && (
        <p className="mb-4 text-sm text-muted-foreground">{reason}</p>
      )}

      {isLoading ? (
        <ProductCarousel>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ProductCarousel>
      ) : error ? (
        <ErrorState onRetry={load} />
      ) : products.length === 0 ? (
        <EmptyState title="No recommendations yet" description="Browse products to get personalized recommendations." />
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
