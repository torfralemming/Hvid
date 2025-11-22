/*
  # Import initial ovens data

  1. Data Import
    - Adding 10 popular ovens from Power.dk
    - Including various price ranges and features
    - Balanced selection across different tiers (budget, mid, premium)

  2. Data Structure
    - Each oven includes:
      - Full specifications
      - Features list
      - Keywords for matching
      - Tier categorization
*/

INSERT INTO ovens (id, name, price, image, energy_class, capacity, features, rating, link, store, description, keywords, tier)
VALUES
  (
    'siemens-hb578abs0s',
    'Siemens iQ500 HB578ABS0S',
    7999,
    'https://www.power.dk/images/products/1064254/primary/large',
    'A',
    71,
    ARRAY['4D varmluft', 'Pyrolyse selvrens', 'CoolStart', 'LCD Display', 'Stegetermometer', '30 automatiske programmer'],
    4.7,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/siemens-iq500-hb578abs0s-indbygningsovn/p-1064254/',
    'Power',
    'Premium indbygningsovn med pyrolyse og avancerede funktioner til den kræsne kok',
    ARRAY['Everyday', 'FullSteam', 'Pyrolyse', 'ProChef', 'Family', 'quickheat'],
    'premium'
  ),
  (
    'bosch-hba534bs0s',
    'Bosch Serie 4 HBA534BS0S',
    4499,
    'https://www.power.dk/images/products/1161524/primary/large',
    'A',
    71,
    ARRAY['3D varmluft', 'EcoClean Direct', '10 ovnfunktioner', 'LED display', 'Nem betjening'],
    4.3,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/bosch-serie-4-hba534bs0s-indbygningsovn/p-1161524/',
    'Power',
    'Pålidelig basismodel med god energieffektivitet og brugervenlig betjening',
    ARRAY['NotEveryday', 'Nosteam', 'nocleaning', 'AutoChef', 'Single', 'MedHeat'],
    'budget'
  ),
  (
    'samsung-nv75t8979rk',
    'Samsung Dual Cook Flex NV75T8979RK',
    9999,
    'https://www.power.dk/images/products/1269735/primary/large',
    'A+',
    75,
    ARRAY['Dual Cook', 'Pyrolyse', 'WiFi', 'Steam Clean', 'Dual Door', 'Air Fry'],
    4.8,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/samsung-dual-cook-flex-nv75t8979rk-indbygningsovn/p-1269735/',
    'Power',
    'Innovativ ovn med dual cook-teknologi og smart connectivity',
    ARRAY['Everyday', 'Steam', 'Pyrolyse', 'HobbyChef', 'LargeFamily', 'quickheat'],
    'premium'
  ),
  (
    'aeg-bek435120m',
    'AEG BEK435120M',
    5999,
    'https://www.power.dk/images/products/1246789/primary/large',
    'A',
    71,
    ARRAY['SteamBake', 'Katalytisk rengøring', 'Soft Closing', 'LED display', 'Stegetermometer'],
    4.5,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/aeg-bek435120m-indbygningsovn/p-1246789/',
    'Power',
    'Alsidig ovn med dampfunktion og god byggekvalitet',
    ARRAY['NotEveryday', 'Steam', 'Steamclean', 'HobbyChef', 'Couple', 'MedHeat'],
    'mid'
  ),
  (
    'electrolux-eob300x',
    'Electrolux EOB300X',
    3999,
    'https://www.power.dk/images/products/1161525/primary/large',
    'A',
    72,
    ARRAY['Varmluft', '8 ovnfunktioner', 'Mekanisk ur', 'Børnesikring'],
    4.1,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/electrolux-eob300x-indbygningsovn/p-1161525/',
    'Power',
    'Prisvenlig basismodel med de vigtigste funktioner',
    ARRAY['Weekly', 'Nosteam', 'nocleaning', 'AutoChef', 'Single', 'slowheat'],
    'budget'
  ),
  (
    'miele-h-2265-b',
    'Miele H 2265 B',
    8499,
    'https://www.power.dk/images/products/1375246/primary/large',
    'A+',
    76,
    ARRAY['PerfectClean', 'Pyrolyse', 'FlexiClip', 'Klimagaring', '8 ovnfunktioner'],
    4.9,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/miele-h-2265-b-indbygningsovn/p-1375246/',
    'Power',
    'Førsteklasses ovn med Mieles kendte kvalitet og holdbarhed',
    ARRAY['Everyday', 'FullSteam', 'Pyrolyse', 'ProChef', 'Family', 'quickheat'],
    'premium'
  ),
  (
    'whirlpool-oakz9-156p-ix',
    'Whirlpool OAKZ9 156P IX',
    4799,
    'https://www.power.dk/images/products/1283456/primary/large',
    'A',
    71,
    ARRAY['6th Sense', 'Cook3', 'Ready2Cook', 'Pyrolyse', 'SmartClean'],
    4.2,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/whirlpool-oakz9-156p-ix-indbygningsovn/p-1283456/',
    'Power',
    'Smart ovn med automatiske programmer og god rengøringsfunktion',
    ARRAY['NotEveryday', 'Nosteam', 'Pyrolyse', 'AutoChef', 'Couple', 'MedHeat'],
    'budget'
  ),
  (
    'gorenje-bos737e301x',
    'Gorenje BOS737E301X',
    5499,
    'https://www.power.dk/images/products/1246790/primary/large',
    'A',
    73,
    ARRAY['HomeMade Plus', 'AquaClean', 'GentleClose', 'StepBake', 'Extra Steam'],
    4.4,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/gorenje-bos737e301x-indbygningsovn/p-1246790/',
    'Power',
    'Moderne ovn med dampfunktion og brugervenligt interface',
    ARRAY['NotEveryday', 'Steam', 'Steamclean', 'HobbyChef', 'Couple', 'MedHeat'],
    'mid'
  ),
  (
    'siemens-hn678g4s6',
    'Siemens iQ700 HN678G4S6',
    14999,
    'https://www.power.dk/images/products/1064255/primary/large',
    'A++',
    67,
    ARRAY['Home Connect', 'FullSteam', 'Pyrolyse', 'TFT-touch display', 'PulseSteam', 'Sous-vide'],
    4.9,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/siemens-iq700-hn678g4s6-indbygningsovn/p-1064255/',
    'Power',
    'Topmodel med alle tænkelige funktioner inkl. sous-vide og dampfunktioner',
    ARRAY['Everyday', 'FullSteam', 'Pyrolyse', 'ProChef', 'Family', 'quickheat', 'Sousvide'],
    'premium'
  ),
  (
    'bosch-hbg5785s0',
    'Bosch Serie 6 HBG5785S0',
    6999,
    'https://www.power.dk/images/products/1161526/primary/large',
    'A',
    71,
    ARRAY['AutoPilot', 'Pyrolyse', '3D Hotair', 'TFT display', 'SoftClose', 'EcoClean'],
    4.6,
    'https://www.power.dk/hvidevarer/ovn-og-komfur/indbygningsovn/bosch-serie-6-hbg5785s0-indbygningsovn/p-1161526/',
    'Power',
    'Veludstyret ovn med automatiske programmer og god byggekvalitet',
    ARRAY['Everyday', 'Steam', 'Pyrolyse', 'HobbyChef', 'Family', 'MedHeat'],
    'mid'
  );