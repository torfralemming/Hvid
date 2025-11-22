/*
  # Create product tables for scraped data

  1. New Tables
    - `product_categories`
      - `id` (text, primary key)
      - `name` (text)
      - `created_at` (timestamptz)
      
    - `products`
      - `id` (text, primary key)
      - `category_id` (text, foreign key)
      - `name` (text)
      - `price` (integer)
      - `image` (text)
      - `energy_class` (text)
      - `capacity` (integer)
      - `features` (text[])
      - `specifications` (jsonb)
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
    - Add policies for public read access
    - Add policies for public insert/update access
*/

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  category_id text REFERENCES product_categories(id),
  name text NOT NULL,
  price integer NOT NULL,
  image text NOT NULL,
  energy_class text NOT NULL,
  capacity integer NOT NULL,
  features text[] NOT NULL,
  specifications jsonb NOT NULL DEFAULT '{}'::jsonb,
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
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for product_categories
CREATE POLICY "Allow public read access"
  ON product_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON product_categories
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policies for products
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON products
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON products
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO product_categories (id, name)
VALUES
  ('washing_machines', 'Vaskemaskiner'),
  ('dishwashers', 'Opvaskemaskiner'),
  ('ovens', 'Ovne'),
  ('refrigerators', 'Køleskabe');