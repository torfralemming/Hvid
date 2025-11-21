/*
  # Update washing machine keywords for clothes care options

  1. Changes
    - Update 'honeycomb' keywords to be more specific:
      - 'honeycomb-luxury' for expensive clothes care
      - 'honeycomb-eco' for environmental care
    - Maintain all other keywords as they are
*/

UPDATE washing_machines
SET keywords = array_replace(keywords, 'honeycomb', 'honeycomb-luxury')
WHERE id IN (
  SELECT id FROM washing_machines 
  WHERE 'honeycomb' = ANY(keywords)
);

-- For machines that should have the eco-focused keyword
UPDATE washing_machines
SET keywords = array_append(keywords, 'honeycomb-eco')
WHERE id IN (
  'samsung-ww90t534daw',
  'samsung-ww90t686dlh',
  'lg-f4wv510s0e',
  'samsung-ww95ta046ae',
  'siemens-wm14ut69sn',
  'lg-f4v709s1e',
  'lg-p4y5eyw6wy',
  'aeg-7000-lr742px4q',
  'miele-w1-wwb380-wcs',
  'aeg-8000-lr844px6q'
);