import React, { useState, useEffect } from 'react';
import { X, Search, Plus, Loader2, ExternalLink, Info, Check, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ProductSearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
};

type PowerProduct = {
  id: string;
  name: string;
  price: number;
  productImage?: {
    hash: string;
    url: string;
    width: number;
    height: number;
    format: string;
  };
  images: Array<{ url: string }>;
  brand?: { name: string };
  specifications?: Array<{ name: string; value: string }>;
  shortDescription?: string;
  url?: string;
  type?: string;
  bulletPoints?: string[];
};

type ScorecardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: PowerProduct;
};

function ScorecardModal({ isOpen, onClose, product }: ScorecardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1';
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              {product.brand?.name && (
                <p className="text-lg text-gray-600 mt-1">{product.brand.name}</p>
              )}
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {product.price.toLocaleString('da-DK')} kr.
              </p>
              {product.url && (
                <a
                  href={`https://www.power.dk${product.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Se produkt hos Power
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {product.shortDescription && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Beskrivelse</h3>
              <p className="text-gray-600">{product.shortDescription}</p>
            </div>
          )}

          {/* Bullet Points */}
          {product.bulletPoints && product.bulletPoints.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hovedfunktioner</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.bulletPoints.map((point, index) => (
                  <li key={index} className="text-gray-600">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifikationer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-700">{spec.name}:</span>
                    <span className="text-sm text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function extractFeatures(product: PowerProduct): string[] {
  // First try to get bullet points from salesArguments
  if (product.bulletPoints?.length > 0) {
    return product.bulletPoints;
  }

  // Fallback to brand and name if no bullet points found
  return [product.brand?.name + ' ' + product.name];
}

function determineProductType(product: PowerProduct): string {
  // First check the API-provided type if available
  if (product.type && product.type !== 'unknown') {
    return product.type;
  }

  // Then check the product name and description
  const searchText = [
    product.name || '',
    product.shortDescription || '',
    product.specifications?.map(s => `${s.name} ${s.value}`).join(' ') || '',
    product.url || ''
  ].join(' ').toLowerCase();

  // Check for dishwasher first since it's more specific
  if (searchText.includes('opvaskemaskine') || searchText.includes('opvask')) {
    return 'dishwasher';
  }

  // Then check other types
  if (searchText.includes('vaskemaskine') || searchText.includes('tøjvask')) {
    return 'washing_machine';
  }
  if (searchText.includes('ovn') || searchText.includes('indbygningsovn')) {
    return 'oven';
  }
  if (searchText.includes('tv') || searchText.includes('fjernsyn') || searchText.includes('television')) {
    return 'tv';
  }
  if (searchText.includes('køleskab') || searchText.includes('køle/frys')) {
    return 'refrigerator';
  }

  // URL-based fallback checks
  if (product.url) {
    const url = product.url.toLowerCase();
    if (url.includes('/opvaskemaskine/') || url.includes('/opvask/')) {
      return 'dishwasher';
    }
    if (url.includes('/vaskemaskine/') || url.includes('/toejvask/')) {
      return 'washing_machine';
    }
    if (url.includes('/ovn/') || url.includes('/indbygningsovn/')) {
      return 'oven';
    }
    if (url.includes('/koeleskab/') || url.includes('/køleskab/')) {
      return 'refrigerator';
    }
    if (url.includes('/tv/') || url.includes('/fjernsyn/')) {
      return 'tv';
    }
  }

  return 'unknown';
}

function extractSpecificData(product: PowerProduct, productType: string) {
  const data: Record<string, any> = {};

  switch (productType) {
    case 'washing_machine':
      data.rpm = 1400;
      data.annual_energy_consumption = 150;
      data.annual_water_consumption = 10000;
      break;
    case 'dishwasher':
      data.noise_level = 44;
      data.place_settings = 13;
      data.annual_energy_consumption = 200;
      data.annual_water_consumption = 2500;
      break;
    case 'oven':
      data.max_temperature = 250;
      data.has_pyrolysis = false;
      data.has_steam = false;
      data.number_of_functions = 8;
      break;
    case 'refrigerator':
      data.freezer_capacity = 100;
      data.refrigerator_capacity = 200;
      data.no_frost = true;
      data.climate_class = 'SN-T';
      data.noise_level = 38;
      break;
    case 'tv':
      data.screen_size = 55;
      data.resolution = '4K';
      data.refresh_rate = 60;
      break;
  }

  // Override defaults with actual values from specifications
  product.specifications?.forEach(spec => {
    const name = spec.name.toLowerCase();
    const value = spec.value.toLowerCase();

    if (name.includes('omdrejninger')) {
      data.rpm = parseInt(value.match(/\d+/)?.[0] || data.rpm.toString());
    }
    if (name.includes('energiforbrug')) {
      data.annual_energy_consumption = parseInt(value.match(/\d+/)?.[0] || data.annual_energy_consumption.toString());
    }
    if (name.includes('vandforbrug')) {
      data.annual_water_consumption = parseInt(value.match(/\d+/)?.[0] || data.annual_water_consumption.toString());
    }
    if (name.includes('støjniveau')) {
      data.noise_level = parseInt(value.match(/\d+/)?.[0] || data.noise_level.toString());
    }
    if (name.includes('skærm') || name.includes('tommer') || name.includes('"')) {
      data.screen_size = parseInt(value.match(/\d+/)?.[0] || data.screen_size.toString());
    }
    if (name.includes('opløsning') || name.includes('resolution')) {
      if (value.includes('4k') || value.includes('uhd')) data.resolution = '4K';
      else if (value.includes('8k')) data.resolution = '8K';
      else if (value.includes('full hd') || value.includes('1080')) data.resolution = 'Full HD';
    }
    if (name.includes('hz') || name.includes('refresh')) {
      data.refresh_rate = parseInt(value.match(/\d+/)?.[0] || data.refresh_rate.toString());
    }
  });

  return data;
}

function generateKeywords(product: PowerProduct): string[] {
  const keywords: string[] = [];
  const productType = determineProductType(product);
  
  // Get keywords from available_keywords table for this product type
  return generateKeywordsFromDatabase(product, productType);
}

async function generateKeywordsFromDatabase(product: PowerProduct, productType: string): Promise<string[]> {
  try {
    // Fetch available keywords for this product type from the database
    const { data: availableKeywords, error } = await supabase
      .from('available_keywords')
      .select('category, keyword');

    if (error) {
      console.error('Error fetching keywords:', error);
      return generateKeywordsLegacy(product, productType);
    }

    // Group keywords by category
    const keywordsByCategory: Record<string, string[]> = {};
    availableKeywords.forEach(kw => {
      if (!keywordsByCategory[kw.category]) {
        keywordsByCategory[kw.category] = [];
      }
      keywordsByCategory[kw.category].push(kw.keyword);
    });

    return generateSmartKeywords(product, productType, keywordsByCategory);
  } catch (err) {
    console.error('Error in generateKeywordsFromDatabase:', err);
    return generateKeywordsLegacy(product, productType);
  }
}

function generateSmartKeywords(product: PowerProduct, productType: string, keywordsByCategory: Record<string, string[]>): string[] {
  const keywords: string[] = [];

  // Smart keyword generation based on product analysis and available keywords
  Object.entries(keywordsByCategory).forEach(([category, availableKeywords]) => {
    const selectedKeyword = selectBestKeyword(product, productType, category, availableKeywords);
    if (selectedKeyword) {
      keywords.push(selectedKeyword);
    }
  });

  return [...new Set(keywords)]; // Remove duplicates
}

function selectBestKeyword(product: PowerProduct, productType: string, category: string, availableKeywords: string[]): string | null {
  const searchText = [
    product.name || '',
    product.shortDescription || '',
    product.specifications?.map(s => `${s.name} ${s.value}`).join(' ') || '',
    product.bulletPoints?.join(' ') || ''
  ].join(' ').toLowerCase();

  // Category-specific logic
  switch (category) {
    case 'household':
      const capacity = extractCapacity(product);
      if (capacity <= 7) return 'single';
      if (capacity <= 9) return 'couple';
      if (capacity <= 12) return 'family';
      return 'largefamily';

    case 'brand':
      const brand = product.brand?.name?.toLowerCase();
      const matchingBrand = availableKeywords.find(kw => 
        kw.toLowerCase() === brand || searchText.includes(kw.toLowerCase())
      );
      return matchingBrand || 'Anybrand';

    case 'tier':
    case 'lifespan':
      if (product.price < 5000) return availableKeywords.find(kw => kw.includes('budget') || kw.includes('Budget')) || availableKeywords[0];
      if (product.price > 10000) return availableKeywords.find(kw => kw.includes('premium') || kw.includes('high') || kw.includes('Premium')) || availableKeywords[availableKeywords.length - 1];
      return availableKeywords.find(kw => kw.includes('mid') || kw.includes('medium')) || availableKeywords[Math.floor(availableKeywords.length / 2)];

    case 'energy':
      const energyClass = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('energi')
      )?.value || 'D';
      if (energyClass <= 'B') return availableKeywords.find(kw => kw.includes('saving')) || availableKeywords[0];
      return availableKeywords.find(kw => kw.includes('normal')) || availableKeywords[1];

    case 'smart':
      const hasSmart = searchText.includes('smart') || searchText.includes('wifi') || searchText.includes('app');
      return hasSmart ? 
        (availableKeywords.find(kw => kw.includes('smart')) || availableKeywords[0]) :
        (availableKeywords.find(kw => kw.includes('no')) || availableKeywords[availableKeywords.length - 1]);

    case 'noise':
      const noiseLevel = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('støj') || spec.name.toLowerCase().includes('noise')
      );
      const noise = noiseLevel ? parseInt(noiseLevel.value.match(/\d+/)?.[0] || '45') : 45;
      return noise <= 42 ? 
        (availableKeywords.find(kw => kw.includes('quiet')) || availableKeywords[0]) :
        (availableKeywords.find(kw => kw.includes('normal')) || availableKeywords[1]);

    default:
      // For other categories, try to find the best match based on product features
      const bestMatch = availableKeywords.find(keyword => {
        const keywordLower = keyword.toLowerCase();
        return searchText.includes(keywordLower) || 
               product.specifications?.some(spec => 
                 spec.value.toLowerCase().includes(keywordLower)
               ) ||
               product.bulletPoints?.some(point => 
                 point.toLowerCase().includes(keywordLower)
               );
      });
      
      return bestMatch || availableKeywords[0]; // Default to first available keyword
  }
}

function generateKeywordsLegacy(product: PowerProduct, productType: string): string[] {
  const keywords: string[] = [];
  
  // Generate keywords based on product type and form questions
  switch (productType) {
    case 'washing_machine':
      // Household size based on capacity
      const capacity = extractCapacity(product);
      if (capacity <= 7) keywords.push('single', 'couple');
      else if (capacity <= 9) keywords.push('couple', 'family');
      else keywords.push('family', 'largefamily');

      // Wash frequency - default to weekly for most products
      keywords.push('weekly');
      
      // Clean clothes - check for steam features
      const hasSteem = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('steam') || 
        spec.value.toLowerCase().includes('damp')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('steam') || 
        point.toLowerCase().includes('damp')
      );
      keywords.push(hasSteem ? 'Steamfunc' : 'nosteam');

      // Clothes care - premium products get honeycomb-luxury
      if (product.price > 7000) {
        keywords.push('honeycomb-luxury');
      } else {
        keywords.push('normaldrum');
      }

      // Detergent - check for auto-dosing features
      const hasAutoDose = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('dos') || 
        spec.value.toLowerCase().includes('automatic')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('dos') || 
        point.toLowerCase().includes('automatic')
      );
      keywords.push(hasAutoDose ? 'Autodose' : 'SelfDose');

      // Brand
      const brand = product.brand?.name?.toLowerCase();
      if (brand === 'aeg') keywords.push('AEG');
      else if (brand === 'siemens') keywords.push('Siemens');
      else if (brand === 'miele') keywords.push('miele');
      else if (brand === 'electrolux') keywords.push('Electrolux');
      else keywords.push('Anybrand');

      // Wash duration - premium gets PowerWash, budget gets ecowash
      if (product.price > 7000) {
        keywords.push('PowerWash');
      } else {
        keywords.push('ecowash');
      }

      // Shirts - same as steam function
      keywords.push(hasSteem ? 'Steam' : 'nosteam');
      break;

    case 'dishwasher':
      // Household size based on place settings
      const placeSettings = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('kuvert') || 
        spec.name.toLowerCase().includes('place')
      );
      const settings = placeSettings ? parseInt(placeSettings.value.match(/\d+/)?.[0] || '13') : 13;
      
      if (settings <= 12) keywords.push('household-single', 'household-couple');
      else keywords.push('household-family');

      // Glass care - check for glass-specific features
      const hasGlassCare = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('glass') || 
        spec.value.toLowerCase().includes('glas') ||
        spec.value.toLowerCase().includes('crystal')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('glass') || 
        point.toLowerCase().includes('glas') ||
        point.toLowerCase().includes('crystal')
      );
      keywords.push(hasGlassCare ? 'glass-PerfectGlassCare' : 'glass-no');

      // Usage - default to all
      keywords.push('usage-all');

      // Type - check if integrated
      const isIntegrated = product.name.toLowerCase().includes('integr') || 
                          product.shortDescription?.toLowerCase().includes('integr');
      keywords.push(isIntegrated ? 'type-integrated' : 'type-white');

      // Noise level
      const noiseLevel = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('støj') || 
        spec.name.toLowerCase().includes('noise')
      );
      const noise = noiseLevel ? parseInt(noiseLevel.value.match(/\d+/)?.[0] || '45') : 45;
      keywords.push(noise <= 44 ? 'noise-bedroom-nearby' : 'noise-bedroom-far');

      // Lifespan based on price
      if (product.price < 5000) keywords.push('lifespan-Budget');
      else if (product.price > 8000) keywords.push('lifespan-high');
      else keywords.push('lifespan-mid');
      break;

    case 'oven':
      // Usage frequency - default based on price
      if (product.price > 8000) keywords.push('usage-Everyday');
      else keywords.push('usage-NotEveryday');

      // Baking - check for steam features
      const ovenHasSteam = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('steam') || 
        spec.value.toLowerCase().includes('damp')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('steam') || 
        point.toLowerCase().includes('damp')
      );
      keywords.push(ovenHasSteam ? 'baking-FullSteam' : 'baking-Nosteam');

      // Sous vide - check for sous vide features
      const hasSousVide = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('sous') || 
        spec.value.toLowerCase().includes('vacuum')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('sous') || 
        point.toLowerCase().includes('vacuum')
      );
      if (hasSousVide) keywords.push('sousvide-Sousvide');

      // Maintenance - check for pyrolysis
      const hasPyrolysis = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('pyrolyse') || 
        spec.value.toLowerCase().includes('pyrolysis')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('pyrolyse') || 
        point.toLowerCase().includes('pyrolysis')
      );
      keywords.push(hasPyrolysis ? 'maintenance-Pyrolyse' : 'maintenance-nocleaning');

      // Cooking skill based on price and features
      if (product.price > 12000) keywords.push('cooking_skill-ProChef');
      else if (product.price > 6000) keywords.push('cooking_skill-HobbyChef');
      else keywords.push('cooking_skill-AutoChef');

      // Household size based on capacity
      const ovenCapacity = extractCapacity(product);
      if (ovenCapacity <= 60) keywords.push('household_size-Single');
      else if (ovenCapacity <= 75) keywords.push('household_size-Family');
      else keywords.push('household_size-LargeFamily');

      // Heating speed based on price
      if (product.price > 10000) keywords.push('heating_speed-quickheat');
      else keywords.push('heating_speed-MedHeat');
      break;

    case 'refrigerator':
      // Household size based on capacity
      const fridgeCapacity = extractCapacity(product);
      if (fridgeCapacity <= 250) keywords.push('household-single');
      else if (fridgeCapacity <= 350) keywords.push('household-couple', 'household-family');
      else keywords.push('household-largefamily');

      // Shopping frequency - default to weekly
      keywords.push('shopping-weeklyshopping');

      // Storage type - default to meatdairy
      keywords.push('storage-meatdairy');

      // Energy importance based on energy class
      const energyClass = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('energi')
      )?.value || 'D';
      if (energyClass <= 'B') keywords.push('energy-energysaving');
      else keywords.push('energy-normalenergy');

      // Freezer size - check specifications
      const freezerInfo = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('frys') || 
        spec.name.toLowerCase().includes('freezer')
      );
      keywords.push('freezer-bigfreezer'); // Default assumption

      // Noise level
      const fridgeNoise = product.specifications?.find(spec => 
        spec.name.toLowerCase().includes('støj') || 
        spec.name.toLowerCase().includes('noise')
      );
      keywords.push('noise-quiet'); // Default assumption

      // Dispenser - check for water/ice features
      const hasDispenser = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('water') || 
        spec.value.toLowerCase().includes('ice') ||
        spec.value.toLowerCase().includes('vand') ||
        spec.value.toLowerCase().includes('is')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('water') || 
        point.toLowerCase().includes('ice') ||
        point.toLowerCase().includes('vand') ||
        point.toLowerCase().includes('is')
      );
      keywords.push(hasDispenser ? 'dispenser-waterice' : 'dispenser-standarddoor');

      // Smart features
      const hasSmart = product.specifications?.some(spec => 
        spec.value.toLowerCase().includes('smart') || 
        spec.value.toLowerCase().includes('wifi') ||
        spec.value.toLowerCase().includes('app')
      ) || product.bulletPoints?.some(point => 
        point.toLowerCase().includes('smart') || 
        point.toLowerCase().includes('wifi') ||
        point.toLowerCase().includes('app')
      );
      keywords.push(hasSmart ? 'smart-smartcontrol' : 'smart-nosmart');

      // Design based on price
      if (product.price > 8000) keywords.push('design-premiumdesign');
      else keywords.push('design-standardwhite');

      // Size based on capacity
      if (fridgeCapacity <= 300) keywords.push('size-slimfit');
      else if (fridgeCapacity <= 400) keywords.push('size-standardfit');
      else keywords.push('size-largefit');
      break;
    case 'tv':
      // Screen size and distance
      const screenSize = extractTVScreenSize(product);
      if (screenSize <= 50) keywords.push('43-55');
      else if (screenSize <= 65) keywords.push('55-65');
      else if (screenSize <= 75) keywords.push('65-75');
      else keywords.push('75+');

      // Lighting conditions based on display type
      const displayType = extractDisplayType(product);
      if (displayType.includes('oled')) keywords.push('OLED');
      else if (displayType.includes('qled')) keywords.push('QLED');
      else keywords.push('LED');

      // Usage patterns - default to streaming
      keywords.push('SMART TV');

      // Sports viewing based on refresh rate
      const refreshRate = extractRefreshRate(product);
      if (refreshRate >= 120) keywords.push('120 HZ');
      else keywords.push('60 HZ');

      // Streaming services - default to smart tv
      keywords.push('Smart tv');

      // Lifespan based on price
      if (product.price < 8000) keywords.push('Low Budget');
      else if (product.price > 15000) keywords.push('High end');
      else keywords.push('Premium');

      // Picture quality based on display type and price
      if (displayType.includes('qd-oled') || displayType.includes('qoled')) {
        keywords.push('QOLED');
      } else if (displayType.includes('oled')) {
        keywords.push('OLED');
      } else if (displayType.includes('qled')) {
        keywords.push('QLED');
      } else {
        keywords.push('LED');
      }

      // Time of day usage - default based on display type
      if (displayType.includes('oled')) {
        keywords.push('OLED');
      } else if (displayType.includes('qled')) {
        keywords.push('QLED');
      } else {
        keywords.push('LED');
      }
      break;
  }


  return [...new Set(keywords)]; // Remove duplicates
}

function extractCapacity(product: PowerProduct): number {
  // First check specifications
  if (product.specifications) {
    const capacitySpec = product.specifications.find(spec => {
      const name = spec.name.toLowerCase();
      return name.includes('kapacitet') || 
             name.includes('capacity') || 
             name.includes('volumen') ||
             name.includes('rumindhold');
    });

    if (capacitySpec) {
      const match = capacitySpec.value.match(/(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  }

  // Default capacities based on product type
  switch (determineProductType(product)) {
    case 'washing_machine':
      return 8; // Default 8kg capacity
    case 'dishwasher':
      return 13; // Default 13 place settings
    case 'oven':
      return 65; // Default 65L capacity
    case 'refrigerator':
      return 300; // Default 300L capacity
    case 'tv':
      return 55; // Default 55" screen size
    default:
      return 0;
  }
}

function extractTVScreenSize(product: PowerProduct): number {
  // Check specifications for screen size
  if (product.specifications) {
    const sizeSpec = product.specifications.find(spec => {
      const name = spec.name.toLowerCase();
      return name.includes('skærm') || 
             name.includes('størrelse') || 
             name.includes('tommer') ||
             name.includes('size') ||
             name.includes('screen');
    });

    if (sizeSpec) {
      const match = sizeSpec.value.match(/(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  }

  // Check product name for size
  const nameMatch = product.name.match(/(\d+)["'']/);
  if (nameMatch) {
    return parseInt(nameMatch[1], 10);
  }

  return 55; // Default size
}

function extractDisplayType(product: PowerProduct): string {
  const searchText = [
    product.name || '',
    product.shortDescription || '',
    product.specifications?.map(s => `${s.name} ${s.value}`).join(' ') || ''
  ].join(' ').toLowerCase();

  if (searchText.includes('qd-oled') || searchText.includes('qoled')) return 'qd-oled';
  if (searchText.includes('oled')) return 'oled';
  if (searchText.includes('qled')) return 'qled';
  if (searchText.includes('led')) return 'led';
  return 'led'; // Default
}

function extractRefreshRate(product: PowerProduct): number {
  if (product.specifications) {
    const refreshSpec = product.specifications.find(spec => {
      const name = spec.name.toLowerCase();
      return name.includes('hz') || name.includes('refresh') || name.includes('opdatering');
    });

    if (refreshSpec) {
      const match = refreshSpec.value.match(/(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  }

  return 60; // Default refresh rate
}

function ProductSearchDialog({ isOpen, onClose, onProductAdded }: ProductSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<PowerProduct[]>([]);
  const [addingProduct, setAddingProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PowerProduct | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showScorecard, setShowScorecard] = useState(false);
  const [addingMultipleProducts, setAddingMultipleProducts] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://scovfppftngipmzpnlsl.supabase.co/functions/v1/power-api1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          endpoint: 'search',
          query: searchQuery,
          pageSize: 10
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const products = data?.products || [];
      setSearchResults(products);

      if (products.length === 0) {
        setError('Ingen produkter fundet');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Der opstod en fejl under søgningen. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product: PowerProduct) => {
    try {
      setAddingProduct(product.id);
      setError(null);

      // Generate a unique ID by adding a timestamp
      const productId = `power-${product.id}-${Date.now()}`;

      const productType = determineProductType(product);

      if (productType === 'unknown') {
        setError('Kunne ikke bestemme produkttypen');
        setAddingProduct(null);
        return;
      }

      const typeSpecificData = extractSpecificData(product, productType);
      const features = extractFeatures(product);
      const keywords = generateKeywords(product);

      const energyClassSpec = product.specifications?.find(spec =>
        spec.name.toLowerCase().includes('energiklasse')
      );
      const energyClass = energyClassSpec?.value || 'A';

      const capacitySpec = product.specifications?.find(spec =>
        spec.name.toLowerCase().includes('kapacitet')
      );
      const capacityValue = capacitySpec?.value || '0';
      const capacity = parseInt(capacityValue.match(/\d+/)?.[0] || '0');

      let tier: 'budget' | 'mid' | 'premium' = 'mid';
      if (product.price < 5000) tier = 'budget';
      else if (product.price > 8000) tier = 'premium';

      // Get image URL using the product image hash
      const imageUrl = product.productImage?.hash ? 
        `https://media.power-cdn.net/images/h-${product.productImage.hash}/products/${product.id}/${product.id}_7_600x600_t_g.webp` :
        (product.images[0]?.url || '');

      const productData = {
        id: productId,
        name: product.name,
        price: product.price,
        image: imageUrl,
        energy_class: energyClass,
        capacity,
        features: features.length > 0 ? features : [`${product.brand?.name} ${product.name}`],
        rating: 4.5,
        link: `https://www.power.dk${product.url}`,
        store: 'Power',
        description: product.shortDescription || `${product.brand?.name} ${product.name}`,
        keywords,
        tier,
        product_type: productType,
        type_specific_data: typeSpecificData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Adding product:', productData);

      const { error: insertError } = await supabase
        .from('all_products')
        .insert([productData]);

      if (insertError) throw insertError;

      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Der opstod en fejl ved tilføjelse af produkt: ' + err.message);
    } finally {
      setAddingProduct(null);
    }
  };

  const handleToggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddSelectedProducts = async () => {
    try {
      setAddingMultipleProducts(true);
      setError(null);
      
      const productsToAdd = searchResults.filter(product => 
        selectedProducts.includes(product.id)
      );
      
      if (productsToAdd.length === 0) {
        setError('Ingen produkter valgt');
        setAddingMultipleProducts(false);
        return;
      }
      
      // Process each selected product
      for (const product of productsToAdd) {
        // Generate a unique ID by adding a timestamp
        const productId = `power-${product.id}-${Date.now()}`;
        const productType = determineProductType(product);
        
        if (productType === 'unknown') {
          console.error(`Kunne ikke bestemme produkttypen for ${product.name}`);
          continue;
        }
        
        const typeSpecificData = extractSpecificData(product, productType);
        const features = extractFeatures(product);
        const keywords = generateKeywords(product);
        
        const energyClassSpec = product.specifications?.find(spec =>
          spec.name.toLowerCase().includes('energiklasse')
        );
        const energyClass = energyClassSpec?.value || 'A';
        
        const capacitySpec = product.specifications?.find(spec =>
          spec.name.toLowerCase().includes('kapacitet')
        );
        const capacityValue = capacitySpec?.value || '0';
        const capacity = parseInt(capacityValue.match(/\d+/)?.[0] || '0');
        
        let tier: 'budget' | 'mid' | 'premium' = 'mid';
        if (product.price < 5000) tier = 'budget';
        else if (product.price > 8000) tier = 'premium';
        
        // Get image URL using the product image hash
        const imageUrl = product.productImage?.hash ? 
          `https://media.power-cdn.net/images/h-${product.productImage.hash}/products/${product.id}/${product.id}_7_600x600_t_g.webp` :
          (product.images[0]?.url || '');
        
        const productData = {
          id: productId,
          name: product.name,
          price: product.price,
          image: imageUrl,
          energy_class: energyClass,
          capacity,
          features: features.length > 0 ? features : [`${product.brand?.name} ${product.name}`],
          rating: 4.5,
          link: `https://www.power.dk${product.url}`,
          store: 'Power',
          description: product.shortDescription || `${product.brand?.name} ${product.name}`,
          keywords,
          tier,
          product_type: productType,
          type_specific_data: typeSpecificData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { error: insertError } = await supabase
          .from('all_products')
          .insert([productData]);
        
        if (insertError) {
          console.error(`Error adding product ${product.name}:`, insertError);
        }
      }
      
      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Error adding products:', err);
      setError('Der opstod en fejl ved tilføjelse af produkter: ' + err.message);
    } finally {
      setAddingMultipleProducts(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Søg efter produkter</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Søg efter produktnavn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          {searchResults.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                {selectedProducts.length} produkter valgt
              </div>
              <button
                onClick={handleAddSelectedProducts}
                disabled={selectedProducts.length === 0 || addingMultipleProducts}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 flex items-center gap-2"
              >
                {addingMultipleProducts ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                Tilføj valgte produkter
              </button>
            </div>
          )}

          {searchResults.map((product) => (
            <div
              key={product.id}
              className={`bg-white border rounded-lg p-6 ${
                selectedProducts.includes(product.id) ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
                  <p className="text-sm text-blue-600">Type: {determineProductType(product)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleProductSelection(product.id)}
                    className={`p-2 rounded-full ${
                      selectedProducts.includes(product.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {selectedProducts.includes(product.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowScorecard(true);
                    }}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
                  >
                    <Info className="w-5 h-5" />
                    Se detaljer
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      {product.brand?.name && (
                        <p className="text-lg text-gray-600">{product.brand.name}</p>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                      {product.price.toLocaleString('da-DK')} kr.
                    </p>
                  </div>

                  {product.specifications && product.specifications.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Specifikationer:</h4>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {product.specifications.slice(0, 6).map((spec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700">{spec.name}:</span>
                            <span className="text-sm text-gray-600">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.shortDescription && (
                    <p className="mt-4 text-sm text-gray-600">{product.shortDescription}</p>
                  )}

                  {product.bulletPoints && product.bulletPoints.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Hovedfunktioner:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {product.bulletPoints.slice(0, 5).map((point, index) => (
                          <li key={index} className="text-sm text-gray-600">{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {searchResults.length === 0 && !loading && searchQuery && (
            <div className="text-center py-8 text-gray-500">
              Ingen produkter fundet
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ScorecardModal
          isOpen={showScorecard}
          onClose={() => {
            setShowScorecard(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default ProductSearchDialog;