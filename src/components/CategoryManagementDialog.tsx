import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Category = {
  id: string;
  name: string;
  created_at?: string;
};

type Question = {
  id: string;
  key: string;
  label: string;
  options: QuestionOption[];
};

type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

type CategoryManagementDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CategoryFormData = {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  questions: Question[];
};

const defaultQuestions: Question[] = [
  {
    id: '1',
    key: 'household',
    label: 'Hvor mange er i derhjemme?',
    options: [
      { value: 'single', label: '1 person', description: 'Perfekt til én person' },
      { value: 'couple', label: '2-3 personer', description: 'Ideel til par eller små familier' },
      { value: 'family', label: '4-5 personer', description: 'God til familier' },
      { value: 'largefamily', label: '5+ personer', description: 'Rummelig til store familier' }
    ]
  }
];

function CategoryManagementDialog({ isOpen, onClose }: CategoryManagementDialogProps) {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFormData | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    id: '',
    name: '',
    displayName: '',
    icon: '📦',
    questions: [...defaultQuestions]
  });

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Der opstod en fejl ved hentning af kategorier');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setFormData({
      id: '',
      name: '',
      displayName: '',
      icon: '📦',
      questions: [...defaultQuestions]
    });
    setView('create');
  };

  const handleEditCategory = (category: Category) => {
    let categoryQuestions: Question[] = [];
    
    console.log('Editing category:', category.id); // Debug log
    
    if (category.id === 'washing_machine' || category.id === 'washing_machines') {
      console.log('Loading washing machine questions'); // Debug log
      categoryQuestions = [
        {
          id: '1',
          key: 'household',
          label: 'Hvor mange er du/i derhjemme?',
          options: [
            { value: 'single', label: '1', description: 'Perfekt til én person' },
            { value: 'couple', label: '2-3', description: 'Ideel til par' },
            { value: 'family', label: '4-5', description: 'God til familier' },
            { value: 'largefamily', label: '5 eller flere', description: 'Rummelig til store familier' }
          ]
        },
        {
          id: '2',
          key: 'washFrequency',
          label: 'Hvor ofte vasker du/i?',
          options: [
            { value: 'everyday', label: 'Hver dag', description: 'Daglig vask' },
            { value: 'almosteveryday', label: '4-6 gange om ugen', description: 'Næsten daglig' },
            { value: 'weekly', label: '2-3 gange om ugen', description: 'Ugentlig vask' },
            { value: 'onceaweek', label: '1 gang om ugen', description: 'Sjælden vask' }
          ]
        },
        {
          id: '3',
          key: 'cleanClothes',
          label: 'Hvor ofte vasker du tøj, du kun har haft på en gang, som ikke er beskidt?',
          options: [
            { value: 'steamFunc', label: 'Næsten hver gang', description: 'Har brug for dampfunktion' },
            { value: 'nosteam', label: 'Aldrig', description: 'Alt tøj er beskidt' },
            { value: 'Steamfunc', label: 'Det sker af og til', description: 'Indimellem dampfunktion' }
          ]
        },
        {
          id: '4',
          key: 'clothesCare',
          label: 'Hvad betyder det for dig/jer at tøj holder så længe som muligt?',
          options: [
            { value: 'normaldrum', label: 'Vi køber bare noget nyt', description: 'Standard tromle' },
            { value: 'honeycomb-luxury', label: 'Jeg har meget dyrt tøj', description: 'Skånsom tromle' },
            { value: 'honeycomb-eco', label: 'Jeg vil passe på klimaet', description: 'Miljøvenlig pleje' },
            { value: 'normaldrum', label: 'Det har jeg ingen holdning til', description: 'Standard tromle' }
          ]
        },
        {
          id: '5',
          key: 'detergent',
          label: 'Hvordan ved du hvor meget sæbe du skal bruge til en vask?',
          options: [
            { value: 'Autodose', label: 'Det ved jeg ikke', description: 'Automatisk dosering' },
            { value: 'SelfDose', label: 'Det betyder ikke noget', description: 'Manuel dosering' },
            { value: 'selfdose', label: 'Jeg vejer mit tøj', description: 'Præcis dosering' },
            { value: 'autodose', label: 'Vil skåne miljøet', description: 'Miljøvenlig dosering' }
          ]
        },
        {
          id: '6',
          key: 'brand',
          label: 'Hvor meget betyder mærket på vaskemaskinen for dig?',
          options: [
            { value: 'AEG', label: 'Det skal være AEG', description: 'AEG mærke' },
            { value: 'Siemens', label: 'Det skal være Siemens', description: 'Siemens mærke' },
            { value: 'miele', label: 'Det skal være Miele', description: 'Miele mærke' },
            { value: 'Electrolux', label: 'Det skal være Electrolux', description: 'Electrolux mærke' },
            { value: 'Anybrand', label: 'Hvilket som helst mærke', description: 'Ingen præference' }
          ]
        },
        {
          id: '7',
          key: 'washDuration',
          label: 'Hvor lang tid må en vask tage?',
          options: [
            { value: 'PowerWash', label: 'Hurtigt og økonomisk (1 time)', description: 'Hurtig vask' },
            { value: 'Speedwash', label: 'Bare hurtigt (1 time)', description: 'Super hurtig' },
            { value: 'ecowash', label: 'Længde er ligemeget (1-4 timer)', description: 'Økonomisk vask' },
            { value: 'ecowash', label: 'Billig i drift (2.5-4 timer)', description: 'Energibesparende vask' }
          ]
        },
        {
          id: '8',
          key: 'shirts',
          label: 'Ønsker du at bruge din vaskemaskine til at stryge dine skjorter?',
          options: [
            { value: 'Steam', label: 'Ja', description: 'Dampfunktion til skjorter' },
            { value: 'nosteam', label: 'Nej', description: 'Ingen dampfunktion' }
          ]
        }
      ];
    }
    else if (category.id === 'dishwasher' || category.id === 'dishwashers') {
      categoryQuestions = [
        {
          id: '1',
          key: 'household',
          label: 'Hvor mange er i derhjemme?',
          options: [
            { value: 'single', label: '1', description: 'Én person' },
            { value: 'couple', label: '2-3', description: 'Par eller lille familie' },
            { value: 'family', label: '4 eller flere', description: 'Familie' }
          ]
        },
        {
          id: '2',
          key: 'glass',
          label: 'Har du krystal glas som du ønsker at komme i opvaskeren?',
          options: [
            { value: 'PerfectGlassCare', label: 'Ja', description: 'Særlig glasbehandling' },
            { value: 'no', label: 'Nej', description: 'Standard glasbehandling' }
          ]
        },
        {
          id: '3',
          key: 'usage',
          label: 'Hvor meget af din service putter du i opvaskemaskinen?',
          options: [
            { value: 'all', label: 'Alt', description: 'Al service' },
            { value: 'all-except-knives', label: 'Alt undtagen skarpe knive', description: 'Det meste service' },
            { value: 'basic', label: 'Kun glas tallerkner og service', description: 'Grundlæggende service' },
            { value: 'all-except-pots', label: 'Alt undtagen gryder og skarpe knive', description: 'Service uden gryder' }
          ]
        },
        {
          id: '4',
          key: 'type',
          label: 'Hvilken slags opvaskemaskine skal du bruge?',
          options: [
            { value: 'integrated', label: 'Integrerbar', description: 'Integrerbar model' },
            { value: 'white', label: 'Hvid front', description: 'Fritstående hvid' },
            { value: 'colored', label: 'Anden farve front', description: 'Specialfarve' }
          ]
        },
        {
          id: '5',
          key: 'noise',
          label: 'Hvilket rum skal den stå i?',
          options: [
            { value: 'bedroom-nearby', label: 'Tæt på soveværelse', description: 'Meget støjsvag' },
            { value: 'bedroom-far', label: 'Langt fra soveværelse', description: 'Normal støj' },
            { value: 'kitchen-living', label: 'Køkkenalrum', description: 'Åbent rum' }
          ]
        },
        {
          id: '6',
          key: 'lifespan',
          label: 'Hvor længe forventer du opvaskemaskinen skal holde?',
          options: [
            { value: 'Budget', label: '3-6 år', description: 'Kort levetid' },
            { value: 'mid', label: '6-10 år', description: 'Medium levetid' },
            { value: 'high', label: '10 år+', description: 'Lang levetid' }
          ]
        }
      ];
    }
    else if (category.id === 'oven' || category.id === 'ovens') {
      categoryQuestions = [
        {
          id: '1',
          key: 'usage',
          label: 'Hvor meget bruger du/i ovnen?',
          options: [
            { value: 'DailyUse', label: 'Hver dag', description: 'Daglig brug' },
            { value: 'FrequentUse', label: '3-4 gange om ugen', description: 'Hyppig brug' },
            { value: 'NotEveryday', label: '2 gange om ugen', description: 'Regelmæssig brug' },
            { value: 'Weekly', label: '1 gang om ugen', description: 'Ugentlig brug' }
          ]
        },
        {
          id: '2',
          key: 'baking',
          label: 'Hvor ofte bager du brød?',
          options: [
            { value: 'DailyBaking', label: 'Hver dag', description: 'Daglig bagning' },
            { value: 'Steam', label: '2-3 gange om ugen', description: 'Hyppig bagning med damp' },
            { value: 'FrequentBaking', label: '4-5 gange om ugen', description: 'Meget hyppig bagning' },
            { value: 'Nosteam', label: '1 gang hver 14 dag eller sjældnere', description: 'Sjælden bagning' }
          ]
        },
        {
          id: '3',
          key: 'sousvide',
          label: 'Ønsker du at bruge ovnen til at sous vide?',
          options: [
            { value: 'Sousvide', label: 'Ja', description: 'Sous vide funktion' },
            { value: 'NoSousvide', label: 'Nej', description: 'Ingen sous vide' }
          ]
        },
        {
          id: '4',
          key: 'maintenance',
          label: 'Hvor nem vedligeholdelse ønsker du?',
          options: [
            { value: 'Pyrolyse', label: 'Ovnen skal gøre sig selv rent', description: 'Pyrolyse selvrens' },
            { value: 'Steamclean', label: 'Ovnen skal hjælpe, men jeg kan gøre lidt', description: 'Damprengøring' },
            { value: 'nocleaning', label: 'Jeg har ikke noget imod manuelt arbejde', description: 'Manuel rengøring' }
          ]
        },
        {
          id: '5',
          key: 'cooking_skill',
          label: 'Hvor ferm er du/i som kok?',
          options: [
            { value: 'ProChef', label: 'Jeg er uddannet kok', description: 'Professionel kok' },
            { value: 'HobbyChef', label: 'Jeg nyder at hygge med mad', description: 'Hobby kok' },
            { value: 'LearningChef', label: 'Jeg forsøger at blive bedre', description: 'Lærende kok' },
            { value: 'Beginner', label: 'Jeg kan ikke lave mad', description: 'Begynder' }
          ]
        },
        {
          id: '6',
          key: 'household_size',
          label: 'Hvor mange sidder i rundt om aftensmadsbordet?',
          options: [
            { value: 'Single', label: '1', description: 'Én person' },
            { value: 'Couple', label: '2-3', description: 'Par eller lille familie' },
            { value: 'Family', label: '4-5', description: 'Familie' },
            { value: 'LargeFamily', label: '6 eller flere', description: 'Stor familie' }
          ]
        },
        {
          id: '7',
          key: 'heating_speed',
          label: 'Hvor hurtigt forventer du din ovn varmer op til 200 grader?',
          options: [
            { value: 'slowheat', label: '10 minutter', description: 'Langsom opvarmning' },
            { value: 'MedHeat', label: '6-7 minutter', description: 'Medium opvarmning' },
            { value: 'quickheat', label: '5-6 minutter', description: 'Hurtig opvarmning' }
          ]
        }
      ];
    }
    else if (category.id === 'refrigerator' || category.id === 'refrigerators') {
      categoryQuestions = [
        {
          id: '1',
          key: 'household',
          label: 'Hvor mange personer bruger køleskabet dagligt?',
          options: [
            { value: 'single', label: '1 person', description: 'Én person' },
            { value: 'couple', label: '2-3 personer', description: 'Par eller lille familie' },
            { value: 'family', label: '4-5 personer', description: 'Familie' },
            { value: 'largefamily', label: '5+ personer', description: 'Stor familie' }
          ]
        },
        {
          id: '2',
          key: 'shopping',
          label: 'Hvor ofte handler du ind?',
          options: [
            { value: 'dailyshopping', label: 'Hver dag', description: 'Daglige indkøb' },
            { value: 'weeklyshopping', label: '2-3 gange om ugen', description: 'Ugentlige indkøb' },
            { value: 'onceshopping', label: '1 gang om ugen', description: 'Ugentlige storindkøb' },
            { value: 'bulkshopping', label: 'Sjældnere end 1 gang om ugen', description: 'Bulk indkøb' }
          ]
        },
        {
          id: '3',
          key: 'storage',
          label: 'Hvad opbevarer du mest i dit køleskab?',
          options: [
            { value: 'meatdairy', label: 'Kød & mejeriprodukter', description: 'Kød og mejeriprodukter' },
            { value: 'vegstorage', label: 'Grøntsager & frugt', description: 'Grøntsager og frugt' },
            { value: 'readymeals', label: 'Færdigretter & takeaway', description: 'Færdigretter' },
            { value: 'drinksnacks', label: 'Drikkevarer & snacks', description: 'Drikkevarer og snacks' }
          ]
        },
        {
          id: '4',
          key: 'energy',
          label: 'Hvor vigtig er energiforbruget for dig?',
          options: [
            { value: 'energysaving', label: 'Så energieffektivt som muligt', description: 'Energibesparende' },
            { value: 'performance', label: 'Må koste lidt ekstra i strøm', description: 'Høj ydeevne' },
            { value: 'normalenergy', label: 'Tænker ikke over strømforbrug', description: 'Normal energiforbrug' },
            { value: 'lowprice', label: 'Billigste køleskab', description: 'Laveste pris' }
          ]
        },
        {
          id: '5',
          key: 'freezer',
          label: 'Har du brug for en fryser i dit køleskab?',
          options: [
            { value: 'bigfreezer', label: 'Ja, en stor fryser er vigtig', description: 'Stor fryser' },
            { value: 'smallfreezer', label: 'Ja, men en lille fryser er nok', description: 'Lille fryser' },
            { value: 'nofreezer', label: 'Nej, jeg har en separat fryser', description: 'Ingen fryser' },
            { value: 'unsurefreezer', label: 'Jeg ved ikke, hvad jeg har brug for', description: 'Usikker på fryser' }
          ]
        },
        {
          id: '6',
          key: 'noise',
          label: 'Hvor meget betyder støjniveauet for dig?',
          options: [
            { value: 'quiet', label: 'Så lydløst som muligt', description: 'Meget støjsvag' },
            { value: 'normalnoise', label: 'Må larme lidt hvis billigt', description: 'Normal støj' },
            { value: 'noisefree', label: 'Lægger ikke mærke til støj', description: 'Støj ligegyldig' },
            { value: 'loudok', label: 'Står i kælder/garage', description: 'Støj ikke vigtigt' }
          ]
        },
        {
          id: '7',
          key: 'dispenser',
          label: 'Ønsker du en køleskabsdør med vand- og isterningefunktion?',
          options: [
            { value: 'waterice', label: 'Ja, vand- og isdispenser', description: 'Vand og is dispenser' },
            { value: 'wateronly', label: 'Ja, kun vanddispenser', description: 'Kun vanddispenser' },
            { value: 'noicedispenser', label: 'Nej, kun isbakker', description: 'Kun isbakker' },
            { value: 'standarddoor', label: 'Nej, ikke nødvendigt', description: 'Standard dør' }
          ]
        },
        {
          id: '8',
          key: 'smart',
          label: 'Skal dit køleskab kunne styres via en app?',
          options: [
            { value: 'smartcontrol', label: 'Ja, justere temperatur via mobil', description: 'Smart styring' },
            { value: 'smartscreen', label: 'Ja, skærm på døren', description: 'Smart skærm' },
            { value: 'nosmart', label: 'Nej, behøver ikke være smart', description: 'Ingen smart funktioner' },
            { value: 'unsuretech', label: 'Ved ikke om jeg vil bruge det', description: 'Usikker på smart' }
          ]
        },
        {
          id: '9',
          key: 'design',
          label: 'Hvor vigtigt er designet for dig?',
          options: [
            { value: 'premiumdesign', label: 'Rustfrit stål eller sort', description: 'Premium design' },
            { value: 'integrated', label: 'Skal matche mit køkken', description: 'Integreret design' },
            { value: 'standardwhite', label: 'Hvidt køleskab er fint', description: 'Standard hvid' },
            { value: 'anydesign', label: 'Går ikke op i udseendet', description: 'Design ligegyldigt' }
          ]
        },
        {
          id: '10',
          key: 'size',
          label: 'Hvor meget plads har du til dit køleskab?',
          options: [
            { value: 'slimfit', label: 'Max 60 cm bredde', description: 'Smal model' },
            { value: 'standardfit', label: '60-70 cm bredde', description: 'Standard størrelse' },
            { value: 'largefit', label: 'Over 70 cm bredde', description: 'Stor model' },
            { value: 'unsurefit', label: 'Ved ikke hvor meget plads', description: 'Usikker på plads' }
          ]
        }
      ];
    }
    else if (category.id === 'tv' || category.id === 'tvs') {
      categoryQuestions = [
        {
          id: '1',
          key: 'lighting',
          label: 'Hvordan er lysindfaldet i din stue?',
          options: [
            { value: 'LED', label: 'Meget lyst', description: 'Meget lyst rum' },
            { value: 'QLED TV', label: 'Moderat lys', description: 'Moderat lysindfall' },
            { value: 'OLED', label: 'Mørkt', description: 'Mørkt rum' },
            { value: 'QLED', label: 'Varierer', description: 'Varierende lysforhold' }
          ]
        },
        {
          id: '2',
          key: 'distance',
          label: 'Hvor mange meter sidder du fra TV\'et?',
          options: [
            { value: '43-55', label: 'Under 2 meter', description: 'Kort afstand' },
            { value: '55-65', label: '2-3 meter', description: 'Medium afstand' },
            { value: '65-75', label: '3-4 meter', description: 'Lang afstand' },
            { value: '75+', label: 'Over 4 meter', description: 'Meget lang afstand' }
          ]
        },
        {
          id: '3',
          key: 'usage',
          label: 'Hvad bruges dit TV mest til?',
          options: [
            { value: 'SMART TV', label: 'Streaming', description: 'Streaming tjenester' },
            { value: 'Analog', label: 'TV-kanaler/nyheder', description: 'Traditionelle kanaler' },
            { value: '120HZ', label: 'Spil/konsol', description: 'Gaming' },
            { value: 'SMART TV', label: 'YouTube/baggrund', description: 'Baggrundsunderholdning' }
          ]
        },
        {
          id: '4',
          key: 'sport',
          label: 'Skal du se sport på TV\'et?',
          options: [
            { value: '120 HZ', label: 'Ja, ofte', description: 'Hyppig sport' },
            { value: '120 HZ', label: 'Ja, indimellem', description: 'Indimellem sport' },
            { value: '60 HZ', label: 'Ja, men går ikke op i perfekt billede', description: 'Sport uden krav' },
            { value: '60 HZ', label: 'Nej / Kun andre i hjemmet', description: 'Ingen sport' }
          ]
        },
        {
          id: '5',
          key: 'streaming',
          label: 'Hvilke streamingtjenester bruger du mest?',
          options: [
            { value: 'Smart tv', label: 'Netflix/Disney+', description: 'Populære streaming' },
            { value: 'Google TV', label: 'HBO/Viaplay', description: 'Premium streaming' },
            { value: 'smart tv', label: 'YouTube', description: 'YouTube indhold' },
            { value: 'analog', label: 'TV-kanaler', description: 'Traditionelle kanaler' }
          ]
        },
        {
          id: '6',
          key: 'lifespan',
          label: 'Hvor længe forventer du, at dit TV skal holde?',
          options: [
            { value: 'Low Budget', label: '3-5 år', description: 'Kort levetid' },
            { value: 'Premium', label: '5-7 år', description: 'Medium levetid' },
            { value: 'High end', label: '7-10 år / så længe det virker', description: 'Lang levetid' }
          ]
        },
        {
          id: '7',
          key: 'pictureQuality',
          label: 'Hvor vigtig er billedkvaliteten for dig?',
          options: [
            { value: 'QOLED', label: 'Meget vigtig', description: 'Højeste billedkvalitet' },
            { value: 'OLED', label: 'Vigtig men brugervenlighed også', description: 'God balance' },
            { value: 'QLED', label: 'Ikke det vigtigste', description: 'Mindre vigtigt' },
            { value: 'LED', label: 'Ser ikke forskel', description: 'Billedkvalitet ligegyldig' }
          ]
        },
        {
          id: '8',
          key: 'timeOfDay',
          label: 'Hvornår på dagen bruger du mest dit TV?',
          options: [
            { value: 'OLED', label: 'Om aftenen', description: 'Aften brug' },
            { value: 'QLED', label: 'Weekenden', description: 'Weekend brug' },
            { value: 'QLED', label: 'Lidt hele dagen', description: 'Hele dagen' },
            { value: 'LED', label: 'Baggrund i dagtimerne', description: 'Dagtime baggrund' }
          ]
        }
      ];
    }
    else {
      console.log('Unknown category, using default questions'); // Debug log
      categoryQuestions = [...defaultQuestions];
    }
    
    console.log('Final categoryQuestions length:', categoryQuestions.length); // Debug log
    
    setFormData({
      id: category.id,
      name: category.id,
      displayName: category.name,
      icon: '📦',
      questions: categoryQuestions
    });
    setView('edit');
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Er du sikker på, at du vil slette denne kategori?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Delete from product_categories table
      const { error } = await supabase
        .from('product_categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      // Delete associated keywords
      const { error: keywordError } = await supabase
        .from('available_keywords')
        .delete()
        .eq('category', categoryId);

      if (keywordError) {
        console.warn('Could not delete keywords:', keywordError);
      }

      // Note: We don't automatically drop the table as it might contain data
      console.log(`Category ${categoryId} deleted. Consider manually dropping table if no longer needed.`);

      await fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Der opstod en fejl ved sletning af kategori');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!formData.name || !formData.displayName) {
      setError('Navn og visningsnavn er påkrævet');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const categoryData = {
        id: formData.name.toLowerCase().replace(/\s+/g, '_'),
        name: formData.displayName,
        questions: formData.questions,
        icon: formData.icon
      };

      if (view === 'create') {
        // Check if category with this ID already exists
        const { data: existingCategories, error: checkError } = await supabase
          .from('product_categories')
          .select('id')
          .limit(1)
          .eq('id', categoryData.id);

        if (checkError) {
          throw checkError;
        }

        if (existingCategories && existingCategories.length > 0) {
          setError(`En kategori med det tekniske navn "${categoryData.id}" eksisterer allerede. Vælg venligst et andet navn.`);
          return;
        }

        // Create the category
        const { error } = await supabase
          .from('product_categories')
          .insert([categoryData]);

        if (error) throw error;

        // Add keywords to available_keywords
        await updateAvailableKeywords();

        // Create form and recommendation components
        await createFormComponent(categoryData.id, formData.displayName, formData.questions);
        await createRecommendationComponent(categoryData.id, formData.displayName);

        // Update App.tsx with new routes
        await updateAppRoutes(categoryData.id, formData.displayName);

        alert(`Kategori "${formData.displayName}" oprettet succesfuldt!\n- Ny tabel "${categoryData.id}" er oprettet\n- ${getTotalKeywords()} nøgleord er tilføjet\n- Produkter vil automatisk få genereret nøgleord`);
      } else {
        const { error: updateError } = await supabase
          .from('product_categories')
          .update({ 
            name: formData.displayName,
            questions: formData.questions,
            icon: formData.icon
          })
          .eq('id', formData.id);

        if (updateError) throw updateError;

        await updateAvailableKeywords();
        await updateProductKeywords();

        alert(`Kategori "${formData.displayName}" opdateret succesfuldt!\n- Nøgleord er opdateret\n- Eksisterende produkter er opdateret`);
      }

      await fetchCategories();
      setView('list');
    } catch (err) {
      console.error('Error saving category:', err);
      setError(`Der opstod en fejl ved gemning af kategori: ${err instanceof Error ? err.message : 'Ukendt fejl'}`);
    } finally {
      setLoading(false);
    }
  };

  const createFormComponent = async (categoryId: string, displayName: string, questions: Question[]) => {
    const componentName = categoryId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    const formContent = generateFormComponent(componentName, displayName, questions);
    
    // In a real implementation, you would save this to the file system
    // For now, we'll log it so you can manually create the file
    console.log(`Create file: src/components/${componentName}Form.tsx`);
    console.log(formContent);
  };

  const createRecommendationComponent = async (categoryId: string, displayName: string) => {
    const componentName = categoryId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    const recommendationContent = generateRecommendationComponent(componentName, displayName);
    
    // In a real implementation, you would save this to the file system
    console.log(`Create file: src/components/${componentName}Recommendations.tsx`);
    console.log(recommendationContent);
  };

  const updateAppRoutes = async (categoryId: string, displayName: string) => {
    const componentName = categoryId.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    console.log(`Add to App.tsx imports:`);
    console.log(`import ${componentName}Form from './components/${componentName}Form.tsx';`);
    console.log(`import ${componentName}Recommendations from './components/${componentName}Recommendations.tsx';`);
    console.log(`Add to categories array: { id: '${categoryId}', name: '${displayName}', icon: '${formData.icon}' }`);
    console.log(`Add routes: <Route path="/${categoryId}" element={<${componentName}Form />} />`);
    console.log(`<Route path="/${categoryId}/recommendations" element={<${componentName}Recommendations />} />`);
  };

  const generateFormComponent = (componentName: string, displayName: string, questions: Question[]) => {
    return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignatureDialog from './SignatureDialog';

export type ${componentName}FormData = {
  keywords: string[];
};

type FormState = {
${questions.map(q => `  ${q.key}: string | null;`).join('\n')}
};

function ${componentName}Form() {
  const navigate = useNavigate();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [formState, setFormState] = useState<FormState>({
${questions.map(q => `    ${q.key}: null,`).join('\n')}
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
    navigate('/${componentName.toLowerCase()}/recommendations', { state: { keywords } });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find ${displayName.toLowerCase()}</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
${questions.map((question, index) => `
            {/* ${question.label} */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                ${question.label}
              </label>
              <div className="grid grid-cols-${question.options.length <= 2 ? '2' : question.options.length <= 4 ? '2' : '1'} gap-3">
${question.options.map(option => `                <button
                  type="button"
                  onClick={() => handleOptionSelect('${question.key}', '${option.value}')}
                  className={\`p-3 rounded-lg border \${
                    isOptionSelected('${question.key}', '${option.value}')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }\`}
                >
                  ${option.label}
                </button>`).join('\n')}
              </div>
            </div>`).join('\n')}

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
          category="${componentName.toLowerCase()}"
          responses={getResponses()}
        />
      </div>
    </div>
  );
}

export default ${componentName}Form;`;
  };

  const generateRecommendationComponent = (componentName: string, displayName: string) => {
    return `import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ${componentName}FormData } from './${componentName}Form';

type ${componentName} = {
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
};

type ${componentName}WithMatches = ${componentName} & {
  matchCount: number;
};

function ${componentName}Recommendations() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state as ${componentName}FormData;
  const [recommendations, setRecommendations] = useState<${componentName}WithMatches[]>([]);
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
        const { data: products, error } = await supabase
          .from('all_products')
          .select('*')
          .eq('product_type', '${componentName.toLowerCase()}');

        if (error) {
          throw error;
        }

        const scoredProducts = (products as ${componentName}[])
          .map(product => {
            const matchingKeywords = product.keywords.filter(k => formData.keywords.includes(k));
            return {
              ...product,
              matchCount: matchingKeywords.length
            };
          })
          .filter(({ matchCount }) => matchCount > 0);

        // Sort by match count first, then by price within each tier
        const budgetProducts = scoredProducts
          .filter(m => m.tier === 'budget')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const midProducts = scoredProducts
          .filter(m => m.tier === 'mid')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);
        
        const premiumProducts = scoredProducts
          .filter(m => m.tier === 'premium')
          .sort((a, b) => b.matchCount - a.matchCount || a.price - b.price);

        const recommendations = [
          budgetProducts[0],
          midProducts[0],
          premiumProducts[0]
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
        className={\`w-5 h-5 \${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }\`}
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
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl text-red-600">{error}</p>
          <button
            onClick={() => navigate('/${componentName.toLowerCase()}')}
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
          <p className="text-xl text-gray-600">Ingen produkter fundet der matcher dine kriterier</p>
          <button
            onClick={() => navigate('/${componentName.toLowerCase()}')}
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
          onClick={() => navigate('/${componentName.toLowerCase()}')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til spørgsmål
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dine anbefalede ${displayName.toLowerCase()}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.tier === 'budget' ? 'Budget' :
                   product.tier === 'mid' ? 'Mid-range' :
                   'Premium'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.matchCount} nøgleord matcher
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-gray-600">{product.rating}/5</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {product.price.toLocaleString('da-DK')} kr.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Nøglefunktioner:</h4>
                  <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="text-gray-600">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Se pris hos {product.store} <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ${componentName}Recommendations;`;
  };
  const createCategoryTable = async (categoryId: string) => {
    try {
      // Create the SQL for the new table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${categoryId} (
          id text PRIMARY KEY,
          name text NOT NULL,
          price integer NOT NULL,
          image text NOT NULL,
          energy_class text NOT NULL,
          capacity integer NOT NULL,
          features text[] NOT NULL,
          rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
          link text NOT NULL,
          store text NOT NULL,
          description text NOT NULL,
          keywords text[] NOT NULL,
          tier text NOT NULL CHECK (tier = ANY (ARRAY['budget'::text, 'mid'::text, 'premium'::text])),
          created_at timestamptz DEFAULT now(),
          updated_at timestamptz DEFAULT now()
        );

        -- Enable RLS
        ALTER TABLE ${categoryId} ENABLE ROW LEVEL SECURITY;

        -- Add RLS policies
        CREATE POLICY "Allow public read access" ON ${categoryId} FOR SELECT TO public USING (true);
        CREATE POLICY "Allow public insert access" ON ${categoryId} FOR INSERT TO public WITH CHECK (true);
        CREATE POLICY "Allow public update access" ON ${categoryId} FOR UPDATE TO public USING (true) WITH CHECK (true);
        CREATE POLICY "Allow public delete access" ON ${categoryId} FOR DELETE TO public USING (true);

        -- Add update trigger
        CREATE TRIGGER update_${categoryId}_updated_at 
          BEFORE UPDATE ON ${categoryId} 
          FOR EACH ROW 
          EXECUTE FUNCTION update_updated_at_column();

        -- Add change tracking trigger
        CREATE TRIGGER track_${categoryId}_changes 
          AFTER UPDATE ON ${categoryId} 
          FOR EACH ROW 
          EXECUTE FUNCTION track_product_changes();
      `;

      // Execute the SQL using the RPC function
      const { error } = await supabase.rpc('execute_sql', { sql_query: createTableSQL });
      
      if (error) {
        console.error('Error creating table:', error);
        // If RPC doesn't exist, we'll need to create it via migration
        throw new Error(`Kunne ikke oprette tabel: ${error.message}`);
      }
    } catch (err) {
      console.error('Error in createCategoryTable:', err);
      throw err;
    }
  };

  const getTotalKeywords = () => {
    return formData.questions.reduce((total, question) => total + question.options.length, 0);
  };

  const updateAvailableKeywords = async () => {
    try {
      // Collect all keywords from form data
      const allKeywords: { category: string; keyword: string }[] = [];
      formData.questions.forEach(question => {
        question.options.forEach(option => {
          allKeywords.push({
            category: question.key,
            keyword: option.value
          });
        });
      });

      // Insert all keywords
      if (allKeywords.length > 0) {
        const { error: insertError } = await supabase
          .from('available_keywords')
          .insert(allKeywords)
          .onConflict('category,keyword')
          .doNothing();

        if (insertError) throw insertError;
      }
    } catch (err) {
      console.error('Error updating available keywords:', err);
      throw err;
    }
  };

  const updateProductKeywords = async () => {
    try {
      // Get all products for this category
      const { data: products, error: fetchError } = await supabase
        .from('all_products')
        .select('id, keywords')
        .eq('product_type', formData.id);

      if (fetchError) throw fetchError;

      // Create mapping of old keywords to new keywords
      const keywordMapping = new Map();
      
      // Build the mapping from the form data
      formData.questions.forEach(question => {
        question.options.forEach(option => {
          // Map old keyword format to new keyword format
          const oldKeyword = option.value;
          const newKeyword = option.value; // This would be the updated value
          keywordMapping.set(oldKeyword, newKeyword);
        });
      });

      // Update each product's keywords
      for (const product of products || []) {
        const updatedKeywords = product.keywords.map(keyword => {
          return keywordMapping.get(keyword) || keyword;
        });

        // Insert keywords with onConflict to handle duplicates gracefully
        if (JSON.stringify(updatedKeywords) !== JSON.stringify(product.keywords)) {
          const { error: updateError } = await supabase
            .from('all_products')
            .update({ keywords: updatedKeywords })
            .eq('id', product.id);

          if (updateError) throw updateError;
        }
      }
    } catch (err) {
      console.error('Error updating product keywords:', err);
      throw err;
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      key: `question_${formData.questions.length + 1}`,
      label: '',
      options: [
        { value: 'option1', label: 'Mulighed 1' },
        { value: 'option2', label: 'Mulighed 2' }
      ]
    };
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  const deleteQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const addOption = (questionId: string) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question) return;

    const newOption: QuestionOption = {
      value: `option_${question.options.length + 1}`,
      label: `Mulighed ${question.options.length + 1}`
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption]
    });
  };

  const updateOption = (questionId: string, optionIndex: number, updates: Partial<QuestionOption>) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map((option, index) =>
      index === optionIndex ? { ...option, ...updates } : option
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.filter((_, index) => index !== optionIndex);
    updateQuestion(questionId, { options: updatedOptions });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {view === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Administrer Kategorier</h2>
              <button
                onClick={handleCreateCategory}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Opret Kategori
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Indlæser kategorier...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">ID: {category.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Rediger
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Slet
                      </button>
                    </div>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Ingen kategorier fundet
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {(view === 'create' || view === 'edit') && (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setView('list')}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Tilbage
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {view === 'create' ? 'Opret Kategori' : 'Rediger Kategori'}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Category Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Grundlæggende Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori Navn (teknisk)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="f.eks. washing_machine"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visningsnavn
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="f.eks. Vaskemaskine"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ikon (emoji)
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="🧺"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Spørgsmål</h3>
                  <button
                    onClick={addQuestion}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Tilføj Spørgsmål
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.questions.map((question, questionIndex) => (
                    <div key={question.id} className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 mr-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Spørgsmål {questionIndex + 1}
                          </label>
                          <input
                            type="text"
                            value={question.label}
                            onChange={(e) => updateQuestion(question.id, { label: e.target.value })}
                            placeholder="Indtast spørgsmål..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-shrink-0">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nøgle
                          </label>
                          <input
                            type="text"
                            value={question.key}
                            onChange={(e) => updateQuestion(question.id, { key: e.target.value })}
                            placeholder="question_key"
                            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={() => deleteQuestion(question.id)}
                          className="ml-2 p-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-700">Svarmuligheder</h4>
                          <button
                            onClick={() => addOption(question.id)}
                            className="flex items-center px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Tilføj
                          </button>
                        </div>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-3">
                              <input
                                type="text"
                                value={option.value}
                                onChange={(e) => updateOption(question.id, optionIndex, { value: e.target.value })}
                                placeholder="værdi"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => updateOption(question.id, optionIndex, { label: e.target.value })}
                                placeholder="Visningsnavn"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-4">
                              <input
                                type="text"
                                value={option.description || ''}
                                onChange={(e) => updateOption(question.id, optionIndex, { description: e.target.value })}
                                placeholder="Beskrivelse (valgfri)"
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={() => deleteOption(question.id, optionIndex)}
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveCategory}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {view === 'create' ? 'Opret Kategori' : 'Gem Ændringer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryManagementDialog;