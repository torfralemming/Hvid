import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, Search, HelpCircle } from 'lucide-react';
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
    water_consumption: number;
    energy_consumption: number;
  };
};

type DishwasherWithMatches = Dishwasher & {
  matchCount: number;
};

const featureDescriptions: Record<string, string> = {
  'PerfectGlassCare': 'Særlig skånsom behandling af krystalglas og fint porcelæn',
  'AutoDose': 'Automatisk dosering af opvaskemiddel for optimal rengøring',
  'TimeLight': 'Projicerer resterende tid på gulvet under opvasken',
  'ExtraDry': 'Ekstra tørrefunktion for perfekt tørre kar',
  'QuietPlus': 'Ekstra støjsvag drift, perfekt til åbne køkkener',
  'FlexiBasket': 'Fleksibel kurv der kan tilpasses forskellige størrelser',
  'IntensiveZone': 'Ekstra kraftig rengøring i den nederste kurv',
  'HygienePlus': 'Ekstra skylning og høj temperatur til hygiejnisk rengøring',
  'SpeedWash': 'Hurtig opvask på 30 minutter',
  'EcoProgram': 'Energibesparende program til daglig brug',
  'DelicateProgram': 'Skånsom behandling af følsomt service',
  'SilentProgram': 'Ekstra stille natprogram'
};

function getMatchDescription(dishwasher: Dishwasher, formData: DishwasherFormData): string {
  const coveredNeeds: string[] = [];
  const notCoveredNeeds: string[] = [];

  const allNeeds = [
    {
      key: 'household',
      label: 'Husstandsstørrelse',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('household-'));
        if (!keyword) return null;
        const value = keyword.split('-')[1];
        if (value === 'single') return 'Én person';
        if (value === 'couple') return '2-3 personer';
        if (value === 'family') return '4 eller flere personer';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('household-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    },
    {
      key: 'glass',
      label: 'Krystal glas',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('glass-'));
        if (!keyword) return null;
        const value = keyword.split('-')[1];
        if (value === 'PerfectGlassCare') return 'Har brug for glaspleje';
        if (value === 'no') return 'Standard glasbehandling';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('glass-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    },
    {
      key: 'usage',
      label: 'Service i opvaskemaskinen',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('usage-'));
        if (!keyword) return null;
        const value = keyword.split('-')[1];
        if (value === 'all') return 'Alt';
        if (value === 'all-except-knives') return 'Alt undtagen skarpe knive';
        if (value === 'basic') return 'Kun glas, tallerkner og service';
        if (value === 'all-except-pots') return 'Alt undtagen gryder og skarpe knive';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('usage-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    },
    {
      key: 'type',
      label: 'Type',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('type-'));
        if (!keyword) return null;
        const value = keyword.split('-')[1];
        if (value === 'integrated') return 'Integrerbar';
        if (value === 'white') return 'Hvid front';
        if (value === 'colored') return 'Anden farve front';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('type-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    },
    {
      key: 'noise',
      label: 'Placering',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('noise-'));
        if (!keyword) return null;
        const value = keyword.split('-').slice(1).join('-');
        if (value === 'bedroom-nearby') return 'Tæt på soveværelse';
        if (value === 'bedroom-far') return 'Langt fra soveværelse';
        if (value === 'kitchen-living') return 'Køkkenalrum';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('noise-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    },
    {
      key: 'lifespan',
      label: 'Forventet levetid',
      getValue: () => {
        const keyword = formData.keywords.find(k => k.startsWith('lifespan-'));
        if (!keyword) return null;
        const value = keyword.split('-')[1];
        if (value === 'Budget') return '3-6 år';
        if (value === 'mid') return '6-10 år';
        if (value === 'high') return '10 år+';
        return null;
      },
      isCovered: () => {
        const userNeed = formData.keywords.find(k => k.startsWith('lifespan-'));
        return userNeed ? dishwasher.keywords.includes(userNeed) : false;
      }
    }
  ];

  const userNeeds = allNeeds.filter(need => need.getValue() !== null);

  userNeeds.forEach(need => {
    const isCovered = need.isCovered();
    const needText = `${need.label}: ${need.getValue()}`;

    if (isCovered) {
      coveredNeeds.push(needText);
    } else {
      notCoveredNeeds.push(needText);
    }
  });

  let description = '';

  if (coveredNeeds.length > 0) {
    description += '<div><strong>✅ Dækkede behov:</strong></div>';
    coveredNeeds.forEach(need => {
      description += `<div>• ${need}</div>`;
    });
  }

  if (notCoveredNeeds.length > 0) {
    if (description) description += '<br>';
    description += '<div><strong>👎 Ikke dækkede behov:</strong></div>';
    notCoveredNeeds.forEach(need => {
      description += `<div>• ${need}</div>`;
    });
  }

  if (userNeeds.length === 0) {
    description = 'Denne opvaskemaskine matcher dine grundlæggende behov.';
  }

  if (description) description += '<br>';
  description += `<div><strong>💡 Energieffektivitet:</strong> ${dishwasher.energy_class}-energimærkning</div>`;

  if (dishwasher.type_specific_data) {
    const { noise_level, water_consumption, energy_consumption } = dishwasher.type_specific_data;
    description += `<div><strong>📊 Tekniske data:</strong> ${noise_level} dB, ${water_consumption} L/år, ${energy_consumption} kWh/år</div>`;
  }

  return description;
}

function DishwasherRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as DishwasherFormData;
  const [recommendations, setRecommendations] = useState<DishwasherWithMatches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDishwasher, setHoveredDishwasher] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
            const matchingKeywords = dishwasher.keywords.filter(k => formData.keywords.includes(k));
            return {
              ...dishwasher,
              matchCount: matchingKeywords.length
            };
          })
          .filter(({ matchCount }) => matchCount >= 3);

        const budgetDishwashers = scoredDishwashers
          .filter(m => m.price >= 0 && m.price <= 3499)
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const midDishwashers = scoredDishwashers
          .filter(m => m.price >= 3500 && m.price <= 6499)
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
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleFeatureMouseEnter = (e: React.MouseEvent, feature: string) => {
    const rect = e.currentTarget.getBoundingClientRect();

    let x = rect.right + 10;
    let y = rect.top - 10;

    const tooltipWidth = 320;
    if (x + tooltipWidth > window.innerWidth) {
      x = rect.left - tooltipWidth - 10;
    }

    setTooltipPosition({ x, y });
    setHoveredFeature(feature);
  };

  const handleFeatureMouseLeave = () => {
    setHoveredFeature(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-600">Henter anbefalinger...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl text-red-600">{error}</p>
          <button
            onClick={() => navigate('/dishwasher')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Prøv igen
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Ingen opvaskemaskiner fundet der matcher dine kriterier</p>
          <button
            onClick={() => navigate('/dishwasher')}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Prøv igen med andre kriterier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/dishwasher')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til spørgsmål
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dine anbefalede opvaskemaskiner</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((dishwasher) => (
            <div key={dishwasher.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={dishwasher.image}
                  alt={dishwasher.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {dishwasher.tier === 'budget' ? 'Budget' :
                   dishwasher.tier === 'mid' ? 'Mid-range' :
                   'Premium'}
                </div>
                <div
                  className="absolute top-2 left-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors group"
                  onMouseEnter={() => setHoveredDishwasher(dishwasher.id)}
                  onMouseLeave={() => setHoveredDishwasher(null)}
                  style={{ zIndex: 20 }}
                >
                  <Search className="w-5 h-5 text-blue-600" />
                  {hoveredDishwasher === dishwasher.id && (
                    <div
                      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-2xl"
                      style={{
                        minWidth: '24rem',
                        maxWidth: '32rem',
                        width: 'max-content',
                        zIndex: 50,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      <div
                        className="text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: getMatchDescription(dishwasher, formData) }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{dishwasher.name}</h3>
                  <span className="text-sm text-gray-600 ml-2">
                    {dishwasher.matchCount} nøgleord matcher
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(dishwasher.rating)}
                  <span className="ml-2 text-gray-600">{dishwasher.rating}/5</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {dishwasher.price.toLocaleString('da-DK')} kr.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Nøglefunktioner:</h4>
                  <ul className="space-y-2">
                    {dishwasher.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-600 relative flex items-center group"
                      >
                        <span>{feature}</span>
                        {featureDescriptions[feature] && (
                          <div
                            className="relative inline-block ml-2"
                            onMouseEnter={(e) => handleFeatureMouseEnter(e, feature)}
                            onMouseLeave={handleFeatureMouseLeave}
                          >
                            <HelpCircle className="w-4 h-4 text-blue-500 cursor-help" />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={dishwasher.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Se pris hos {dishwasher.store} <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hoveredFeature && featureDescriptions[hoveredFeature] && (
        <div
          className="fixed bg-white p-4 rounded-lg shadow-2xl z-[60]"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            maxWidth: '320px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            pointerEvents: 'none'
          }}
        >
          <p className="text-sm text-gray-700">
            {featureDescriptions[hoveredFeature]}
          </p>
        </div>
      )}
    </div>
  );
}

export default DishwasherRecommendations;
