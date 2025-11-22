/*
  # Remove admin functionality

  1. Changes
    - Drop admins table
    - Drop related policies and triggers
    - Clean up auth.users table
*/

-- Drop the admins table and all its dependencies
DROP TABLE IF EXISTS public.admins CASCADE;

-- Clean up auth.users table
DELETE FROM auth.users WHERE email LIKE '%@example.com';

-- Remove any remaining admin-related policies from survey_responses
DROP POLICY IF EXISTS "Admins can read all survey responses" ON survey_responses;