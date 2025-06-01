import { SortingState, ColumnFiltersState } from '@tanstack/react-table'; 
import { BaseComponentInterface } from '../ui.types'; 
import { CompanyRecordInterface, ColumnDefinitionInterface, ResultsDataInterface } from '../models.types'; 
import { StatusType, MetadataInterface } from '../core.types'; 
import { ExportFormatType } from '../utils.types'; 

// Results grid component props types
export interface ResultsInterface extends BaseComponentInterface { 
  config?: { 
    allowExport?: boolean; 
  }; 
} 

export interface ResultsExportInterface extends BaseComponentInterface { 
  onExport: (format: ExportFormatType) => void; 
  disabled?: boolean; 
  'aria-controls'?: string; 
} 

export interface ResultsToolbarInterface extends BaseComponentInterface { 
  globalFilter: string; 
  onGlobalFilterChange: (value: string) => void; 
  onExport: (format: ExportFormatType) => void; 
  allowExport?: boolean; 
  disabled?: boolean; 
} 

export interface ResultsPaginationInterface extends BaseComponentInterface { 
  pageIndex: number; 
  pageCount: number; 
  pageSize: number; 
  canPreviousPage: boolean; 
  canNextPage: boolean; 
  onPageSizeChange: (size: number) => void; 
  onPageChange: (page: number) => void; 
  onPreviousPage: () => void; 
  onNextPage: () => void; 
} 

// Results execution statistics
export interface ResultsMetadataInterface extends MetadataInterface { 
  totalRows: number; 
  executionTime: number; 
} 

// Results pagination state
export type ResultsPaginationStateType = { 
  pageIndex: number; 
  pageSize: number; 
}; 

export type ResultsStoreType = { 
  data: ResultsDataInterface | null; 
  status: StatusType; 
  error: string | null; 
  metadata: ResultsMetadataInterface; 
}; 

// Table sorting and filtering types
export type ResultsSortingStateType = SortingState; 
export type ResultsColumnFiltersStateType = ColumnFiltersState; 

// Results hook return values and methods
export interface UseResultsReturnInterface { 
  // Current results data
  results: CompanyRecordInterface[] | null; 
  columns: ColumnDefinitionInterface[]; 
  status: StatusType; 
  error: string | null; 
  metadata: ResultsMetadataInterface; 

  // Results manipulation methods
  setResults: (data: ResultsDataInterface) => void; 
  clearResults: () => void; 
  exportData: (format: ExportFormatType) => void; 
}
