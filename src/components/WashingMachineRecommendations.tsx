import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink, Search, HelpCircle } from 'lucide-react';
import type { FormData } from './WashingMachineForm';
import { supabase } from '../lib/supabase';

type WashingMachine = {
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
    rpm: number;
    annual_energy_consumption: number;
    annual_water_consumption: number;
  };
};

type WashingMachineWithMatches = WashingMachine & {
  matchCount: number;
};

const featureDescriptions: Record<string, string> = {
  'ProSense®': 'Sensorer måler mængden af tøj og tilpasser vand- og energiforbruget, så du ikke bruger mere end nødvendigt.',
  'OptiSense®': 'Justerer vasketiden, energien og vandforbruget efter mængden af tøj, så du altid får en effektiv vask.',
  'Honeycomb tromle': 'Mieles Honeycomb-tromle er designet til at beskytte dit tøj bedre under vask. Tromlens overflade har en særlig bikubestruktur, som skaber en tynd vandfilm mellem tøjet og tromlen.',
  'Eco TimeSave': 'En hurtig og energibesparende funktion, der vasker tøjet på kortere tid uden at gå på kompromis med resultatet.',
  'ProfiEco Motor': 'Mieles ProfiEco-motor er en effektiv og lydsvag motor. Med sin elektroniske styring uden kulbørster arbejder den næsten uden slitage. Dette innovative design garanterer mange års effektiv, ubekymret og bekvem tøjpleje.',
  'Watercontrol-System': 'Watercontrol-systemet (WCS) kontrollerer vandtilførslen via en vandmængdesensor. Hvis den normale vandmængde ikke opnås, stopper tilførslen. Hvis der trænger vand ud i maskinens indre, lukkes tilførselsventilen i maskinen, og vandet i sæbeskuffen pumpes ud. En svømmerkontakt i bunden registrerer vand, der trænger ud.',
  'ÖKOMix': 'Fordeler sæben og skyllemidlet jævnt i vandet, før det rammer tøjet, så alt vaskes grundigt og skånsomt. vask på en time på energi niveau A.',
  'AutoDose': 'Maskinen doserer automatisk den rette mængde sæbe, så du undgår overforbrug og skåner både miljøet og tøjet.',
  'ProSteam®': 'Dampfunktionen reducerer krøller og frisker tøjet op uden at vaske det. Perfekt til skjorter!',
  'SteamCure™ dampteknologi': 'Fjerner bakterier, allergener og lugt ved at bruge damp i slutningen af vasken.',
  'Steam+™': 'Gør tøjet blødere og minimerer krøller med damp, så strygning bliver lettere.',
  'Hygiene Steam': 'Bruger damp til at fjerne op til 99,9 % af bakterier og allergener i tøjet.',
  'Hurtigvask på 28 minutter': 'Perfekt til en hurtig opfriskning af tøjet, når du har travlt.',
  'Quick Wash': 'En superhurtig vask, der gør dit tøj rent på rekordtid.',
  'TurboWash™ 360°': 'Kraftige vandstråler gør vasken hurtigere og mere effektiv uden at slide på tøjet.',
  'QuickDrive™': 'Forkorter vasketiden med op til 50 % uden at gå på kompromis med renheden.',
  'SingleWash': 'Vasker én enkelt trøje eller et lille stykke tøj hurtigt og økonomisk.',
  'Silent System': 'En motor, der reducerer støjniveauet under vask.',
  'Silent System Plus': 'Endnu mere støjsvag end Silent System, perfekt til nattetimerne.',
  'Natprogram med reduceret støj': 'Vasker ekstra stille, så du kan sove uden at blive forstyrret.',
  'ProSmart™ Inverter Motor': 'Støjsvag motor med lavt energiforbrug og længere holdbarhed.',
  'ProSmart™ Inverter Motor med 10 års garanti': 'Samme effektive motor, men med en længere garanti.',
  'Inverter Motor': 'En mere energieffektiv motor, der holder længere og larmer mindre.',
  'Inverter Direct Drive': 'En kraftigere og mere støjsvag motor, der holder længere og har færre bevægelige dele.',
  'Hygiejne+ program': 'Bruger høj temperatur og ekstra skylning til at fjerne bakterier og allergener.',
  'Allergy Care': 'Perfekt til allergikere, da programmet fjerner støvmider og pollen fra tøjet.',
  'Allergivenligt program': 'Ligesom Allergy Care, men med ekstra damp for at eliminere flere bakterier.',
  'Pet Hair Removal': 'Fjerner dyrehår mere effektivt, så tøjet ikke ender med at være fyldt med hunde- eller kattehår.',
  'SmartThings': 'En app, der lader dig styre og overvåge din vaskemaskine direkte fra mobilen.',
  'Smart ThinQ™': 'En anden smart funktion, der gør det muligt at tilpasse og styre vasken via en app.',
  'AI DD™ teknologi': 'Maskinen analyserer tøjet og vælger automatisk den mest skånsomme vask.',
  'AddWash™': 'En lille låge på fronten, hvor du kan tilføje glemt tøj, selv efter vasken er startet.',
  'LED display': 'Giver dig et klart overblik over vasketiden og de valgte indstillinger.',
  'SoftPlus': 'Sørger for, at skyllemidlet bliver jævnt fordelt, så tøjet bliver blødt og velduftende.',
  'DirectSpray': 'Sprøjter vand direkte på tøjet for en mere jævn og effektiv vask.',
  'AquaWave™ tromlesystem': 'En skånsom tromledesign, der beskytter tøjet under vask.',
  'AquaWave™ Technology': 'Samme som ovenstående, men med ekstra fokus på mindre slitage.',
  'PowerWash': 'Vasker hurtigt og effektivt, samtidig med at den sparer på vand og energi.',
  'AI EcoBubble™': 'Skummer sæben op med luft og vand, så det trænger bedre ind i tøjet og virker ved lavere temperaturer.',
  'Auto Dispense': 'Doserer automatisk den rette mængde vaskemiddel for at undgå spild.',
  'SpaceMax™': 'Giver større tromlekapacitet uden at maskinen fylder mere.',
  'CapDosing': 'Med CapDosing kan du eksempelvis reimprenere regntøj, styrke uld etc. Det er en Cap der sælges seperat og kan kune bruges i en miele vaskemaskine'
};

function getMatchDescription(machine: WashingMachine, formData: FormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  // Match keywords with form data
  const matchingKeywords = machine.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !machine.keywords.includes(k));
  
  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      if (k.includes('honeycomb-eco')) {
        return 'denne maskine er valgt til dig fordi du ønsker at passe på klimaet. Den har en særlig tromle der er designet til at holde dit tøj længere';
      }
      if (k.includes('Autodose') || k.includes('autodose')) {
        return 'maskinen har automatisk dosering af vaskemiddel, hvilket betyder at den vejer tøjet og sørger for at bruge den helt korrekte mængde sæbe. Dette skåner både miljøet og dit tøj, og derudover din pengepung!';
      }
      if (k.includes('Steam') || k.includes('Steamfunc')) {
        return 'maskinen har dampfunktion som hjælper med at reducere krøl og opfriske tøj der kun har været brugt én gang. Når du damper dit tøj, fjernes 99.9% af alle støvmider, lugtgener og bakterier. Derudover trækkes fibrene i dit tøj sammen igen, så "hængerøv og knæ" i bukserne fjernes. Så i stedet for at vaske tøj som ikke er beskidt kan du nøjes med at dampe det og sparre en masse penge på vand og strøm. Endnu en gode er at et dampprogram kun tager 15-25 minutter!';
      }
      if (k.includes('PowerWash')) {
        return 'maskinen har en effektiv vasketeknologi der sikrer grundig vask på kortere tid og med mindre energiforbrug';
      }
      if (k.includes('family') || k.includes('largefamily')) {
        return `med en kapacitet på ${machine.capacity} kg er maskinen perfekt til familiens behov`;
      }
      return '';
    }).filter(Boolean);

    descriptions.push(metNeeds.join('. '));
  }

  // Analyze unmet needs
  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      if (k.includes('honeycomb-eco') && !matchingKeywords.includes('honeycomb-eco')) {
        return 'maskinen har ikke specielle funktioner til at forlænge tøjets levetid';
      }
      if (k.includes('Autodose') && !matchingKeywords.includes('Autodose')) {
        return 'maskinen har ikke automatisk dosering af vaskemiddel';
      }
      if (k.includes('Steam') && !matchingKeywords.includes('Steam')) {
        return 'maskinen har ikke dampfunktion';
      }
      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(' og ')}`);
    }
  }

  // Add energy efficiency description
  if (machine.energy_class === 'A' || machine.energy_class === 'B') {
    descriptions.push(`${machine.energy_class}-energimærkningen sikrer lave driftsomkostninger`);
  }

  // Add type-specific data
  if (machine.type_specific_data) {
    const { rpm, annual_energy_consumption, annual_water_consumption } = machine.type_specific_data;
    descriptions.push(`Maskinen har en centrifugeringshastighed på ${rpm} omdrejninger, et årligt energiforbrug på ${annual_energy_consumption} kWh og et årligt vandforbrug på ${annual_water_consumption} liter`);
  }

  return descriptions.join('. ') + '.';
}

function WashingMachineRecommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as FormData;
  const [recommendations, setRecommendations] = useState<WashingMachineWithMatches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredMachine, setHoveredMachine] = useState<string | null>(null);
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
        const { data: machines, error } = await supabase
          .from('all_products')
          .select('*')
          .eq('product_type', 'washing_machine');

        if (error) {
          throw error;
        }

        const scoredMachines = (machines as WashingMachine[])
          .map(machine => {
            const matchingKeywords = machine.keywords.filter(k => formData.keywords.includes(k));
            return {
              ...machine,
              matchCount: matchingKeywords.length
            };
          })
          .filter(({ matchCount }) => matchCount >= 3);

        // Sort by match count first, then by price within each tier
        const budgetMachines = scoredMachines
          .filter(m => m.tier === 'budget')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const midMachines = scoredMachines
          .filter(m => m.tier === 'mid')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const premiumMachines = scoredMachines
          .filter(m => m.tier === 'premium')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const recommendations = [
          budgetMachines[0],
          midMachines[0],
          premiumMachines[0]
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
    
    // Calculate position relative to viewport
    let x = rect.right + 10;
    let y = rect.top - 10; // Position above the cursor

    // Adjust position if tooltip would go off screen
    const tooltipWidth = 320; // max-w-sm = 24rem = 384px, using 320px to be safe
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
            onClick={() => navigate('/washing-machine')}
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
          <p className="text-xl text-gray-600">Ingen vaskemaskiner fundet der matcher dine kriterier</p>
          <button
            onClick={() => navigate('/washing-machine')}
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
          onClick={() => navigate('/washing-machine')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til spørgsmål
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dine anbefalede vaskemaskiner</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((machine) => (
            <div key={machine.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {machine.tier === 'budget' ? 'Budget' :
                   machine.tier === 'mid' ? 'Mid-range' :
                   'Premium'}
                </div>
                <div 
                  className="absolute top-2 left-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors group"
                  onMouseEnter={() => setHoveredMachine(machine.id)}
                  onMouseLeave={() => setHoveredMachine(null)}
                  style={{ zIndex: 20 }}
                >
                  <Search className="w-5 h-5 text-blue-600" />
                  {hoveredMachine === machine.id && (
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
                      <p className="text-sm text-gray-700 whitespace-normal">
                        {getMatchDescription(machine, formData)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{machine.name}</h3>
                  <span className="text-sm text-gray-600 ml-2">
                    {machine.matchCount} nøgleord matcher
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(machine.rating)}
                  <span className="ml-2 text-gray-600">{machine.rating}/5</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {machine.price.toLocaleString('da-DK')} kr.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">Energiklasse: {machine.energy_class}</p>
                  <p className="text-gray-600">Kapacitet: {machine.capacity} kg</p>
                  <p className="text-gray-600">Centrifugering: {machine.type_specific_data.rpm} rpm</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Nøglefunktioner:</h4>
                  <ul className="space-y-2">
                    {machine.features.map((feature, index) => (
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
                  href={machine.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Se pris hos {machine.store} <ExternalLink className="w-4 h-4 ml-2" />
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

export default WashingMachineRecommendations;