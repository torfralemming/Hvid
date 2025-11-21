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
  const activeFilters = selectedOptions.filter(o => o.filter);

  console.log('🔍 Filtering products:', {
    totalProducts: products.length,
    totalOptions: selectedOptions.length,
    activeFilters: activeFilters.length,
    filters: activeFilters.map(o => ({
      label: o.label,
      field: o.filter?.field,
      operator: o.filter?.operator,
      value: o.filter?.value
    }))
  });

  if (activeFilters.length === 0) {
    console.log('⚠️ No filters applied, returning all products');
    return products;
  }

  const filtered = products.filter(product => {
    console.log(`\n🔎 Testing product: ${product.name}`);
    console.log('  - Brand:', product.brand);
    console.log('  - Capacity:', product.specs.capacity);
    console.log('  - Features:', product.features);

    const passes = selectedOptions.every(option => {
      if (!option.filter) {
        console.log(`  ⏭️  No filter for option: ${option.label}`);
        return true;
      }

      const result = applyFilter(product, option.filter);
      console.log(`  ${result ? '✅' : '❌'} Filter "${option.label}":`, option.filter, '→', result);
      return result;
    });

    if (passes) {
      console.log(`  ✅ PASSED: ${product.name}`);
    } else {
      console.log(`  ❌ FAILED: ${product.name}`);
    }

    return passes;
  });

  console.log('\n📊 Filtering results:', {
    input: products.length,
    output: filtered.length,
    filtered: filtered.map(p => ({ name: p.name, price: p.price }))
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
