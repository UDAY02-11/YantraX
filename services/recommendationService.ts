import type { Product } from '@/types/product';
import { mockProducts } from '@/data/mock/products';

export interface RecommendationResult {
  products: Product[];
  reason: string;
}

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const recommendationService = {
  async getRecommendations(userId?: string, context?: string): Promise<RecommendationResult> {
    void userId;
    void context;
    const products = mockProducts
      .filter((p) => !p.isOutOfStock)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);

    return delay({
      products,
      reason: 'Top-rated products picked for you',
    });
  },
};
