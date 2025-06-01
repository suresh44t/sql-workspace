// Component imports and type definitions
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react'; 
import { ErrorMessage, ErrorBoundary, LoadingBackdrop } from '@/components/common'; 
import { useResults } from '@/hooks'; 
import { exportResultsData } from '@/utils'; 
import { 
  ExportFormatType, 
  ResultsInterface, 
  ResultsSortingStateType, 
  ResultsColumnFiltersStateType, 
  ResultsPaginationStateType, 
  ColumnDefinitionInterface, 
  CompanyRecordInterface 
} from '@/types'; 
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  ColumnDef as TableColumnDef, 
} from '@tanstack/react-table'; 
import { useVirtualizer } from '@tanstack/react-virtual'; 
import Toolbar from './ResultsToolbar'; 
import Pagination from './ResultsPagination'; 
import './Results.scss'; 

const DEFAULT_PAGE_SIZE = 100; 

// Results grid with virtualization and sorting
const ResultsContent: FC<ResultsInterface> = memo(({ 
  config = { 
    allowExport: true 
  }, 
  className = '' 
}) => { 
  // Table state management
  const [sorting, setSorting] = useState<ResultsSortingStateType>([]); 
  const [columnFilters, setColumnFilters] = useState<ResultsColumnFiltersStateType>([]); 
  const [globalFilter, setGlobalFilter] = useState(''); 
  const [pagination, setPagination] = useState<ResultsPaginationStateType>({ 
    pageIndex: 0, 
    pageSize: DEFAULT_PAGE_SIZE 
  }); 

  // DOM refs and data hooks
  const tableContainerRef = useRef<HTMLDivElement>(null); 
  const headerRef = useRef<HTMLDivElement>(null); 
  const { results, columns, status, error } = useResults(); 
  const isLoading = status === 'loading'; 

  // Configure table columns and data
  const tableColumns = useMemo<TableColumnDef<CompanyRecordInterface>[]>(() => 
    columns.map((col: ColumnDefinitionInterface) => ({ 
      id: col.name, 
      accessorKey: col.name, 
      header: col.label, 
      size: col.size 
    })) 
  , [columns]); 

  const tableData = useMemo(() => results || [], [results]); 

  // Initialize table with features
  const table = useReactTable({ 
    data: tableData, 
    columns: tableColumns, 
    state: { 
      sorting, 
      columnFilters, 
      globalFilter, 
      pagination 
    }, 
    onSortingChange: setSorting, 
    onColumnFiltersChange: setColumnFilters, 
    onGlobalFilterChange: setGlobalFilter, 
    onPaginationChange: setPagination, 
    getCoreRowModel: getCoreRowModel(), 
    getSortedRowModel: getSortedRowModel(), 
    getFilteredRowModel: getFilteredRowModel(), 
    getPaginationRowModel: getPaginationRowModel(), 
    enableSorting: true 
  }); 

  // Virtual scroll optimization
  const { rows } = table.getRowModel(); 
  const rowVirtualizer = useVirtualizer({ 
    count: rows.length, 
    getScrollElement: () => tableContainerRef.current, 
    estimateSize: () => 40, 
    overscan: 5 
  }); 

  // Event handlers for table actions
  const handleExport = useCallback((format: ExportFormatType) => { 
    if (!results?.length) {return;} 
    exportResultsData(format, results, columns); 
  }, [results, columns]); 

  const handleTableScroll = () => { 
    if (headerRef.current && tableContainerRef.current) { 
      headerRef.current.scrollLeft = tableContainerRef.current.scrollLeft; 
    } 
  }; 

  // Table header with sorting indicators
  const renderTableHeader = () => { 
    if (!rows.length) {return null;} 
    
    return ( 
      <div 
        ref={headerRef} 
        className="results-table-header" 
        role="rowgroup" 
      > 
        {table.getHeaderGroups().map(headerGroup => ( 
          <div key={headerGroup.id} className="results-header"> 
            {headerGroup.headers.map(header => ( 
              <div 
                key={header.id} 
                className="results-header-cell" 
                style={{ width: header.getSize() }} 
                onClick={header.column.getToggleSortingHandler()} 
              > 
                {String(header.column.columnDef.header)} 
                {header.column.getIsSorted() && ( 
                  <span className={`results-header-sort is-${header.column.getIsSorted()}`}> 
                    {header.column.getIsSorted() === 'asc' ? '↑' : '↓'} 
                  </span> 
                )} 
              </div> 
            ))} 
          </div> 
        ))} 
      </div> 
    ); 
  }; 

  return ( 
    <section 
      id="results" 
      className={`results ${className}`.trim()} 
      aria-label="Query Results" 
    > 
      <div 
        className="results-content" 
        role="grid" 
        tabIndex={0} 
      > 
        <Toolbar 
          globalFilter={globalFilter} 
          onGlobalFilterChange={setGlobalFilter} 
          onExport={handleExport} 
          allowExport={config.allowExport} 
          disabled={!results?.length} 
        /> 

        <div className="results-table"> 
          {renderTableHeader()} 

          <div 
            ref={tableContainerRef} 
            className="results-table-body" 
            role="rowgroup" 
            onScroll={handleTableScroll} 
          > 
            {error ? ( 
              <ErrorMessage 
                error={error} 
                title="Query Results Error" 
              /> 
            ) : !rows.length ? ( 
              <div className="results-empty"> 
                No Results Found 
              </div> 
            ) : ( 
              rowVirtualizer.getVirtualItems().map(virtualRow => { 
                const row = rows[virtualRow.index]; 
                return ( 
                  <div 
                    key={row.id} 
                    className="results-row" 
                    role="row" 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: `${virtualRow.size}px`, 
                      transform: `translateY(${virtualRow.start}px)` 
                    }} 
                  > 
                    {row.getVisibleCells().map(cell => ( 
                      <div 
                        key={cell.id} 
                        className="results-cell" 
                        role="cell" 
                        style={{ width: cell.column.getSize() }} 
                      > 
                        {String(cell.getValue())} 
                      </div> 
                    ))} 
                  </div> 
                ); 
              }) 
            )} 
          </div> 
        </div> 

        <Pagination 
          pageIndex={pagination.pageIndex} 
          pageCount={table.getPageCount()} 
          pageSize={pagination.pageSize} 
          canPreviousPage={table.getCanPreviousPage()} 
          canNextPage={table.getCanNextPage()} 
          onPageSizeChange={(size: number) => table.setPageSize(size)} 
          onPageChange={(index: number) => table.setPageIndex(index)} 
          onPreviousPage={() => table.previousPage()} 
          onNextPage={() => table.nextPage()} 
        /> 
      </div> 

      {isLoading && ( 
        <LoadingBackdrop 
          isLoading 
          loadingMessage="Loading query results..." 
        /> 
      )} 
    </section> 
  ); 
}); 

ResultsContent.displayName = 'ResultsContent'; 

// Results component with error boundary
export const Results: FC<ResultsInterface> = props => { 
  return ( 
    <ErrorBoundary 
      onError={(error: Error) => { 
        console.error('Results Error:', error); 
      }} 
    > 
      <ResultsContent {...props} /> 
    </ErrorBoundary> 
  ); 
}; 

Results.displayName = 'Results';
