/*
  # Add product_type to available_keywords table

  1. Changes
    - Add `product_type` column to `available_keywords` table
    - Update existing keywords with their product_type
    - Add check constraint for valid product types

  2. Data Migration
    - Set product_type for washing machine keywords
    - Set product_type for dishwasher keywords
    - Set product_type for refrigerator keywords
    - Set product_type for oven keywords
*/

-- Add product_type column
ALTER TABLE available_keywords
ADD COLUMN IF NOT EXISTS product_type text;

-- Add check constraint for valid product types
ALTER TABLE available_keywords
DROP CONSTRAINT IF EXISTS valid_product_type;

ALTER TABLE available_keywords
ADD CONSTRAINT valid_product_type
CHECK (product_type IN ('washing_machine', 'dishwasher', 'refrigerator', 'oven', 'tv'));

-- Update washing machine keywords
UPDATE available_keywords
SET product_type = 'washing_machine'
WHERE category IN ('washFrequency', 'cleanClothes', 'clothesCare', 'detergent', 'brand', 'washDuration', 'shirts');

-- Update dishwasher keywords (household, glass, usage, type, noise, lifespan for dishwasher)
UPDATE available_keywords
SET product_type = 'dishwasher'
WHERE category IN ('glass', 'type')
   OR (category = 'household' AND keyword IN ('single', 'couple', 'family'))
   OR (category = 'usage' AND keyword IN ('all', 'all-except-knives', 'basic', 'all-except-pots'))
   OR (category = 'noise' AND keyword IN ('bedroom-nearby', 'bedroom-far', 'kitchen-living'))
   OR (category = 'lifespan' AND keyword IN ('Budget', 'mid', 'high'));

-- Update refrigerator keywords
UPDATE available_keywords
SET product_type = 'refrigerator'
WHERE category IN ('shopping', 'storage', 'energy', 'freezer', 'dispenser', 'smart', 'design', 'size')
   OR (category = 'household' AND keyword = 'largefamily');

-- For washing machines that also use household
UPDATE available_keywords
SET product_type = 'washing_machine'
WHERE category = 'household'
  AND keyword IN ('single', 'couple', 'family', 'largefamily')
  AND product_type IS NULL;

-- Drop the unique constraint and recreate it with product_type
ALTER TABLE available_keywords
DROP CONSTRAINT IF EXISTS unique_category_keyword;

ALTER TABLE available_keywords
ADD CONSTRAINT unique_category_keyword_product
UNIQUE (category, keyword, product_type);
