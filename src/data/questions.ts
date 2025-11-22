import { CategoryConfig } from '../types';

export const CATEGORY_WASHING_MACHINES: CategoryConfig = {
  id: 'washing_machines',
  name: 'Vaskemaskiner',
  questions: [
    {
      id: 'capacity_users',
      question: 'Hvor mange er du/i derhjemme?',
      options: [
        {
          label: '1 person',
          value: '1',
          customerTags: ['Single Household'],
          filter: { field: 'capacity', operator: 'gte', value: 6 }
        },
        {
          label: '2-3 personer',
          value: '2-3',
          customerTags: ['Regular Family'],
          filter: { field: 'capacity', operator: 'gte', value: 8 }
        },
        {
          label: '4-5 personer',
          value: '4-5',
          customerTags: ['Large Family'],
          filter: { field: 'capacity', operator: 'gte', value: 9 }
        },
        {
          label: '5 eller flere',
          value: '5+',
          customerTags: ['XL Household'],
          filter: { field: 'capacity', operator: 'gte', value: 10 }
        }
      ]
    },
    {
      id: 'frequency',
      question: 'Hvor ofte vasker du/i?',
      options: [
        {
          label: 'Hver dag',
          value: 'daily',
          customerTags: ['Heavy User']
        },
        {
          label: '4-6 gange om ugen',
          value: 'high',
          customerTags: ['Frequent User']
        },
        {
          label: '2-3 gange om ugen',
          value: 'medium',
          customerTags: ['Average User']
        },
        {
          label: '1 gang om ugen',
          value: 'low',
          customerTags: ['Light User']
        }
      ]
    },
    {
      id: 'refresh_needs',
      question: 'Hvor ofte vasker du tøj, du kun har haft på en gang, som ikke er beskidt?',
      options: [
        {
          label: 'Næsten hver gang (Jeg vil bare friske det op)',
          value: 'often',
          customerTags: ['Steam Lover'],
          filter: { field: 'features', operator: 'includes', value: 'steam' }
        },
        {
          label: 'Det sker af og til',
          value: 'sometimes',
          customerTags: ['Steam Interested']
        },
        {
          label: 'Aldrig, alt mit tøj er beskidt',
          value: 'never',
          customerTags: ['Traditional Washer']
        }
      ]
    },
    {
      id: 'clothing_care',
      question: 'Hvad betyder det for dig/jer at tøj holder så længe som muligt?',
      options: [
        {
          label: 'Vi køber bare noget nyt, når det er slidt',
          value: 'low_care',
          customerTags: ['Fast Consumer']
        },
        {
          label: 'Jeg har meget dyrt tøj, jeg gerne vil passe på',
          value: 'high_care',
          customerTags: ['Gentle Care Needed']
        },
        {
          label: 'Jeg vil gerne passe på klimaet (tøj skal holde)',
          value: 'climate',
          customerTags: ['Eco Warrior'],
          filter: { field: 'energyLabel', operator: 'equals', value: 'A' }
        },
        {
          label: 'Det har jeg ingen holdning til',
          value: 'neutral',
          customerTags: ['Pragmatic']
        }
      ]
    },
    {
      id: 'dosing_knowledge',
      question: 'Hvordan ved du hvor meget sæbe du skal bruge til en vask?',
      options: [
        {
          label: 'Det ved jeg ikke, jeg gætter',
          value: 'guess',
          customerTags: ['AutoDose Candidate'],
          filter: { field: 'features', operator: 'includes', value: 'autodose' }
        },
        {
          label: 'Det betyder ikke noget for mig',
          value: 'indifferent',
          customerTags: ['Basic User']
        },
        {
          label: 'Jeg vejer mit tøj hver gang',
          value: 'manual_expert',
          customerTags: ['Manual Pro']
        },
        {
          label: 'Det ved jeg ikke, men vil gerne skåne miljøet',
          value: 'eco_conscious',
          customerTags: ['Eco Saver'],
          filter: { field: 'features', operator: 'includes', value: 'autodose' }
        }
      ]
    },
    {
      id: 'brand_preference',
      question: 'Hvor meget betyder mærket på vaskemaskinen for dig?',
      options: [
        {
          label: 'Det skal være AEG',
          value: 'AEG',
          customerTags: ['AEG Loyal'],
          filter: { field: 'brand', operator: 'equals', value: 'AEG' }
        },
        {
          label: 'Det skal være Siemens',
          value: 'Siemens',
          customerTags: ['Siemens Loyal'],
          filter: { field: 'brand', operator: 'equals', value: 'Siemens' }
        },
        {
          label: 'Det skal være Miele',
          value: 'Miele',
          customerTags: ['Miele Loyal'],
          filter: { field: 'brand', operator: 'equals', value: 'Miele' }
        },
        {
          label: 'Det skal være Electrolux',
          value: 'Electrolux',
          customerTags: ['Electrolux Loyal'],
          filter: { field: 'brand', operator: 'equals', value: 'Electrolux' }
        },
        {
          label: 'Det betyder ikke noget',
          value: 'any',
          customerTags: ['Brand Agnostic']
        }
      ]
    },
    {
      id: 'wash_time',
      question: 'Hvor lang tid må en vask tage?',
      options: [
        {
          label: 'Hurtigt, men økonomisk (ca. 1 time)',
          value: 'fast_eco',
          customerTags: ['Efficiency Seeker']
        },
        {
          label: 'Bare hurtigt, pris ligemeget (ca. 1 time)',
          value: 'fast_any',
          customerTags: ['Time Saver'],
          filter: { field: 'features', operator: 'includes', value: 'quick_program' }
        },
        {
          label: 'Vaskens længde har ingen betydning',
          value: 'any_time',
          customerTags: ['Flexible User']
        },
        {
          label: 'Skal være billig i drift (lange øko programmer)',
          value: 'eco_slow',
          customerTags: ['Economy Saver']
        }
      ]
    },
    {
      id: 'ironing_needs',
      question: 'Ønsker du at bruge din vaskemaskine til at stryge dine skjorter?',
      options: [
        {
          label: 'Ja',
          value: 'yes',
          customerTags: ['Ironing Hater'],
          filter: { field: 'features', operator: 'includes', value: 'steam' }
        },
        {
          label: 'Nej',
          value: 'no',
          customerTags: ['No Iron Needs']
        }
      ]
    }
  ]
};

export const getQuestionsByCategory = (categoryId: string): CategoryConfig | undefined => {
  switch (categoryId) {
    case 'washing_machines':
      return CATEGORY_WASHING_MACHINES;
    default:
      return undefined;
  }
};
