export type SectionId =
  | 'hero'
  | 'dailyDeals'
  | 'offers'
  | 'featured'
  | 'categories'
  | 'flashSale'
  | 'trending'
  | 'recommended'
  | 'learning'
  | 'benefits'
  | 'newsletter';

export interface HomepageSectionConfig {
  id: SectionId;
  visible: boolean;
}

export const homepageSections: HomepageSectionConfig[] = [
  { id: 'hero', visible: true },
  { id: 'dailyDeals', visible: true },
  { id: 'offers', visible: true },
  { id: 'featured', visible: true },
  { id: 'categories', visible: true },
  { id: 'flashSale', visible: true },
  { id: 'trending', visible: true },
  { id: 'recommended', visible: true },
  { id: 'learning', visible: true },
  { id: 'benefits', visible: true },
  { id: 'newsletter', visible: true },
];
