import { 
  CompanyNameType, 
  CompanyRecordInterface, 
  ColumnWidthsType, 
  ColumnDefinitionInterface 
} from '@/types'; 

// Define column width constants for grid layout
export const COLUMN_WIDTHS: ColumnWidthsType = { 
  DEFAULT: 150, 
  SMALL: 120, 
  MEDIUM: 180, 
  LARGE: 220 
}; 

// Configure grid columns with metadata
export const columnDefinitions: ColumnDefinitionInterface[] = [ 
  { name: 'id', type: 'number', label: 'ID', size: COLUMN_WIDTHS.SMALL }, 
  { name: 'company', type: 'string', label: 'Company', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'department', type: 'string', label: 'Department', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'employee_count', type: 'number', label: 'Employee Count', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'revenue', type: 'number', label: 'Revenue ($)', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'location', type: 'string', label: 'Location', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'founded_year', type: 'number', label: 'Founded Year', size: COLUMN_WIDTHS.SMALL }, 
  { name: 'ceo', type: 'string', label: 'CEO', size: COLUMN_WIDTHS.LARGE }, 
  { name: 'industry', type: 'string', label: 'Industry', size: COLUMN_WIDTHS.MEDIUM }, 
  { name: 'project_count', type: 'number', label: 'Projects', size: COLUMN_WIDTHS.SMALL }, 
  { name: 'last_updated', type: 'date', label: 'Last Updated', size: COLUMN_WIDTHS.MEDIUM } 
]; 

// Available department options for mock data
const departments = [ 
  'Engineering', 
  'Sales', 
  'Marketing', 
  'Finance', 
  'HR', 
  'Product', 
  'Operations' 
]; 

// Industry categories for mock records
const industries = [ 
  'Technology', 
  'Software', 
  'Cloud Services', 
  'Social Media', 
  'E-commerce' 
]; 

// List of companies to generate data for
const companies: CompanyNameType[] = ['atlan', 'google', 'microsoft', 'meta', 'apple']; 

// Format date to consistent string format
const formatDate = (date: Date): string => { 
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }); 
}; 

// Generate mock data asynchronously
export const generateMockData = async (): Promise<CompanyRecordInterface[]> => {
  // Dynamic import of faker
  const { faker } = await import('@faker-js/faker');
  const records: CompanyRecordInterface[] = []; 

  // Create mock records with random but realistic data
  for (let i = 0; i < 10000; i++) { 
    const company = companies[i % companies.length] as CompanyNameType; 
    records.push({ 
      id: i + 1, 
      company, 
      department: faker.helpers.arrayElement(departments), 
      employee_count: faker.number.int({ min: 100, max: 10000 }), 
      revenue: faker.number.int({ min: 1000000, max: 1000000000 }), 
      location: faker.location.city(), 
      founded_year: faker.number.int({ min: 1990, max: 2020 }), 
      ceo: faker.person.fullName(), 
      industry: faker.helpers.arrayElement(industries), 
      project_count: faker.number.int({ min: 10, max: 1000 }), 
      last_updated: formatDate(faker.date.recent()) 
    }); 
  } 

  return records; 
}; 

// Lazy load and generate mock data
export const getMockData = async () => {
  let data: CompanyRecordInterface[] | undefined;
  
  if (!data) {
    data = await generateMockData();
  }
  
  return data;
};
