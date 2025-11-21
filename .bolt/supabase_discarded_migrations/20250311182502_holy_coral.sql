/*
  # Add Samsung WW90T734DWH washing machine

  1. New Data
    - Adding Samsung WW90T734DWH washing machine from Power.dk
    - Including full specifications and features
    - Adding appropriate keywords for matching
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
) VALUES (
  'samsung-ww90t734dwh',
  'Samsung WW90T734DWH',
  4990,
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
  'A',
  9,
  1400,
  ARRAY[
    'AI Control',
    'EcoBubble™',
    'Digital Inverter Motor',
    'QuickDrive™',
    'Smart Control+',
    'AddWash™'
  ],
  4.5,
  'https://www.power.dk/x/p-3398458/',
  'Power',
  'Intelligent vaskemaskine med QuickDrive™-teknologi og smart styring via app',
  ARRAY[
    'household-family',
    'efficiency-very-economic',
    'duration-quick',
    'frequency-daily'
  ],
  'mid'
);