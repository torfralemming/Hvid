/*
  # Add new washing machines from Power.dk

  1. New Data
    - Adding 5 new washing machines from Power.dk
    - Each machine includes:
      - Complete specifications
      - Features list
      - Keywords for matching
      - Tier categorization based on price and features
*/

INSERT INTO washing_machines (
  id,
  name,
  price,
  image,
  energy_class,
  capacity,
  rpm,
  features,
  rating,
  link,
  store,
  description,
  keywords,
  tier
) VALUES
  (
    'lg-p4y5eyw6wy',
    'LG P4Y5EYW6WY',
    7999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/2150419/2150419_1_900x900_w_g.jpg',
    'A',
    10.5,
    1600,
    ARRAY[
      'AI DD™ teknologi',
      'TurboWash™ 360°',
      'Steam+™',
      'Smart ThinQ™',
      'Inverter Direct Drive',
      'Allergy Care',
      '10 års motorgaranti'
    ],
    4.8,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/lg-p4y5eyw6wy-vaskemaskine/p-2150419/',
    'Power',
    'Premium vaskemaskine med AI-teknologi og stor kapacitet. Perfekt til store familier med behov for effektiv og skånsom vask.',
    ARRAY['household-large-family', 'efficiency-very-economic', 'duration-normal', 'frequency-daily'],
    'premium'
  ),
  (
    'grundig-gw9i91041a',
    'Grundig GW9I91041A',
    4999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3178307/3178307_1_900x900_w_g.jpg',
    'B',
    9,
    1400,
    ARRAY[
      'ProSmart™ Inverter Motor',
      'AquaWave™ Technology',
      'Pet Hair Removal',
      'Hygiene+',
      'Quick Wash'
    ],
    4.3,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/grundig-gw9i91041a-vaskemaskine/p-3178307/',
    'Power',
    'Pålidelig vaskemaskine med god energieffektivitet og særlig funktion til fjernelse af dyrehår.',
    ARRAY['household-couple', 'efficiency-economic', 'duration-quick', 'frequency-frequent'],
    'mid'
  ),
  (
    'grundig-gr5500',
    'Grundig GR5500 GWP4105415W',
    3499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3104803/3104803_1_900x900_w_g.jpg',
    'C',
    8,
    1400,
    ARRAY[
      'Inverter Motor',
      'Quick Wash',
      'Anti-krøl',
      'LED Display',
      'Hygiene 20°C'
    ],
    4.1,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/grundig-gr5500-gwp4105415w-vaskemaskine/p-3104803/',
    'Power',
    'Prisvenlig vaskemaskine med grundlæggende funktioner og god byggekvalitet.',
    ARRAY['household-single', 'efficiency-standard', 'duration-normal', 'frequency-weekly'],
    'budget'
  ),
  (
    'aeg-7000-lr742px4q',
    'AEG 7000 Serie LR742PX4Q',
    6999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3398460/3398460_1_900x900_w_g.jpg',
    'A',
    9,
    1400,
    ARRAY[
      'ProSteam®',
      'ProSense®',
      'ÖKOMix',
      'SoftPlus',
      'Inverter Motor',
      'Silent System'
    ],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-7000-serie-lr742px4q-vaskemaskine/p-3398460/',
    'Power',
    'Avanceret vaskemaskine med dampfunktion og intelligent dosering. Særligt god til sarte tekstiler.',
    ARRAY['household-family', 'efficiency-very-economic', 'duration-eco', 'frequency-frequent'],
    'premium'
  );