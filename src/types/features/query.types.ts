import { CompanyNameType, QueryLanguageType } from '../core.types';
import { BaseComponentInterface } from '../ui.types';

// Query editor component props type
export interface QueryInterface extends BaseComponentInterface {
  defaultValue?: string;
}

// Predefined query template types
export type PredefinedQueryType = {
  value: `select * from ${CompanyNameType}`;
  label: `SELECT * FROM ${Uppercase<CompanyNameType>}`;
};

export type QueryOptionsType = [
  { value: ''; label: 'Select a predefined SQL query' },
  ...PredefinedQueryType[]
];

// Query state in Redux store
export type QueryStoreType = {
  text: string;
  isValid: boolean;
  isDirty: boolean;
  language: QueryLanguageType;
  lastQuery: string;
};

// Query hook return values and methods
export interface UseQueryReturnInterface {
  // Current query state
  text: string;
  isValid: boolean;
  isDirty: boolean;
  language: QueryLanguageType;
  lastQuery: string;

  // Query manipulation methods
  setText: (value: string) => void;
  setValidity: (value: boolean) => void;
  resetDirty: () => void;
  setLanguage: (value: QueryLanguageType) => void;
  executeQuery: () => Promise<void>;
  loadQuery: (queryText: string) => Promise<void>;
}
