/*
  # Fix permissions for create_product_table function

  1. Changes
    - Grant execute permission on create_product_table function to authenticated users
    - Grant create on schema public to authenticated users
    - Grant usage on schema public to authenticated users

  2. Security
    - Limited to authenticated users only
    - Specific function and schema permissions
*/

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION create_product_table(text) TO authenticated;

-- Grant create permission on the schema
GRANT CREATE ON SCHEMA public TO authenticated;

-- Grant usage permission on the schema
GRANT USAGE ON SCHEMA public TO authenticated;