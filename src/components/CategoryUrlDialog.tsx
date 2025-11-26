import React, { useState } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

type CategoryUrlDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductsAdded: () => void;
};

export default function CategoryUrlDialog({ isOpen, onClose, onProductsAdded }: CategoryUrlDialogProps) {
  const [categoryUrl, setCategoryUrl] = useState('');
  const [productType, setProductType] = useState('washing_machine');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, message: '' });

  if (!isOpen) return null;

  const extractCategoryId = (url: string): string | null => {
    const match = url.match(/\/c\/(\d+)\//);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setProgress({ current: 0, total: 0, message: 'Henter kategori data...' });

    try {
      const categoryId = extractCategoryId(categoryUrl);
      if (!categoryId) {
        throw new Error('Ugyldig kategori URL. Brug formatet: https://www.power.dk/c/XXXX/...');
      }

      setProgress({ current: 0, total: 0, message: 'Henter produkter fra kategori...' });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/power-api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          endpoint: 'category',
          url: categoryUrl
        })
      });

      if (!response.ok) {
        throw new Error('Kunne ikke hente produkter fra Power.dk');
      }

      const data = await response.json();
      const products = data.products || [];

      if (products.length === 0) {
        throw new Error('Ingen produkter fundet i denne kategori');
      }

      setProgress({ current: 0, total: products.length, message: `Fundet ${products.length} produkter. Tilføjer til database...` });

      let addedCount = 0;
      let skippedCount = 0;
      let errorCount = 0;

      for (let i = 0; i < products.length; i++) {
        const product = products[i];

        setProgress({
          current: i + 1,
          total: products.length,
          message: `Behandler produkt ${i + 1} af ${products.length}...`
        });

        try {
          const productId = `power-${product.id}`;

          const { data: existing } = await supabase
            .from('all_products')
            .select('id')
            .eq('id', productId)
            .maybeSingle();

          if (existing) {
            skippedCount++;
            continue;
          }

          const { error: insertError } = await supabase
            .from('all_products')
            .insert({
              id: productId,
              name: product.title || product.name || 'Unavngivet produkt',
              price: product.price || 0,
              image: product.image || product.imageUrl || '',
              product_type: productType,
              features: [],
              keywords: []
            });

          if (insertError) {
            console.error('Error inserting product:', insertError);
            errorCount++;
          } else {
            addedCount++;
          }
        } catch (err) {
          console.error('Error processing product:', err);
          errorCount++;
        }

        await new Promise(resolve => setTimeout(resolve, 50));
      }

      setProgress({
        current: products.length,
        total: products.length,
        message: `Færdig! Tilføjet: ${addedCount}, Sprunget over: ${skippedCount}, Fejl: ${errorCount}`
      });

      onProductsAdded();

      setTimeout(() => {
        setCategoryUrl('');
        setProductType('washing_machine');
        setProgress({ current: 0, total: 0, message: '' });
        onClose();
      }, 3000);

    } catch (err) {
      console.error('Error adding products from category:', err);
      setError(err instanceof Error ? err.message : 'Der opstod en fejl');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <LinkIcon className="w-6 h-6 mr-2" />
            Tilføj produkter fra kategori
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power.dk Kategori URL
            </label>
            <input
              type="text"
              value={categoryUrl}
              onChange={(e) => setCategoryUrl(e.target.value)}
              placeholder="https://www.power.dk/c/4800/hvidevarer/toejvask/frontbetjente-vaskemaskiner/"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Eksempel: https://www.power.dk/c/4800/hvidevarer/toejvask/frontbetjente-vaskemaskiner/
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produkttype
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            >
              <option value="washing_machine">Vaskemaskine</option>
              <option value="dishwasher">Opvaskemaskine</option>
              <option value="oven">Ovn</option>
              <option value="refrigerator">Køleskab</option>
              <option value="tv">TV</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {progress.message && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
              <div className="text-sm mb-2">{progress.message}</div>
              {progress.total > 0 && (
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Annuller
            </button>
            <button
              type="submit"
              disabled={loading || !categoryUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Behandler...
                </>
              ) : (
                'Tilføj produkter'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
