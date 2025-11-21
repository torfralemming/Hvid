import { CategoryConfig } from '../types';

export const CATEGORY_WASHING_MACHINES: CategoryConfig = {
  id: 'washing_machines',
  name: 'Vaskemaskiner',
  questions: [
    {
      id: 'capacity',
      question: 'Hvor mange personer er i husstanden?',
      options: [
        {
          label: '1-2 personer (Lille behov)',
          value: 'small',
          filter: { field: 'capacity', operator: 'gte', value: 5 }
        },
        {
          label: '3-4 personer (Familie)',
          value: 'medium',
          filter: { field: 'capacity', operator: 'gte', value: 8 }
        },
        {
          label: '5+ personer (Stor familie)',
          value: 'large',
          filter: { field: 'capacity', operator: 'gte', value: 9 }
        }
      ]
    },
    {
      id: 'placement',
      question: 'Hvor skal maskinen stå?',
      options: [
        {
          label: 'Badeværelse / Bryggers (God plads)',
          value: 'standard'
        },
        {
          label: 'Lille lejlighed (Smalle modeller)',
          value: 'slim',
          filter: { field: 'depth', operator: 'lte', value: 50 }
        }
      ]
    },
    {
      id: 'features',
      question: 'Er der specielle ønsker?',
      multiSelect: true,
      options: [
        {
          label: 'Automatisk dosering (AutoDose)',
          value: 'autodose',
          filter: { field: 'features', operator: 'contains', value: 'autodose' }
        },
        {
          label: 'Damp funktion',
          value: 'steam',
          filter: { field: 'features', operator: 'contains', value: 'steam' }
        },
        {
          label: 'Støjsvag',
          value: 'silent',
          filter: { field: 'noiseDB', operator: 'lte', value: 72 }
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
