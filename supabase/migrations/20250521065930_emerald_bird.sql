/*
  # Create all_products table with comprehensive product data

  1. New Tables
    - `all_products` - A comprehensive table for all product types
      - Common fields for all product types
      - Type-specific fields as JSONB
      - Full text search capabilities

  2. Security
    - Enable RLS
    - Add policies for public access
*/

-- Create the all_products table
CREATE TABLE IF NOT EXISTS all_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  energy_class TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  features TEXT[] NOT NULL,
  rating NUMERIC NOT NULL CHECK (rating >= 0 AND rating <= 5),
  link TEXT NOT NULL,
  store TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('budget', 'mid', 'premium')),
  
  -- Type-specific fields stored as JSONB
  product_type TEXT NOT NULL,
  type_specific_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Common metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE all_products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON all_products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON all_products
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON all_products
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON all_products
  FOR DELETE
  TO public
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_all_products_updated_at
  BEFORE UPDATE ON all_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_all_products_product_type ON all_products (product_type);
CREATE INDEX idx_all_products_tier ON all_products (tier);
CREATE INDEX idx_all_products_price ON all_products (price);
CREATE INDEX idx_all_products_keywords ON all_products USING GIN (keywords);

-- Populate the table with washing machines
INSERT INTO all_products (
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
  tier,
  product_type,
  type_specific_data
) VALUES
  (
    'power-wm1001',
    'Samsung WW90T534DAW',
    4999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['EcoBubble™ teknologi', 'Smart Control+', 'Digital Inverter Motor', 'QuickWash'],
    4.5,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/samsung-ww90t534daw-vaskemaskine/p-1155653/',
    'Power',
    'En pålidelig vaskemaskine med god energieffektivitet og smart teknologi',
    ARRAY['family', 'almosteveryday', 'steamFunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam'],
    'budget',
    'washing_machine',
    '{"rpm": 1400, "annual_energy_consumption": 152, "annual_water_consumption": 10500}'
  ),
  (
    'power-wm1002',
    'LG F4WV308S6E',
    3999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    8,
    ARRAY['AI DD™ teknologi', '6 Motion Direct Drive', 'Steam™', 'TurboWash™'],
    4.3,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/lg-f4wv308s6e-vaskemaskine/p-1198754/',
    'Power',
    'Smart vaskemaskine med innovativ teknologi og god ydeevne',
    ARRAY['couple', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'ecowash', 'nosteam'],
    'budget',
    'washing_machine',
    '{"rpm": 1400, "annual_energy_consumption": 156, "annual_water_consumption": 10800}'
  ),
  (
    'power-wm1003',
    'Miele WWV980 WPS',
    12999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['TwinDos', 'PowerWash', 'SteamCare', 'SingleWash'],
    4.9,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/miele-wwv980-wps-vaskemaskine/p-1190287/',
    'Power',
    'Topmodellen fra Miele med alle tænkelige funktioner og højeste kvalitet',
    ARRAY['largefamily', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'miele', 'ecowash', 'Steam'],
    'premium',
    'washing_machine',
    '{"rpm": 1600, "annual_energy_consumption": 130, "annual_water_consumption": 9900}'
  ),
  (
    'power-wm2001',
    'AEG L8FEE965R',
    7499,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['ProSteam®', 'ÖKOMix', 'ProSense®', 'Inverter Motor', 'SoftPlus'],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-l8fee965r-vaskemaskine/p-1234567/',
    'Power',
    'Premium vaskemaskine med dampfunktion og ÖKOMix-teknologi for optimal vask',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam'],
    'premium',
    'washing_machine',
    '{"rpm": 1600, "annual_energy_consumption": 152, "annual_water_consumption": 10500}'
  ),
  (
    'power-wm2002',
    'Bosch WAV28MH9SN',
    8999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['i-DOS', 'Home Connect', '4D Wash System', 'AntiStain Plus', 'EcoSilence Drive'],
    4.6,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/bosch-wav28mh9sn-vaskemaskine/p-2345678/',
    'Power',
    'Intelligent vaskemaskine med automatisk dosering og app-styring',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam'],
    'premium',
    'washing_machine',
    '{"rpm": 1400, "annual_energy_consumption": 152, "annual_water_consumption": 11000}'
  ),
  (
    'power-wm2003',
    'Siemens WM14VEH9DN',
    9499,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['i-DOS', 'speedPack', 'Home Connect', 'Outdoor/Impregnering', 'antiVibration Design'],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/siemens-wm14veh9dn-vaskemaskine/p-3456789/',
    'Power',
    'Premium vaskemaskine med intelligent dosering og smart home-funktionalitet',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Siemens', 'PowerWash', 'Steam'],
    'premium',
    'washing_machine',
    '{"rpm": 1400, "annual_energy_consumption": 152, "annual_water_consumption": 10900}'
  );

-- Populate the table with dishwashers
INSERT INTO all_products (
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
  tier,
  product_type,
  type_specific_data
) VALUES
  (
    'power-dw1001',
    'Bosch Serie 4 SMV4HCX48E',
    5999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1064698/1064698_1_900x900_w_g.jpg',
    'C',
    13,
    ARRAY['EcoSilence Drive', 'ExtraDry', 'VarioDrawer', 'InfoLight', 'AquaStop'],
    4.5,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/bosch-serie-4-smv4hcx48e-integreret-opvaskemaskine/p-1064698/',
    'Power',
    'Støjsvag og energieffektiv opvaskemaskine med plads til 13 kuverter. Perfekt til mindre familier.',
    ARRAY['household-couple', 'glass-no', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-mid'],
    'mid',
    'dishwasher',
    '{"noise_level": 44, "place_settings": 13, "annual_energy_consumption": 74, "annual_water_consumption": 2660}'
  ),
  (
    'power-dw1002',
    'Siemens iQ500 SN65ZX49CE',
    8999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1157268/1157268_1_900x900_w_g.jpg',
    'C',
    14,
    ARRAY['Zeolith tørring', 'Home Connect', 'brilliantShine system', 'Silence program', 'emotionLight'],
    4.8,
    'https://www.power.dk/hvidevarer/opvaskemaskine/integrerbare-opvaskemaskiner/siemens-iq500-sn65zx49ce-integreret-opvaskemaskine/p-1157268/',
    'Power',
    'Premium opvaskemaskine med Zeolith-tørring og særlig skånsom behandling af glas.',
    ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-high'],
    'premium',
    'dishwasher',
    '{"noise_level": 42, "place_settings": 14, "annual_energy_consumption": 75, "annual_water_consumption": 2660}'
  );

-- Populate the table with ovens
INSERT INTO all_products (
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
  tier,
  product_type,
  type_specific_data
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
    'premium',
    'oven',
    '{"max_temperature": 275, "has_pyrolysis": true, "has_steam": true, "number_of_functions": 30}'
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
    'budget',
    'oven',
    '{"max_temperature": 275, "has_pyrolysis": false, "has_steam": false, "number_of_functions": 10}'
  );

-- Populate the table with refrigerators
INSERT INTO all_products (
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
  tier,
  product_type,
  type_specific_data
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
    'mid',
    'refrigerator',
    '{"freezer_capacity": 114, "refrigerator_capacity": 230, "no_frost": true, "climate_class": "SN-T", "noise_level": 35}'
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
    'premium',
    'refrigerator',
    '{"freezer_capacity": 124, "refrigerator_capacity": 260, "no_frost": true, "climate_class": "SN-T", "noise_level": 36}'
  );

-- Create views for each product type for easier querying
CREATE OR REPLACE VIEW washing_machines_view AS
SELECT 
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
  tier,
  (type_specific_data->>'rpm')::integer as rpm,
  (type_specific_data->>'annual_energy_consumption')::integer as annual_energy_consumption,
  (type_specific_data->>'annual_water_consumption')::integer as annual_water_consumption,
  created_at,
  updated_at
FROM all_products
WHERE product_type = 'washing_machine';

CREATE OR REPLACE VIEW dishwashers_view AS
SELECT 
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
  tier,
  (type_specific_data->>'noise_level')::integer as noise_level,
  (type_specific_data->>'place_settings')::integer as place_settings,
  (type_specific_data->>'annual_energy_consumption')::integer as annual_energy_consumption,
  (type_specific_data->>'annual_water_consumption')::integer as annual_water_consumption,
  created_at,
  updated_at
FROM all_products
WHERE product_type = 'dishwasher';

CREATE OR REPLACE VIEW ovens_view AS
SELECT 
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
  tier,
  (type_specific_data->>'max_temperature')::integer as max_temperature,
  (type_specific_data->>'has_pyrolysis')::boolean as has_pyrolysis,
  (type_specific_data->>'has_steam')::boolean as has_steam,
  (type_specific_data->>'number_of_functions')::integer as number_of_functions,
  created_at,
  updated_at
FROM all_products
WHERE product_type = 'oven';

CREATE OR REPLACE VIEW refrigerators_view AS
SELECT 
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
  tier,
  (type_specific_data->>'freezer_capacity')::integer as freezer_capacity,
  (type_specific_data->>'refrigerator_capacity')::integer as refrigerator_capacity,
  (type_specific_data->>'no_frost')::boolean as no_frost,
  type_specific_data->>'climate_class' as climate_class,
  (type_specific_data->>'noise_level')::integer as noise_level,
  created_at,
  updated_at
FROM all_products
WHERE product_type = 'refrigerator';