/*
  # Add survey responses tracking

  1. Changes
    - Add trigger to store form responses in survey_responses table
    - Add function to handle response storage
*/

-- Create function to store survey responses
CREATE OR REPLACE FUNCTION store_survey_response()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO survey_responses (category, question, answer)
  VALUES (
    TG_ARGV[0],
    NEW.question,
    NEW.answer
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each form type
CREATE TRIGGER store_washing_machine_response
  AFTER INSERT ON washing_machines
  FOR EACH ROW
  EXECUTE FUNCTION store_survey_response('washing_machine');

CREATE TRIGGER store_dishwasher_response
  AFTER INSERT ON dishwashers
  FOR EACH ROW
  EXECUTE FUNCTION store_survey_response('dishwasher');

CREATE TRIGGER store_oven_response
  AFTER INSERT ON ovens
  FOR EACH ROW
  EXECUTE FUNCTION store_survey_response('oven');