// Component imports and type definitions
import { FC } from 'react'; 
import { ButtonInterface } from '@/types';
import './Button.scss'; 

// Reusable button component with various styles and states
export const Button: FC<ButtonInterface> = ({ 
  variant = 'primary', 
  size = 'sm', 
  loading = false, 
  disabled = false, 
  className = '', 
  children, 
  ...props 
}) => { 
  // Combine class names based on props
  const classes = [ 
    'button', 
    `button-${variant}`, 
    `button-${size}`, 
    loading && 'is-loading', 
    className 
  ].filter(Boolean).join(' '); 

  return ( 
    <button 
      className={classes} 
      disabled={disabled || loading} 
      {...props} 
    > 
      {loading && ( 
        <span className="button-spinner" /> 
      )} 
      <span className={`button-text ${loading ? 'is-loading' : ''}`}> 
        {children} 
      </span> 
    </button> 
  ); 
}; 

Button.displayName = 'Button';
