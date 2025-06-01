import { saveAs } from 'file-saver'; 
import { utils as XLSXUtils, write as writeXLSX } from 'xlsx'; 
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

// Export data to Excel format
const exportAsExcel = ( 
  data: CompanyRecordInterface[], 
  columns: ColumnDefinitionInterface[] 
): void => { 
  // Extract column headers
  const headers = columns.map(col => col.label); 
  
  // Convert records to array format
  const rows = data.map(row => 
    columns.map(col => row[col.name]) 
  ); 

  // Generate Excel worksheet
  const worksheet = XLSXUtils.aoa_to_sheet([headers, ...rows]); 
  
  // Create Excel workbook with data
  const workbook = XLSXUtils.book_new(); 
  XLSXUtils.book_append_sheet(workbook, worksheet, 'Results'); 

  // Convert workbook to buffer
  const excelBuffer = writeXLSX(workbook, { bookType: 'xlsx', type: 'array' }); 
  
  // Create downloadable Excel file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); 
  saveAs(blob, `query-results-${new Date().toISOString()}.xlsx`); 
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
    case 'xlsx': 
      exportAsExcel(data, columns); 
      break; 
    case 'json': 
      exportAsJSON(data); 
      break; 
  } 
};
