/*
  # Add Miele W1 WWB380 WCS washing machine

  1. New Data
    - Adding Miele W1 WWB380 WCS washing machine from Power.dk
    - Including complete specifications and features
    - Keywords for matching with user preferences
    - Premium tier categorization based on price and brand
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
  'miele-w1-wwb380-wcs',
  'Miele W1 WWB380 WCS 125 Edition',
  7499,
  'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3184629/3184629_1_900x900_w_g.jpg',
  'A',
  8,
  1400,
  ARRAY[
    'ProfiEco Motor',
    'CapDosing',
    'SingleWash',
    'TwinDos',
    'PowerWash',
    'Watercontrol-System',
    'Honeycomb tromle'
  ],
  4.8,
  'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/miele-w1-wwb380-wcs-125-edition-vaskemaskine/p-3184629/',
  'Power',
  'Premium Miele-vaskemaskine med avancerede funktioner som TwinDos og PowerWash. Særligt god til mindre husstande der ønsker høj kvalitet og skånsom vask.',
  ARRAY['household-couple', 'efficiency-very-economic', 'duration-eco', 'frequency-frequent'],
  'premium'
);