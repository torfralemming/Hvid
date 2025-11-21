import { Product } from '../types';

const USE_MOCK_DATA = false;

export const fetchProducts = async (category: string): Promise<Product[]> => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockData(category);
  }

  try {
    let data: any[] = [];

    if (category === 'washing_machines') {
      console.log('📥 Fetching washing machines from /washing_machines.json');
      const response = await fetch('/washing_machines.json');
      if (!response.ok) {
        throw new Error('Failed to fetch washing machines from API');
      }
      data = await response.json();
      console.log('✅ Raw data fetched:', data.length, 'products');
    } else {
      return [];
    }

    const normalized = normalizeProducts(data, category);
    console.log('🔄 Normalized products:', normalized.length);
    console.log('📦 Sample product:', normalized[0]);
    return normalized;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    console.log('⚠️ Falling back to mock data');
    return getMockData(category);
  }
};

const normalizeProducts = (data: any[], category: string): Product[] => {
  return data.map(item => {
    const rawFeatures: string[] = Array.isArray(item.features) ? item.features : [];
    const brand = extractBrand(item.name) || item.brand || item.manufacturer || 'Ukendt';

    const normalizedFeatures = normalizeFeatures(rawFeatures);

    const imageUrl = extractImageUrl(item);

    const product = {
      id: item.id || `product-${Math.random()}`,
      sku: item.id || item.sku || '',
      name: item.name || item.title || 'Ukendt produkt',
      brand: brand,
      price: item.price || 0,
      image: imageUrl,
      category: category,
      specs: {
        capacity: item.capacity || extractCapacity(item.name),
        spinSpeed: item.rpm || item.spin_speed || 1400,
        energyClass: item.energy_class || item.energyClass || 'A',
        noiseDB: item.noise_level || item.noiseDB || 70,
        depth: item.depth || 60
      },
      features: normalizedFeatures
    };

    console.log('🔨 Normalized product:', {
      name: product.name,
      brand: product.brand,
      capacity: product.specs.capacity,
      image: product.image,
      rawFeatures: rawFeatures,
      normalizedFeatures: product.features
    });

    return product;
  });
};

const normalizeFeatures = (features: string[]): string[] => {
  const normalized: string[] = [];

  features.forEach(feature => {
    const lower = feature.toLowerCase();

    if (lower.includes('steam') || lower.includes('damp')) {
      normalized.push('steam');
    }

    if (lower.includes('quick') || lower.includes('turbo') || lower.includes('power') && lower.includes('wash')) {
      normalized.push('quick_program');
    }

    if (lower.includes('autodose') || lower.includes('twindo') || lower.includes('auto') && lower.includes('dos')) {
      normalized.push('autodose');
    }

    normalized.push(feature);
  });

  return normalized;
};

const extractBrand = (name: string): string | null => {
  const brands = ['Samsung', 'LG', 'Miele', 'Bosch', 'Siemens', 'Electrolux', 'AEG', 'Whirlpool', 'Beko'];
  for (const brand of brands) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return null;
};

const extractCapacity = (name: string): number => {
  const match = name.match(/(\d+)\s*kg/i);
  return match ? parseInt(match[1]) : 8;
};

const extractImageUrl = (item: any): string => {
  const fallbackImage = 'https://via.placeholder.com/400x400?text=No+Image';

  if (item.link && typeof item.link === 'string') {
    const match = item.link.match(/\/p-(\d+)\//);
    if (match && match[1]) {
      const productCode = match[1];
      return `https://media.power-cdn.net/images/products/${productCode}/${productCode}_1_1200x1200_w_g.jpg`;
    }
  }

  if (item.images && Array.isArray(item.images) && item.images.length > 0) {
    const primaryImage = item.images[0];
    if (typeof primaryImage === 'string' && !primaryImage.includes('unsplash')) {
      return primaryImage;
    }
    if (primaryImage.url && !primaryImage.url.includes('unsplash')) {
      return primaryImage.url;
    }
  }

  if (item.image && typeof item.image === 'string' && !item.image.includes('unsplash')) {
    return item.image;
  }

  if (item.imageUrl && typeof item.imageUrl === 'string' && !item.imageUrl.includes('unsplash')) {
    return item.imageUrl;
  }

  if (item.code) {
    return `https://media.power-cdn.net/images/products/${item.code}/${item.code}_1_1200x1200_w_g.jpg`;
  }

  if (item.productCode) {
    return `https://media.power-cdn.net/images/products/${item.productCode}/${item.productCode}_1_1200x1200_w_g.jpg`;
  }

  return fallbackImage;
};

const getMockData = (category: string): Product[] => {
  if (category === 'washing_machines') {
    return [
      {
        id: 'wm-1',
        sku: 'WM-BOSCH-8KG',
        name: 'Bosch WAU28T64SN Serie 6',
        brand: 'Bosch',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400',
        category: 'washing_machines',
        specs: {
          capacity: 8,
          depth: 59,
          spinSpeed: 1400,
          energyClass: 'A',
          noiseDB: 72
        },
        features: ['autodose', 'quick-wash', 'delay-start']
      },
      {
        id: 'wm-2',
        sku: 'WM-MIELE-9KG',
        name: 'Miele WWD 320 WPS',
        brand: 'Miele',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400',
        category: 'washing_machines',
        specs: {
          capacity: 9,
          depth: 64,
          spinSpeed: 1400,
          energyClass: 'A',
          noiseDB: 68
        },
        features: ['autodose', 'steam', 'wifi', 'quick-wash']
      },
      {
        id: 'wm-3',
        sku: 'WM-SAMSUNG-7KG',
        name: 'Samsung WW70TA046AE',
        brand: 'Samsung',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
        category: 'washing_machines',
        specs: {
          capacity: 7,
          depth: 55,
          spinSpeed: 1400,
          energyClass: 'B',
          noiseDB: 74
        },
        features: ['quick-wash', 'delay-start', 'eco-drum']
      }
    ];
  }
  return [];
};
