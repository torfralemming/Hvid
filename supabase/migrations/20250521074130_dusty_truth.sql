/*
  # Add two more washing machines to all_products table

  1. New Data
    - Adding two premium washing machines
    - Including complete specifications and features
    - Adding appropriate keywords for matching
*/

INSERT INTO all_products (
  id,
  name,
  price,
  image,
  energy_class,
  capacity,
  features,
  rating,
  link,
  store,
  description,
  keywords,
  tier,
  product_type,
  type_specific_data,
  created_at,
  updated_at
) VALUES
  (
    'power-wm3014',
    'AEG L9FEA69K',
    11999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY[
      'ProSteam®',
      'ÖKOMix',
      'ProSense®',
      'SoftWater Technology',
      'DirectSpray',
      'SoftPlus',
      'Inverter Motor',
      'Woolmark Green'
    ],
    4.9,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-l9fea69k-vaskemaskine/p-1234567/',
    'Power',
    'Premium vaskemaskine med SoftWater teknologi der blødgør vandet for optimal tøjpleje og ÖKOMix-teknologi for perfekt fordeling af vaskemiddel',
    ARRAY[
      'family',
      'almosteveryday',
      'Steamfunc',
      'honeycomb-luxury',
      'Autodose',
      'AEG',
      'PowerWash',
      'Steam'
    ],
    'premium',
    'washing_machine',
    '{
      "rpm": 1600,
      "annual_energy_consumption": 152,
      "annual_water_consumption": 10500
    }'::jsonb,
    now(),
    now()
  ),
  (
    'power-wm3015',
    'LG F6V1010WTSE',
    9999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    10,
    ARRAY[
      'AI DD™',
      'Steam+™',
      'TurboWash™ 360°',
      'Smart ThinQ™',
      'Direct Drive Motor',
      'Allergy Care',
      'ThinQ Care',
      'ezDispense™'
    ],
    4.8,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/lg-f6v1010wtse-vaskemaskine/p-2345678/',
    'Power',
    'Intelligent vaskemaskine med AI DD™-teknologi der analyserer tøjet og vælger det optimale vaskeprogram, samt ezDispense™ for automatisk dosering',
    ARRAY[
      'family',
      'almosteveryday',
      'Steamfunc',
      'honeycomb-luxury',
      'Autodose',
      'Anybrand',
      'PowerWash',
      'Steam'
    ],
    'premium',
    'washing_machine',
    '{
      "rpm": 1600,
      "annual_energy_consumption": 150,
      "annual_water_consumption": 9900
    }'::jsonb,
    now(),
    now()
  );