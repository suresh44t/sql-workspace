import { Action } from 'redux'; 
import { ThunkAction } from 'redux-thunk'; 
import { 
  QueryStoreType, 
  ResultsStoreType, 
  HistoryStoreType, 
  ToastsStoreType 
} from './features'; 

// Complete Redux store structure
export interface RootStoreInterface { 
  query: QueryStoreType; 
  results: ResultsStoreType; 
  history: HistoryStoreType; 
  toast: ToastsStoreType; 
} 

// Individual feature state selectors
export type StateWithToast = { toast: ToastsStoreType }; 
export type StateWithQuery = { query: QueryStoreType }; 
export type StateWithResults = { results: ResultsStoreType }; 
export type StateWithHistory = { history: HistoryStoreType }; 

// Redux action and thunk types
export type AppDispatchType = (action: any) => any; 
export type AppGetStateType = () => RootStoreInterface; 
export type AppThunkType<ReturnType = void> = 
  ThunkAction<Promise<ReturnType>, RootStoreInterface, unknown, Action>;
