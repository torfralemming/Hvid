import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AvailableKeyword = {
  id: string;
  category: string;
  keyword: string;
  created_at?: string;
};

type KeywordsManagementDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const KEYWORD_LABELS: Record<string, string> = {
  household: 'Husstandsstørrelse',
  distance: 'Afstand til TV',
  lighting: 'Lysforhold i rummet',
  usage: 'Primær anvendelse',
  sport: 'Sport visning',
  streaming: 'Streaming tjenester',
  lifespan: 'Forventet levetid',
  pictureQuality: 'Billedkvalitet',
  timeOfDay: 'Tidspunkt på dagen',
  washFrequency: 'Vaskefrekvens',
  cleanClothes: 'Rent tøj',
  clothesCare: 'Tøjpleje',
  detergent: 'Vaskemiddel',
  brand: 'Mærke',
  washDuration: 'Vasketid',
  shirts: 'Skjorter',
  glass: 'Krystalglas',
  type: 'Type',
  noise: 'Støj',
  baking: 'Bagning',
  sousvide: 'Sous-vide',
  maintenance: 'Vedligeholdelse',
  cooking_skill: 'Madlavningsniveau',
  heating_speed: 'Opvarmningstid',
  shopping: 'Indkøb',
  storage: 'Opbevaring',
  energy: 'Energi',
  freezer: 'Fryser',
  dispenser: 'Dispenser',
  smart: 'Smart funktioner',
  design: 'Design',
  size: 'Størrelse'
};

function KeywordsManagementDialog({ isOpen, onClose }: KeywordsManagementDialogProps) {
  const [keywords, setKeywords] = useState<AvailableKeyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingKeyword, setEditingKeyword] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ category: string; keyword: string }>({ category: '', keyword: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newKeyword, setNewKeyword] = useState<{ category: string; keyword: string }>({ category: '', keyword: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchKeywords();
    }
  }, [isOpen]);

  const fetchKeywords = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('available_keywords')
        .select('*')
        .order('category', { ascending: true })
        .order('keyword', { ascending: true });

      if (fetchError) throw fetchError;
      setKeywords(data || []);
    } catch (err) {
      console.error('Error fetching keywords:', err);
      setError('Der opstod en fejl ved hentning af nøgleord');
    } finally {
      setLoading(false);
    }
  };

  const handleEditKeyword = (keyword: AvailableKeyword) => {
    setEditingKeyword(keyword.id);
    setEditValues({ category: keyword.category, keyword: keyword.keyword });
  };

  const handleSaveEdit = async (keywordId: string) => {
    try {
      setError(null);
      
      const { error: updateError } = await supabase
        .from('available_keywords')
        .update({
          category: editValues.category,
          keyword: editValues.keyword
        })
        .eq('id', keywordId);

      if (updateError) throw updateError;

      await fetchKeywords();
      setEditingKeyword(null);
    } catch (err) {
      console.error('Error updating keyword:', err);
      setError('Der opstod en fejl ved opdatering af nøgleord');
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    if (!confirm('Er du sikker på, at du vil slette dette nøgleord?')) {
      return;
    }

    try {
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('available_keywords')
        .delete()
        .eq('id', keywordId);

      if (deleteError) throw deleteError;

      await fetchKeywords();
    } catch (err) {
      console.error('Error deleting keyword:', err);
      setError('Der opstod en fejl ved sletning af nøgleord');
    }
  };

  const handleAddKeyword = async () => {
    if (!newKeyword.category || !newKeyword.keyword) {
      setError('Både kategori og nøgleord skal udfyldes');
      return;
    }

    try {
      setError(null);
      
      const { error: insertError } = await supabase
        .from('available_keywords')
        .insert([{
          category: newKeyword.category,
          keyword: newKeyword.keyword
        }]);

      if (insertError) throw insertError;

      await fetchKeywords();
      setNewKeyword({ category: '', keyword: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding keyword:', err);
      setError('Der opstod en fejl ved tilføjelse af nøgleord');
    }
  };

  const filteredKeywords = keywords.filter(keyword => {
    const matchesSearch = keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         keyword.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || keyword.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(keywords.map(k => k.category))].sort();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Administrer Nøgleord</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tilføj Nøgleord
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Add New Keyword Form */}
        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Tilføj Nyt Nøgleord</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  value={newKeyword.category}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="f.eks. household"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nøgleord
                </label>
                <input
                  type="text"
                  value={newKeyword.keyword}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, keyword: e.target.value }))}
                  placeholder="f.eks. single"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleAddKeyword}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-2"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Gem
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Annuller
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søg efter nøgleord eller kategori..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Alle kategorier</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>
                  {KEYWORD_LABELS[category] || category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Indlæser nøgleord...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nøgleord
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Handlinger
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredKeywords.map((keyword) => (
                  <tr key={keyword.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingKeyword === keyword.id ? (
                        <input
                          type="text"
                          value={editValues.category}
                          onChange={(e) => setEditValues(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {KEYWORD_LABELS[keyword.category] || keyword.category}
                          </div>
                          <div className="text-sm text-gray-500">
                            {keyword.category}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingKeyword === keyword.id ? (
                        <input
                          type="text"
                          value={editValues.keyword}
                          onChange={(e) => setEditValues(prev => ({ ...prev, keyword: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">{keyword.keyword}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingKeyword === keyword.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(keyword.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingKeyword(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditKeyword(keyword)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKeyword(keyword.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredKeywords.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm || selectedCategory ? 'Ingen nøgleord matcher dine filtre' : 'Ingen nøgleord fundet'}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Total:</strong> {filteredKeywords.length} nøgleord</p>
          <p><strong>Kategorier:</strong> {uniqueCategories.length}</p>
        </div>
      </div>
    </div>
  );
}

export default KeywordsManagementDialog;