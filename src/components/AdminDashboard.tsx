import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Edit2, ArrowUpDown, Plus, X, RotateCw } from 'lucide-react';
import KeywordDialog from './KeywordDialog';
import PriceDialog from './PriceDialog';
import ProductSearchDialog from './ProductSearchDialog';
import ProductList from './ProductList';
import CategoryManagementDialog from './CategoryManagementDialog';
import KeywordsManagementDialog from './KeywordsManagementDialog';

// Add this after the imports
function getProductTypeName(type: string) {
  switch (type) {
    case 'washing_machine': return 'Vaskemaskine';
    case 'dishwasher': return 'Opvaskemaskine';
    case 'oven': return 'Ovn';
    case 'refrigerator': return 'Køleskab';
    default: return type;
  }
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKeywordDialog, setShowKeywordDialog] = useState(false);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'}>({
    key: 'name',
    direction: 'asc'
  });
  const [showLatestProducts, setShowLatestProducts] = useState(false);
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [updatingAllPrices, setUpdatingAllPrices] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showKeywordsDialog, setShowKeywordsDialog] = useState(false);

  const handleUpdateAllPrices = async () => {
    if (!confirm(`Er du sikker på, at du vil opdatere priser for alle ${products.length} produkter? Dette kan tage flere minutter.`)) {
      return;
    }

    try {
      setUpdatingAllPrices(true);
      setError(null);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const product of products) {
        try {
          // Extract the Power product ID from our product ID
          const powerProductId = product.id.split('-')[1];
          if (!powerProductId) continue;
          
          const response = await fetch('https://scovfppftngipmzpnlsl.supabase.co/functions/v1/power-api1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
              endpoint: 'products',
              ids: [powerProductId]
            })
          });

          if (!response.ok) {
            throw new Error('Failed to fetch updated price');
          }

          const data = await response.json();
          const updatedPrice = data.products[0]?.price;

          if (updatedPrice && updatedPrice !== product.price) {
            const { error: updateError } = await supabase
              .from('all_products')
              .update({ price: updatedPrice })
              .eq('id', product.id);

            if (updateError) throw updateError;
            successCount++;
          }
          
          // Add small delay to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (err) {
          console.error(`Error updating price for ${product.name}:`, err);
          errorCount++;
        }
      }
      
      await fetchProducts();
      alert(`Prisopdatering færdig!\nOpdateret: ${successCount} produkter\nFejl: ${errorCount} produkter`);
    } catch (err) {
      console.error('Error updating all prices:', err);
      setError('Der opstod en fejl ved opdatering af priser');
    } finally {
      setUpdatingAllPrices(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('all_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Der opstod en fejl ved hentning af produkter');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditKeywords = (product: any) => {
    setSelectedProduct(product);
    setShowKeywordDialog(true);
  };

  const handleEditPrice = (product: any) => {
    setSelectedProduct(product);
    setShowPriceDialog(true);
  };

  const handleDeleteProduct = async (product: any) => {
    if (!confirm('Er du sikker på, at du vil slette dette produkt?')) {
      return;
    }

    try {
      setError(null);
      const { error: deleteError } = await supabase
        .from('all_products')
        .delete()
        .eq('id', product.id);

      if (deleteError) throw deleteError;

      await fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Der opstod en fejl ved sletning af produkt');
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(currentConfig => ({
      key,
      direction: currentConfig.key === key && currentConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRefreshPrice = async (product: any) => {
    try {
      setRefreshing(product.id);
      const response = await fetch('https://scovfppftngipmzpnlsl.supabase.co/functions/v1/power-api1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          endpoint: 'products',
          ids: [product.id.split('-')[1]] // Extract the Power product ID
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch updated price');
      }

      const data = await response.json();
      const updatedPrice = data.products[0]?.price;

      if (updatedPrice) {
        const { error: updateError } = await supabase
          .from('all_products')
          .update({ price: updatedPrice })
          .eq('id', product.id);

        if (updateError) throw updateError;

        await fetchProducts();
      }
    } catch (err) {
      console.error('Error refreshing price:', err);
      setError('Der opstod en fejl ved opdatering af pris');
    } finally {
      setRefreshing(null);
    }
  };

  const sortedProducts = [...products].sort((a: any, b: any) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    if (sortConfig.key === 'price') {
      return (a[sortConfig.key] - b[sortConfig.key]) * direction;
    }
    
    return String(a[sortConfig.key])
      .localeCompare(String(b[sortConfig.key]), 'da-DK') * direction;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-600">Indlæser produkter...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til forsiden
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Administrer Produkter</h2>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateAllPrices}
                disabled={updatingAllPrices || products.length === 0}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300"
              >
                {updatingAllPrices ? (
                  <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RotateCw className="w-5 h-5 mr-2" />
                )}
                {updatingAllPrices ? 'Opdaterer priser...' : 'Opdater alle priser'}
              </button>
              <button
                onClick={() => setShowKeywordsDialog(true)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Administrer Nøgleord
              </button>
              <button
                onClick={() => setShowCategoryDialog(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Administrer Kategorier
              </button>
              <button
                onClick={() => setShowSearchDialog(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tilføj produkt
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Seneste produkter</h3>
              <button 
                onClick={() => setShowLatestProducts(!showLatestProducts)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showLatestProducts ? 'Skjul' : 'Vis'}
              </button>
            </div>
            
            {showLatestProducts && (
              <ProductList limit={6} className="mb-6" />
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slet
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Navn
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                      {sortConfig.key === 'name' && (
                        <span className="ml-1 text-blue-600">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('product_type')}
                  >
                    <div className="flex items-center">
                      Type
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                      {sortConfig.key === 'product_type' && (
                        <span className="ml-1 text-blue-600">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Pris
                      <ArrowUpDown className="w-4 h-4 ml-1" />
                      {sortConfig.key === 'price' && (
                        <span className="ml-1 text-blue-600">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funktioner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nøgleord
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opdater
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product: any) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getProductTypeName(product.product_type)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditPrice(product)}
                        className="text-sm text-gray-900 hover:text-blue-600 flex items-center"
                      >
                        {product.price.toLocaleString('da-DK')} kr.
                        <Edit2 className="w-4 h-4 ml-2" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs overflow-hidden">
                        {product.features && product.features.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {product.features.slice(0, 3).map((feature: string, idx: number) => (
                              <li key={idx} className="truncate">{feature}</li>
                            ))}
                            {product.features.length > 3 && (
                              <li className="text-gray-500">+{product.features.length - 3} mere</li>
                            )}
                          </ul>
                        ) : (
                          <span className="text-gray-500 italic">Ingen funktioner</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.keywords.slice(0, 3).map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {keyword}
                          </span>
                        ))}
                        {product.keywords.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{product.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditKeywords(product)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Rediger nøgleord
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleRefreshPrice(product)}
                        disabled={refreshing === product.id}
                        className={`text-blue-600 hover:text-blue-800 ${refreshing === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {refreshing === product.id ? (
                          <RotateCw className="w-5 h-5 animate-spin" />
                        ) : (
                          '🔄'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <KeywordDialog
          isOpen={showKeywordDialog}
          onClose={() => setShowKeywordDialog(false)}
          onSave={async (keywords) => {
            try {
              const { error } = await supabase
                .from('all_products')
                .update({ keywords })
                .eq('id', selectedProduct.id);

              if (error) throw error;
              await fetchProducts();
              setShowKeywordDialog(false);
            } catch (err) {
              console.error('Error updating keywords:', err);
              setError('Der opstod en fejl ved opdatering af nøgleord');
            }
          }}
          currentKeywords={selectedProduct.keywords}
          productCategory={selectedProduct.product_type}
          productId={selectedProduct.id}
        />
      )}

      {selectedProduct && (
        <PriceDialog
          isOpen={showPriceDialog}
          onClose={() => setShowPriceDialog(false)}
          onSave={async (newPrice) => {
            try {
              const { error } = await supabase
                .from('all_products')
                .update({ price: newPrice })
                .eq('id', selectedProduct.id);

              if (error) throw error;
              await fetchProducts();
              setShowPriceDialog(false);
            } catch (err) {
              console.error('Error updating price:', err);
              setError('Der opstod en fejl ved opdatering af pris');
            }
          }}
          currentPrice={selectedProduct.price}
          productName={selectedProduct.name}
        />
      )}

      <ProductSearchDialog
        isOpen={showSearchDialog}
        onClose={() => setShowSearchDialog(false)}
        onProductAdded={fetchProducts}
      />

      <KeywordsManagementDialog
        isOpen={showKeywordsDialog}
        onClose={() => setShowKeywordsDialog(false)}
      />
      <CategoryManagementDialog
        isOpen={showCategoryDialog}
        onClose={() => setShowCategoryDialog(false)}
      />
    </div>
  );
}

export default AdminDashboard;