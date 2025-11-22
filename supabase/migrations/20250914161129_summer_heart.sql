/*
  # Add questions column to product_categories

  1. Changes
    - Add questions column to store form questions as JSONB
    - Add icon column for category icons
    - Update existing categories with empty questions array

  2. Security
    - Maintain existing RLS policies
*/

-- Add questions and icon columns to product_categories
ALTER TABLE product_categories 
ADD COLUMN IF NOT EXISTS questions JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT '📦';

-- Update existing categories with empty questions array if null
UPDATE product_categories 
SET questions = '[]'::jsonb 
WHERE questions IS NULL;