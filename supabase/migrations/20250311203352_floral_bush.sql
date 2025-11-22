/*
  # Import initial dishwashers

  1. Data Import
    - Adding 10 dishwashers from Power.dk
    - Including various price ranges and features
    - Balanced selection across different tiers (budget, mid, premium)

  2. Data Structure
    - Each dishwasher includes:
      - Full specifications
      - Features list
      - Keywords for matching
      - Tier categorization
*/

INSERT INTO dishwashers (id, name, price, image, energy_class, capacity, noise_level, features, rating, link, store, description, keywords, tier)
VALUES
  (
    'bosch-smv4hcx48e',
    'Bosch Serie 4 SMV4HCX48E',
    5999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064698/1064698_1_900x900_w_g.jpg',
    'C',
    13,
    44,
    ARRAY['EcoSilence Drive', 'ExtraDry', 'VarioDrawer', 'InfoLight', 'AquaStop'],
    4.5,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/bosch-serie-4-smv4hcx48e-integreret-opvaskemaskine/p-1064698/',
    'Power',
    'Støjsvag og energieffektiv opvaskemaskine med plads til 13 kuverter. Perfekt til mindre familier.',
    ARRAY['household-couple', 'glass-no', 'usage-flexibility', 'type-integrated', 'noise-LowDB', 'lifespan-mid'],
    'mid'
  ),
  (
    'siemens-sn65zx49ce',
    'Siemens iQ500 SN65ZX49CE',
    8999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1157268/1157268_1_900x900_w_g.jpg',
    'C',
    14,
    42,
    ARRAY['Zeolith tørring', 'Home Connect', 'brilliantShine system', 'Silence program', 'emotionLight'],
    4.8,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/siemens-iq500-sn65zx49ce-integreret-opvaskemaskine/p-1157268/',
    'Power',
    'Premium opvaskemaskine med Zeolith-tørring og særlig skånsom behandling af glas.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-flexibility', 'type-integrated', 'noise-LowDB', 'lifespan-high'],
    'premium'
  ),
  (
    'miele-g5050-vi',
    'Miele G 5050 VI',
    9499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1196355/1196355_1_900x900_w_g.jpg',
    'B',
    14,
    45,
    ARRAY['Perfect GlassCare', 'ComfortClose', 'AutoOpen tørring', 'QuickPowerWash', 'Bestikbakke'],
    4.9,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/miele-g-5050-vi-integreret-opvaskemaskine/p-1196355/',
    'Power',
    'Førsteklasses opvaskemaskine med særlig fokus på skånsom behandling af glas og hurtig vask.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-flexibility', 'type-integrated', 'noise-LowDB', 'lifespan-high'],
    'premium'
  ),
  (
    'aeg-fsb52637p',
    'AEG FSB52637P',
    5499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064701/1064701_1_900x900_w_g.jpg',
    'D',
    13,
    46,
    ARRAY['AirDry', 'SatelliteSprayArm', 'QuickSelect', 'Machine Care', 'ExtraHygiene'],
    4.3,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/aeg-fsb52637p-integreret-opvaskemaskine/p-1064701/',
    'Power',
    'Pålidelig opvaskemaskine med god plads og effektiv rengøring.',
    ARRAY['household-couple', 'glass-no', 'usage-flexibility', 'type-integrated', 'noise-regularDB', 'lifespan-mid'],
    'mid'
  ),
  (
    'bosch-sms4haw48e',
    'Bosch Serie 4 SMS4HAW48E',
    4999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064697/1064697_1_900x900_w_g.jpg',
    'D',
    13,
    46,
    ARRAY['EcoSilence Drive', 'ExtraDry', 'VarioDrawer', 'LoadSensor', 'AquaStop'],
    4.2,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/bosch-serie-4-sms4haw48e-opvaskemaskine/p-1064697/',
    'Power',
    'Fritstående opvaskemaskine med god funktionalitet til en fornuftig pris.',
    ARRAY['household-couple', 'glass-no', 'usage-NoFlexibility', 'type-regular', 'noise-regularDB', 'lifespan-Budget'],
    'budget'
  ),
  (
    'samsung-dw60a6090bb',
    'Samsung DW60A6090BB',
    3999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1157270/1157270_1_900x900_w_g.jpg',
    'E',
    13,
    48,
    ARRAY['Half Load', 'Express vask', 'Hygiejne program', 'Justerbar overkurv', 'LED display'],
    4.0,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/samsung-dw60a6090bb-opvaskemaskine/p-1157270/',
    'Power',
    'Prisvenlig opvaskemaskine med grundlæggende funktioner og god kapacitet.',
    ARRAY['household-single', 'glass-no', 'usage-NoFlexibility', 'type-regular', 'noise-regularDB', 'lifespan-Budget'],
    'budget'
  ),
  (
    'siemens-sn23hw60ce',
    'Siemens iQ300 SN23HW60CE',
    5999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1157269/1157269_1_900x900_w_g.jpg',
    'D',
    13,
    44,
    ARRAY['varioSpeed Plus', 'Machine Care', 'iQdrive', 'aquaStop', 'Silence program'],
    4.4,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/siemens-iq300-sn23hw60ce-opvaskemaskine/p-1157269/',
    'Power',
    'Støjsvag og pålidelig opvaskemaskine med gode programmer til forskellige behov.',
    ARRAY['household-couple', 'glass-no', 'usage-flexibility', 'type-regular', 'noise-LowDB', 'lifespan-mid'],
    'mid'
  ),
  (
    'miele-g7100-sc',
    'Miele G 7100 SC',
    11999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1196356/1196356_1_900x900_w_g.jpg',
    'B',
    14,
    43,
    ARRAY['Perfect GlassCare', '3D MultiFlex bestikskuffe', 'AutoOpen', 'QuickPowerWash', 'Extra Quiet'],
    4.9,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/miele-g-7100-sc-opvaskemaskine/p-1196356/',
    'Power',
    'Topmodellen fra Miele med maksimal komfort og optimal beskyttelse af service.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-flexibility', 'type-regular', 'noise-LowDB', 'lifespan-high'],
    'premium'
  ),
  (
    'aeg-ffb53940zm',
    'AEG FFB53940ZM',
    6499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064700/1064700_1_900x900_w_g.jpg',
    'D',
    14,
    44,
    ARRAY['AirDry', 'SatelliteSprayArm', 'TimeBeam', 'ExtraHygiene', 'AutoSense'],
    4.5,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/aeg-ffb53940zm-opvaskemaskine/p-1064700/',
    'Power',
    'Avanceret opvaskemaskine med god plads og innovative funktioner.',
    ARRAY['household-family', 'glass-no', 'usage-flexibility', 'type-regular', 'noise-LowDB', 'lifespan-mid'],
    'mid'
  ),
  (
    'bosch-sms6zdi48e',
    'Bosch Serie 6 SMS6ZDI48E',
    7999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064696/1064696_1_900x900_w_g.jpg',
    'C',
    14,
    42,
    ARRAY['PerfectDry', 'Home Connect', 'ExtraDry', 'EmotionLight', 'SuperSilence'],
    4.7,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/bosch-serie-6-sms6zdi48e-opvaskemaskine/p-1064696/',
    'Power',
    'Smart opvaskemaskine med WiFi og fremragende tørreresultater.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-flexibility', 'type-regular', 'noise-LowDB', 'lifespan-high'],
    'premium'
  );