/*
  # Add new washing machines from Power.dk

  1. New Data
    - Adding 8 new washing machines
    - Including complete specifications and features
    - Keywords for matching with user preferences
    - Tier categorization based on price and features
*/

INSERT INTO washing_machines (
  id,
  name,
  price,
  image,
  energy_class,
  capacity,
  rpm,
  features,
  rating,
  link,
  store,
  description,
  keywords,
  tier
) VALUES
  (
    'lg-p4y9lap2w',
    'LG P4Y9LAP2W',
    8999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/2150418/2150418_1_900x900_w_g.jpg',
    'A',
    9,
    1400,
    ARRAY[
      'AI DD™ teknologi',
      'TurboWash™ 360°',
      'Steam+™',
      'Smart ThinQ™',
      'Inverter Direct Drive',
      'Allergy Care',
      '10 års motorgaranti'
    ],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/lg-p4y9lap2w-vaskemaskine/p-2150418/',
    'Power',
    'Premium LG vaskemaskine med AI-teknologi og effektiv TurboWash™. Ideel til familier der ønsker smart teknologi og pålidelig drift.',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam'],
    'premium'
  ),
  (
    'miele-w1-wwd-164-wcs',
    'Miele W1 WWD 164 WCS NDS LW',
    6999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/2654307/2654307_1_900x900_w_g.jpg',
    'A',
    8,
    1400,
    ARRAY[
      'PowerWash',
      'CapDosing',
      'Honeycomb tromle',
      'ProfiEco Motor',
      'SingleWash',
      'Watercontrol-System'
    ],
    4.8,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/miele-w1-wwd-164-wcs-nds-lw-vaskemaskine/p-2654307/',
    'Power',
    'Kvalitets Miele vaskemaskine med PowerWash og skånsom Honeycomb tromle. Perfekt til den kvalitetsbevidste familie.',
    ARRAY['couple', 'weekly', 'nosteam', 'honeycomb-luxury', 'SelfDose', 'miele', 'PowerWash', 'nosteam'],
    'mid'
  ),
  (
    'aeg-6000-lr624p14a',
    'AEG 6000 Serien LR624P14A',
    5499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1646185/1646185_1_900x900_w_g.jpg',
    'B',
    9,
    1400,
    ARRAY[
      'ProSense®',
      'SoftPlus',
      'Eco TimeSave',
      'Silent System',
      'OptiSense®'
    ],
    4.5,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-6000-serien-lr624p14a-vaskemaskine/p-1646185/',
    'Power',
    'Energieffektiv AEG vaskemaskine med god kapacitet og støjsvag drift. God til den miljøbevidste familie.',
    ARRAY['family', 'weekly', 'nosteam', 'honeycomb-eco', 'SelfDose', 'AEG', 'ecowash', 'nosteam'],
    'mid'
  ),
  (
    'samsung-ww90dg6u25leu3',
    'Samsung WW90DG6U25LEU3',
    7499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3199486/3199486_1_900x900_w_g.jpg',
    'A',
    9,
    1400,
    ARRAY[
      'AI EcoBubble™',
      'Auto Dispense',
      'SmartThings',
      'Digital Inverter Motor',
      'Hygiene Steam',
      'QuickDrive™'
    ],
    4.6,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/samsung-ww90dg6u25leu3-vaskemaskine/p-3199486/',
    'Power',
    'Smart Samsung vaskemaskine med AI-styring og automatisk dosering. Perfekt til den moderne familie.',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Anybrand', 'PowerWash', 'Steam'],
    'mid'
  ),
  (
    'grundig-gr7700',
    'Grundig GR7700 GWP810616WW',
    4499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/1174014/1174014_1_900x900_w_g.jpg',
    'C',
    8,
    1600,
    ARRAY[
      'ProSmart™ Inverter Motor',
      'AquaWave™',
      'Pet Hair Removal',
      'Hygiene+',
      'Quick Wash'
    ],
    4.3,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/grundig-gr7700-gwp810616ww-vaskemaskine/p-1174014/',
    'Power',
    'Prisvenlig Grundig vaskemaskine med god ydeevne og særlig funktion til fjernelse af dyrehår.',
    ARRAY['couple', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'Speedwash', 'nosteam'],
    'budget'
  ),
  (
    'point-powm510mka',
    'Point POWM510MKA',
    3499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3571507/3571507_1_900x900_w_g.jpg',
    'D',
    8,
    1000,
    ARRAY[
      'LED Display',
      'Hurtigvask',
      'Ubalance kontrol',
      'Børnesikring',
      'Flere vaskeprogrammer'
    ],
    4.1,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/point-powm510mka-vaskemaskine/p-3571507/',
    'Power',
    'Basis vaskemaskine til den prisbevidste forbruger. God til små husstande og lejligheder.',
    ARRAY['single', 'weekly', 'nosteam', 'normaldrum', 'SelfDose', 'Anybrand', 'ecowash', 'nosteam'],
    'budget'
  ),
  (
    'siemens-iq500-wg54g2fpdn',
    'Siemens iQ500 WG54G2FPDN',
    7999,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/2682318/2682318_1_900x900_w_g.jpg',
    'A',
    9,
    1400,
    ARRAY[
      'iDos',
      'speedPack',
      'iQdrive',
      'waterPerfect Plus',
      'antiVibration Design'
    ],
    4.7,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/siemens-iq500-wg54g2fpdn-vaskemaskine/p-2682318/',
    'Power',
    'Premium Siemens vaskemaskine med intelligent dosering og effektiv motor. Ideel til den kvalitetsbevidste familie.',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'Siemens', 'PowerWash', 'Steam'],
    'premium'
  ),
  (
    'aeg-7000-lr744px6p',
    'AEG 7000 Serien LR744PX6P',
    8499,
    'https://www.power.dk/images/h-7c6271ae87d514c5c2a3e8d840a65d98/products/3343210/3343210_1_900x900_w_g.jpg',
    'A',
    9,
    1400,
    ARRAY[
      'ProSteam®',
      'ProSense®',
      'ÖKOMix',
      'SoftPlus',
      'DirectSpray',
      'Silent System Plus'
    ],
    4.8,
    'https://www.power.dk/hvidevarer/toejvask/frontbetjente-vaskemaskiner/aeg-7000-serien-lr744px6p-vaskemaskine/p-3343210/',
    'Power',
    'Avanceret AEG vaskemaskine med dampfunktion og ÖKOMix-teknologi. Perfekt til den miljøbevidste familie der ønsker det bedste inden for tøjpleje.',
    ARRAY['family', 'almosteveryday', 'Steamfunc', 'honeycomb-luxury', 'Autodose', 'AEG', 'PowerWash', 'Steam'],
    'premium'
  );