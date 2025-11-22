/*
  # Create refrigerators table if not exists and import data

  1. Changes
    - Drop existing table and policies if they exist
    - Create new table with all required columns
    - Add RLS and policies
    - Import initial refrigerator data
*/

-- Drop existing table and policies if they exist
DROP TABLE IF EXISTS refrigerators CASCADE;

-- Create refrigerators table
CREATE TABLE refrigerators (
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
  tier text NOT NULL CHECK (tier IN ('budget', 'mid', 'premium')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE refrigerators ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON refrigerators
  FOR SELECT
  TO public
  USING (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_refrigerators_updated_at
  BEFORE UPDATE ON refrigerators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO refrigerators (id, name, price, image, energy_class, capacity, features, rating, link, store, description, keywords, tier)
VALUES
  ('samsung-rb34t632esaef', 'Samsung RB34T632ESA/EF', 6999, 'https://www.power.dk/images/products/1064254/primary/large', 'E', 344, ARRAY['SpaceMax™', 'NoFrost', 'Digital Inverter', 'Metal Cooling', 'LED Display'], 4.6, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/samsung-rb34t632esaef-koelefryseskab/p-1064254/', 'Power', 'Rummeligt køle/fryseskab med NoFrost og smart teknologi', ARRAY['family', 'weeklyshopping', 'meatdairy', 'energysaving', 'bigfreezer', 'quiet', 'standarddoor', 'nosmart', 'premiumdesign', 'standardfit'], 'mid'),
  ('lg-gbb92staxp', 'LG GBB92STAXP', 9999, 'https://www.power.dk/images/products/1161524/primary/large', 'D', 384, ARRAY['DoorCooling+™', 'LinearCooling™', 'Smart ThinQ™', 'Fresh Balancer™', 'Metal Fresh™'], 4.8, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/lg-gbb92staxp-koelefryseskab/p-1161524/', 'Power', 'Premium køle/fryseskab med smart teknologi og optimal friskholdelse', ARRAY['largefamily', 'dailyshopping', 'vegstorage', 'performance', 'bigfreezer', 'quiet', 'standarddoor', 'smartcontrol', 'premiumdesign', 'standardfit'], 'premium'),
  ('bosch-kgn36vwea', 'Bosch KGN36VWEA', 5499, 'https://www.power.dk/images/products/1269735/primary/large', 'E', 308, ARRAY['VitaFresh', 'NoFrost', 'LED belysning', 'EasyAccess', 'SuperCooling'], 4.5, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/bosch-kgn36vwea-koelefryseskab/p-1269735/', 'Power', 'Energieffektivt køle/fryseskab med god plads og smart indretning', ARRAY['couple', 'weeklyshopping', 'vegstorage', 'energysaving', 'smallfreezer', 'normalnoise', 'standarddoor', 'nosmart', 'standardwhite', 'standardfit'], 'mid'),
  ('gram-kf-3295-93', 'Gram KF 3295-93', 3999, 'https://www.power.dk/images/products/1375246/primary/large', 'F', 295, ARRAY['FreshZone', 'Automatisk afrimning', 'Vendbare døre', 'Glashylder'], 4.2, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/gram-kf-3295-93-koelefryseskab/p-1375246/', 'Power', 'Prisvenligt køle/fryseskab med grundlæggende funktioner', ARRAY['single', 'onceshopping', 'readymeals', 'lowprice', 'smallfreezer', 'normalnoise', 'standarddoor', 'nosmart', 'standardwhite', 'slimfit'], 'budget'),
  ('siemens-ks36vaxep', 'Siemens KS36VAXEP', 7499, 'https://www.power.dk/images/products/1246789/primary/large', 'E', 346, ARRAY['hyperFresh Plus', 'LED belysning', 'SuperCooling', 'EasyAccess', 'TouchControl'], 4.7, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/siemens-ks36vaxep-koelefryseskab/p-1246789/', 'Power', 'Elegant køle/fryseskab med avancerede køle- og opbevaringsfunktioner', ARRAY['family', 'weeklyshopping', 'vegstorage', 'performance', 'nofreezer', 'quiet', 'standarddoor', 'smartscreen', 'premiumdesign', 'standardfit'], 'premium'),
  ('whirlpool-w5-921c-ox', 'Whirlpool W5 921C OX', 4999, 'https://www.power.dk/images/products/1161525/primary/large', 'E', 371, ARRAY['6th Sense', 'FreshControl', 'StopFrost', 'LED belysning'], 4.3, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/whirlpool-w5-921c-ox-koelefryseskab/p-1161525/', 'Power', 'Rummeligt køle/fryseskab med god temperaturkontrol', ARRAY['couple', 'weeklyshopping', 'meatdairy', 'normalenergy', 'smallfreezer', 'normalnoise', 'standarddoor', 'nosmart', 'standardwhite', 'standardfit'], 'budget'),
  ('miele-kfn-28132-d-ws', 'Miele KFN 28132 D ws', 8999, 'https://www.power.dk/images/products/1064255/primary/large', 'D', 304, ARRAY['DynaCool', 'NoFrost', 'ComfortClean', 'LED belysning', 'DuplexCool'], 4.9, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/miele-kfn-28132-d-ws-koelefryseskab/p-1064255/', 'Power', 'Premium kvalitet med optimal køling og lang holdbarhed', ARRAY['couple', 'dailyshopping', 'meatdairy', 'performance', 'bigfreezer', 'quiet', 'standarddoor', 'nosmart', 'premiumdesign', 'standardfit'], 'premium'),
  ('electrolux-lnt7me34g2', 'Electrolux LNT7ME34G2', 11999, 'https://www.power.dk/images/products/1161526/primary/large', 'E', 360, ARRAY['TwinTech NoFrost', 'CustomFlex', 'MultiFlow', 'FastFreeze', 'Water Dispenser'], 4.7, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/electrolux-lnt7me34g2-koelefryseskab/p-1161526/', 'Power', 'Luksuriøst køle/fryseskab med vanddispenser og fleksibel indretning', ARRAY['family', 'dailyshopping', 'drinksnacks', 'performance', 'bigfreezer', 'quiet', 'wateronly', 'smartcontrol', 'premiumdesign', 'largefit'], 'premium'),
  ('samsung-rs68a8840b1', 'Samsung RS68A8840B1', 13999, 'https://www.power.dk/images/products/1283456/primary/large', 'E', 609, ARRAY['SpaceMax™', 'Triple Cooling', 'Plumbed Ice & Water', 'WiFi Connected', 'Metal Cooling'], 4.8, 'https://www.power.dk/hvidevarer/koeleskab/side-by-side-koeleskab/samsung-rs68a8840b1-american-koeleskab/p-1283456/', 'Power', 'Stort amerikansk køle/fryseskab med is- og vanddispenser', ARRAY['largefamily', 'bulkshopping', 'drinksnacks', 'performance', 'bigfreezer', 'quiet', 'waterice', 'smartcontrol', 'premiumdesign', 'largefit'], 'premium'),
  ('gorenje-nrk6192ew4', 'Gorenje NRK6192EW4', 4499, 'https://www.power.dk/images/products/1246790/primary/large', 'F', 329, ARRAY['AdaptTech', 'NoFrost Plus', 'CrispZone', 'LED belysning'], 4.1, 'https://www.power.dk/hvidevarer/koeleskab/koele-fryseskab/gorenje-nrk6192ew4-koelefryseskab/p-1246790/', 'Power', 'Prisvenligt køle/fryseskab med god plads', ARRAY['couple', 'onceshopping', 'readymeals', 'lowprice', 'smallfreezer', 'loudok', 'standarddoor', 'nosmart', 'standardwhite', 'standardfit'], 'budget');