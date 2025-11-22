import React, { useState } from 'react';
import { X, Search, Plus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ProductSearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
};

type PowerProduct = {
  id: string;
  name: string;
  price: number;
  images: Array<{
    url: string;
  }>;
  brand?: {
    name: string;
  };
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  shortDescription?: string;
  url?: string;
};

function generateKeywords(product: PowerProduct): string[] {
  const keywords: string[] = [];
  
  // Price-based keywords
  if (product.price < 4000) {
    keywords.push('budget-friendly', 'affordable');
  } else if (product.price > 8000) {
    keywords.push('premium', 'high-end');
  } else {
    keywords.push('mid-range');
  }

  // Brand-based keywords
  if (product.brand?.name) {
    keywords.push(`brand-${product.brand.name.toLowerCase()}`);
  }

  // Specification-based keywords
  product.specifications?.forEach(spec => {
    const name = spec.name.toLowerCase();
    const value = spec.value.toLowerCase();

    if (name.includes('kapacitet')) {
      const capacity = parseInt(value.match(/\d+/)?.[0] || '0');
      if (capacity <= 7) keywords.push('compact');
      else if (capacity >= 9) keywords.push('large-capacity');
    }

    if (name.includes('energi')) {
      if (value.includes('a')) keywords.push('energy-efficient');
    }

    if (name.includes('støj')) {
      if (value.includes('db') && parseInt(value) < 50) {
        keywords.push('quiet-operation');
      }
    }

    if (value.includes('smart') || value.includes('wifi')) {
      keywords.push('smart-features');
    }

    if (value.includes('damp') || value.includes('steam')) {
      keywords.push('steam-function');
    }
  });

  return [...new Set(keywords)];
}

function determineProductType(product: PowerProduct): string {
  const name = product.name.toLowerCase();
  const description = product.shortDescription?.toLowerCase() || '';

  if (name.includes('vaskemaskine') || description.includes('vaskemaskine')) {
    return 'washing_machine';
  }
  if (name.includes('opvaskemaskine') || description.includes('opvaskemaskine')) {
    return 'dishwasher';
  }
  if (name.includes('ovn') || description.includes('ovn')) {
    return 'oven';
  }
  if (name.includes('køleskab') || description.includes('køleskab')) {
    return 'refrigerator';
  }
  
  return 'washing_machine'; // Default to washing machine if unable to determine
}

function extractSpecificData(product: PowerProduct, productType: string) {
  const data: Record<string, any> = {};

  product.specifications?.forEach(spec => {
    const name = spec.name.toLowerCase();
    const value = spec.value.toLowerCase();

    if (productType === 'washing_machine') {
      if (name.includes('omdrejninger')) {
        data.rpm = parseInt(value.match(/\d+/)?.[0] || '1400');
      }
      if (name.includes('årligt energiforbrug')) {
        data.annual_energy_consumption = parseInt(value.match(/\d+/)?.[0] || '150');
      }
      if (name.includes('årligt vandforbrug')) {
        data.annual_water_consumption = parseInt(value.match(/\d+/)?.[0] || '10000');
      }
    }
    // Add similar logic for other product types
  });

  return data;
}

function ProductSearchDialog({ isOpen, onClose, onProductAdded }: ProductSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<PowerProduct[]>([]);
  const [addingProduct, setAddingProduct] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://scovfppftngipmzpnlsl.supabase.co/functions/v1/power-api1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          endpoint: 'search',
          query: searchQuery,
          pageSize: 10
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const products = data?.products || [];
      setSearchResults(products);

      if (products.length === 0) {
        setError('Ingen produkter fundet');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Der opstod en fejl under søgningen. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: PowerProduct) => {
    try {
      setAddingProduct(product.id);
      setError(null);

      const energyClassSpec = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('energiklasse')
      );
      const energyClass = energyClassSpec?.value || 'A';

      const capacitySpec = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('kapacitet')
      );
      const capacityValue = capacitySpec?.value || '0';
      const capacity = parseInt(capacityValue.match(/\d+/)?.[0] || '0');

      const features = product.specifications
        ?.filter(spec => 
          spec.name.toLowerCase().includes('funktion') || 
          spec.name.toLowerCase().includes('teknologi') ||
          spec.name.toLowerCase().includes('program')
        )
        .map(spec => spec.value)
        .filter(Boolean) || [];

      let tier: 'budget' | 'mid' | 'premium' = 'mid';
      if (product.price < 5000) tier = 'budget';
      else if (product.price > 8000) tier = 'premium';

      const productType = determineProductType(product);
      const keywords = generateKeywords(product);
      const typeSpecificData = extractSpecificData(product, productType);

      const productData = {
        id: `power-${product.id}`,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1',
        energy_class: energyClass,
        capacity,
        features: features.length > 0 ? features : [product.brand?.name + ' ' + product.name],
        rating: 4.5,
        link: `https://www.power.dk${product.url}`,
        store: 'Power',
        description: product.shortDescription || `${product.brand?.name} ${product.name}`,
        keywords,
        tier,
        product_type: productType,
        type_specific_data: typeSpecificData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error: insertError } = await supabase
        .from('all_products')
        .insert([productData]);

      if (insertError) throw insertError;

      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Der opstod en fejl ved tilføjelse af produkt');
    } finally {
      setAddingProduct(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Søg efter produkter</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Søg efter produktnavn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
                </div>
                <button
                  onClick={() => handleAddProduct(product)}
                  disabled={addingProduct === product.id}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 flex items-center gap-2"
                >
                  {addingProduct === product.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Tilføj produkt
                </button>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      {product.brand?.name && (
                        <p className="text-lg text-gray-600">{product.brand.name}</p>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                      {product.price.toLocaleString('da-DK')} kr.
                    </p>
                  </div>

                  {product.specifications && product.specifications.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Specifikationer:</h4>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {product.specifications.slice(0, 6).map((spec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700">{spec.name}:</span>
                            <span className="text-sm text-gray-600">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.shortDescription && (
                    <p className="mt-4 text-sm text-gray-600">{product.shortDescription}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {searchResults.length === 0 && !loading && searchQuery && (
            <div className="text-center py-8 text-gray-500">
              Ingen produkter fundet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSearchDialog;