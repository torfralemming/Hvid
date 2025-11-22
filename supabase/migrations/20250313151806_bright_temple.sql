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
    - Add policy for authenticated insert access
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
    ('noise', 'quiet'),
    ('noise', 'normalnoise'),
    ('noise', 'noisefree'),
    ('noise', 'loudok'),
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