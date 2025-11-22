/*
  # Update product keywords to match UI display

  1. Changes
    - Update washing machine keywords
    - Update dishwasher keywords
    - Update oven keywords
    - Update refrigerator keywords
    - Ensure all keywords match what's shown in the admin dashboard
*/

-- Update washing machines keywords
UPDATE washing_machines
SET keywords = ARRAY['single', 'everyday', 'steamFunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam']
WHERE id = 'samsung-ww90t534daw';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'ecowash', 'nosteam']
WHERE id = 'lg-f4wv308s6e';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam']
WHERE id = 'samsung-ww90t686dlh';

UPDATE washing_machines
SET keywords = ARRAY['largefamily', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'miele', 'ecowash', 'Steam']
WHERE id = 'miele-wwv980-wps';

UPDATE washing_machines
SET keywords = ARRAY['largefamily', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam']
WHERE id = 'lg-f4wv510s0e';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'ecowash', 'Steam']
WHERE id = 'samsung-ww95ta046ae';

UPDATE washing_machines
SET keywords = ARRAY['family', 'weekly', 'nosteam', 'honeycomb-luxury', 'SelfDose', 'Anybrand', 'PowerWash', 'nosteam']
WHERE id = 'bosch-wau28pb9sn';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Siemens', 'PowerWash', 'Steam']
WHERE id = 'siemens-wm14ut69sn';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'weekly', 'nosteam', 'honeycomb-luxury', 'SelfDose', 'AEG', 'ecowash', 'Steam']
WHERE id = 'aeg-l7fe86pro';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'Speedwash', 'nosteam']
WHERE id = 'whirlpool-ffb8248bvee';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Electrolux', 'Speedwash', 'nosteam']
WHERE id = 'electrolux-ew6f4r28w8';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam']
WHERE id = 'lg-f4v709s1e';

UPDATE washing_machines
SET keywords = ARRAY['family', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'Speedwash', 'nosteam']
WHERE id = 'samsung-ww90t534dae';

UPDATE washing_machines
SET keywords = ARRAY['family', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'ecowash', 'nosteam']
WHERE id = 'bosch-wgg244a0sn';

UPDATE washing_machines
SET keywords = ARRAY['largefamily', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam']
WHERE id = 'lg-p4y5eyw6wy';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'weekly', 'nosteam', 'honeycomb-luxury', 'SelfDose', 'Anybrand', 'Speedwash', 'nosteam']
WHERE id = 'grundig-gw9i91041a';

UPDATE washing_machines
SET keywords = ARRAY['single', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'ecowash', 'nosteam']
WHERE id = 'grundig-gr5500';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam']
WHERE id = 'aeg-7000-lr742px4q';

UPDATE washing_machines
SET keywords = ARRAY['couple', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'miele', 'PowerWash', 'Steam']
WHERE id = 'miele-w1-wwb380-wcs';

UPDATE washing_machines
SET keywords = ARRAY['family', 'everyday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam']
WHERE id = 'aeg-8000-lr844px6q';

-- Update dishwashers keywords
UPDATE dishwashers
SET keywords = ARRAY['household-couple', 'glass-no', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-mid']
WHERE id = 'bosch-smv4hcx48e';

UPDATE dishwashers
SET keywords = ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-high']
WHERE id = 'siemens-sn65zx49ce';

UPDATE dishwashers
SET keywords = ARRAY['household-family', 'glass-PerfectGlassCare', 'usage-all', 'type-integrated', 'noise-bedroom-nearby', 'lifespan-high']
WHERE id = 'miele-g5050-vi';

UPDATE dishwashers
SET keywords = ARRAY['household-couple', 'glass-no', 'usage-all', 'type-integrated', 'noise-bedroom-far', 'lifespan-mid']
WHERE id = 'aeg-fsb52637p';

UPDATE dishwashers
SET keywords = ARRAY['household-couple', 'glass-no', 'usage-basic', 'type-white', 'noise-bedroom-far', 'lifespan-Budget']
WHERE id = 'bosch-sms4haw48e';

-- Update ovens keywords
UPDATE ovens
SET keywords = ARRAY['Everyday', 'FullSteam', 'Pyrolyse', 'ProChef', 'Family', 'quickheat']
WHERE id = 'siemens-hb578abs0s';

UPDATE ovens
SET keywords = ARRAY['NotEveryday', 'Nosteam', 'nocleaning', 'AutoChef', 'Single', 'MedHeat']
WHERE id = 'bosch-hba534bs0s';

UPDATE ovens
SET keywords = ARRAY['Everyday', 'Steam', 'Pyrolyse', 'HobbyChef', 'LargeFamily', 'quickheat']
WHERE id = 'samsung-nv75t8979rk';

UPDATE ovens
SET keywords = ARRAY['NotEveryday', 'Steam', 'Steamclean', 'HobbyChef', 'Couple', 'MedHeat']
WHERE id = 'aeg-bek435120m';

UPDATE ovens
SET keywords = ARRAY['Weekly', 'Nosteam', 'nocleaning', 'AutoChef', 'Single', 'slowheat']
WHERE id = 'electrolux-eob300x';

-- Update refrigerators keywords
UPDATE refrigerators
SET keywords = ARRAY['family', 'weeklyshopping', 'meatdairy', 'energysaving', 'bigfreezer', 'quiet', 'standarddoor', 'nosmart', 'premiumdesign', 'standardfit']
WHERE id = 'samsung-rb34t632esaef';

UPDATE refrigerators
SET keywords = ARRAY['largefamily', 'dailyshopping', 'vegstorage', 'performance', 'bigfreezer', 'quiet', 'standarddoor', 'smartcontrol', 'premiumdesign', 'standardfit']
WHERE id = 'lg-gbb92staxp';

UPDATE refrigerators
SET keywords = ARRAY['couple', 'weeklyshopping', 'vegstorage', 'energysaving', 'smallfreezer', 'normalnoise', 'standarddoor', 'nosmart', 'standardwhite', 'standardfit']
WHERE id = 'bosch-kgn36vwea';

UPDATE refrigerators
SET keywords = ARRAY['single', 'onceshopping', 'readymeals', 'lowprice', 'smallfreezer', 'normalnoise', 'standarddoor', 'nosmart', 'standardwhite', 'slimfit']
WHERE id = 'gram-kf-3295-93';

UPDATE refrigerators
SET keywords = ARRAY['family', 'weeklyshopping', 'vegstorage', 'performance', 'nofreezer', 'quiet', 'standarddoor', 'smartscreen', 'premiumdesign', 'standardfit']
WHERE id = 'siemens-ks36vaxep';