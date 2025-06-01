import { useAppSelector, useAppDispatch } from '@/store/hooks'; 
import { 
  selectResultsData, 
  selectResultsColumns, 
  selectResultsStatus, 
  selectResultsError, 
  selectResultsMetadata, 
  setResults as setResultsAction, 
  clearResults as clearResultsAction 
} from '@/store/slices'; 
import { exportResultsData } from '@/utils'; 
import { 
  UseResultsReturnInterface, 
  ResultsDataInterface, 
  ExportFormatType 
} from '@/types'; 

export const useResults = (): UseResultsReturnInterface => { 
  // Get query results state from store
  const results = useAppSelector(selectResultsData); 
  const columns = useAppSelector(selectResultsColumns); 
  const status = useAppSelector(selectResultsStatus); 
  const error = useAppSelector(selectResultsError); 
  const metadata = useAppSelector(selectResultsMetadata); 
  const dispatch = useAppDispatch(); 

  // Update results in store
  const setResults = (data: ResultsDataInterface) => { 
    dispatch(setResultsAction(data)); 
  }; 

  // Reset query results state
  const clearResults = () => { 
    dispatch(clearResultsAction()); 
  }; 

  // Export results to file in selected format
  const exportData = (format: ExportFormatType) => { 
    if (results && columns) { 
      exportResultsData(format, results, columns); 
    } 
  }; 

  return { 
    // Results grid data and state
    results, 
    columns, 
    status, 
    error, 
    metadata, 

    // Results manipulation methods
    setResults, 
    clearResults, 
    exportData 
  }; 
};
