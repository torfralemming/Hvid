/*
  # Fix admin user authentication

  1. Changes
    - Clean up existing admin user
    - Create new admin user with all required fields
    - Set up proper authentication settings
    - Add admin record to public.admins table
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- First, clean up any existing admin user to avoid conflicts
DELETE FROM auth.users WHERE email = 'Behov';
DELETE FROM public.admins WHERE email = 'Behov';

-- Create the admin user with proper authentication settings
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token,
  recovery_token,
  last_sign_in_at,
  is_sso_user,
  email_change_token_current,
  email_change_confirm_status
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'Behov',
  crypt('Behov', gen_salt('bf')),
  now(),
  now(),
  now(),
  jsonb_build_object(
    'provider', 'email',
    'providers', array['email']
  ),
  '{}'::jsonb,
  false,
  'authenticated',
  'authenticated',
  encode(gen_random_bytes(32), 'hex'),
  encode(gen_random_bytes(32), 'hex'),
  now(),
  false,
  encode(gen_random_bytes(32), 'hex'),
  0
);

-- Add admin record to public.admins table
INSERT INTO public.admins (
  id,
  email,
  password_hash
)
SELECT
  id,
  email,
  encrypted_password
FROM auth.users
WHERE email = 'Behov';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, anon, authenticated, service_role;