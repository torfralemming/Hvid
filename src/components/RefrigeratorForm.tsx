import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type RefrigeratorFormData = {
  keywords: string[];
};

type FormState = {
  household: string | null;
  shopping: string | null;
  storage: string | null;
  energy: string | null;
  freezer: string | null;
  noise: string | null;
  dispenser: string | null;
  smart: string | null;
  design: string | null;
  size: string | null;
};

function RefrigeratorForm() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    household: null,
    shopping: null,
    storage: null,
    energy: null,
    freezer: null,
    noise: null,
    dispenser: null,
    smart: null,
    design: null,
    size: null
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
    navigate('/refrigerator/recommendations', { state: { keywords } });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find det perfekte køleskab</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Household Size */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor mange personer bruger køleskabet dagligt?
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
                  1 person
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
                  2-3 personer
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
                  4-5 personer
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
                  5+ personer
                </button>
              </div>
            </div>

            {/* Shopping Frequency */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor ofte handler du ind?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shopping', 'dailyshopping')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shopping', 'dailyshopping')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hver dag
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shopping', 'weeklyshopping')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shopping', 'weeklyshopping')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  2-3 gange om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shopping', 'onceshopping')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shopping', 'onceshopping')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  1 gang om ugen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('shopping', 'bulkshopping')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('shopping', 'bulkshopping')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Sjældnere end 1 gang om ugen
                </button>
              </div>
            </div>

            {/* Storage Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvad opbevarer du mest i dit køleskab?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('storage', 'meatdairy')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('storage', 'meatdairy')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Kød & mejeriprodukter
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('storage', 'vegstorage')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('storage', 'vegstorage')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Grøntsager & frugt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('storage', 'readymeals')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('storage', 'readymeals')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Færdigretter & takeaway
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('storage', 'drinksnacks')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('storage', 'drinksnacks')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Drikkevarer & snacks
                </button>
              </div>
            </div>

            {/* Energy Importance */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor vigtig er energiforbruget for dig?
              </label>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('energy', 'energysaving')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('energy', 'energysaving')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være så energieffektivt som muligt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('energy', 'performance')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('energy', 'performance')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det må godt koste lidt ekstra i strøm, hvis det er bedre
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('energy', 'normalenergy')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('energy', 'normalenergy')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg tænker ikke så meget over strømforbrug
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('energy', 'lowprice')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('energy', 'lowprice')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg vil have det billigste køleskab, uanset energiforbrug
                </button>
              </div>
            </div>

            {/* Freezer Need */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Har du brug for en fryser i dit køleskab?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('freezer', 'bigfreezer')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('freezer', 'bigfreezer')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, en stor fryser er vigtig
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('freezer', 'smallfreezer')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('freezer', 'smallfreezer')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, men en lille fryser er nok
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('freezer', 'nofreezer')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('freezer', 'nofreezer')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej, jeg har en separat fryser
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('freezer', 'unsurefreezer')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('freezer', 'unsurefreezer')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg ved ikke, hvad jeg har brug for
                </button>
              </div>
            </div>

            {/* Noise Level */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor meget betyder støjniveauet for dig?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'quiet')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'quiet')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være så lydløst som muligt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'normalnoise')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'normalnoise')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det må godt larme lidt, hvis det er billigt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'noisefree')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'noisefree')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg lægger ikke mærke til støj
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('noise', 'loudok')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('noise', 'loudok')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det står i en kælder/garage, så støj er ligegyldigt
                </button>
              </div>
            </div>

            {/* Water/Ice Dispenser */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Ønsker du en køleskabsdør med vand- og isterningefunktion?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('dispenser', 'waterice')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('dispenser', 'waterice')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, vand- og isdispenser er vigtigt
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('dispenser', 'wateronly')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('dispenser', 'wateronly')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, kun en vanddispenser
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('dispenser', 'noicedispenser')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('dispenser', 'noicedispenser')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej, kun isbakker er fint
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('dispenser', 'standarddoor')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('dispenser', 'standarddoor')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej, det er ikke nødvendigt
                </button>
              </div>
            </div>

            {/* Smart Features */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Skal dit køleskab kunne styres via en app?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('smart', 'smartcontrol')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('smart', 'smartcontrol')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, jeg vil kunne justere temperatur via mobilen
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('smart', 'smartscreen')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('smart', 'smartscreen')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Ja, jeg vil have en skærm på døren
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('smart', 'nosmart')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('smart', 'nosmart')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Nej, det behøver ikke være smart
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('smart', 'unsuretech')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('smart', 'unsuretech')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg ved ikke, om jeg vil bruge det
                </button>
              </div>
            </div>

            {/* Design */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor vigtigt er designet for dig?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('design', 'premiumdesign')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('design', 'premiumdesign')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal være rustfrit stål eller sort
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('design', 'integrated')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('design', 'integrated')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Det skal matche mit køkken (f.eks. integreret)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('design', 'standardwhite')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('design', 'standardwhite')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Hvidt køleskab er fint for mig
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('design', 'anydesign')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('design', 'anydesign')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg går ikke op i udseendet
                </button>
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Hvor meget plads har du til dit køleskab?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOptionSelect('size', 'slimfit')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('size', 'slimfit')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Max 60 cm bredde (smalt køleskab)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('size', 'standardfit')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('size', 'standardfit')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  60-70 cm bredde (standardstørrelse)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('size', 'largefit')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('size', 'largefit')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Over 70 cm bredde (stort køleskab)
                </button>
                <button
                  type="button"
                  onClick={() => handleOptionSelect('size', 'unsurefit')}
                  className={`p-3 rounded-lg border ${
                    isOptionSelected('size', 'unsurefit')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  Jeg ved ikke, hvor meget plads jeg har
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
          category="refrigerator"
          responses={getResponses()}
        />
      </div>
    </div>
  );
}

export default RefrigeratorForm;