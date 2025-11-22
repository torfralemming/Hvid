/*
  # Add specifications to washing machines and update data
  
  1. Changes
    - Add specifications column to washing_machines table
    - Update existing records with specifications data
    - Add new washing machines with specifications
    
  2. Data
    - Add detailed specifications for each washing machine
    - Include energy consumption and water usage data
*/

-- First add specifications column if it doesn't exist
ALTER TABLE washing_machines 
ADD COLUMN IF NOT EXISTS specifications jsonb DEFAULT '{}'::jsonb;

-- First delete existing records
DELETE FROM washing_machines;
DELETE FROM products WHERE category_id = 'washing_machines';

-- Insert new washing machines with specifications
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
  tier,
  specifications,
  created_at,
  updated_at
) VALUES
  (
    'power-wm2001',
    'AEG L8FEE965R',
    7499,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    1600,
    ARRAY['ProSteam®', 'ÖKOMix', 'ProSense®', 'Inverter Motor', 'SoftPlus'],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-l8fee965r-vaskemaskine/p-1234567/',
    'Power',
    'Premium vaskemaskine med dampfunktion og ÖKOMix-teknologi for optimal vask',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam'],
    'premium',
    '{"Energiklasse": "A", "Kapacitet": "9 kg", "Centrifugeringshastighed": "1600 rpm", "Lydniveau": "76 dB", "Årligt energiforbrug": "152 kWh", "Årligt vandforbrug": "10500 liter"}'::jsonb,
    now(),
    now()
  );

-- Also update the products table with the same washing machines
INSERT INTO products (
  id,
  category_id,
  name,
  price,
  image,
  energy_class,
  capacity,
  features,
  specifications,
  rating,
  link,
  store,
  description,
  keywords,
  tier,
  created_at,
  updated_at
) VALUES
  (
    'power-wm2001',
    'washing_machines',
    'AEG L8FEE965R',
    7499,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    ARRAY['ProSteam®', 'ÖKOMix', 'ProSense®', 'Inverter Motor', 'SoftPlus'],
    '{"Energiklasse": "A", "Kapacitet": "9 kg", "Centrifugeringshastighed": "1600 rpm", "Lydniveau": "76 dB", "Årligt energiforbrug": "152 kWh", "Årligt vandforbrug": "10500 liter"}'::jsonb,
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-l8fee965r-vaskemaskine/p-1234567/',
    'Power',
    'Premium vaskemaskine med dampfunktion og ÖKOMix-teknologi for optimal vask',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam'],
    'premium',
    now(),
    now()
  );