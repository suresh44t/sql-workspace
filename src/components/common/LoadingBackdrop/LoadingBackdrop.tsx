// Component imports and type definitions
import { FC } from 'react'; 
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'; 
import { LoadingBackdropInterface } from '@/types'; 
import './LoadingBackdrop.scss'; 

// Overlay component to show loading state with spinner
export const LoadingBackdrop: FC<LoadingBackdropInterface> = ({ 
  isLoading = false, 
  className = '', 
  loadingMessage = 'Loading, please wait...' 
}) => { 
  // Only render when loading is active
  if (!isLoading) {return null;} 

  return ( 
    <div 
      className={`backdrop ${className}`.trim()} 
      role="alert" 
      aria-label={loadingMessage} 
    > 
      <div className="backdrop-content"> 
        <LoadingSpinner 
          size="lg" 
          variant="primary" 
        /> 
        <span className="sr-only"> 
          {loadingMessage} 
        </span> 
      </div> 
      <div 
        className="backdrop-overlay" 
        aria-hidden="true" 
      /> 
    </div> 
  ); 
}; 

LoadingBackdrop.displayName = 'LoadingBackdrop';
