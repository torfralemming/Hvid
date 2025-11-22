/*
  # Fix table creation permissions

  1. Changes
    - Create new RPC function with SECURITY DEFINER for table creation
    - Add proper error handling and validation
    - Use schema qualification
    - Drop existing function if it exists

  2. Security
    - Function runs with elevated privileges via SECURITY DEFINER
    - Input validation to prevent SQL injection
    - Schema qualification for security
*/

-- First drop the existing function if it exists
DROP FUNCTION IF EXISTS create_product_table(table_name text);

-- Create new function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION create_product_table(table_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  safe_table_name text;
BEGIN
  -- Validate input
  IF table_name !~ '^[a-zA-Z][a-zA-Z0-9_]*$' THEN
    RAISE EXCEPTION 'Invalid table name format. Use only letters, numbers, and underscores, starting with a letter.';
  END IF;

  -- Create safe table name
  safe_table_name := quote_ident(table_name);

  -- Create the table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS public.%I (
      id text PRIMARY KEY,
      name text NOT NULL,
      price integer NOT NULL,
      image text NOT NULL,
      energy_class text NOT NULL,
      capacity integer NOT NULL,
      features text[] NOT NULL,
      rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
      link text NOT NULL,
      store text NOT NULL,
      description text NOT NULL,
      keywords text[] NOT NULL,
      tier text NOT NULL CHECK (tier = ANY (ARRAY[''budget'', ''mid'', ''premium''])),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )', safe_table_name);

  -- Enable RLS
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', safe_table_name);

  -- Create updated_at trigger
  EXECUTE format('
    CREATE TRIGGER update_%I_updated_at 
    BEFORE UPDATE ON public.%I 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column()', safe_table_name, safe_table_name);

  -- Create product changes trigger
  EXECUTE format('
    CREATE TRIGGER track_%I_changes 
    AFTER UPDATE ON public.%I 
    FOR EACH ROW 
    EXECUTE FUNCTION track_product_changes()', safe_table_name, safe_table_name);

  -- Add RLS policies
  EXECUTE format('
    CREATE POLICY "Allow public read access" ON public.%I
    FOR SELECT TO public USING (true)', safe_table_name);

  EXECUTE format('
    CREATE POLICY "Allow public insert access" ON public.%I
    FOR INSERT TO public WITH CHECK (true)', safe_table_name);

  EXECUTE format('
    CREATE POLICY "Allow public update access" ON public.%I
    FOR UPDATE TO public USING (true) WITH CHECK (true)', safe_table_name);

  EXECUTE format('
    CREATE POLICY "Allow public delete access" ON public.%I
    FOR DELETE TO public USING (true)', safe_table_name);

EXCEPTION
  WHEN others THEN
    RAISE EXCEPTION 'Failed to create table %: %', table_name, SQLERRM;
END;
$$;