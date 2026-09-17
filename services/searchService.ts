import type { Product } from '@/types/product';
import { mockProducts } from '@/data/mock/products';

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  label: string;
  href: string;
}

export interface SearchResult {
  products: Product[];
  suggestions: SearchSuggestion[];
}

const POPULAR_SEARCHES = [
  'Arduino',
  'Raspberry Pi',
  'ESP32',
  'Servo Motor',
  '3D Printer',
  'Ultrasonic Sensor',
];

function delay<T>(data: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const searchService = {
  async search(query: string): Promise<SearchResult> {
    const q = query.toLowerCase();
    const products = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );

    const suggestions: SearchSuggestion[] = [
      ...products.slice(0, 5).map((p) => ({
        type: 'product' as const,
        label: p.name,
        href: `/product/${p.slug}`,
      })),
      ...Array.from(
        new Set(products.map((p) => p.category))
      ).slice(0, 3).map((c) => ({
        type: 'category' as const,
        label: c,
        href: `/shop/${c.toLowerCase().replace(/\s+/g, '-')}`,
      })),
    ];

    return delay({ products: products.slice(0, 8), suggestions });
  },

  getPopularSearches(): string[] {
    return POPULAR_SEARCHES;
  },

  getRecentSearches(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('recent-searches');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addRecentSearch(query: string): void {
    if (typeof window === 'undefined') return;
    try {
      const existing = this.getRecentSearches();
      const updated = [query, ...existing.filter((s) => s !== query)].slice(0, 5);
      localStorage.setItem('recent-searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  },
};
