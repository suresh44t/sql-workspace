// Component imports and type definitions
import { FC } from 'react'; 
import { ResultsExport } from './ResultsExport'; 
import { ResultsToolbarInterface } from '@/types'; 
import './ResultsToolbar.scss'; 

// Toolbar with search and export functionality
const ResultsToolbar: FC<ResultsToolbarInterface> = ({ 
  globalFilter, 
  onGlobalFilterChange, 
  onExport, 
  allowExport = true, 
  disabled = false 
}) => { 
  // Handle search input changes
  const handleSearchChange = (value: string) => { 
    onGlobalFilterChange(value); 
  }; 

  // Clear search on escape key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
    if (e.key === 'Escape' && globalFilter) { 
      e.preventDefault(); 
      handleSearchChange(''); 
      e.currentTarget.blur(); 
    } 
  }; 

  return ( 
    <div 
      className="results-toolbar" 
      role="toolbar" 
      aria-label="Results controls" 
    > 
      <div className="results-search-wrapper" role="search"> 
        <label className="sr-only">Search results</label> 
        <input 
          type="search" 
          value={globalFilter || ''} 
          onChange={e => handleSearchChange(e.target.value)} 
          onKeyDown={handleSearchKeyDown} 
          placeholder="Search results..." 
          className="results-toolbar-search" 
          aria-label="Search results" 
          disabled={disabled} 
        /> 
      </div> 

      {allowExport && ( 
        <ResultsExport 
          onExport={onExport} 
          disabled={disabled} 
          aria-label="Export options" 
        /> 
      )} 
    </div> 
  ); 
}; 

ResultsToolbar.displayName = 'ResultsToolbar'; 

export default ResultsToolbar;
