import { QueryLanguageType } from '../core.types'; 
import { BaseComponentInterface } from '../ui.types'; 
import { MetadataInterface } from '../core.types'; 

// History component props type
export interface HistoryInterface extends BaseComponentInterface {} 

// Event handler function types
export type HistoryKeyNavigationHandler = (e: React.KeyboardEvent, index: number) => void; 
export type HistoryItemClickHandler = (item: HistoryItemInterface) => void; 

// Query execution result data
export interface HistoryExecutionDataInterface { 
  executionTime?: number; 
  rowCount?: number; 
  error?: string; 
} 

// Single history entry data structure
export interface HistoryItemInterface { 
  id: string; 
  text: string; 
  timestamp: number; 
  language: QueryLanguageType; 
  executionTime?: number; 
  rowCount?: number; 
  error?: string; 
} 

// History statistics and metadata
export interface HistoryMetadataInterface extends MetadataInterface { 
  totalItems: number; 
  avgExecutionTime: number; 
} 

// History state in Redux store
export type HistoryStoreType = { 
  items: HistoryItemInterface[]; 
  maxItems: number; 
  metadata: HistoryMetadataInterface; 
  recentItems: HistoryItemInterface[]; 
}; 

// History hook return values and methods
export interface UseHistoryReturnInterface { 
  // Current history data
  items: HistoryItemInterface[]; 
  metadata: HistoryMetadataInterface; 
  recentItems: HistoryItemInterface[]; 

  // History manipulation methods
  addToHistory: (executionData: HistoryExecutionDataInterface) => void; 
  clearHistory: () => void; 
}
