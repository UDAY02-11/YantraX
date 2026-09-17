'use client';

import * as React from 'react';
import { homepageSections, type SectionId } from '@/config/homepage';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { DailyDeals } from '@/components/home/DailyDeals';
import { OfferBanners } from '@/components/home/OfferBanners';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryCarousel } from '@/components/home/CategoryCarousel';
import { FlashSale } from '@/components/home/FlashSale';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { RecommendedProducts } from '@/components/home/RecommendedProducts';
import { LearningSection } from '@/components/home/LearningSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { Newsletter } from '@/components/home/Newsletter';

const sectionMap: Record<SectionId, React.ComponentType> = {
  hero: HeroCarousel,
  dailyDeals: DailyDeals,
  offers: OfferBanners,
  featured: FeaturedProducts,
  categories: CategoryCarousel,
  flashSale: FlashSale,
  trending: TrendingProducts,
  recommended: RecommendedProducts,
  learning: LearningSection,
  benefits: BenefitsSection,
  newsletter: Newsletter,
};

export function HomepageSections() {
  return (
    <>
      {homepageSections
        .filter((s) => s.visible)
        .map((section) => {
          const Component = sectionMap[section.id];
          return Component ? <Component key={section.id} /> : null;
        })}
    </>
  );
}
