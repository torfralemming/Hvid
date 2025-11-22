function getRecommendationDescription(oven: Oven, formData: OvenFormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  // Match keywords with form data
  const matchingKeywords = oven.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !oven.keywords.includes(k));
  
  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      switch (k) {
        case 'Everyday':
          return 'den er bygget til daglig brug';
        case 'NotEveryday':
          return 'den er perfekt til regelmæssig brug';
        case 'Weekly':
          return 'den er ideel til ugentlig brug';
        case 'FullSteam':
          return 'den har avancerede dampfunktioner';
        case 'Steam':
          return 'den har dampfunktion';
        case 'Nosteam':
          return 'den har traditionelle funktioner';
        case 'Sousvide':
          return 'den har sous vide-funktion';
        case 'Pyrolyse':
          return 'den har selvrensende pyrolyse';
        case 'Steamclean':
          return 'den har damprengøring';
        case 'ProChef':
          return 'den har professionelle funktioner';
        case 'HobbyChef':
          return 'den har alsidige muligheder';
        case 'AutoChef':
          return 'den har automatiske programmer';
        case 'Single':
          return 'den er perfekt til én person';
        case 'Couple':
          return 'den er ideel til 2-3 personer';
        case 'Family':
          return 'den er god til en familie';
        case 'LargeFamily':
          return 'den er rummelig til store familier';
        case 'quickheat':
          return 'den har hurtig opvarmning';
        case 'MedHeat':
          return 'den har normal opvarmningstid';
        case 'slowheat':
          return 'den har energibesparende opvarmning';
        default:
          return '';
      }
    }).filter(Boolean);

    descriptions.push(`Denne ovn opfylder dine behov fordi ${metNeeds.join(', ')}`);
  }

  // Analyze unmet needs
  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      switch (k) {
        case 'Sousvide':
          if (!oven.keywords.includes('Sousvide'))
            return 'den mangler sous vide-funktion';
          break;
        case 'Steam':
          if (!oven.keywords.includes('Steam') && !oven.keywords.includes('FullSteam'))
            return 'den mangler dampfunktion';
          break;
        case 'Pyrolyse':
          if (!oven.keywords.includes('Pyrolyse'))
            return 'den har ikke pyrolyse selvrens';
          break;
        case 'ProChef':
          if (!oven.keywords.includes('ProChef'))
            return 'den mangler nogle professionelle funktioner';
          break;
        case 'quickheat':
          if (!oven.keywords.includes('quickheat'))
            return 'den har længere opvarmningstid end ønsket';
          break;
      }
      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(', ')}`);
    }
  }

  // Add capacity context
  descriptions.push(`Med en kapacitet på ${oven.capacity} liter har du god plads til madlavning`);

  // Add energy efficiency description
  if (oven.energy_class === 'A' || oven.energy_class === 'B') {
    descriptions.push(`${oven.energy_class}-energimærkningen sikrer lave driftsomkostninger`);
  }

  return descriptions.join('. ') + '.';
}

export default getRecommendationDescription