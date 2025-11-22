/*
  # Add Samsung Bespoke WW11DB7B34GWU3 washing machine

  1. New Data
    - Adding Samsung Bespoke washing machine from Power.dk
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
  'samsung-bespoke-ww11db7b34gwu3',
  'Samsung Bespoke WW11DB7B34GWU3',
  7999,
  'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3199483/3199483_1_900x900_w_g.jpg',
  'A',
  11,
  1400,
  ARRAY[
    'AI EcoBubble™',
    'Auto Dispense',
    'SmartThings',
    'SpaceMax™',
    'Digital Inverter Motor',
    'Hygiene Steam',
    'QuickDrive™',
    'AddWash™'
  ],
  4.7,
  'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/samsung-bespoke-ww11db7b34gwu3-vaskemaskine/p-3199483/',
  'Power',
  'Premium Samsung Bespoke vaskemaskine med AI EcoBubble™-teknologi og stor kapacitet på 11 kg. Perfekt til store familier med behov for effektiv og skånsom vask.',
  ARRAY[
    'largefamily',
    'almosteveryday',
    'Steamfunc',
    'honeycomb-luxury',
    'Autodose',
    'Anybrand',
    'PowerWash',
    'Steam'
  ],
  'premium'
);