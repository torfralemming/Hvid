/*
  # Add AEG 5000-serie LS511P14P washing machine

  1. New Data
    - Adding AEG 5000-serie LS511P14P washing machine
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
  'aeg-ls511p14p',
  'AEG 5000-serie LS511P14P',
  4999,
  'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
  'A',
  11,
  1400,
  ARRAY[
    'ProSense®-teknologi',
    'SoftPlus',
    'Eco TimeSave',
    'OptiSense®',
    'Silent System',
    'LED-display'
  ],
  4.4,
  'https://www.power.dk/hvidevarer/vask-og-toer/vaskemaskiner/aeg-5000-serie-ls511p14p-vaskemaskine/p-1199876/',
  'Power',
  'Energieffektiv vaskemaskine med stor kapacitet og ProSense®-teknologi der automatisk justerer vasketid og vandforbrug',
  ARRAY[
    'household-large-family',
    'efficiency-economic',
    'duration-eco',
    'frequency-frequent'
  ],
  'mid'
);