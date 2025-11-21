/*
  # Add signature field to survey_responses table

  1. Changes
    - Add signature column to survey_responses table
    - Make signature field required
*/

ALTER TABLE survey_responses
ADD COLUMN signature text NOT NULL;