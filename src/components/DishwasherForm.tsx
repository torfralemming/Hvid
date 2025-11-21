import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type DishwasherFormData = {
  keywords: string[];
};

type FormState = {
  household: string | null;
  glass: string | null;
  usage: string | null;
  type: string | null;
  noise: string | null;
  lifespan: string | null;
};

function DishwasherForm() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    household: null,
    glass: null,
    usage: null,
    type: null,
    noise: null,
    lifespan: null,
  });

  const handleOptionSelect = (category: keyof FormState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignatureDialog(true);
  };

  const handleSignatureSubmit = () => {
    const keywords = Object.entries(formState)
      .filter(([_, value]) => value !== null)
      .map(([category, value]) => `${category}-${value}`);
    
    navigate('/dishwasher/recommendations', { state: { keywords } });
  };

  const getResponses = () => {
    return Object.entries(formState)
      .filter(([_, value]) => value !== null)
      .map(([question, answer]) => ({
        question,
        answer
      }));
  };

  const isOptionSelected = (category: keyof FormState, value: string) => {
    return formState[category] === value;
  };

  const isFormValid = Object.values(formState).every(value => value !== null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til kategorier
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find den perfekte opvaskemaskine</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Household Size */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor mange er i derhjemme?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household', 'single')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household', 'single')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household', 'couple')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household', 'couple')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household', 'family')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household', 'family')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  4 eller flere
                </button>
              </div>
            </div>

            {/* Crystal Glass */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Har du krystal glas som du ønsker at komme i opvaskeren?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('glass', 'PerfectGlassCare')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('glass', 'PerfectGlassCare')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('glass', 'no')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('glass', 'no')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej
                </button>
              </div>
            </div>

            {/* Dishware Usage */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor meget af din service putter du i opvaskemaskinen?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'all')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'all')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Alt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'all-except-knives')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'all-except-knives')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Alt undtagen skarpe knive
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'basic')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'basic')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Kun glas tallerkner og service
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'all-except-pots')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'all-except-pots')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Alt undtagen gryder og skarpe knive
                </button>
              </div>
            </div>

            {/* Dishwasher Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvilken slags opvaskemaskine skal du bruge?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('type', 'integrated')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('type', 'integrated')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Integrerbar
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('type', 'white')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('type', 'white')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hvid front
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('type', 'colored')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('type', 'colored')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Anden farve front
                </button>
              </div>
            </div>

            {/* Room Location */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvilket rum skal den stå i?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'bedroom-nearby')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'bedroom-nearby')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Tæt på soveværelse
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'bedroom-far')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'bedroom-far')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Langt fra soveværelse
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'kitchen-living')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'kitchen-living')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Køkkenalrum
                </button>
              </div>
            </div>

            {/* Expected Lifespan */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor længe forventer du opvaskemaskinen skal holde?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'Budget')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'Budget')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  3-6 år
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'mid')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'mid')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  6-10 år
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'high')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'high')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  10 år+
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Find anbefalinger
            </button>
          </form>
        </div>

        <SignatureDialog
          isOpen={showSignatureDialog}
          onClose={() => setShowSignatureDialog(false)}
          onSubmit={handleSignatureSubmit}
          category="dishwasher"
          responses={getResponses()}
        />
      </div>
    </div>
  );
}

export default DishwasherForm;