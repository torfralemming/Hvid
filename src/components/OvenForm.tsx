import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type OvenFormData = {
  keywords: string[];
};

type FormState = {
  usage: string | null;
  baking: string | null;
  sousvide: string | null;
  maintenance: string | null;
  cooking_skill: string | null;
  household_size: string | null;
  heating_speed: string | null;
};

function OvenForm() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    usage: null,
    baking: null,
    sousvide: null,
    maintenance: null,
    cooking_skill: null,
    household_size: null,
    heating_speed: null,
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
    const keywords = Object.values(formState).filter((value): value is string => value !== null);
    navigate('/oven/recommendations', { state: { keywords } });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find den perfekte ovn</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Usage Frequency */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor meget bruger du/i ovnen?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'DailyUse')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'DailyUse')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hver dag
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'FrequentUse')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'FrequentUse')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  3-4 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'NotEveryday')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'NotEveryday')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'Weekly')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'Weekly')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1 gang om ugen
                </button>
              </div>
            </div>

            {/* Bread Baking */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor ofte bager du brød?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('baking', 'DailyBaking')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('baking', 'DailyBaking')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hver dag
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('baking', 'Steam')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('baking', 'Steam')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('baking', 'FrequentBaking')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('baking', 'FrequentBaking')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  4-5 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('baking', 'Nosteam')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('baking', 'Nosteam')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1 gang hver 14 dag eller sjældnere
                </button>
              </div>
            </div>

            {/* Sous Vide */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Ønsker du at bruge ovnen til at sous vide?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sousvide', 'Sousvide')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sousvide', 'Sousvide')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sousvide', 'NoSousvide')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sousvide', 'NoSousvide')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej
                </button>
              </div>
            </div>

            {/* Maintenance */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor nem vedligeholdelse ønsker du?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('maintenance', 'Pyrolyse')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('maintenance', 'Pyrolyse')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ovnen skal gøre sig selv rent så jeg skal gøre minimum manuelt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('maintenance', 'Steamclean')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('maintenance', 'Steamclean')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ovnen skal gøre sig selv rent, men jeg kan godt gøre lidt manuelt arbejde
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('maintenance', 'nocleaning')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('maintenance', 'nocleaning')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg har ikke noget imod at gøre det hele manuelt
                </button>
              </div>
            </div>

            {/* Cooking Skill */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor ferm er du/i som kok?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cooking_skill', 'ProChef')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cooking_skill', 'ProChef')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg er uddannet kok
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cooking_skill', 'HobbyChef')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cooking_skill', 'HobbyChef')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg nyder at hygge mig med at lave mad
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cooking_skill', 'LearningChef')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cooking_skill', 'LearningChef')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg forsøger at blive bedre til at lave mad
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('cooking_skill', 'Beginner')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('cooking_skill', 'Beginner')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg kan ikke lave mad
                </button>
              </div>
            </div>

            {/* Household Size */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor mange sidder i rundt om aftensmadsbordet?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household_size', 'Single')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household_size', 'Single')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household_size', 'Couple')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household_size', 'Couple')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household_size', 'Family')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household_size', 'Family')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  4-5
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('household_size', 'LargeFamily')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('household_size', 'LargeFamily')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  6 eller flere
                </button>
              </div>
            </div>

            {/* Heating Speed */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor hurtigt forventer du din ovn varmer op til 200 grader?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('heating_speed', 'slowheat')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('heating_speed', 'slowheat')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  10 minutter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('heating_speed', 'MedHeat')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('heating_speed', 'MedHeat')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  6-7 minutter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('heating_speed', 'quickheat')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('heating_speed', 'quickheat')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  5-6 minutter
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
          category="oven"
          responses={getResponses()}
        />
      </div>
    </div>
  );
}

export default OvenForm;