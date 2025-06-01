import { CompanyNameType } from './core.types';
import { PAGE_SIZES } from '@/constants';

// Page size configuration type
export type PageSizeType = typeof PAGE_SIZES[number];

// Company data record structure
export interface CompanyRecordInterface {
  id: number;
  company: CompanyNameType;
  department: string;
  employee_count: number;
  revenue: number;
  location: string;
  founded_year: number;
  ceo: string;
  industry: string;
  project_count: number;
  last_updated: string;
  [key: string]: string | number;
}

// Column width configuration
export type ColumnWidthsType = {
  DEFAULT: number;
  SMALL: number;
  MEDIUM: number;
  LARGE: number;
};

// Table sorting configuration
export type SortEntryType = {
  id: string;
  desc: boolean;
};

// Table filter configuration
export type FilterEntryType = {
  id: string;
  value: string;
};

// Dropdown option structure
export type SelectOptionType = {
  value: string;
  label: string;
};

// Table column definition
export interface ColumnDefinitionInterface {
  name: string;
  type: string;
  label: string;
  size: number;
}

// Query results data structure
export interface ResultsDataInterface {
  results: CompanyRecordInterface[];
  columns: ColumnDefinitionInterface[];
  timestamp: number;
}

// Pagination state structure
export interface PaginationInterface {
  pageIndex: number;
  pageSize: number;
  totalPages?: number;
}
