/*
  # Add INSERT policies for product tables

  1. Changes
    - Add INSERT policies for all product tables
    - Allow public insert access
*/

-- Add INSERT policy for washing_machines
CREATE POLICY "Allow public insert access"
  ON washing_machines
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add INSERT policy for dishwashers
CREATE POLICY "Allow public insert access"
  ON dishwashers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add INSERT policy for ovens
CREATE POLICY "Allow public insert access"
  ON ovens
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Add INSERT policy for refrigerators
CREATE POLICY "Allow public insert access"
  ON refrigerators
  FOR INSERT
  TO public
  WITH CHECK (true);