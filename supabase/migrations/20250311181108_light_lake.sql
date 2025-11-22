/*
  # Create washing machines table

  1. New Tables
    - `washing_machines`
      - `id` (text, primary key) - Unique identifier for the machine
      - `name` (text) - Name of the washing machine
      - `price` (integer) - Price in DKK
      - `image` (text) - URL to the machine's image
      - `energy_class` (text) - Energy efficiency class
      - `capacity` (integer) - Capacity in kg
      - `rpm` (integer) - Revolutions per minute
      - `features` (text[]) - Array of features
      - `rating` (numeric) - Rating from 0-5
      - `link` (text) - Link to product page
      - `store` (text) - Store name
      - `description` (text) - Product description
      - `keywords` (text[]) - Array of matching keywords
      - `tier` (text) - Price tier (budget, mid, premium)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `washing_machines` table
    - Add policy for public read access
*/

-- Create the washing_machines table
CREATE TABLE IF NOT EXISTS washing_machines (
  id text PRIMARY KEY,
  name text NOT NULL,
  price integer NOT NULL,
  image text NOT NULL,
  energy_class text NOT NULL,
  capacity integer NOT NULL,
  rpm integer NOT NULL,
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
ALTER TABLE washing_machines ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON washing_machines
  FOR SELECT
  TO public
  USING (true);

-- Insert initial data
INSERT INTO washing_machines (
  id, name, price, image, energy_class, capacity, rpm, features,
  rating, link, store, description, keywords, tier
) VALUES
  (
    'samsung-ww90t534daw',
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
    ARRAY['household-family', 'efficiency-economic', 'duration-quick', 'frequency-frequent'],
    'budget'
  ),
  (
    'lg-f4wv308s6e',
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
    ARRAY['household-couple', 'efficiency-standard', 'duration-normal', 'frequency-weekly'],
    'budget'
  ),
  (
    'samsung-ww90t686dlh',
    'Samsung WW90T686DLH',
    5999,
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400&h=400',
    'A',
    9,
    1400,
    ARRAY['AI Control', 'Auto Dispense', 'Digital Inverter Motor', 'Steam Hygiene'],
    4.6,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/samsung-ww90t686dlh-vaskemaskine/p-1167890/',
    'Power',
    'Avanceret vaskemaskine med AI-styring og automatisk dosering',
    ARRAY['household-family', 'efficiency-economic', 'duration-normal', 'frequency-frequent'],
    'mid'
  ),
  (
    'miele-wwv980-wps',
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
    ARRAY['household-large-family', 'efficiency-very-economic', 'duration-eco', 'frequency-daily'],
    'premium'
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_washing_machines_updated_at
    BEFORE UPDATE ON washing_machines
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();