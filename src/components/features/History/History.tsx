// Component imports and type definitions
import { FC, memo, useCallback } from 'react'; 
import { ErrorBoundary, LoadingBackdrop } from '@/components/common'; 
import { useHistory, useQuery, useResults } from '@/hooks'; 
import { 
  HistoryItemInterface, 
  HistoryInterface, 
  HistoryKeyNavigationHandler, 
  HistoryItemClickHandler 
} from '@/types'; 
import './History.scss'; 

// Main history content component with memo for performance
const HistoryContent: FC<HistoryInterface> = memo(({ 
  className = '' 
}) => { 
  // Initialize hooks for history, query and results state
  const { 
    items, 
    metadata 
  } = useHistory(); 

  const { text, loadQuery } = useQuery(); 
  const { status } = useResults(); 

  // Define loading state based on query execution status
  const isLoading = status === 'loading'; 

  // Handle keyboard navigation between history items
  const handleKeyNavigation: HistoryKeyNavigationHandler = useCallback((e: React.KeyboardEvent, index: number) => { 
    const historyItems = document.querySelectorAll('.history-item'); 
    
    let nextIndex = -1; 
    switch (e.key) { 
      case 'ArrowDown': 
        e.preventDefault(); 
        nextIndex = index < items.length - 1 ? index + 1 : -1; 
        break; 
      case 'ArrowUp': 
        e.preventDefault(); 
        nextIndex = index > 0 ? index - 1 : -1; 
        break; 
    } 

    if (nextIndex !== -1) { 
      const targetElement = historyItems[nextIndex] as HTMLElement; 
      targetElement?.focus(); 
    } 
  }, [items.length]); 

  // Load selected query into editor
  const handleItemClick: HistoryItemClickHandler = useCallback((entry: HistoryItemInterface) => {
      loadQuery(entry.text); 
  }, [loadQuery]); 

  // Render history component structure
  return ( 
    <div 
      id="history" 
      className={`history ${className}`.trim()} 
      role="complementary" 
      aria-label="Query History" 
    > 
      <h2 className="history-header" id="history-title"> 
        Query History {metadata.totalItems > 0 && `(${metadata.totalItems})`} 
      </h2> 
      <div 
        className="history-list" 
        role="list" 
        aria-labelledby="history-title" 
      > 
        {items.length === 0 ? ( 
          <div className="history-empty" role="alert"> 
            No queries executed yet 
          </div> 
        ) : ( 
          items.map((entry: HistoryItemInterface, index: number) => ( 
            <div 
              key={entry.id} 
              className={`history-item ${entry.executionTime ? 'is-success' : ''} ${index === 0 ? 'is-latest' : ''}`} 
              onClick={() => handleItemClick(entry)} 
              onKeyDown={(e) => { 
                handleKeyNavigation(e, index); 
                if (e.key === 'Enter' || e.key === ' ') { 
                  e.preventDefault(); 
                  handleItemClick(entry); 
                } 
              }} 
              role="button" 
              tabIndex={0} 
              aria-label={`${index === 0 ? 'Latest query' : 'Previous query'}: ${entry.text}`} 
              aria-current={index === 0 ? 'true' : undefined} 
              aria-disabled={entry.text === text} 
            > 
              <div className="history-item-header"> 
                <div className="history-item-time"> 
                  {new Date(entry.timestamp).toLocaleTimeString()} 
                </div> 
                {entry.rowCount !== undefined && ( 
                  <div className="history-item-rows"> 
                    {entry.rowCount.toLocaleString()} rows 
                  </div> 
                )} 
                {entry.executionTime !== undefined && ( 
                  <div className="history-item-duration"> 
                    {Math.round(entry.executionTime)}ms 
                  </div> 
                )} 
              </div> 
              <div className="history-item-query"> 
                {entry.text} 
              </div> 
            </div> 
          )) 
        )} 
      </div> 

      {isLoading && <LoadingBackdrop isLoading />} 
    </div> 
  ); 
}); 

HistoryContent.displayName = 'HistoryContent'; 

// Wrapper component with error boundary
export const History: FC<HistoryInterface> = props => {
  return ( 
    <ErrorBoundary 
      onError={(error: Error) => { 
        console.error('History Error:', error); 
      }} 
    > 
      <HistoryContent {...props} /> 
    </ErrorBoundary> 
  ); 
}; 

History.displayName = 'History';
