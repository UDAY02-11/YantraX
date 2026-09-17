import type { Product, ProductSection } from '@/types/product';
import { mockProducts, getProductsBySection } from '@/data/mock/products';

export interface ProductListResult {
  products: Product[];
  total: number;
}

const MOCK_LATENCY = 400;

function delay<T>(data: T, ms = MOCK_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const productService = {
  async getDailyDeals(): Promise<Product[]> {
    return delay(getProductsBySection('daily'));
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return delay(getProductsBySection('featured'));
  },

  async getFlashSaleProducts(): Promise<Product[]> {
    return delay(getProductsBySection('flash'));
  },

  async getTrendingProducts(): Promise<Product[]> {
    return delay(getProductsBySection('trending'));
  },

  async getRecommendedProducts(userId?: string): Promise<Product[]> {
    void userId;
    return delay(getProductsBySection('recommended'));
  },

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const filtered = mockProducts.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    );
    return delay(filtered);
  },

  async searchProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase();
    const results = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
    return delay(results, 200);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = mockProducts.find((p) => p.slug === slug);
    return delay(product ?? null, 200);
  },

  async getProductsBySection(section: ProductSection): Promise<Product[]> {
    return delay(getProductsBySection(section));
  },
};
