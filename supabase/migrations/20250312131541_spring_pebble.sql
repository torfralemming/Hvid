/*
  # Create survey responses table

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key)
      - `category` (text) - Type of product (washing_machine, dishwasher, oven)
      - `question` (text) - The question that was asked
      - `answer` (text) - The user's answer
      - `signature` (text) - User's signature/name
      - `created_at` (timestamptz) - When the response was recorded

  2. Security
    - Enable RLS
    - Add policy for public insert access
    - Add policy for public read access

  3. Constraints
    - Category must be one of: washing_machine, dishwasher, oven
*/

-- Create the survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('washing_machine', 'dishwasher', 'oven')),
  question text NOT NULL,
  answer text NOT NULL,
  signature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert access
CREATE POLICY "Allow public insert access"
  ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON survey_responses
  FOR SELECT
  TO public
  USING (true);

-- Create index for faster category-based queries
CREATE INDEX survey_responses_category_idx ON survey_responses (category);

-- Create index for timestamp-based queries
CREATE INDEX survey_responses_created_at_idx ON survey_responses (created_at);