/*
  # Add default admin user

  1. Changes
    - Add default admin user with credentials:
      - Username: Behov
      - Password: Behov
*/

-- Insert admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Behov',
  crypt('Behov', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Add admin record
INSERT INTO public.admins (
  id,
  email,
  password_hash,
  created_at,
  updated_at
) 
SELECT 
  id,
  email,
  encrypted_password,
  created_at,
  updated_at
FROM auth.users 
WHERE email = 'Behov';