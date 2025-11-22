function getRecommendationDescription(dishwasher: Dishwasher, formData: DishwasherFormData): string {
  const descriptions: string[] = [];
  const unmetNeeds: string[] = [];

  // Match keywords with form data
  const matchingKeywords = dishwasher.keywords.filter(k => formData.keywords.includes(k));
  const unmetKeywords = formData.keywords.filter(k => !dishwasher.keywords.includes(k));
  
  if (matchingKeywords.length > 0) {
    const metNeeds = matchingKeywords.map(k => {
      const [category, value] = k.split('-');
      switch (category) {
        case 'household':
          return value === 'single' ? 'den er perfekt til én person med kompakt størrelse og effektive programmer' :
                 value === 'couple' ? 'den er ideel til et par' :
                 'den er optimal til en familie';
        case 'glass':
          return value === 'PerfectGlassCare' ? 'den er særlig god til krystalglas' :
                 'den har standard glasbehandling';
        case 'usage':
          return value === 'all' ? 'den er fleksibel til al service' :
                 value === 'all-except-knives' ? 'den er god til det meste service' :
                 value === 'basic' ? 'den er god til almindelig service' :
                 'den er fleksibel til det meste service';
        case 'type':
          return value === 'integrated' ? 'den er integrerbar' :
                 value === 'white' ? 'den er fritstående i hvid' :
                 'den er fritstående i specialfarve';
        case 'noise':
          return value === 'bedroom-nearby' ? 'den er meget støjsvag' :
                 value === 'bedroom-far' ? 'den har normalt støjniveau' :
                 'den er støjsvag og god til åbne rum';
        case 'lifespan':
          return value === 'Budget' ? 'den er designet til kortere levetid' :
                 value === 'mid' ? 'den har solid holdbarhed' :
                 'den er bygget til lang levetid';
        default:
          return '';
      }
    }).filter(Boolean);

    descriptions.push(`Denne opvaskemaskine opfylder dine behov fordi ${metNeeds.join(', ')}`);
  }

  // Analyze unmet needs
  if (unmetKeywords.length > 0) {
    const unmetNeedsList = unmetKeywords.map(k => {
      const [category, value] = k.split('-');
      switch (category) {
        case 'household':
          if (value === 'family' && !dishwasher.keywords.includes('household-family')) 
            return 'den kan være for lille til din families behov';
          if (value === 'single' && dishwasher.keywords.includes('household-family'))
            return 'den er større end du har behov for';
          break;
        case 'glass':
          if (value === 'PerfectGlassCare' && !dishwasher.keywords.includes('glass-PerfectGlassCare'))
            return 'den har ikke specialfunktioner til krystalglas';
          break;
        case 'noise':
          if (value === 'bedroom-nearby' && !dishwasher.keywords.includes('noise-bedroom-nearby'))
            return 'den kan være for støjende til placering nær soveværelse';
          break;
        case 'lifespan':
          if (value === 'high' && dishwasher.keywords.includes('lifespan-Budget'))
            return 'den er ikke bygget til lang levetid';
          break;
      }
      return '';
    }).filter(Boolean);

    if (unmetNeedsList.length > 0) {
      descriptions.push(`Vær opmærksom på at ${unmetNeedsList.join(', ')}`);
    }
  }

  // Add capacity and noise level context
  descriptions.push(`Med ${dishwasher.capacity} kuverter og et støjniveau på ${dishwasher.noise_level} dB`);

  // Add energy efficiency description
  if (dishwasher.energy_class === 'A' || dishwasher.energy_class === 'B') {
    descriptions.push(`${dishwasher.energy_class}-energimærkningen sikrer lave driftsomkostninger`);
  }

  return descriptions.join('. ') + '.';
}

export default getRecommendationDescription