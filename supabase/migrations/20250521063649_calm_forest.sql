/*
  # Add POWER.dk products to database

  1. New Data
    - Adding sample products from POWER.dk to each product category
    - Each product includes complete specifications and features
    - Keywords for matching with user preferences
    - Tier categorization based on price and features
*/

-- Add washing machines
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
    'power-wm1001',
    'Samsung WW90T534DAW',
    4999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    1400,
    ARRAY['EcoBubble™ teknologi', 'Smart Control+', 'Digital Inverter Motor', 'QuickWash'],
    4.5,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/samsung-ww90t534daw-vaskemaskine/p-1155653/',
    'Power',
    'En pålidelig vaskemaskine med god energieffektivitet og smart teknologi',
    ARRAY['household-family', 'washFrequency-almosteveryday', 'cleanClothes-steamFunc', 'clothesCare-honeycomb-luxury', 'detergent-Autodose', 'brand-Anybrand', 'washDuration-PowerWash', 'shirts-Steam'],
    'budget'
  ),
  (
    'power-wm1002',
    'LG F4WV308S6E',
    3999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    8,
    1400,
    ARRAY['AI DD™ teknologi', '6 Motion Direct Drive', 'Steam™', 'TurboWash™'],
    4.3,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/lg-f4wv308s6e-vaskemaskine/p-1198754/',
    'Power',
    'Smart vaskemaskine med innovativ teknologi og god ydeevne',
    ARRAY['household-couple', 'washFrequency-weekly', 'cleanClothes-nosteam', 'clothesCare-normaldrum', 'detergent-SelfDose', 'brand-Anybrand', 'washDuration-ecowash', 'shirts-nosteam'],
    'budget'
  ),
  (
    'power-wm1003',
    'Miele WWV980 WPS',
    12999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    1600,
    ARRAY['TwinDos', 'PowerWash', 'SteamCare', 'SingleWash'],
    4.9,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/miele-wwv980-wps-vaskemaskine/p-1190287/',
    'Power',
    'Topmodellen fra Miele med alle tænkelige funktioner og højeste kvalitet',
    ARRAY['household-largefamily', 'washFrequency-everyday', 'cleanClothes-Steamfunc', 'clothesCare-honeycomb-luxury', 'detergent-Autodose', 'brand-miele', 'washDuration-ecowash', 'shirts-Steam'],
    'premium'
  );

-- Add dishwashers
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
    'power-dw1001',
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
    ARRAY['household-couple', 'glass-no', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-mid'],
    'mid'
  ),
  (
    'power-dw1002',
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
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-high'],
    'premium'
  );

-- Add ovens
INSERT INTO ovens (
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
  tier
) VALUES
  (
    'power-ov1001',
    'Siemens iQ500 HB578ABS0S',
    7999,
    'https://www.power.dk/images/products/1064254/primary/large',
    'A',
    71,
    ARRAY['4D varmluft', 'Pyrolyse selvrens', 'CoolStart', 'LCD Display', 'Stegetermometer', '30 automatiske programmer'],
    4.7,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/siemens-iq500-hb578abs0s-indbygningsovn/p-1064254/',
    'Power',
    'Premium indbygningsovn med pyrolyse og avancerede funktioner til den kræsne kok',
    ARRAY['usage-Everyday', 'baking-FullSteam', 'maintenance-Pyrolyse', 'cooking_skill-ProChef', 'household_size-Family', 'heating_speed-quickheat'],
    'premium'
  ),
  (
    'power-ov1002',
    'Bosch Serie 4 HBA534BS0S',
    4499,
    'https://www.power.dk/images/products/1161524/primary/large',
    'A',
    71,
    ARRAY['3D varmluft', 'EcoClean Direct', '10 ovnfunktioner', 'LED display', 'Nem betjening'],
    4.3,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/bosch-serie-4-hba534bs0s-indbygningsovn/p-1161524/',
    'Power',
    'Pålidelig basismodel med god energieffektivitet og brugervenlig betjening',
    ARRAY['usage-NotEveryday', 'baking-Nosteam', 'maintenance-nocleaning', 'cooking_skill-AutoChef', 'household_size-Single', 'heating_speed-MedHeat'],
    'budget'
  );

-- Add refrigerators
INSERT INTO refrigerators (
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
  tier
) VALUES
  (
    'power-rf1001',
    'Samsung RB34T632ESA/EF',
    6999,
    'https://www.power.dk/images/products/1064254/primary/large',
    'E',
    344,
    ARRAY['SpaceMax™', 'NoFrost', 'Digital Inverter', 'Metal Cooling', 'LED Display'],
    4.6,
    'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/samsung-rb34t632esaef-koelefryseskab/p-1064254/',
    'Power',
    'Rummeligt køle/fryseskab med NoFrost og smart teknologi',
    ARRAY['household-family', 'shopping-weeklyshopping', 'storage-meatdairy', 'energy-energysaving', 'freezer-bigfreezer', 'noise-quiet', 'dispenser-standarddoor', 'smart-nosmart', 'design-premiumdesign', 'size-standardfit'],
    'mid'
  ),
  (
    'power-rf1002',
    'LG GBB92STAXP',
    9999,
    'https://www.power.dk/images/products/1161524/primary/large',
    'D',
    384,
    ARRAY['DoorCooling+™', 'LinearCooling™', 'Smart ThinQ™', 'Fresh Balancer™', 'Metal Fresh™'],
    4.8,
    'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/lg-gbb92staxp-koelefryseskab/p-1161524/',
    'Power',
    'Premium køle/fryseskab med smart teknologi og optimal friskholdelse',
    ARRAY['household-largefamily', 'shopping-dailyshopping', 'storage-vegstorage', 'energy-performance', 'freezer-bigfreezer', 'noise-quiet', 'dispenser-standarddoor', 'smart-smartcontrol', 'design-premiumdesign', 'size-standardfit'],
    'premium'
  );