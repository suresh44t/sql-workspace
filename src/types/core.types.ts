// Available company names for queries
export type CompanyNameType = 'atlan' | 'google' | 'microsoft' | 'meta' | 'apple' | 'pega';

// Supported SQL dialects
export type QueryLanguageType = 'sql' | 'mysql' | 'postgresql';

// Application loading states
export type StatusType = 'idle' | 'loading' | 'success' | 'error';

// Generic operation metadata
export interface MetadataInterface {
  executionTime?: number;
  timestamp?: number;
}

// Error information structure
export interface ErrorDetailsInterface {
  message: string;
  code?: string;
}
