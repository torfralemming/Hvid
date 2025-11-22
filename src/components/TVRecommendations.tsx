import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TVFormData } from './TVForm';

type TV = {
  id: string;
  name: string;
  price: number;
  image: string;
  energy_class: string;
  capacity: number; // Screen size in inches
  features: string[];
  rating: number;
  link: string;
  store: string;
  description: string;
  keywords: string[];
  tier: 'budget' | 'mid' | 'premium';
  product_type: string;
  type_specific_data: {
    screen_size: number;
    resolution: string;
    refresh_rate: number;
  };
};

type TVWithMatches = TV & {
  matchCount: number;
};

function getRecommendationDescription(tv: TV, formData: TVFormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  // Match keywords with form data
  const matchingKeywords = tv.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !tv.keywords.includes(k));
  
  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      // Display type
      if (k === 'OLED') return 'det har perfekt sort og er ideelt til mørke rum';
      if (k === 'QLED') return 'det har fremragende farver og lysstyrke, der fungerer godt i varierende lysforhold';
      if (k === 'LED') return 'det er et godt allround-valg med god lysstyrke til lyse rum';
      if (k === 'QOLED') return 'det kombinerer OLED og QLED teknologi for optimal billedkvalitet';

      // Screen size
      if (k === '43-55') return 'skærmstørrelsen på ' + tv.capacity + '" er ideel til din siddeplads under 2 meter fra TV\'et';
      if (k === '55-65') return 'skærmstørrelsen på ' + tv.capacity + '" er perfekt til din siddeplads 2-3 meter fra TV\'et';
      if (k === '65-75') return 'skærmstørrelsen på ' + tv.capacity + '" giver en optimal oplevelse ved 3-4 meters afstand';
      if (k === '75+') return 'den store skærm på ' + tv.capacity + '" er ideel til din siddeplads over 4 meter fra TV\'et';

      // Usage
      if (k === 'SMART TV') return 'det har alle de smarte funktioner du har brug for til streaming';
      if (k === 'Analog') return 'det har god understøttelse af traditionelle TV-kanaler';
      if (k === '120HZ' || k === '120 HZ') return 'den høje opdateringshastighed på ' + tv.type_specific_data.refresh_rate + ' Hz giver flydende billeder til gaming og sport';

      // Lifespan
      if (k === 'Low Budget') return 'det er et prisvenligt valg med god værdi';
      if (k === 'Premium') return 'det er et kvalitetsprodukt med god holdbarhed';
      if (k === 'High end') return 'det er et topklasse-produkt bygget til at holde i mange år';

      return '';
    }).filter(Boolean);

    descriptions.push(`Dette TV opfylder dine behov fordi ${metNeeds.join(', ')}`);
  }

  // Analyze unmet needs
  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      // Display type mismatches
      if (k === 'OLED' && !tv.keywords.includes('OLED')) 
        return 'det ikke har OLED-teknologi, som giver bedre sort-niveau i mørke rum';
      if (k === '120 HZ' && tv.type_specific_data.refresh_rate < 120)
        return 'det har en lavere opdateringshastighed end ideelt til gaming og sport';

      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(', ')}`);
    }
  }

  // Add resolution context
  descriptions.push(`Med ${tv.type_specific_data.resolution} opløsning og ${tv.type_specific_data.refresh_rate} Hz opdateringshastighed`);

  return descriptions.join('. ') + '.';
}

function TVRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as TVFormData;
  const [recommendations, setRecommendations] = useState<TVWithMatches[]>([]);
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
        const { data: tvs, error } = await supabase
          .from('all_products')
          .select('*')
          .eq('product_type', 'tv');

        if (error) {
          throw error;
        }

        const scoredTVs = (tvs as TV[])
          .map(tv => {
            const matchingKeywords = tv.keywords.filter(k => formData.keywords.includes(k));
            return {
              ...tv,
              matchCount: matchingKeywords.length
            };
          })
          .filter(({ matchCount }) => matchCount > 0);

        // Sort by match count first, then by price within each tier
        const budgetTVs = scoredTVs
          .filter(m => m.tier === 'budget')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const midTVs = scoredTVs
          .filter(m => m.tier === 'mid')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const premiumTVs = scoredTVs
          .filter(m => m.tier === 'premium')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const recommendations = [
          budgetTVs[0],
          midTVs[0],
          premiumTVs[0]
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
            onClick={() => navigate('/tv')}
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
          <p className="text-xl text-gray-600">Ingen TV'er fundet der matcher dine kriterier</p>
          <button
            onClick={() => navigate('/tv')}
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
          onClick={() => navigate('/tv')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til spørgsmål
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dine anbefalede TV'er</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((tv) => (
            <div key={tv.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={tv.image}
                  alt={tv.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {tv.tier === 'budget' ? 'Budget' :
                   tv.tier === 'mid' ? 'Mid-range' :
                   'Premium'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{tv.name}</h3>
                  <span className="text-sm text-gray-600 ml-2">
                    {tv.matchCount} nøgleord matcher
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(tv.rating)}
                  <span className="ml-2 text-gray-600">{tv.rating}/5</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {tv.price.toLocaleString('da-DK')} kr.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">Skærmstørrelse: {tv.capacity}"</p>
                  <p className="text-gray-600">Opløsning: {tv.type_specific_data.resolution}</p>
                  <p className="text-gray-600">Opdateringshastighed: {tv.type_specific_data.refresh_rate} Hz</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Nøglefunktioner:</h4>
                  <ul className="space-y-2">
                    {tv.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="text-gray-600">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700">
                    {getRecommendationDescription(tv, formData)}
                  </p>
                </div>
                <a
                  href={tv.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Se pris hos {tv.store} <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TVRecommendations;