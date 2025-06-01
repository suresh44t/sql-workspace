// Component imports and type definitions
import { FC } from 'react'; 
import { LoadingSpinnerInterface } from '@/types'; 
import './LoadingSpinner.scss'; 

// Animated spinner component with size and color variants
export const LoadingSpinner: FC<LoadingSpinnerInterface> = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '' 
}) => { 
  return ( 
    <div 
      className={`loading-spinner size-${size} variant-${variant} ${className}`.trim()} 
      role="progressbar" 
      aria-label="Loading" 
    > 
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        aria-hidden="true"  
      > 
        <circle cx="12" cy="12" r="10" opacity="0.25" /> 
        <path 
          d="M12 2a10 10 0 0 1 10 10" 
          opacity="0.75" 
        /> 
      </svg> 
    </div> 
  ); 
}; 

LoadingSpinner.displayName = 'LoadingSpinner';
