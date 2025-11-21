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
      const response = await fetch('/washing_machines.json');
      if (!response.ok) {
        throw new Error('Failed to fetch washing machines from API');
      }
      data = await response.json();
    } else {
      return [];
    }

    return normalizeProducts(data, category);
  } catch (error) {
    console.error('Error fetching products:', error);
    return getMockData(category);
  }
};

const normalizeProducts = (data: any[], category: string): Product[] => {
  return data.map(item => {
    const features: string[] = Array.isArray(item.features) ? item.features : [];

    const normalizedFeatures = features.map(f => f.toLowerCase());

    return {
      id: item.id || `product-${Math.random()}`,
      sku: item.id || item.sku || '',
      name: item.name || item.title || 'Ukendt produkt',
      brand: extractBrand(item.name) || item.brand || item.manufacturer || 'Ukendt',
      price: item.price || 0,
      image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400',
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
  });
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
