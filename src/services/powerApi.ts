import { Product } from '../types';

const USE_MOCK_DATA = true;

const MOCK_WASHING_MACHINES: Product[] = [
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
  },
  {
    id: 'wm-4',
    sku: 'WM-ELECTROLUX-8KG',
    name: 'Electrolux EW6F4862RF',
    brand: 'Electrolux',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
    category: 'washing_machines',
    specs: {
      capacity: 8,
      depth: 52,
      spinSpeed: 1600,
      energyClass: 'A',
      noiseDB: 70
    },
    features: ['steam', 'quick-wash', 'delay-start']
  },
  {
    id: 'wm-5',
    sku: 'WM-LG-10KG',
    name: 'LG F4WV910P2E',
    brand: 'LG',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
    category: 'washing_machines',
    specs: {
      capacity: 10,
      depth: 60,
      spinSpeed: 1400,
      energyClass: 'A',
      noiseDB: 69
    },
    features: ['autodose', 'steam', 'wifi', 'ai-wash']
  },
  {
    id: 'wm-6',
    sku: 'WM-BEKO-6KG',
    name: 'Beko WTV6532B0',
    brand: 'Beko',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400',
    category: 'washing_machines',
    specs: {
      capacity: 6,
      depth: 47,
      spinSpeed: 1000,
      energyClass: 'C',
      noiseDB: 75
    },
    features: ['quick-wash', 'delay-start']
  },
  {
    id: 'wm-7',
    sku: 'WM-SIEMENS-9KG',
    name: 'Siemens WM14VPH9DN',
    brand: 'Siemens',
    price: 9499,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400',
    category: 'washing_machines',
    specs: {
      capacity: 9,
      depth: 59,
      spinSpeed: 1400,
      energyClass: 'A',
      noiseDB: 66
    },
    features: ['autodose', 'steam', 'wifi', 'home-connect']
  },
  {
    id: 'wm-8',
    sku: 'WM-WHIRLPOOL-7KG',
    name: 'Whirlpool FFB 7438 BV',
    brand: 'Whirlpool',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
    category: 'washing_machines',
    specs: {
      capacity: 7,
      depth: 54,
      spinSpeed: 1400,
      energyClass: 'B',
      noiseDB: 73
    },
    features: ['steam', 'quick-wash', 'fresh-care']
  }
];

export const fetchProducts = async (category: string): Promise<Product[]> => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (category) {
      case 'washing_machines':
        return MOCK_WASHING_MACHINES;
      default:
        return [];
    }
  }

  try {
    const response = await fetch(`https://api.power.dk/products?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products from POWER API');
    }
    const data = await response.json();
    return normalizeProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const normalizeProducts = (data: any[]): Product[] => {
  return data.map(item => ({
    id: item.id || item.sku,
    sku: item.sku,
    name: item.name || item.title,
    brand: item.brand || item.manufacturer,
    price: item.price || 0,
    image: item.image || item.imageUrl || '',
    category: item.category,
    specs: item.specifications || {},
    features: item.features || []
  }));
};
