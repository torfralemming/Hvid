/*
  # Create execute_sql RPC function

  1. New Functions
    - `execute_sql` - Allows executing dynamic SQL from the application
    
  2. Security
    - Function is marked as SECURITY DEFINER to run with elevated privileges
    - Only allows specific DDL operations for safety
*/

CREATE OR REPLACE FUNCTION execute_sql(sql_query text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow CREATE TABLE, ALTER TABLE, CREATE POLICY, CREATE TRIGGER statements for safety
  IF sql_query ~* '^(CREATE TABLE|ALTER TABLE|CREATE POLICY|CREATE TRIGGER|CREATE INDEX)' THEN
    EXECUTE sql_query;
  ELSE
    RAISE EXCEPTION 'Only CREATE TABLE, ALTER TABLE, CREATE POLICY, CREATE TRIGGER, and CREATE INDEX statements are allowed';
  END IF;
END;
$$;