import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type FormData = {
  keywords: string[];
};

type FormState = {
  household: string | null;
  washFrequency: string | null;
  cleanClothes: string | null;
  clothesCare: string | null;
  detergent: string | null;
  brand: string | null;
  washDuration: string | null;
  shirts: string | null;
};

function WashingMachineForm() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    household: null,
    washFrequency: null,
    cleanClothes: null,
    clothesCare: null,
    detergent: null,
    brand: null,
    washDuration: null,
    shirts: null,
  });

  const handleOptionSelect = (category: keyof FormState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignatureDialog(true);
  };

  const handleSignatureSubmit = () => {
    const keywords = Object.values(formState).filter((value): value is string => value !== null);
    navigate('/washing-machine/recommendations', { state: { keywords } });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find den perfekte vaskemaskine</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Household Size */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor mange er du/i derhjemme?
              </label>
              <div className="grid grid-cols-2 gap-3">
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
                  4-5
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household', 'largefamily')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household', 'largefamily')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  5 eller flere
                </button>
              </div>
            </div>

            {/* Wash Frequency */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor ofte vasker du/i
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washFrequency', 'everyday')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washFrequency', 'everyday')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hver dag
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washFrequency', 'almosteveryday')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washFrequency', 'almosteveryday')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  4-6 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washFrequency', 'weekly')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washFrequency', 'weekly')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washFrequency', 'onceaweek')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washFrequency', 'onceaweek')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1 gang om ugen
                </button>
              </div>
            </div>

            {/* Clean Clothes */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor ofte vasker du tøj, du kun har haft på en gang, som ikke er beskidt?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cleanClothes', 'steamFunc')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cleanClothes', 'steamFunc')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Næsten hver gang jeg smider tøj til vask er det ikke beskidt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cleanClothes', 'nosteam')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cleanClothes', 'nosteam')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Aldrig, alt mit tøj er beskidt når jeg vasker det
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cleanClothes', 'Steamfunc')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cleanClothes', 'Steamfunc')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det sker af og til
                </button>
              </div>
            </div>

            {/* Clothes Care */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvad betyder det for dig/jer at tøj holder så længe som muligt?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('clothesCare', 'normaldrum')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('clothesCare', 'normaldrum')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Vi køber bare noget nyt, når det er slidt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('clothesCare', 'honeycomb-luxury')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('clothesCare', 'honeycomb-luxury')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg har meget dyrt tøj, jeg gerne vil passe på
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('clothesCare', 'honeycomb-eco')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('clothesCare', 'honeycomb-eco')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg vil gerne passe på klimaet, derfor skal mit tøj holde længst muligt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('clothesCare', 'normaldrum')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('clothesCare', 'normaldrum')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det har jeg ingen holdning til
                </button>
              </div>
            </div>

            {/* Detergent */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvordan ved du hvor meget sæbe du skal bruge til en vask?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('detergent', 'Autodose')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('detergent', 'Autodose')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det ved jeg ikke jeg gætter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('detergent', 'SelfDose')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('detergent', 'SelfDose')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det betyder ikke noget for mig
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('detergent', 'selfdose')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('detergent', 'selfdose')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg vejer mit tøj hver gang inden jeg vasker det
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('detergent', 'autodose')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('detergent', 'autodose')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det ved jeg ikke, men jeg vil gerne skåne miljøet for overdoseret sæbe
                </button>
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor meget betyder mærket på vaskemaskinen for dig?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('brand', 'AEG')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('brand', 'AEG')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være AEG
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('brand', 'Siemens')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('brand', 'Siemens')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være Siemens
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('brand', 'miele')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('brand', 'miele')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være Miele
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('brand', 'Electrolux')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('brand', 'Electrolux')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være Electrolux
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('brand', 'Anybrand')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('brand', 'Anybrand')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det betyder ikke noget hvilket mærke det er
                </button>
              </div>
            </div>

            {/* Wash Duration */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor lang tid må en vask tage?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washDuration', 'PowerWash')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washDuration', 'PowerWash')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Den skal vaske hurtigt, men stadig økonomisk (1 time)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washDuration', 'Speedwash')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washDuration', 'Speedwash')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Den skal bare vaske hurtigt prisen er ligemeget (1 time)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washDuration', 'ecowash')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washDuration', 'ecowash')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Vaskens længde har ingen betydning (1-4 timer)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('washDuration', 'ecowash')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('washDuration', 'ecowash')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Den skal bare være billig i drift, så er vaskens længde ikke vigtig (2.5-4 timer)
                </button>
              </div>
            </div>

            {/* Shirts */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Ønsker du at bruge din vaskemaskine til at stryge dine skjorter?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shirts', 'Steam')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shirts', 'Steam')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shirts', 'nosteam')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shirts', 'nosteam')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej
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
      </div>

      <SignatureDialog
        isOpen={showSignatureDialog}
        onClose={() => setShowSignatureDialog(false)}
        onSubmit={handleSignatureSubmit}
        category="washing_machine"
        responses={getResponses()}
      />
    </div>
  );
}

export default WashingMachineForm;