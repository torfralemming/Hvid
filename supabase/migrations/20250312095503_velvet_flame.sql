/*
  # Update washing machine keywords for frequency

  1. Changes
    - Update keywords to use new 'almosteveryday' keyword instead of 'everyday' for machines that are suitable for 4-6 times per week use
    - Maintain all other keywords as they are
*/

UPDATE washing_machines
SET keywords = array_replace(keywords, 'everyday', 'almosteveryday')
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