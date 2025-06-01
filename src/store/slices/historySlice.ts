import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import { 
  HistoryItemInterface, 
  HistoryStoreType 
} from '@/types'; 

// Initialize empty history store
const initialState: HistoryStoreType = { 
  items: [], 
  recentItems: [], 
  maxItems: 100, 
  metadata: { 
    totalItems: 0, 
    avgExecutionTime: 0, 
  }, 
}; 

// Define history state updates
const historySlice = createSlice({ 
  name: 'history', 
  initialState, 
  reducers: { 
    addItem(state, action: PayloadAction<HistoryItemInterface>) { 
      const item = action.payload; 
      state.items.unshift(item); 
      
      // Calculate history statistics
      state.metadata.totalItems = state.items.length; 
      
      if (item.executionTime) { 
        const totalExecutionTime = state.items.reduce((sum, item) => 
          sum + (item.executionTime || 0), 0 
        ); 
        state.metadata.avgExecutionTime = totalExecutionTime / state.items.length; 
      } 
      
      // Keep most recent queries for quick access
      state.recentItems = state.items.slice(0, 5); 
      
      // Limit total history size
      if (state.items.length > state.maxItems) { 
        state.items.pop(); 
      } 
    }, 

    // Reset history to initial state
    clearHistory() { 
      return initialState; 
    } 
  } 
}); 

// Export history reducers
export const { 
  addItem, 
  clearHistory 
} = historySlice.actions; 

// Get history data from store
export const selectHistoryState = (state: { history: HistoryStoreType }) => state.history; 
// Get all history entries
export const selectHistoryItems = (state: { history: HistoryStoreType }) => state.history.items;
// Get history statistics
export const selectHistoryMetadata = (state: { history: HistoryStoreType }) => state.history.metadata;
// Get latest history entries
export const selectRecentHistoryItems = (state: { history: HistoryStoreType }) => state.history.recentItems;

export default historySlice.reducer;
