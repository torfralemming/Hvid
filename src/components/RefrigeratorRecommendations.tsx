function getRecommendationDescription(refrigerator: Refrigerator, formData: RefrigeratorFormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  // Match keywords with form data
  const matchingKeywords = refrigerator.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !refrigerator.keywords.includes(k));
  
  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      // Household size
      if (k === 'single') return 'den er perfekt til én person';
      if (k === 'couple') return 'den er ideel til par';
      if (k === 'family') return 'den er god til familier';
      if (k === 'largefamily') return 'den er rummelig til store familier';

      // Shopping frequency
      if (k === 'dailyshopping') return 'den er designet til daglige indkøb';
      if (k === 'weeklyshopping') return 'den er god til ugentlige indkøb';
      if (k === 'onceshopping') return 'den er praktisk til storindkøb';
      if (k === 'bulkshopping') return 'den er perfekt til bulk-indkøb';

      // Storage type
      if (k === 'meatdairy') return 'den er optimal til kød og mejeriprodukter';
      if (k === 'vegstorage') return 'den har særlige grøntsagsskuffer';
      if (k === 'readymeals') return 'den er praktisk til færdigretter';
      if (k === 'drinksnacks') return 'den er god til drikkevarer og snacks';

      // Energy efficiency
      if (k === 'energysaving') return 'den er energibesparende';
      if (k === 'performance') return 'den har høj ydeevne';
      if (k === 'normalenergy') return 'den har standard energiforbrug';
      if (k === 'lowprice') return 'den er prisvenlig';

      // Freezer
      if (k === 'bigfreezer') return 'den har stor fryser';
      if (k === 'smallfreezer') return 'den har kompakt fryser';
      if (k === 'nofreezer') return 'den er uden fryser';

      // Noise level
      if (k === 'quiet') return 'den er særligt støjsvag';
      if (k === 'normalnoise') return 'den har normalt støjniveau';
      if (k === 'noisefree') return 'den er støjsvag';
      if (k === 'loudok') return 'den er robust';

      // Water/ice dispenser
      if (k === 'waterice') return 'den har vand- og isdispenser';
      if (k === 'wateronly') return 'den har vanddispenser';
      if (k === 'standarddoor') return 'den har standarddør';

      // Smart features
      if (k === 'smartcontrol') return 'den har smart-styring';
      if (k === 'smartscreen') return 'den har display i døren';
      if (k === 'nosmart') return 'den har enkel betjening';

      // Design
      if (k === 'premiumdesign') return 'den har eksklusivt design';
      if (k === 'integrated') return 'den er integrerbar';
      if (k === 'standardwhite') return 'den er i klassisk hvid';

      // Size
      if (k === 'slimfit') return 'den er i smal model';
      if (k === 'standardfit') return 'den er i standardstørrelse';
      if (k === 'largefit') return 'den har ekstra bred model';

      return '';
    }).filter(Boolean);

    descriptions.push(`Dette køleskab opfylder dine behov fordi ${metNeeds.join(', ')}`);
  }

  // Analyze unmet needs
  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      // Size mismatches
      if (k === 'slimfit' && !refrigerator.keywords.includes('slimfit'))
        return 'den er bredere end ønsket';
      if (k === 'largefit' && refrigerator.keywords.includes('slimfit'))
        return 'den er smallere end ønsket';

      // Freezer mismatches
      if (k === 'bigfreezer' && !refrigerator.keywords.includes('bigfreezer'))
        return 'fryseren er mindre end ønsket';
      if (k === 'nofreezer' && !refrigerator.keywords.includes('nofreezer'))
        return 'du betaler for en fryser du ikke har brug for';

      // Dispenser mismatches
      if (k === 'waterice' && !refrigerator.keywords.includes('waterice'))
        return 'den mangler is-dispenser';
      if (k === 'wateronly' && !refrigerator.keywords.includes('wateronly'))
        return 'den mangler vanddispenser';

      // Smart features mismatches
      if (k === 'smartcontrol' && !refrigerator.keywords.includes('smartcontrol'))
        return 'den mangler smart-funktioner';
      if (k === 'smartscreen' && !refrigerator.keywords.includes('smartscreen'))
        return 'den mangler display i døren';

      // Energy mismatches
      if (k === 'energysaving' && !refrigerator.keywords.includes('energysaving'))
        return 'den er ikke optimeret for energibesparelse';

      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(', ')}`);
    }
  }

  // Add capacity context
  descriptions.push(`Med en kapacitet på ${refrigerator.capacity} liter har du god plads til dine madvarer`);

  // Add energy efficiency description
  if (refrigerator.energy_class <= 'C') {
    descriptions.push(`${refrigerator.energy_class}-energimærkningen sikrer lave driftsomkostninger`);
  }

  return descriptions.join('. ') + '.';
}

export default getRecommendationDescription