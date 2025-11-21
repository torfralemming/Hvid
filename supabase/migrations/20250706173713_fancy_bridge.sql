/*
  # Add TV category to survey_responses and create TV view

  1. Changes
    - Update survey_responses category constraint to include 'tv'
    - Create TV view for easier querying
    - Add sample TV data to all_products table

  2. Data Structure
    - Each TV includes:
      - Complete specifications
      - Features list
      - Keywords for matching
      - Tier categorization
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
  ),
  (
    'power-tv1004',
    'Samsung QE65S95C',
    19999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    65,
    ARRAY['QD-OLED', '4K', 'Tizen', 'HDR10+', 'Neural Quantum Processor', 'Dolby Atmos'],
    4.9,
    'https://www.power.dk/tv-og-lyd/tv/oled-tv/samsung-qe65s95c-qd-oled-tv/p-4567890/',
    'Power',
    'Topklasse QD-OLED TV med revolutionerende billedkvalitet',
    ARRAY['QOLED', '65-75', 'SMART TV', '120 HZ', 'Smart tv', 'High end', 'QOLED', 'OLED'],
    'premium',
    'tv',
    '{"screen_size": 65, "resolution": "4K", "refresh_rate": 144}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1005',
    'Philips 75PUS8507',
    9999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    75,
    ARRAY['LED', '4K', 'Android TV', 'Ambilight', 'P5 Perfect Picture Engine', 'Dolby Vision'],
    4.5,
    'https://www.power.dk/tv-og-lyd/tv/led-tv/philips-75pus8507-led-tv/p-5678901/',
    'Power',
    'Stort LED TV med Ambilight og Android TV',
    ARRAY['LED', '75+', 'SMART TV', '60 HZ', 'Smart tv', 'Premium', 'LED', 'LED'],
    'mid',
    'tv',
    '{"screen_size": 75, "resolution": "4K", "refresh_rate": 60}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1006',
    'LG 65QNED86',
    11999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    65,
    ARRAY['QNED', '4K', 'webOS', 'Mini LED', 'α7 Gen5 AI Processor', 'Dolby Vision IQ'],
    4.7,
    'https://www.power.dk/tv-og-lyd/tv/qled-tv/lg-65qned86-qned-tv/p-6789012/',
    'Power',
    'Avanceret QNED TV med Mini LED-baggrundsbelysning',
    ARRAY['QLED', '65-75', 'SMART TV', '120 HZ', 'Smart tv', 'Premium', 'QLED', 'QLED'],
    'premium',
    'tv',
    '{"screen_size": 65, "resolution": "4K", "refresh_rate": 120}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1007',
    'TCL 55C745',
    5999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    55,
    ARRAY['QLED', '4K', 'Google TV', 'HDR Premium', 'Game Master Pro', 'Onkyo Sound'],
    4.4,
    'https://www.power.dk/tv-og-lyd/tv/qled-tv/tcl-55c745-qled-tv/p-7890123/',
    'Power',
    'Prisvenligt QLED TV med gaming-funktioner',
    ARRAY['QLED', '55-65', 'SMART TV', '120 HZ', 'Google TV', 'Low Budget', 'QLED', 'QLED'],
    'budget',
    'tv',
    '{"screen_size": 55, "resolution": "4K", "refresh_rate": 144}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1008',
    'Sony XR-65A95K',
    24999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    65,
    ARRAY['QD-OLED', '4K', 'Google TV', 'XR Processor', 'Acoustic Surface Audio+', 'BRAVIA CAM'],
    5.0,
    'https://www.power.dk/tv-og-lyd/tv/oled-tv/sony-xr-65a95k-qd-oled-tv/p-8901234/',
    'Power',
    'Sonys flagskib med QD-OLED teknologi og fremragende lyd',
    ARRAY['QOLED', '65-75', 'SMART TV', '120 HZ', 'Google TV', 'High end', 'QOLED', 'OLED'],
    'premium',
    'tv',
    '{"screen_size": 65, "resolution": "4K", "refresh_rate": 120}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1009',
    'Samsung QE85Q70C',
    19999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    85,
    ARRAY['QLED', '4K', 'Tizen', 'Quantum HDR', 'Motion Xcelerator Turbo+', 'Q-Symphony'],
    4.7,
    'https://www.power.dk/tv-og-lyd/tv/qled-tv/samsung-qe85q70c-qled-tv/p-9012345/',
    'Power',
    'Stort QLED TV med imponerende billedkvalitet',
    ARRAY['QLED', '75+', 'SMART TV', '120 HZ', 'Smart tv', 'Premium', 'QLED', 'QLED'],
    'premium',
    'tv',
    '{"screen_size": 85, "resolution": "4K", "refresh_rate": 120}'::jsonb,
    now(),
    now()
  ),
  (
    'power-tv1010',
    'Philips 50PUS8807',
    6999,
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400&h=400',
    'G',
    50,
    ARRAY['LED', '4K', 'Android TV', 'Ambilight', 'P5 Perfect Picture Engine', 'HDR10+'],
    4.5,
    'https://www.power.dk/tv-og-lyd/tv/led-tv/philips-50pus8807-led-tv/p-0123456/',
    'Power',
    'LED TV med Ambilight og god billedkvalitet',
    ARRAY['LED', '43-55', 'SMART TV', '60 HZ', 'Smart tv', 'Low Budget', 'LED', 'LED'],
    'mid',
    'tv',
    '{"screen_size": 50, "resolution": "4K", "refresh_rate": 60}'::jsonb,
    now(),
    now()
  );