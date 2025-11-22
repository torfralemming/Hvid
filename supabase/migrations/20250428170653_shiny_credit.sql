/*
  # Add missing policies to product tables

  1. Changes
    - Add missing policies to products table
    - Add missing policies to product-specific tables
    - Skip existing policies to avoid conflicts
*/

-- Add policies to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
      ON products
      FOR DELETE
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access"
      ON products
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access"
      ON products
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Add policies to dishwashers table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'dishwashers' AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
      ON dishwashers
      FOR DELETE
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'dishwashers' AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access"
      ON dishwashers
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'dishwashers' AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access"
      ON dishwashers
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Add policies to ovens table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ovens' AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
      ON ovens
      FOR DELETE
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ovens' AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access"
      ON ovens
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'ovens' AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access"
      ON ovens
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Add policies to refrigerators table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refrigerators' AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
      ON refrigerators
      FOR DELETE
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refrigerators' AND policyname = 'Allow public update access'
  ) THEN
    CREATE POLICY "Allow public update access"
      ON refrigerators
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'refrigerators' AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access"
      ON refrigerators
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;