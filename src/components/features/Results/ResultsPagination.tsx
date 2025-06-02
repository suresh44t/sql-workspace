// Component imports and type definitions
import { FC, useCallback, useMemo } from 'react'; 
import { Button, Select } from '@/components/common'; 
import { ResultsPaginationInterface, PageSizeType } from '@/types'; 
import { PAGE_SIZES } from '@/constants'; 
import './ResultsPagination.scss'; 

// Pagination controls for results table
const ResultsPagination: FC<ResultsPaginationInterface> = ({ 
  pageIndex, 
  pageCount, 
  pageSize, 
  canPreviousPage, 
  canNextPage, 
  onPageSizeChange, 
  onPageChange, 
  onPreviousPage, 
  onNextPage 
}) => { 
  // Create options for rows per page select
  const pageSizeOptions = useMemo(() => PAGE_SIZES.map((size: PageSizeType) => ({ 
    value: size.toString(), 
    label: `Show ${size} rows per page` 
  })), []); 

  // Handle rows per page selection
  const handlePageSizeChange = useCallback((value: string) => { 
    onPageSizeChange(Number(value)); 
  }, [onPageSizeChange]); 

  // Keyboard navigation between pages
  const handleKeyDown = (e: React.KeyboardEvent) => { 
    switch (e.key) { 
      case 'ArrowLeft': 
        if (canPreviousPage) { 
          e.preventDefault(); 
          onPreviousPage(); 
        } 
        break; 
      case 'ArrowRight': 
        if (canNextPage) { 
          e.preventDefault(); 
          onNextPage(); 
        } 
        break; 
    } 
  }; 

  return ( 
    <nav 
      className="results-pagination" 
      aria-label="Results pagination" 
      onKeyDown={handleKeyDown} 
    > 
      <div className="results-pagination-size" role="group" aria-label="Rows per page"> 
        <Select 
          options={pageSizeOptions} 
          value={pageSize.toString()} 
          onChange={handlePageSizeChange} 
          size="sm" 
          variant="outlined" 
          direction="up" 
          disabled={pageCount === 0} 
          aria-label="Select rows per page" 
        /> 
      </div> 

      <div className="results-pagination-nav" role="group" aria-label="Page navigation"> 
        <Button 
          size="sm" 
          variant="outlined" 
          onClick={() => onPageChange(0)} 
          disabled={!canPreviousPage} 
          aria-label="First page" 
        > 
          {'<<'} 
        </Button> 
        <Button 
          size="sm" 
          variant="outlined" 
          onClick={onPreviousPage} 
          disabled={!canPreviousPage} 
          aria-label="Previous page" 
        > 
          {'<'} 
        </Button> 
        <span className="results-pagination-info" role="status" aria-live="polite"> 
          {pageCount === 0 ? ( 
            'Page 0 of 0' 
          ) : ( 
            `Page ${pageIndex + 1} of ${pageCount}` 
          )} 
        </span> 
        <Button 
          size="sm" 
          variant="outlined" 
          onClick={onNextPage} 
          disabled={!canNextPage} 
          aria-label="Next page" 
        > 
          {'>'} 
        </Button> 
        <Button 
          size="sm" 
          variant="outlined" 
          onClick={() => onPageChange(pageCount - 1)} 
          disabled={!canNextPage} 
          aria-label="Last page" 
        > 
          {'>>'} 
        </Button> 
      </div> 
    </nav> 
  ); 
}; 

ResultsPagination.displayName = 'ResultsPagination'; 

export default ResultsPagination;
