/*
  # Create ovens table

  1. New Tables
    - `ovens`
      - `id` (text, primary key)
      - `name` (text)
      - `price` (integer)
      - `image` (text)
      - `energy_class` (text)
      - `capacity` (integer)
      - `features` (text[])
      - `rating` (numeric)
      - `link` (text)
      - `store` (text)
      - `description` (text)
      - `keywords` (text[])
      - `tier` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access

  3. Constraints
    - Rating between 0 and 5
    - Tier must be 'budget', 'mid', or 'premium'
*/

CREATE TABLE IF NOT EXISTS ovens (
  id text PRIMARY KEY,
  name text NOT NULL,
  price integer NOT NULL,
  image text NOT NULL,
  energy_class text NOT NULL,
  capacity integer NOT NULL,
  features text[] NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
  link text NOT NULL,
  store text NOT NULL,
  description text NOT NULL,
  keywords text[] NOT NULL,
  tier text NOT NULL CHECK (tier IN ('budget', 'mid', 'premium')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ovens ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON ovens
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_ovens_updated_at
  BEFORE UPDATE ON ovens
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();