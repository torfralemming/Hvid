/*
  # Add TV support to database

  1. Changes
    - Add 'tv' to survey_responses category constraint
    - Create TV table structure in all_products
    - Add TV-specific type data structure

  2. Security
    - Maintain existing RLS policies
*/

-- Update survey_responses category constraint to include 'tv'
ALTER TABLE survey_responses 
DROP CONSTRAINT IF EXISTS survey_responses_category_check;

ALTER TABLE survey_responses 
ADD CONSTRAINT survey_responses_category_check 
CHECK (category IN ('washing_machine', 'dishwasher', 'oven', 'refrigerator', 'tv'));

-- Create TV view for easier querying
CREATE OR REPLACE VIEW tvs_view AS
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
  (type_specific_data->>'screen_size')::integer as screen_size,
  type_specific_data->>'resolution' as resolution,
  (type_specific_data->>'refresh_rate')::integer as refresh_rate,
  created_at,
  updated_at
FROM all_products
WHERE product_type = 'tv';

-- Insert sample TV data
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
  type_specific_data,
  created_at,
  updated_at
) VALUES
  (
    'power-tv1001',
    'Samsung QE55Q80C',
    8999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    55,
    ARRAY['QLED', '4K', 'Smart TV', 'HDR10+', 'Quantum Processor 4K', 'Object Tracking Sound'],
    4.6,
    'https://www.power.dk/tv-og-lyd/tv/qled-tv/samsung-qe55q80c-qled-tv/p-1234567/',
    'Power',
    'Premium QLED TV med fremragende billedkvalitet og smart funktioner',
    ARRAY['QLED', '55-65', 'SMART TV', '120 HZ', 'Smart tv', 'Premium', 'QLED', 'QLED'],
    'premium',
    'tv',
    '{"screen_size": 55, "resolution": "4K", "refresh_rate": 120}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1002',
    'LG OLED55C3',
    12999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    55,
    ARRAY['OLED', '4K', 'webOS', 'Dolby Vision', 'α9 Gen6 AI Processor', 'Perfect Black'],
    4.8,
    'https://www.power.dk/tv-og-lyd/tv/oled-tv/lg-oled55c3-oled-tv/p-2345678/',
    'Power',
    'Premium OLED TV med perfekt sort og uendelig kontrast',
    ARRAY['OLED', '55-65', 'SMART TV', '120 HZ', 'Smart tv', 'Premium', 'OLED', 'OLED'],
    'premium',
    'tv',
    '{"screen_size": 55, "resolution": "4K", "refresh_rate": 120}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1003',
    'Sony KD-43X75WL',
    4999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    43,
    ARRAY['LED', '4K', 'Google TV', 'HDR10', 'X1 Processor', 'Triluminos Display'],
    4.3,
    'https://www.power.dk/tv-og-lyd/tv/led-tv/sony-kd-43x75wl-led-tv/p-3456789/',
    'Power',
    'Solid LED TV med Google TV og god billedkvalitet til prisen',
    ARRAY['LED', '43-55', 'SMART TV', '60 HZ', 'Google TV', 'Low Budget', 'LED', 'LED'],
    'budget',
    'tv',
    '{"screen_size": 43, "resolution": "4K", "refresh_rate": 60}'::jsonb,
    now(),
    now()
  );