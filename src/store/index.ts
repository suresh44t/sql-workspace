import { configureStore } from '@reduxjs/toolkit'; 
import { RootStoreInterface } from '@/types'; 
import queryReducer from './slices/querySlice'; 
import resultsReducer from './slices/resultsSlice'; 
import historyReducer from './slices/historySlice'; 
import toastReducer from './slices/toastSlice'; 

// Redux store configuration with feature reducers
export const store = configureStore<RootStoreInterface>({ 
  reducer: { 
    query: queryReducer, 
    results: resultsReducer, 
    history: historyReducer, 
    toast: toastReducer 
  } 
});
