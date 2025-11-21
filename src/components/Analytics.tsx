import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';
import LoginDialog from './LoginDialog';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

const questionLabels: Record<string, string> = {
  household: 'Husstandsstørrelse',
  glass: 'Krystalglas',
  usage: 'Service i opvaskemaskinen',
  type: 'Type af opvaskemaskine',
  noise: 'Placering',
  lifespan: 'Forventet levetid',
  washFrequency: 'Vaskefrekvens',
  cleanClothes: 'Rent tøj',
  clothesCare: 'Tøjpleje',
  detergent: 'Vaskemiddel',
  brand: 'Mærkepreference',
  washDuration: 'Vasketid',
  shirts: 'Skjorter',
  baking: 'Bagning',
  sousvide: 'Sous vide',
  maintenance: 'Vedligeholdelse',
  cooking_skill: 'Madlavningsniveau',
  household_size: 'Husstandsstørrelse',
  heating_speed: 'Opvarmningstid',
  shopping: 'Indkøbsfrekvens',
  storage: 'Opbevaring',
  energy: 'Energiforbrug',
  freezer: 'Fryser',
  dispenser: 'Vand/Is dispenser',
  smart: 'Smart funktioner',
  design: 'Design',
  size: 'Størrelse'
};

const answerMappings: Record<string, Record<string, string>> = {
  household: {
    single: '1 person',
    couple: '2-3 personer',
    family: '4-5 personer',
    largefamily: '5+ personer'
  },
  glass: {
    PerfectGlassCare: 'Ja',
    no: 'Nej'
  },
  usage: {
    all: 'Alt',
    'all-except-knives': 'Alt undtagen skarpe knive',
    basic: 'Kun glas, tallerkner og service',
    'all-except-pots': 'Alt undtagen gryder og skarpe knive'
  },
  type: {
    integrated: 'Integrerbar',
    white: 'Hvid front',
    colored: 'Anden farve front'
  },
  noise: {
    'bedroom-nearby': 'Tæt på soveværelse',
    'bedroom-far': 'Langt fra soveværelse',
    'kitchen-living': 'Køkkenalrum',
    quiet: 'Så lydløst som muligt',
    normalnoise: 'Må larme lidt',
    noisefree: 'Lægger ikke mærke til støj',
    loudok: 'Støj er ligegyldigt'
  },
  lifespan: {
    Budget: '3-6 år',
    mid: '6-10 år',
    high: '10+ år'
  },
  shopping: {
    dailyshopping: 'Hver dag',
    weeklyshopping: '2-3 gange om ugen',
    onceshopping: '1 gang om ugen',
    bulkshopping: 'Sjældnere end 1 gang om ugen'
  },
  storage: {
    meatdairy: 'Kød & mejeriprodukter',
    vegstorage: 'Grøntsager & frugt',
    readymeals: 'Færdigretter & takeaway',
    drinksnacks: 'Drikkevarer & snacks'
  },
  energy: {
    energysaving: 'Så energieffektivt som muligt',
    performance: 'Må koste lidt ekstra i strøm',
    normalenergy: 'Tænker ikke over strømforbrug',
    lowprice: 'Billigste køleskab'
  },
  freezer: {
    bigfreezer: 'Stor fryser er vigtig',
    smallfreezer: 'Lille fryser er nok',
    nofreezer: 'Har separat fryser',
    unsurefreezer: 'Ved ikke'
  },
  dispenser: {
    waterice: 'Vand- og isdispenser',
    wateronly: 'Kun vanddispenser',
    noicedispenser: 'Kun isbakker',
    standarddoor: 'Ikke nødvendigt'
  },
  smart: {
    smartcontrol: 'Styring via mobil',
    smartscreen: 'Skærm på døren',
    nosmart: 'Ikke nødvendigt',
    unsuretech: 'Ved ikke'
  },
  design: {
    premiumdesign: 'Rustfrit stål/sort',
    integrated: 'Integreret',
    standardwhite: 'Hvidt køleskab',
    anydesign: 'Ligegyldigt'
  },
  size: {
    slimfit: 'Max 60 cm bredde',
    standardfit: '60-70 cm bredde',
    largefit: 'Over 70 cm bredde',
    unsurefit: 'Ved ikke'
  }
};

function Analytics() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('washing_machine');
  const [chartData, setChartData] = useState<Record<string, ChartData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('survey_responses')
        .select('*')
        .eq('category', selectedCategory);

      if (startDate) {
        query = query.gte('created_at', startDate);
      }
      if (endDate) {
        const nextDay = new Date(endDate);
        nextDay.setDate(nextDay.getDate() + 1);
        query = query.lt('created_at', nextDay.toISOString());
      }

      const { data: responses, error } = await query;

      if (error) throw error;

      const allAnswers: Record<string, number> = {};
      
      responses.forEach(response => {
        const questionLabel = questionLabels[response.question] || response.question;
        const answerLabel = answerMappings[response.question]?.[response.answer] || response.answer;
        const key = `${questionLabel}: ${answerLabel}`;
        allAnswers[key] = (allAnswers[key] || 0) + 1;
      });

      const sortedAnswers = Object.entries(allAnswers)
        .sort(([, a], [, b]) => b - a);

      setChartData({
        'combined': {
          labels: sortedAnswers.map(([label]) => label),
          datasets: [{
            label: 'Antal svar',
            data: sortedAnswers.map(([, count]) => count),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }]
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Der opstod en fejl');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [selectedCategory, startDate, endDate, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginDialog(false);
  };

  if (!isAuthenticated) {
    return (
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => navigate('/')}
        onLogin={handleLogin}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xl text-gray-600">Indlæser statistik...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til forsiden
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik</h2>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vælg kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="washing_machine">Vaskemaskine</option>
                <option value="dishwasher">Opvaskemaskine</option>
                <option value="oven">Ovn</option>
                <option value="refrigerator">Køleskab</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fra dato
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Til dato
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(chartData).map(([question, data]) => (
              <div key={question} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Alle svar
                  {startDate && endDate && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()})
                    </span>
                  )}
                </h3>
                <div className="h-[600px]">
                  <Bar
                    data={data}
                    options={{
                      indexAxis: 'y',
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        x: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;