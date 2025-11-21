import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, Loader } from 'lucide-react';
import { QuestionOption } from '../types';
import { fetchProducts } from '../services/powerApi';
import { filterProducts, selectGoodBetterBest, RecommendationTier } from '../utils/productFilters';

function WashingMachineRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const [recommendations, setRecommendations] = useState<RecommendationTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedOptions: QuestionOption[] = location.state?.selectedOptions || [];

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        const products = await fetchProducts('washing_machines');

        if (products.length === 0) {
          setError('Ingen produkter fundet. Prøv igen senere.');
          return;
        }

        const filteredProducts = filterProducts(products, selectedOptions);

        if (filteredProducts.length === 0) {
          setError('Ingen produkter matcher dine kriterier. Prøv at justere dine valg.');
          return;
        }

        const tiers = selectGoodBetterBest(filteredProducts);
        setRecommendations(tiers);
      } catch (err) {
        console.error('Error loading recommendations:', err);
        setError('Noget gik galt. Prøv igen senere.');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [selectedOptions]);

  const getMatchReasons = (tier: RecommendationTier): string[] => {
    const reasons: string[] = [];
    const product = tier.product;

    selectedOptions.forEach(option => {
      if (option.filter) {
        const { field, value } = option.filter;
        const productValue = product.specs[field];

        if (field === 'capacity' && typeof productValue === 'number') {
          reasons.push(`Har ${productValue} kg kapacitet`);
        } else if (field === 'depth' && typeof productValue === 'number') {
          reasons.push(`Smal model med ${productValue} cm dybde`);
        } else if (field === 'noiseDB' && typeof productValue === 'number') {
          reasons.push(`Støjsvag: ${productValue} dB`);
        } else if (field === 'features' && Array.isArray(product.features)) {
          const feature = product.features.find(f =>
            f.toLowerCase().includes((value as string).toLowerCase())
          );
          if (feature) {
            reasons.push(`Har ${option.label.toLowerCase()}`);
          }
        }
      }
    });

    if (reasons.length === 0) {
      reasons.push('Matcher dine behov');
    }

    return reasons;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-xl text-gray-600">Finder de bedste anbefalinger til dig...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate('/washing-machine')}
            className="flex items-center text-orange-600 hover:text-orange-800 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tilbage til spørgeskema
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-xl text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/washing-machine')}
              className="bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700"
            >
              Prøv igen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/washing-machine')}
          className="flex items-center text-orange-600 hover:text-orange-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til spørgeskema
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dine anbefalinger
          </h1>
          <p className="text-xl text-gray-600">
            Vi har fundet {recommendations.length} vaskemaskine{recommendations.length !== 1 ? 'r' : ''} baseret på dine behov
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {recommendations.map((tier, index) => (
            <div
              key={tier.tier}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                tier.tier === 'recommended' ? 'ring-2 ring-orange-500 transform md:scale-105' : ''
              }`}
            >
              {tier.tier === 'recommended' && (
                <div className="bg-orange-600 text-white text-center py-2 font-semibold">
                  BEDSTE VALG
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-1">
                      {tier.label}
                    </h3>
                    <p className="text-sm text-gray-600">{tier.tagline}</p>
                  </div>
                  <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm font-semibold text-orange-600">
                      {tier.tier === 'budget' ? '⭐' : tier.tier === 'recommended' ? '⭐⭐' : '⭐⭐⭐'}
                    </span>
                  </div>
                </div>

                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={tier.product.image}
                    alt={tier.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {tier.product.brand}
                </h4>
                <p className="text-gray-600 mb-4">{tier.product.name}</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {tier.product.price.toLocaleString('da-DK')} kr.
                  </p>
                  <div className="space-y-2">
                    {getMatchReasons(tier).map((reason, idx) => (
                      <div key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-900">Nøglespecifikationer:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tier.product.specs.capacity && (
                      <li>• Kapacitet: {tier.product.specs.capacity} kg</li>
                    )}
                    {tier.product.specs.energyClass && (
                      <li>• Energiklasse: {tier.product.specs.energyClass}</li>
                    )}
                    {tier.product.specs.spinSpeed && (
                      <li>• Centrifugeringshastighed: {tier.product.specs.spinSpeed} rpm</li>
                    )}
                    {tier.product.specs.noiseDB && (
                      <li>• Støjniveau: {tier.product.specs.noiseDB} dB</li>
                    )}
                  </ul>
                </div>

                {tier.product.features.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Funktioner:</h5>
                    <div className="flex flex-wrap gap-2">
                      {tier.product.features.slice(0, 4).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full mt-6 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center">
                  Se hos POWER
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-700 py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Tilbage til forsiden
          </button>
        </div>
      </div>
    </div>
  );
}

export default WashingMachineRecommendations;
