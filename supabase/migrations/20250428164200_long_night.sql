-- Create function to dynamically create product tables
CREATE OR REPLACE FUNCTION create_product_table(table_name text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create the new table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I (
      id text PRIMARY KEY,
      name text NOT NULL,
      price integer NOT NULL,
      image text NOT NULL,
      energy_class text NOT NULL,
      capacity integer NOT NULL,
      features text[] NOT NULL,
      specifications jsonb NOT NULL DEFAULT ''{}'',
      rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 5),
      link text NOT NULL,
      store text NOT NULL,
      description text NOT NULL,
      keywords text[] NOT NULL,
      tier text NOT NULL CHECK (tier IN (''budget'', ''mid'', ''premium'')),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )', table_name);

  -- Enable RLS
  EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', table_name);

  -- Create policies
  EXECUTE format('
    CREATE POLICY "Allow public read access" ON %I
    FOR SELECT TO public USING (true)', table_name);

  EXECUTE format('
    CREATE POLICY "Allow public insert access" ON %I
    FOR INSERT TO public WITH CHECK (true)', table_name);

  EXECUTE format('
    CREATE POLICY "Allow public update access" ON %I
    FOR UPDATE TO public USING (true) WITH CHECK (true)', table_name);

  -- Create updated_at trigger
  EXECUTE format('
    CREATE TRIGGER update_%I_updated_at
    BEFORE UPDATE ON %I
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column()', table_name, table_name);

  -- Create change tracking trigger
  EXECUTE format('
    CREATE TRIGGER track_%I_changes
    AFTER UPDATE ON %I
    FOR EACH ROW
    EXECUTE FUNCTION track_product_changes()', table_name, table_name);
END;
$$;