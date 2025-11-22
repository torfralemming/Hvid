/*
  # Empty washing machine keywords

  1. Changes
    - Set keywords to empty array for all washing machines
*/

UPDATE washing_machines
SET keywords = ARRAY[]::text[];