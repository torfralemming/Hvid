/*
  # Add Grundig GR5500 washing machine

  1. New Data
    - Add new washing machine to the `washing_machines` table
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
  'grundig-gr5500-gwp696110w',
  'Grundig GR5500 GWP696110W',
  3999,
  'https://www.power.dk/images/h-7c6f2f5c9c9c3c3c3c3c3c3c3c3c3c3c/products/1171685/1171685_1_1600.jpg',
  'C',
  9,
  1600,
  ARRAY[
    'ProSmart™ Inverter Motor med 10 års garanti',
    'SteamCure™ dampteknologi',
    'Hurtigvask på 28 minutter',
    'Hygiejne+ program',
    'Allergivenligt program',
    'Natprogram med reduceret støj',
    'AquaWave™ tromlesystem',
    'LED display'
  ],
  4.3,
  'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/grundig-gr5500-gwp696110w-vaskemaskine/p-1171685/',
  'Power',
  'Denne Grundig vaskemaskine kombinerer effektiv vaskeevne med energibesparende teknologi. Med en kapacitet på 9 kg og maksimal centrifugeringshastighed på 1600 omdrejninger er den ideel til både små og store familier. Den innovative ProSmart™ Inverter Motor sikrer pålidelig drift og lavt energiforbrug.',
  ARRAY[
    'family',
    'couple',
    'everyday',
    'Steam',
    'PowerWash',
    'ecowash',
    'honeycomb-eco'
  ],
  'mid'
);