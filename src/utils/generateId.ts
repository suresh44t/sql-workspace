import { v4 as uuid } from 'uuid'; 

// Generate unique identifier using UUID v4
export const generateId = (): string => { 
  return uuid(); 
};
