/*
  # Add admin capabilities for product management

  1. Changes
    - Add UPDATE policies to all product tables
    - Add trigger for tracking changes
    - Add change history table
*/

-- Create change history table
CREATE TABLE IF NOT EXISTS product_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  product_id text NOT NULL,
  field_name text NOT NULL,
  old_value text,
  new_value text,
  changed_at timestamptz DEFAULT now(),
  signature text NOT NULL
);

-- Enable RLS on change history
ALTER TABLE product_changes ENABLE ROW LEVEL SECURITY;

-- Add policy for reading change history
CREATE POLICY "Allow public read access to changes"
  ON product_changes
  FOR SELECT
  TO public
  USING (true);

-- Add policy for inserting changes
CREATE POLICY "Allow public insert access to changes"
  ON product_changes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add UPDATE policies to product tables
CREATE POLICY "Allow public update access"
  ON washing_machines
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON dishwashers
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON ovens
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON refrigerators
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create function to track changes
CREATE OR REPLACE FUNCTION track_product_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- Track changes for each column
    IF NEW.keywords IS DISTINCT FROM OLD.keywords THEN
      INSERT INTO product_changes (
        table_name,
        product_id,
        field_name,
        old_value,
        new_value,
        signature
      ) VALUES (
        TG_TABLE_NAME,
        NEW.id,
        'keywords',
        array_to_string(OLD.keywords, ','),
        array_to_string(NEW.keywords, ','),
        'system'
      );
    END IF;

    IF NEW.price IS DISTINCT FROM OLD.price THEN
      INSERT INTO product_changes (
        table_name,
        product_id,
        field_name,
        old_value,
        new_value,
        signature
      ) VALUES (
        TG_TABLE_NAME,
        NEW.id,
        'price',
        OLD.price::text,
        NEW.price::text,
        'system'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to track changes
CREATE TRIGGER track_washing_machine_changes
  AFTER UPDATE ON washing_machines
  FOR EACH ROW
  EXECUTE FUNCTION track_product_changes();

CREATE TRIGGER track_dishwasher_changes
  AFTER UPDATE ON dishwashers
  FOR EACH ROW
  EXECUTE FUNCTION track_product_changes();

CREATE TRIGGER track_oven_changes
  AFTER UPDATE ON ovens
  FOR EACH ROW
  EXECUTE FUNCTION track_product_changes();

CREATE TRIGGER track_refrigerator_changes
  AFTER UPDATE ON refrigerators
  FOR EACH ROW
  EXECUTE FUNCTION track_product_changes();