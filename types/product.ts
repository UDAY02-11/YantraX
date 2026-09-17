export type ProductBadge = 'new' | 'bestseller' | 'trending' | 'exclusive' | 'limited';

export type ProductSection = 'daily' | 'featured' | 'flash' | 'trending' | 'recommended';

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  brand: string;
  badge?: ProductBadge;
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  shortDescription: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  icon?: string;
}

export type BannerVariant = 'primary' | 'offer' | 'flash' | 'learn';

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  variant: BannerVariant;
  badge?: string;
}

export interface OfferBanner {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  accent: 'deal' | 'offer' | 'flash' | 'learn';
}

export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectComponent {
  name: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  difficulty: ProjectDifficulty;
  description: string;
  category: string;
  components: ProjectComponent[];
  estimatedTime: string;
}
