import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

const KEYWORD_LABELS: Record<string, string> = {
  household: 'Husstandsstørrelse',
  washFrequency: 'Vaskefrekvens',
  cleanClothes: 'Rent tøj',
  clothesCare: 'Tøjpleje',
  detergent: 'Vaskemiddel',
  brand: 'Mærke',
  washDuration: 'Vasketid',
  shirts: 'Skjorter',
  glass: 'Krystalglas',
  usage: 'Brug',
  type: 'Type',
  noise: 'Støj',
  lifespan: 'Levetid',
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

type AddKeywordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (keyword: string) => void;
  category: string;
};

type KeywordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (keywords: string[]) => void;
  currentKeywords: string[];
  productCategory: string;
  productId: string;
};

type AvailableKeywords = {
  [category: string]: string[];
};

function AddKeywordDialog({ isOpen, onClose, onAdd, category }: AddKeywordDialogProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) {
      setError('Nøgleordet kan ikke være tomt');
      return;
    }

    try {
      // Add the new keyword to available_keywords table
      const { error: insertError } = await supabase
        .from('available_keywords')
        .insert({ category, keyword: newKeyword.trim() });

      if (insertError) throw insertError;

      onAdd(newKeyword.trim());
      setNewKeyword('');
      onClose();
    } catch (err) {
      setError('Der opstod en fejl ved tilføjelse af nyt nøgleord');
      console.error('Error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Tilføj nyt nøgleord til {KEYWORD_LABELS[category]}
        </h3>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newKeyword" className="block text-sm font-medium text-gray-700">
              Nyt nøgleord
            </label>
            <input
              type="text"
              id="newKeyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Indtast nyt nøgleord"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Tilføj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function KeywordDialog({ isOpen, onClose, onSave, currentKeywords, productCategory, productId }: KeywordDialogProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(currentKeywords);
  const [showAddKeywordDialog, setShowAddKeywordDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [availableKeywords, setAvailableKeywords] = useState<AvailableKeywords>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset selected keywords when the dialog opens or current keywords change
  useEffect(() => {
    setSelectedKeywords(currentKeywords);
  }, [currentKeywords, isOpen]);

  useEffect(() => {
    async function fetchKeywords() {
      try {
        const { data, error } = await supabase
          .from('available_keywords')
          .select('category, keyword');

        if (error) throw error;

        // Group keywords by category
        const keywords = data.reduce((acc: AvailableKeywords, curr) => {
          if (!acc[curr.category]) {
            acc[curr.category] = [];
          }
          acc[curr.category].push(curr.keyword);
          return acc;
        }, {});

        setAvailableKeywords(keywords);
      } catch (err) {
        console.error('Error fetching keywords:', err);
        setError('Der opstod en fejl ved hentning af nøgleord');
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchKeywords();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter keyword categories based on product category
  const relevantCategories = Object.entries(availableKeywords).filter(([category]) => {
    switch (productCategory) {
      case 'washing_machine':
        return ['household', 'washFrequency', 'cleanClothes', 'clothesCare', 'detergent', 'brand', 'washDuration', 'shirts'].includes(category);
      case 'dishwasher':
        return ['household', 'glass', 'usage', 'type', 'noise', 'lifespan'].includes(category);
      case 'oven':
        return ['usage', 'baking', 'sousvide', 'maintenance', 'cooking_skill', 'household_size', 'heating_speed'].includes(category);
      case 'refrigerator':
        return ['household', 'shopping', 'storage', 'energy', 'freezer', 'noise', 'dispenser', 'smart', 'design', 'size'].includes(category);
      default:
        return true;
    }
  });

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleAddKeyword = async (newKeyword: string) => {
    try {
      // Update local state
      setAvailableKeywords(prev => ({
        ...prev,
        [selectedCategory]: [...(prev[selectedCategory] || []), newKeyword]
      }));
    } catch (err) {
      setError('Der opstod en fejl ved tilføjelse af nyt nøgleord');
      console.error('Error:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Update the all_products table
      const { error: updateError } = await supabase
        .from('all_products')
        .update({ keywords: selectedKeywords })
        .eq('id', productId);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Failed to update keywords: ${updateError.message}`);
      }

      onSave(selectedKeywords);
      onClose();
    } catch (err) {
      console.error('Save error:', err);
      setError(`Der opstod en fejl ved opdatering af nøgleord: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-600">Indlæser nøgleord...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rediger nøgleord</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {relevantCategories.map(([category, keywords]) => (
            <div key={category} className="border-b pb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  {KEYWORD_LABELS[category]}
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowAddKeywordDialog(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                  disabled={saving}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Tilføj nøgleord
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordToggle(keyword)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedKeywords.includes(keyword)
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={saving}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={saving}
          >
            Annuller
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? 'Gemmer...' : 'Gem ændringer'}
          </button>
        </div>
      </div>

      <AddKeywordDialog
        isOpen={showAddKeywordDialog}
        onClose={() => setShowAddKeywordDialog(false)}
        onAdd={handleAddKeyword}
        category={selectedCategory}
      />
    </div>
  );
}

export default KeywordDialog;