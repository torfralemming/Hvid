import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import type { DishwasherFormData } from './DishwasherForm';
import { supabase } from '../lib/supabase';

type Dishwasher = {
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
  type_specific_data: {
    noise_level: number;
    annual_energy_consumption: number;
    annual_water_consumption: number;
  };
};

type DishwasherWithMatches = Dishwasher & {
  matchCount: number;
};

function getRecommendationDescription(dishwasher: Dishwasher, formData: DishwasherFormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  if (!dishwasher.keywords || !Array.isArray(dishwasher.keywords)) {
    return 'Denne opvaskemaskine matcher dine grundlæggende behov.';
  }

  const matchingKeywords = dishwasher.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !dishwasher.keywords.includes(k));

  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      const [category, value] = k.split('-');
      switch (category) {
        case 'household':
          return value === 'single' ? 'den er perfekt til én person med kompakt størrelse og effektive programmer' :
                 value === 'couple' ? 'den er ideel til et par' :
                 'den er optimal til en familie';
        case 'glass':
          return value === 'PerfectGlassCare' ? 'den er særlig god til krystalglas' :
                 'den har standard glasbehandling';
        case 'usage':
          return value === 'all' ? 'den er fleksibel til al service' :
                 value === 'all-except-knives' ? 'den er god til det meste service' :
                 value === 'basic' ? 'den er god til almindelig service' :
                 'den er fleksibel til det meste service';
        case 'type':
          return value === 'integrated' ? 'den er integrerbar' :
                 value === 'white' ? 'den er fritstående i hvid' :
                 'den er fritstående i specialfarve';
        case 'noise':
          return value === 'bedroom-nearby' ? 'den er meget støjsvag' :
                 value === 'bedroom-far' ? 'den har normalt støjniveau' :
                 'den er støjsvag og god til åbne rum';
        case 'lifespan':
          return value === 'Budget' ? 'den er designet til kortere levetid' :
                 value === 'mid' ? 'den har solid holdbarhed' :
                 'den er bygget til lang levetid';
        default:
          return '';
      }
    }).filter(Boolean);

    descriptions.push(`Denne opvaskemaskine opfylder dine behov fordi ${metNeeds.join(', ')}`);
  }

  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      const [category, value] = k.split('-');
      switch (category) {
        case 'household':
          if (value === 'family' && !dishwasher.keywords.includes('household-family'))
            return 'den kan være for lille til din families behov';
          if (value === 'single' && dishwasher.keywords.includes('household-family'))
            return 'den er større end du har behov for';
          break;
        case 'glass':
          if (value === 'PerfectGlassCare' && !dishwasher.keywords.includes('glass-PerfectGlassCare'))
            return 'den har ikke specialfunktioner til krystalglas';
          break;
        case 'noise':
          if (value === 'bedroom-nearby' && !dishwasher.keywords.includes('noise-bedroom-nearby'))
            return 'den kan være for støjende til placering nær soveværelse';
          break;
        case 'lifespan':
          if (value === 'high' && dishwasher.keywords.includes('lifespan-Budget'))
            return 'den er ikke bygget til lang levetid';
          break;
      }
      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(', ')}`);
    }
  }

  const noiseLevel = dishwasher.type_specific_data?.noise_level || 'N/A';
  descriptions.push(`Med ${dishwasher.capacity} kuverter og et støjniveau på ${noiseLevel} dB`);

  if (dishwasher.energy_class === 'A' || dishwasher.energy_class === 'B') {
    descriptions.push(`${dishwasher.energy_class}-energimærkningen sikrer lave driftsomkostninger`);
  }

  return descriptions.join('. ') + '.';
}

function DishwasherRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as DishwasherFormData;
  const [recommendations, setRecommendations] = useState<DishwasherWithMatches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!formData?.keywords) {
        setError('Ingen søgekriterier fundet');
        setLoading(false);
        return;
      }

      try {
        const { data: dishwashers, error } = await supabase
          .from('all_products')
          .select('*')
          .eq('product_type', 'dishwasher');

        if (error) {
          throw error;
        }

        const scoredDishwashers = (dishwashers as Dishwasher[])
          .map(dishwasher => {
            const matchingKeywords = (dishwasher.keywords || []).filter(k => formData.keywords.includes(k));
            return {
              ...dishwasher,
              matchCount: matchingKeywords.length
            };
          })
          .filter(({ matchCount }) => matchCount >= 2);

        const budgetDishwashers = scoredDishwashers
          .filter(m => m.price >= 0 && m.price <= 3999)
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const midDishwashers = scoredDishwashers
          .filter(m => m.price >= 4000 && m.price <= 6999)
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const premiumDishwashers = scoredDishwashers
          .filter(m => m.price >= 7000 && m.price <= 40000)
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const recommendations = [
          budgetDishwashers[0],
          midDishwashers[0],
          premiumDishwashers[0]
        ].filter(Boolean);

        setRecommendations(recommendations);
      } catch (err) {
        setError('Der opstod en fejl ved hentning af anbefalinger');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [formData]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Finder de bedste anbefalinger...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate('/dishwasher')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tilbage til formular
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/dishwasher')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til formular
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dine anbefalinger</h1>
          <p className="text-lg text-gray-600">
            Vi har fundet {recommendations.length} opvaskemaskine{recommendations.length !== 1 ? 'r' : ''} der matcher dine behov
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">
              Vi kunne desværre ikke finde nogen opvaskemaskiner der matcher alle dine kriterier.
              Prøv at justere dine valg.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((dishwasher) => (
              <div key={dishwasher.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={dishwasher.image}
                    alt={dishwasher.name}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {dishwasher.tier === 'budget' ? 'Budget' : dishwasher.tier === 'mid' ? 'Mellem' : 'Premium'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dishwasher.name}</h3>

                  <div className="flex items-center mb-3">
                    {renderStars(dishwasher.rating)}
                    <span className="ml-2 text-sm text-gray-600">({dishwasher.rating}/5)</span>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">{dishwasher.price.toLocaleString()} kr</span>
                    <span className="text-sm text-gray-500 ml-2">hos {dishwasher.store}</span>
                  </div>

                  <div className="mb-4 text-sm text-gray-700">
                    <p className="mb-2">{getRecommendationDescription(dishwasher, formData)}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Nøglefunktioner:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {dishwasher.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <a
                      href={dishwasher.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Se produkt</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DishwasherRecommendations;
