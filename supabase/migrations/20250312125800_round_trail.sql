/*
  # Create admin user and authentication

  1. Changes
    - Create admin user in auth.users
    - Add admin record to public.admins table
    - Set up proper email authentication
*/

-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create the admin user in auth.users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'Behov'
  ) THEN
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
      confirmation_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'Behov',
      crypt('Behov', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      'authenticated',
      encode(gen_random_bytes(32), 'hex')
    );
  END IF;
END $$;

-- Add admin record to public.admins table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.admins WHERE email = 'Behov'
  ) THEN
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
  END IF;
END $$;