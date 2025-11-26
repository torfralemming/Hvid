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