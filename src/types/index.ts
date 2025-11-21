export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  specs: Record<string, string | number | boolean>;
  features: string[];
}

export type FilterOperator = 'gte' | 'lte' | 'eq' | 'contains';

export interface FilterCriteria {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean;
}

export interface QuestionOption {
  label: string;
  value: string;
  filter?: FilterCriteria;
}

export interface Question {
  id: string;
  question: string;
  multiSelect?: boolean;
  options: QuestionOption[];
}

export interface CategoryConfig {
  id: string;
  name: string;
  questions: Question[];
}
