import { saveAs } from 'file-saver';
import { 
  CompanyRecordInterface, 
  ColumnDefinitionInterface, 
  ExportFormatType 
} from '@/types'; 

// Convert any value to safe string format
const formatValue = (value: string | number | boolean | null | undefined): string => { 
  if (value === null || value === undefined) {return '';} 
  return String(value); 
}; 

// Export data to CSV format
const exportAsCSV = ( 
  data: CompanyRecordInterface[], 
  columns: ColumnDefinitionInterface[] 
): void => { 
  // Build CSV header from column labels
  const csvHeader = columns.map(col => `"${col.label}"`).join(','); 

  // Convert records to CSV format
  const csvRows = data.map(row => 
    columns 
      .map(col => `"${formatValue(row[col.name])}"`) 
      .join(',') 
  ); 

  // Join CSV rows into single string
  const csvContent = [csvHeader, ...csvRows].join('\n'); 

  // Create downloadable CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' }); 
  saveAs(blob, `query-results-${new Date().toISOString()}.csv`); 
}; 

// Export data to JSON format
const exportAsJSON = (data: CompanyRecordInterface[]): void => { 
  const jsonContent = JSON.stringify(data, null, 2); 
  const blob = new Blob([jsonContent], { type: 'application/json' }); 
  saveAs(blob, `query-results-${new Date().toISOString()}.json`); 
}; 

// Export results in selected format
export const exportResultsData = ( 
  format: ExportFormatType, 
  data: CompanyRecordInterface[], 
  columns: ColumnDefinitionInterface[] 
): void => { 
  if (!data?.length) {return;} 

  switch (format) { 
    case 'csv': 
      exportAsCSV(data, columns); 
      break; 
    case 'json': 
      exportAsJSON(data); 
      break; 
  } 
};
