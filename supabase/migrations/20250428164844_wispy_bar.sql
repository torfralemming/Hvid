/*
  # Fix product categories RLS policies

  1. Changes
    - Add RLS policy for product_categories table to allow public insert access
    - Add RLS policy for product_categories table to allow public read access

  2. Security
    - Enable RLS on product_categories table
    - Add policies for public access
*/

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public insert access to categories"
ON product_categories
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read access to categories"
ON product_categories
FOR SELECT
TO public
USING (true);