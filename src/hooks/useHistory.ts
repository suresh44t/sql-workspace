import { useCallback } from 'react'; 
import { useAppDispatch, useAppSelector } from '@/store/hooks'; 
import { 
  selectHistoryItems, 
  selectHistoryMetadata, 
  selectRecentHistoryItems, 
  addItem, 
  clearHistory, 
  selectQueryText, 
  selectQueryLanguage 
} from '@/store/slices'; 
import { generateId } from '@/utils'; 

import { 
  UseHistoryReturnInterface, 
  HistoryExecutionDataInterface, 
  HistoryItemInterface 
} from '@/types'; 

export const useHistory = (): UseHistoryReturnInterface => { 
  // Get query history and current editor state
  const items = useAppSelector(selectHistoryItems); 
  const metadata = useAppSelector(selectHistoryMetadata); 
  const recentItems = useAppSelector(selectRecentHistoryItems); 
  const currentText = useAppSelector(selectQueryText); 
  const currentLanguage = useAppSelector(selectQueryLanguage); 
  const dispatch = useAppDispatch(); 

  // Create new history entry with execution data
  const handleAddToHistory = useCallback((executionData: HistoryExecutionDataInterface) => { 
    const historyItem: HistoryItemInterface = { 
      id: generateId(), 
      text: currentText, 
      timestamp: Date.now(), 
      language: currentLanguage, 
      ...executionData 
    }; 
    dispatch(addItem(historyItem)); 
  }, [dispatch, currentText, currentLanguage]); 

  // Remove all history entries
  const handleClearHistory = () => { 
    dispatch(clearHistory()); 
  }; 

  // Provide history data and methods
  return { 
    // Query execution history state
    items, 
    metadata, 
    recentItems, 

    // History management methods
    addToHistory: handleAddToHistory, 
    clearHistory: handleClearHistory, 
  }; 
};
