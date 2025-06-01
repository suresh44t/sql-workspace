// Component imports and type definitions
import { FC } from 'react'; 
import { ErrorBoundary, Toast } from '@/components/common'; 
import { useToasts } from '@/hooks'; 
import { ToastItemInterface } from '@/types'; 
import './Toasts.scss'; 

// Toast notifications container component
const ToastsContent: FC = () => { 
  // Get active toasts from store
  const { toasts, remove } = useToasts(); 

  // Only render if there are active toasts
  if (!toasts.length) {return null;} 

  return ( 
    <div 
      className="toasts" 
      role="complementary" 
      aria-label="Notifications" 
    > 
      {toasts.slice().reverse().map((toast: ToastItemInterface) => ( 
        <Toast 
          key={toast.id} 
          {...toast} 
          onClose={remove} 
        /> 
      ))} 
    </div> 
  ); 
}; 

ToastsContent.displayName = 'ToastsContent'; 

// Toasts component with error boundary
export const Toasts: FC = () => { 
  return ( 
    <ErrorBoundary 
      onError={(error: Error) => { 
        console.error('Toasts Error:', error); 
      }} 
    > 
      <ToastsContent /> 
    </ErrorBoundary> 
  ); 
}; 

Toasts.displayName = 'Toasts';
