// Component imports and type definitions
import { FC } from 'react'; 
import { ErrorMessageInterface } from '@/types';
import './ErrorMessage.scss'; 

// Display error messages with consistent styling
export const ErrorMessage: FC<ErrorMessageInterface> = ({ 
  error, 
  title = 'Error', 
  className = '' 
}) => { 
  // Convert error to string message
  const errorMessage = error instanceof Error ? error.message : error;

  return ( 
    <div 
      className={`error-message ${className}`.trim()} 
      role="alert" 
      aria-label={title} 
    > 
      <div className="error-message-title"> 
        {title} 
      </div> 
      <div className="error-message-content"> 
        {errorMessage} 
      </div> 
    </div> 
  ); 
}; 

ErrorMessage.displayName = 'ErrorMessage';
