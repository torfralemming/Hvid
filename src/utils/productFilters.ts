import { Product, FilterCriteria, QuestionOption } from '../types';

export const applyFilter = (product: Product, filter: FilterCriteria): boolean => {
  const value = product.specs[filter.field];

  switch (filter.operator) {
    case 'gte':
      return typeof value === 'number' && value >= (filter.value as number);
    case 'lte':
      return typeof value === 'number' && value <= (filter.value as number);
    case 'eq':
      return value === filter.value;
    case 'contains':
      if (Array.isArray(product.features)) {
        return product.features.some(f =>
          f.toLowerCase().includes((filter.value as string).toLowerCase())
        );
      }
      return false;
    default:
      return true;
  }
};

export const filterProducts = (
  products: Product[],
  selectedOptions: QuestionOption[]
): Product[] => {
  return products.filter(product => {
    return selectedOptions.every(option => {
      if (!option.filter) return true;
      return applyFilter(product, option.filter);
    });
  });
};

export interface RecommendationTier {
  tier: 'budget' | 'recommended' | 'premium';
  label: string;
  tagline: string;
  product: Product;
}

export const selectGoodBetterBest = (
  products: Product[]
): RecommendationTier[] => {
  if (products.length === 0) return [];

  const sortedByPrice = [...products].sort((a, b) => a.price - b.price);

  const recommendations: RecommendationTier[] = [];

  if (sortedByPrice.length >= 1) {
    recommendations.push({
      tier: 'budget',
      label: 'God',
      tagline: 'God til prisen',
      product: sortedByPrice[0]
    });
  }

  if (sortedByPrice.length >= 2) {
    const midIndex = Math.floor(sortedByPrice.length / 2);
    recommendations.push({
      tier: 'recommended',
      label: 'Bedre',
      tagline: 'Vi anbefaler',
      product: sortedByPrice[midIndex]
    });
  }

  if (sortedByPrice.length >= 3) {
    recommendations.push({
      tier: 'premium',
      label: 'Bedst',
      tagline: 'Den ultimative løsning',
      product: sortedByPrice[sortedByPrice.length - 1]
    });
  }

  return recommendations;
};
