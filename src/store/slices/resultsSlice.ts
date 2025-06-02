import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { 
  CompanyRecordInterface, 
  ColumnDefinitionInterface, 
  ResultsMetadataInterface, 
  ResultsStoreType, 
  ResultsDataInterface 
} from '@/types'; 

// Initialize empty results store
const initialState: ResultsStoreType = { 
  data: null, 
  status: 'idle', 
  error: null, 
  metadata: { 
    totalRows: 0, 
    executionTime: 0 
  } 
}; 

// Define results state updates
const resultsSlice = createSlice({ 
  name: 'results', 
  initialState, 
  reducers: { 
    // Store query execution results
    setResults(state, action: PayloadAction<ResultsDataInterface>) { 
      state.data = action.payload;
      state.status = 'success'; 
      state.error = null; 
    }, 
    
    // Set loading state during execution
    setLoading(state) { 
      state.status = 'loading'; 
      state.error = null; 
    }, 
    
    // Store execution error message
    setError(state, action: PayloadAction<string>) { 
      state.status = 'error'; 
      state.error = action.payload; 
    }, 

    // Update execution statistics
    updateMetadata(state, action: PayloadAction<Partial<ResultsMetadataInterface>>) { 
      state.metadata = { 
        ...state.metadata, 
        ...action.payload 
      }; 
    }, 

    // Reset results state
    clearResults() { 
      return initialState; 
    } 
  } 
}); 

// Export results reducers
export const { 
  setResults, 
  setLoading, 
  setError, 
  updateMetadata, 
  clearResults 
} = resultsSlice.actions; 

// Get results data from store
export const selectResultsState = (state: { results: ResultsStoreType }) => state.results; 
 
// Get query result records
export const selectResultsData = createSelector( 
  [selectResultsState], 
  (state): CompanyRecordInterface[] | null => state.data?.results || null 
); 

// Get result column definitions
export const selectResultsColumns = createSelector( 
  [selectResultsState], 
  (state): ColumnDefinitionInterface[] => state.data?.columns || [] 
); 

// Get current execution status
export const selectResultsStatus = createSelector( 
  [selectResultsState], 
  (state) => state.status 
); 

// Get execution error if any
export const selectResultsError = createSelector( 
  [selectResultsState], 
  (state) => state.error 
); 

// Get execution statistics
export const selectResultsMetadata = createSelector( 
  [selectResultsState], 
  (state) => state.metadata 
); 

export default resultsSlice.reducer;
