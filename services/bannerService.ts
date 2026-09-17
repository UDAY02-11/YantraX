import type { HeroBanner, OfferBanner } from '@/types/product';
import { mockHeroBanners, mockOfferBanners } from '@/data/mock/banners';

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const bannerService = {
  async getHeroBanners(): Promise<HeroBanner[]> {
    return delay(mockHeroBanners);
  },

  async getOfferBanners(): Promise<OfferBanner[]> {
    return delay(mockOfferBanners);
  },
};
