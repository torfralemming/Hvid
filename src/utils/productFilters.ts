import { Product, FilterCriteria, QuestionOption } from '../types';

export const applyFilter = (product: Product, filter: FilterCriteria): boolean => {
  let value: any;

  if (filter.field === 'brand') {
    value = product.brand;
  } else if (filter.field === 'features') {
    value = product.features;
  } else {
    value = product.specs[filter.field];
  }

  switch (filter.operator) {
    case 'gte':
      return typeof value === 'number' && value >= (filter.value as number);
    case 'lte':
      return typeof value === 'number' && value <= (filter.value as number);
    case 'eq':
    case 'equals':
      if (filter.field === 'brand') {
        return product.brand?.toLowerCase() === (filter.value as string).toLowerCase();
      }
      if (filter.field === 'energyLabel' || filter.field === 'energyClass') {
        const energyClass = product.specs.energyClass || product.specs.energyLabel;
        return energyClass === filter.value;
      }
      return value === filter.value;
    case 'contains':
    case 'includes':
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
  console.log('🔍 Filtering products:', {
    totalProducts: products.length,
    filters: selectedOptions.filter(o => o.filter).map(o => ({
      field: o.filter?.field,
      operator: o.filter?.operator,
      value: o.filter?.value
    }))
  });

  const filtered = products.filter(product => {
    const passes = selectedOptions.every(option => {
      if (!option.filter) return true;
      const result = applyFilter(product, option.filter);
      if (!result) {
        console.log(`❌ Product ${product.name} failed filter:`, option.filter);
      }
      return result;
    });
    if (passes) {
      console.log('✅ Product passed all filters:', product.name);
    }
    return passes;
  });

  console.log('📊 Filtering results:', {
    input: products.length,
    output: filtered.length,
    filtered: filtered.map(p => p.name)
  });

  return filtered;
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
