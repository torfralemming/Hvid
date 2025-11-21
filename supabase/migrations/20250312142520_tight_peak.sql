/*
  # Update survey_responses category constraint

  1. Changes
    - Add 'refrigerator' to the allowed categories in survey_responses table
*/

-- Drop the existing check constraint
ALTER TABLE survey_responses 
DROP CONSTRAINT IF EXISTS survey_responses_category_check;

-- Add the updated check constraint with 'refrigerator' category
ALTER TABLE survey_responses 
ADD CONSTRAINT survey_responses_category_check 
CHECK (category IN ('washing_machine', 'dishwasher', 'oven', 'refrigerator'));