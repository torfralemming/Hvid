import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type TVFormData = {
  keywords: string[];
};

type FormState = {
  lighting: string | null;
  distance: string | null;
  usage: string | null;
  sport: string | null;
  streaming: string | null;
  lifespan: string | null;
  pictureQuality: string | null;
  timeOfDay: string | null;
};

function TVForm() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    lighting: null,
    distance: null,
    usage: null,
    sport: null,
    streaming: null,
    lifespan: null,
    pictureQuality: null,
    timeOfDay: null,
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
    navigate('/tv/recommendations', { state: { keywords } });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find det perfekte TV</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Lighting Conditions */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvordan er lysindfaldet i din stue?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lighting', 'LED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lighting', 'LED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Meget lyst
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lighting', 'QLED TV')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lighting', 'QLED TV')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Moderat lys
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lighting', 'OLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lighting', 'OLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Mørkt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lighting', 'QLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lighting', 'QLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Varierer
                </button>
              </div>
            </div>

            {/* Viewing Distance */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor mange meter sidder du fra TV'et?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('distance', '43-55')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('distance', '43-55')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Under 2 meter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('distance', '55-65')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('distance', '55-65')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3 meter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('distance', '65-75')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('distance', '65-75')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  3-4 meter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('distance', '75+')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('distance', '75+')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Over 4 meter
                </button>
              </div>
            </div>

            {/* Primary Usage */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvad bruges dit TV mest til?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'SMART TV')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'SMART TV')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Streaming
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'Analog')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'Analog')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  TV-kanaler/nyheder
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', '120HZ')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', '120HZ')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Spil/konsol
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('usage', 'SMART TV')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('usage', 'SMART TV')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  YouTube/baggrundsunderholdning
                </button>
              </div>
            </div>

            {/* Sports Viewing */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Skal du se sport på TV'et?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sport', '120 HZ')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sport', '120 HZ')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, ofte
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sport', '120 HZ')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sport', '120 HZ')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, indimellem
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sport', '60 HZ')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sport', '60 HZ')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, men går ikke op i om billedet er perfekt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('sport', '60 HZ')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('sport', '60 HZ')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej / Kun andre i hjemmet
                </button>
              </div>
            </div>

            {/* Streaming Services */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvilke streamingtjenester bruger du mest?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('streaming', 'Smart tv')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('streaming', 'Smart tv')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Netflix/Disney+
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('streaming', 'Google TV')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('streaming', 'Google TV')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  HBO/Viaplay
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('streaming', 'smart tv')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('streaming', 'smart tv')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('streaming', 'analog')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('streaming', 'analog')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  TV-kanaler
                </button>
              </div>
            </div>

            {/* Expected Lifespan */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor længe forventer du, at dit TV skal holde?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'Low Budget')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'Low Budget')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  3-5 år
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'Premium')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'Premium')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  5-7 år
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('lifespan', 'High end')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('lifespan', 'High end')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  7-10 år / så længe det virker
                </button>
              </div>
            </div>

            {/* Picture Quality Importance */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor vigtig er billedkvaliteten for dig?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('pictureQuality', 'QOLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('pictureQuality', 'QOLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Meget vigtig
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('pictureQuality', 'OLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('pictureQuality', 'OLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Vigtig men brugervenlighed også vigtigt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('pictureQuality', 'QLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('pictureQuality', 'QLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ikke det vigtigste
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('pictureQuality', 'LED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('pictureQuality', 'LED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ser ikke forskel
                </button>
              </div>
            </div>

            {/* Time of Day Usage */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvornår på dagen bruger du mest dit TV?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('timeOfDay', 'OLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('timeOfDay', 'OLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Om aftenen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('timeOfDay', 'QLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('timeOfDay', 'QLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Weekenden
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('timeOfDay', 'QLED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('timeOfDay', 'QLED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Lidt hele dagen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('timeOfDay', 'LED')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('timeOfDay', 'LED')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Baggrund i dagtimerne
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
          category="tv"
          responses={getResponses()}
        />
      </div>
    </div>
  );
}

export default TVForm;