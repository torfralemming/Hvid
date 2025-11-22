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

-- Create product_changes table for tracking updates
CREATE TABLE IF NOT EXISTS product_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text REFERENCES products(id),
  field_name text NOT NULL,
  old_value text,
  new_value text,
  changed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_changes ENABLE ROW LEVEL SECURITY;

-- Create policies for product_categories
CREATE POLICY "product_categories_read_policy"
  ON product_categories
  FOR SELECT
  TO public
  USING (true);

-- Create policies for products
CREATE POLICY "products_read_policy"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "products_insert_policy"
  ON products
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policies for product_changes
CREATE POLICY "product_changes_read_policy"
  ON product_changes
  FOR SELECT
  TO public
  USING (true);

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories if they don't exist
INSERT INTO product_categories (id, name)
SELECT 'washing_machines', 'Vaskemaskiner'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE id = 'washing_machines');

INSERT INTO product_categories (id, name)
SELECT 'dishwashers', 'Opvaskemaskiner'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE id = 'dishwashers');

INSERT INTO product_categories (id, name)
SELECT 'ovens', 'Ovne'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE id = 'ovens');

INSERT INTO product_categories (id, name)
SELECT 'refrigerators', 'Køleskabe'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE id = 'refrigerators');