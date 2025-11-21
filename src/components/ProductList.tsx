import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink, Star } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  energy_class: string;
  capacity: number;
  features: string[];
  rating: number;
  link: string;
  store: string;
  description: string;
  keywords: string[];
  tier: 'budget' | 'mid' | 'premium';
  product_type: string;
};

type ProductListProps = {
  productType?: string;
  limit?: number;
  className?: string;
};

function ProductList({ productType, limit = 6, className = '' }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('all_products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (productType) {
          query = query.eq('product_type', productType);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Der opstod en fejl ved hentning af produkter');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productType, limit]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md text-gray-700 text-center">
        Ingen produkter fundet
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-square overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {product.tier === 'budget' ? 'Budget' :
               product.tier === 'mid' ? 'Mid-range' :
               'Premium'}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm text-gray-600">{product.rating}/5</span>
            </div>
            <p className="text-xl font-bold text-blue-600 mb-2">
              {product.price.toLocaleString('da-DK')} kr.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {product.energy_class && <span className="mr-2">Energi: {product.energy_class}</span>}
                {product.capacity && <span>Kapacitet: {product.capacity} kg</span>}
              </div>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;