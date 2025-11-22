export interface Category {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export const CATEGORIES: Category[] = [
  { id: 'washing_machines', name: 'Vaskemaskiner', icon: '🧺', enabled: true },
  { id: 'dishwashers', name: 'Opvaskemaskiner', icon: '🍽️', enabled: false },
  { id: 'ovens', name: 'Ovne', icon: '🔥', enabled: false },
  { id: 'refrigerators', name: 'Køleskabe', icon: '❄️', enabled: false },
  { id: 'tvs', name: 'TV', icon: '📺', enabled: false },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getEnabledCategories = (): Category[] => {
  return CATEGORIES.filter(cat => cat.enabled);
};
