/*
  # Add AEG 8000 Series washing machine

  1. New Data
    - Adding AEG 8000 Series LR844PX6Q washing machine from Power.dk
    - Including complete specifications and features
    - Keywords for matching with user preferences
    - Premium tier categorization based on price and features
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
  'aeg-8000-lr844px6q',
  'AEG 8000 Serien LR844PX6Q',
  8499,
  'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3343209/3343209_1_900x900_w_g.jpg',
  'A',
  9,
  1400,
  ARRAY[
    'ProSteam®',
    'ProSense®',
    'ÖKOMix',
    'SoftPlus',
    'DirectSpray',
    'Silent System Plus',
    'Inverter Motor',
    'AutoDose'
  ],
  4.8,
  'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-8000-serien-lr844px6q-vaskemaskine/p-3343209/',
  'Power',
  'Premium vaskemaskine med automatisk dosering og avanceret dampteknologi. Særligt god til familier der ønsker det bedste inden for vasketeknologi og tekstilpleje.',
  ARRAY['household-family', 'efficiency-very-economic', 'duration-eco', 'frequency-daily'],
  'premium'
);