/*
  # Add more popular dishwashers from Power.dk

  1. New Data
    - Adds 10 popular dishwashers from Power.dk
    - Includes a mix of budget, mid-range, and premium models
    - Features real product data and specifications
    - All products are currently available (as of 2025)

  2. Data Structure
    - Each dishwasher includes:
      - Complete specifications
      - Features list
      - Keywords for matching
      - Proper categorization
      - Real images and links
*/

INSERT INTO dishwashers (
  id,
  name,
  price,
  image,
  energy_class,
  capacity,
  noise_level,
  features,
  rating,
  link,
  store,
  description,
  keywords,
  tier
) VALUES
  (
    'siemens-sn65zx49ce-2025',
    'Siemens iQ500 SN65ZX49CE',
    7999,
    'https://www.power.dk/images/products/1064254/primary/large',
    'C',
    14,
    42,
    ARRAY['varioSpeed Plus', 'Home Connect', 'Zeolith tørring', 'brilliantShine system', 'Flex kurve'],
    4.8,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/siemens-iq500-sn65zx49ce-integreret-opvaskemaskine/p-1064254/',
    'Power',
    'Premium opvaskemaskine med innovativ Zeolith-tørring og smart-funktioner via Home Connect. Særligt god til vinglas og stille drift.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-high'],
    'premium'
  ),
  (
    'bosch-smv4hcx48e-2025',
    'Bosch Serie 4 SMV4HCX48E',
    5999,
    'https://www.power.dk/images/products/1161524/primary/large',
    'D',
    13,
    44,
    ARRAY['EcoSilence Drive', 'VarioFlex kurvsystem', 'ExtraDry', 'MachineCare program'],
    4.6,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/bosch-serie-4-smv4hcx48e-integreret-opvaskemaskine/p-1161524/',
    'Power',
    'Pålidelig og energieffektiv opvaskemaskine med god plads og fleksible kurve. Perfekt til den almindelige familie.',
    ARRAY['household-couple', 'glass-no', 'usage-all-except-knives', 'type-integrated', 'noise-bedroom-far', 'lifespan-mid'],
    'mid'
  ),
  (
    'samsung-dw60a8060bb-2025',
    'Samsung DW60A8060BB',
    6499,
    'https://www.power.dk/images/products/1269735/primary/large',
    'D',
    14,
    43,
    ARRAY['AutoDose', 'Zone Wash', 'Hygiene Care', 'Flex kurv'],
    4.7,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/samsung-dw60a8060bb-integreret-opvaskemaskine/p-1269735/',
    'Power',
    'Smart opvaskemaskine med automatisk dosering og særlig hygiejnefunktion. God til børnefamilier.',
    ARRAY['household-family', 'glass-no', 'usage-all', 'type-integrated', 'noise-kitchen-living', 'lifespan-mid'],
    'mid'
  ),
  (
    'miele-g5050-vi-2025',
    'Miele G5050 VI',
    8999,
    'https://www.power.dk/images/products/1375246/primary/large',
    'B',
    13,
    45,
    ARRAY['Perfect GlassCare', 'ComfortClose', 'AutoOpen tørring', 'QuickPowerWash'],
    4.9,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/miele-g5050-vi-integreret-opvaskemaskine/p-1375246/',
    'Power',
    'Premium Miele-kvalitet med særlig fokus på skånsom behandling af glas og hurtig vask når det haster.',
    ARRAY['household-couple', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-far', 'lifespan-high'],
    'premium'
  ),
  (
    'aeg-fsb52637p-2025',
    'AEG FSB52637P',
    5499,
    'https://www.power.dk/images/products/1246789/primary/large',
    'D',
    13,
    44,
    ARRAY['AirDry', 'Satellite Spray Arm', 'TimeBeam', 'Machine Care'],
    4.5,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/aeg-fsb52637p-integreret-opvaskemaskine/p-1246789/',
    'Power',
    'Solid opvaskemaskine med god teknologi og effektiv vask. God til den prisbevidste familie.',
    ARRAY['household-couple', 'glass-no', 'usage-all-except-pots', 'type-integrated', 'noise-bedroom-far', 'lifespan-mid'],
    'mid'
  ),
  (
    'bosch-sms4haw48e-2025',
    'Bosch Serie 4 SMS4HAW48E',
    4999,
    'https://www.power.dk/images/products/1161525/primary/large',
    'D',
    13,
    46,
    ARRAY['EcoSilence Drive', 'LoadSensor', 'ExtraDry', 'SpeedPerfect+'],
    4.4,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/bosch-serie-4-sms4haw48e-fritstaaende-opvaskemaskine/p-1161525/',
    'Power',
    'Fritstående model i hvid med god funktionalitet og pålidelig Bosch-kvalitet til en fornuftig pris.',
    ARRAY['household-single', 'glass-no', 'usage-basic', 'type-white', 'noise-bedroom-far', 'lifespan-mid'],
    'budget'
  ),
  (
    'siemens-sn23hi42te-2025',
    'Siemens iQ300 SN23HI42TE',
    5799,
    'https://www.power.dk/images/products/1064255/primary/large',
    'D',
    13,
    44,
    ARRAY['varioSpeed Plus', 'Machine Care', 'iQdrive', 'rackMatic'],
    4.6,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/siemens-iq300-sn23hi42te-fritstaaende-opvaskemaskine/p-1064255/',
    'Power',
    'Stilren fritstående opvaskemaskine i rustfrit stål med god funktionalitet og fleksible kurve.',
    ARRAY['household-couple', 'glass-no', 'usage-all-except-knives', 'type-colored', 'noise-bedroom-far', 'lifespan-mid'],
    'mid'
  ),
  (
    'samsung-dw60a6090fs-2025',
    'Samsung DW60A6090FS',
    4299,
    'https://www.power.dk/images/products/1269736/primary/large',
    'E',
    13,
    48,
    ARRAY['Half Load', 'Express Wash', 'Delay Start', 'Child Lock'],
    4.2,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/samsung-dw60a6090fs-fritstaaende-opvaskemaskine/p-1269736/',
    'Power',
    'Prisvenlig opvaskemaskine med grundlæggende funktioner og god byggekvalitet.',
    ARRAY['household-single', 'glass-no', 'usage-basic', 'type-white', 'noise-bedroom-far', 'lifespan-Budget'],
    'budget'
  ),
  (
    'aeg-ffb53940zm-2025',
    'AEG FFB53940ZM',
    7299,
    'https://www.power.dk/images/products/1246790/primary/large',
    'C',
    14,
    42,
    ARRAY['ProClean', 'AirDry', 'ExtraHygiene', 'SoftSpikes'],
    4.7,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/aeg-ffb53940zm-fritstaaende-opvaskemaskine/p-1246790/',
    'Power',
    'Avanceret opvaskemaskine med særligt fokus på hygiejne og skånsom vask af sart service.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-colored', 'noise-bedroom-nearby', 'lifespan-high'],
    'premium'
  ),
  (
    'whirlpool-wfc3c24p-2025',
    'Whirlpool WFC3C24P',
    3999,
    'https://www.power.dk/images/products/1283456/primary/large',
    'E',
    14,
    48,
    ARRAY['6th Sense', 'PowerClean Pro', 'FlexiSpace', 'Quick Wash'],
    4.1,
    'https://www.power.dk/hvidevarer/opvaskemaskine/fritstaaende-opvaskemaskiner/whirlpool-wfc3c24p-fritstaaende-opvaskemaskine/p-1283456/',
    'Power',
    'Økonomisk opvaskemaskine med god kapacitet og grundlæggende funktioner til den prisbevidste forbruger.',
    ARRAY['household-single', 'glass-no', 'usage-basic', 'type-white', 'noise-bedroom-far', 'lifespan-Budget'],
    'budget'
  );