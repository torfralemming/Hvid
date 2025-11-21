/*
  # Create available_keywords table

  1. New Tables
    - `available_keywords`
      - `id` (uuid, primary key)
      - `category` (text)
      - `keyword` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS available_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  keyword text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create unique constraint on category and keyword combination
ALTER TABLE available_keywords
ADD CONSTRAINT unique_category_keyword UNIQUE (category, keyword);

-- Enable Row Level Security
ALTER TABLE available_keywords ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON available_keywords
  FOR SELECT
  TO public
  USING (true);

-- Create policy for public insert access
CREATE POLICY "Allow public insert access"
  ON available_keywords
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert initial keywords
INSERT INTO available_keywords (category, keyword)
SELECT category, keyword
FROM (
  VALUES
    ('household', 'single'),
    ('household', 'couple'),
    ('household', 'family'),
    ('household', 'largefamily'),
    ('washFrequency', 'everyday'),
    ('washFrequency', 'almosteveryday'),
    ('washFrequency', 'weekly'),
    ('washFrequency', 'onceaweek'),
    ('cleanClothes', 'steamFunc'),
    ('cleanClothes', 'Steamfunc'),
    ('cleanClothes', 'nosteam'),
    ('clothesCare', 'honeycomb-luxury'),
    ('clothesCare', 'honeycomb-eco'),
    ('clothesCare', 'normaldrum'),
    ('detergent', 'Autodose'),
    ('detergent', 'autodose'),
    ('detergent', 'SelfDose'),
    ('detergent', 'selfdose'),
    ('brand', 'AEG'),
    ('brand', 'Siemens'),
    ('brand', 'miele'),
    ('brand', 'Electrolux'),
    ('brand', 'Anybrand'),
    ('washDuration', 'PowerWash'),
    ('washDuration', 'Speedwash'),
    ('washDuration', 'ecowash'),
    ('shirts', 'Steam'),
    ('shirts', 'nosteam'),
    ('glass', 'PerfectGlassCare'),
    ('glass', 'no'),
    ('usage', 'all'),
    ('usage', 'all-except-knives'),
    ('usage', 'basic'),
    ('usage', 'all-except-pots'),
    ('type', 'integrated'),
    ('type', 'white'),
    ('type', 'colored'),
    ('noise', 'bedroom-nearby'),
    ('noise', 'bedroom-far'),
    ('noise', 'kitchen-living'),
    ('lifespan', 'Budget'),
    ('lifespan', 'mid'),
    ('lifespan', 'high'),
    ('baking', 'DailyBaking'),
    ('baking', 'Steam'),
    ('baking', 'FrequentBaking'),
    ('baking', 'Nosteam'),
    ('sousvide', 'Sousvide'),
    ('sousvide', 'NoSousvide'),
    ('maintenance', 'Pyrolyse'),
    ('maintenance', 'Steamclean'),
    ('maintenance', 'nocleaning'),
    ('cooking_skill', 'ProChef'),
    ('cooking_skill', 'HobbyChef'),
    ('cooking_skill', 'LearningChef'),
    ('cooking_skill', 'Beginner'),
    ('heating_speed', 'slowheat'),
    ('heating_speed', 'MedHeat'),
    ('heating_speed', 'quickheat'),
    ('shopping', 'dailyshopping'),
    ('shopping', 'weeklyshopping'),
    ('shopping', 'onceshopping'),
    ('shopping', 'bulkshopping'),
    ('storage', 'meatdairy'),
    ('storage', 'vegstorage'),
    ('storage', 'readymeals'),
    ('storage', 'drinksnacks'),
    ('energy', 'energysaving'),
    ('energy', 'performance'),
    ('energy', 'normalenergy'),
    ('energy', 'lowprice'),
    ('freezer', 'bigfreezer'),
    ('freezer', 'smallfreezer'),
    ('freezer', 'nofreezer'),
    ('freezer', 'unsurefreezer'),
    ('dispenser', 'waterice'),
    ('dispenser', 'wateronly'),
    ('dispenser', 'noicedispenser'),
    ('dispenser', 'standarddoor'),
    ('smart', 'smartcontrol'),
    ('smart', 'smartscreen'),
    ('smart', 'nosmart'),
    ('smart', 'unsuretech'),
    ('design', 'premiumdesign'),
    ('design', 'integrated'),
    ('design', 'standardwhite'),
    ('design', 'anydesign'),
    ('size', 'slimfit'),
    ('size', 'standardfit'),
    ('size', 'largefit'),
    ('size', 'unsurefit')
) AS t(category, keyword)
ON CONFLICT (category, keyword) DO NOTHING;