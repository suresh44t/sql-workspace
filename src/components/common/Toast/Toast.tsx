// Component imports and type definitions
import { FC, useEffect } from 'react'; 
import { ToastProps } from '@/types'; 
import './Toast.scss'; 

// Toast notification component with auto-dismiss
export const Toast: FC<ToastProps> = ({ 
  id, 
  message, 
  type, 
  onClose, 
  duration = 5000, 
  className = '' 
}) => { 
  // Setup auto-dismiss functionality
  useEffect(() => { 
    const timer = setTimeout(() => onClose(id), duration); 
    return () => clearTimeout(timer); 
  }, [duration, onClose, id]); 

  // Combine class names based on type and props
  const classes = [ 
    'toast', 
    `toast-${type}`, 
    className 
  ].filter(Boolean).join(' '); 

  return ( 
    <div 
      className={classes} 
      role={type === 'error' ? 'alert' : 'status'} 
    > 
      <div className="toast-content"> 
        <div className="toast-message"> 
          {message} 
        </div> 
      </div> 
    </div> 
  ); 
}; 

Toast.displayName = 'Toast';
