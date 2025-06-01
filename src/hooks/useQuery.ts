import { useCallback } from 'react'; 
import { useAppDispatch, useAppSelector } from '@/store/hooks'; 
import { 
  selectQueryText, 
  selectQueryValidity, 
  selectQueryDirty, 
  selectQueryLanguage, 
  selectLastQuery, 
  setQuery, 
  setValidity, 
  setLanguage, 
  resetDirty, 
  executeQuery as executeQueryAction 
} from '@/store/slices'; 
import { addToast } from '@/store/slices'; 
import { UseQueryReturnInterface, QueryLanguageType } from '@/types'; 

export const useQuery = (): UseQueryReturnInterface => { 
  // Get query state from store
  const text = useAppSelector(selectQueryText); 
  const isValid = useAppSelector(selectQueryValidity); 
  const isDirty = useAppSelector(selectQueryDirty); 
  const language = useAppSelector(selectQueryLanguage); 
  const lastQuery = useAppSelector(selectLastQuery); 
  const dispatch = useAppDispatch(); 

  // Update editor content and state
  const handleSetText = useCallback((value: string) => { 
    dispatch(setQuery(value)); 
  }, [dispatch]); 

  // Set syntax validation status
  const handleSetValidity = useCallback((value: boolean) => { 
    dispatch(setValidity(value)); 
  }, [dispatch]); 

  // Reset modified state after save
  const handleResetDirty = useCallback(() => { 
    dispatch(resetDirty()); 
  }, [dispatch]); 

  // Update SQL dialect selection
  const handleSetLanguage = useCallback((value: QueryLanguageType) => { 
    dispatch(setLanguage(value)); 
  }, [dispatch]); 

  // Query execution and loading handlers
  const handleExecuteQuery = useCallback(async () => { 
    if (!text.trim() || !isValid) {return;} 

    // Prevent duplicate query execution
    if (text.trim() === lastQuery.trim()) { 
      dispatch(addToast({ 
        type: 'warning', 
        message: 'This query was just executed. Results are unchanged.', 
        duration: 3000 
      })); 
      return; 
    } 

    await dispatch(executeQueryAction()); 
  }, [dispatch, text, isValid, lastQuery]); 

  const handleLoadQuery = useCallback(async (queryText: string) => { 
    // Prevent loading duplicate query
    if (text === queryText) { 
      dispatch(addToast({ 
        type: 'warning', 
        message: 'This query is already in the editor.', 
        duration: 3000 
      })); 
      return; 
    } 

    // Prevent rerunning same query
    if (queryText === lastQuery) { 
      dispatch(addToast({ 
        type: 'warning', 
        message: 'This query matches the most recent execution. Results are unchanged.', 
        duration: 3000 
      })); 
      return; 
    } 

    handleSetText(queryText); 
    handleSetValidity(true); // Mark loaded queries as valid 
    await dispatch(executeQueryAction()); 
  }, [handleSetText, handleSetValidity, text, lastQuery, dispatch]); 

  return { 
    // Editor content and status
    text, 
    isValid, 
    isDirty, 
    language, 
    lastQuery, 

    // Query editing and execution methods
    setText: handleSetText, 
    setValidity: handleSetValidity, 
    resetDirty: handleResetDirty, 
    setLanguage: handleSetLanguage, 
    executeQuery: handleExecuteQuery, 
    loadQuery: handleLoadQuery 
  }; 
};
