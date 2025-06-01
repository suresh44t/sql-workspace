// Component imports and type definitions
import { FC } from 'react'; 
import { Button } from '@/components/common'; 
import { ExportFormatType, ResultsExportInterface } from '@/types'; 
import './ResultsExport.scss'; 

// Export options component for results data
export const ResultsExport: FC<ResultsExportInterface> = ({ 
  onExport, 
  disabled = false, 
  'aria-label': ariaLabel, 
  'aria-controls': ariaControls, 
}) => { 
  // Handle keyboard accessibility for export buttons
  const handleKeyDown = (e: React.KeyboardEvent, format: ExportFormatType) => { 
    if (e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      onExport(format); 
    } 
  }; 

  return ( 
    <div 
      className="results-export" 
      role="group" 
      aria-label={ariaLabel || "Export options"} 
      aria-controls={ariaControls} 
    > 
      <div className="results-export-buttons"> 
        <Button 
          onClick={() => onExport('csv')} 
          onKeyDown={e => handleKeyDown(e, 'csv')} 
          disabled={disabled} 
          size="sm" 
          aria-label="Export as CSV" 
        > 
          Export CSV 
        </Button> 

        <Button 
          onClick={() => onExport('xlsx')} 
          onKeyDown={e => handleKeyDown(e, 'xlsx')} 
          disabled={disabled} 
          size="sm" 
          aria-label="Export as Excel" 
        > 
          Export Excel 
        </Button> 

        <Button 
          onClick={() => onExport('json')} 
          onKeyDown={e => handleKeyDown(e, 'json')} 
          disabled={disabled} 
          size="sm" 
          aria-label="Export as JSON" 
        > 
          Export JSON 
        </Button> 
      </div> 
    </div> 
  ); 
}; 

ResultsExport.displayName = 'ResultsExport';
