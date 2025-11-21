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
          filter: { field: 'capacity', operator: 'gte', value: 6 }
        },
        {
          label: '2-3 personer',
          value: '2-3',
          filter: { field: 'capacity', operator: 'gte', value: 8 }
        },
        {
          label: '4-5 personer',
          value: '4-5',
          filter: { field: 'capacity', operator: 'gte', value: 9 }
        },
        {
          label: '5 eller flere',
          value: '5+',
          filter: { field: 'capacity', operator: 'gte', value: 10 }
        }
      ]
    },
    {
      id: 'frequency',
      question: 'Hvor ofte vasker du/i?',
      options: [
        { label: 'Hver dag', value: 'daily' },
        { label: '4-6 gange om ugen', value: 'high' },
        { label: '2-3 gange om ugen', value: 'medium' },
        { label: '1 gang om ugen', value: 'low' }
      ]
    },
    {
      id: 'refresh_needs',
      question: 'Hvor ofte vasker du tøj, du kun har haft på en gang, som ikke er beskidt?',
      options: [
        {
          label: 'Næsten hver gang (Jeg vil bare friske det op)',
          value: 'often',
          filter: { field: 'features', operator: 'contains', value: 'steam' }
        },
        {
          label: 'Det sker af og til',
          value: 'sometimes'
        },
        {
          label: 'Aldrig, alt mit tøj er beskidt',
          value: 'never'
        }
      ]
    },
    {
      id: 'clothing_care',
      question: 'Hvad betyder det for dig/jer at tøj holder så længe som muligt?',
      options: [
        { label: 'Vi køber bare noget nyt, når det er slidt', value: 'low_care' },
        {
          label: 'Jeg har meget dyrt tøj, jeg gerne vil passe på',
          value: 'high_care'
        },
        {
          label: 'Jeg vil gerne passe på klimaet (tøj skal holde)',
          value: 'climate',
          filter: { field: 'energyClass', operator: 'eq', value: 'A' }
        },
        { label: 'Det har jeg ingen holdning til', value: 'neutral' }
      ]
    },
    {
      id: 'dosing_knowledge',
      question: 'Hvordan ved du hvor meget sæbe du skal bruge til en vask?',
      options: [
        {
          label: 'Det ved jeg ikke, jeg gætter',
          value: 'guess',
          filter: { field: 'features', operator: 'contains', value: 'autodose' }
        },
        { label: 'Det betyder ikke noget for mig', value: 'indifferent' },
        { label: 'Jeg vejer mit tøj hver gang', value: 'manual_expert' },
        {
          label: 'Det ved jeg ikke, men vil gerne skåne miljøet',
          value: 'eco_conscious',
          filter: { field: 'features', operator: 'contains', value: 'autodose' }
        }
      ]
    },
    {
      id: 'brand_preference',
      question: 'Hvor meget betyder mærket på vaskemaskinen for dig?',
      options: [
        { label: 'Det skal være AEG', value: 'AEG', filter: { field: 'brand', operator: 'eq', value: 'AEG' } },
        { label: 'Det skal være Siemens', value: 'Siemens', filter: { field: 'brand', operator: 'eq', value: 'Siemens' } },
        { label: 'Det skal være Miele', value: 'Miele', filter: { field: 'brand', operator: 'eq', value: 'Miele' } },
        { label: 'Det skal være Electrolux', value: 'Electrolux', filter: { field: 'brand', operator: 'eq', value: 'Electrolux' } },
        { label: 'Det betyder ikke noget hvilket mærke det er', value: 'any' }
      ]
    },
    {
      id: 'wash_time',
      question: 'Hvor lang tid må en vask tage?',
      options: [
        {
          label: 'Hurtigt, men økonomisk (ca. 1 time)',
          value: 'fast_eco'
        },
        {
          label: 'Bare hurtigt, pris ligemeget (ca. 1 time)',
          value: 'fast_any',
          filter: { field: 'features', operator: 'contains', value: 'quick' }
        },
        { label: 'Vaskens længde har ingen betydning', value: 'any_time' },
        { label: 'Skal være billig i drift (lange øko programmer)', value: 'eco_slow' }
      ]
    },
    {
      id: 'ironing_needs',
      question: 'Ønsker du at bruge din vaskemaskine til at stryge dine skjorter?',
      options: [
        {
          label: 'Ja',
          value: 'yes',
          filter: { field: 'features', operator: 'contains', value: 'steam' }
        },
        { label: 'Nej', value: 'no' }
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
