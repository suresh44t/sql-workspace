import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { AppThunkType } from '@/types'; 
import { 
  setLoading, 
  setResults, 
  setError, 
  updateMetadata 
} from './resultsSlice'; 
import { addItem } from './historySlice'; 
import { generateId } from '@/utils'; 

import { 
  QueryLanguageType, 
  QueryStoreType, 
  ResultsDataInterface, 
  ColumnDefinitionInterface, 
  HistoryItemInterface 
} from '@/types'; 

// Initial query editor configuration
const initialState: QueryStoreType = { 
  text: '', 
  isValid: false, 
  isDirty: false, 
  language: 'sql', 
  lastQuery: '' 
}; 

// Define query state updates
const querySlice = createSlice({ 
  name: 'query', 
  initialState, 
  reducers: { 
    // Update query editor content
    setQuery(state, action: PayloadAction<string>) { 
      state.text = action.payload; 
      state.isDirty = true; 
    }, 
    
    // Update syntax validation status
    setValidity(state, action: PayloadAction<boolean>) { 
      state.isValid = action.payload; 
    }, 

    // Change SQL dialect type
    setLanguage(state, action: PayloadAction<QueryLanguageType>) { 
      state.language = action.payload; 
    }, 

    // Save query as last executed
    resetDirty(state) { 
      state.isDirty = false; 
      state.lastQuery = state.text; 
    }, 

    // Clear query editor state
    resetQuery() { 
      return initialState; 
    } 
  } 
}); 

// Export query reducers
export const { 
  setQuery, 
  setValidity, 
  setLanguage, 
  resetDirty, 
  resetQuery 
} = querySlice.actions; 

// Async query execution
export const executeQuery = (): AppThunkType => 
  async (dispatch, getState) => { 
    const state = getState(); 
    const { text, isValid } = state.query; 
    
    if (!text.trim() || !isValid) {return;} 
    
    try { 
      dispatch(resetDirty()); 
      dispatch(setLoading()); 

      // Add artificial delay for demo
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      // Extract target company from query
      const match = text.match(/select \* from (\w+)/i); 
      if (!match) { 
        throw new Error('Invalid query format. Expected: select * from companyName'); 
      } 
      
      const companyName = match[1].toLowerCase(); 

      // Load and generate mock data asynchronously
      const { getMockData } = await import('@/data/mockData');
      const mockData = await getMockData();
      
      // Filter results based on company name
      const filteredResults = companyName === 'pega' 
        ? mockData 
        : mockData.filter(record => record.company === companyName);

      if (filteredResults.length === 0) { 
        throw new Error(`No records found for company: ${companyName}`); 
      } 
      
      // Configure result columns structure
      const columns: ColumnDefinitionInterface[] = Object.entries(filteredResults[0]).map(([key, value]) => ({ 
        name: key, 
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter 
        size: 150, // Default size 
        type: typeof value === 'number' ? 'number' : 
              typeof value === 'boolean' ? 'boolean' : 
              typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) ? 'datetime' : 
              'string' 
      })); 

      // Save query execution results
      const resultsData: ResultsDataInterface = { 
        results: filteredResults, 
        columns, 
        timestamp: Date.now() 
      }; 
      dispatch(setResults(resultsData)); 

      dispatch(updateMetadata({ 
        totalRows: filteredResults.length, 
        executionTime: 1 
      })); 

      // Record successful query execution
      const executionTime = 1; 
      const historyItem: Omit<HistoryItemInterface, 'id'> = { 
        text, 
        timestamp: Date.now(), 
        language: state.query.language, 
        executionTime, 
        rowCount: filteredResults.length 
      }; 
      dispatch(addItem({ ...historyItem, id: generateId() })); 

    } catch (error) { 
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred')); 
    } 
  }; 

// Get query state from store
export const selectQueryState = (state: { query: QueryStoreType }) => state.query; 
// Get editor content
export const selectQueryText = (state: { query: QueryStoreType }) => state.query.text;
// Get syntax validation status
export const selectQueryValidity = (state: { query: QueryStoreType }) => state.query.isValid;
// Get selected SQL dialect
export const selectQueryLanguage = (state: { query: QueryStoreType }) => state.query.language;
// Get modified status
export const selectQueryDirty = (state: { query: QueryStoreType }) => state.query.isDirty;
// Get previously executed query
export const selectLastQuery = (state: { query: QueryStoreType }) => state.query.lastQuery;

export default querySlice.reducer;
