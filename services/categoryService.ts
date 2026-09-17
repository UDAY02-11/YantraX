import type { Category } from '@/types/product';
import { mockCategories } from '@/data/mock/categories';

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return delay(mockCategories);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cat = mockCategories.find((c) => c.slug === slug);
    return delay(cat ?? null, 200);
  },
};
