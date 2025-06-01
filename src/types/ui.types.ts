import { ButtonHTMLAttributes, ErrorInfo, ReactNode } from 'react'; 
import { SelectOptionType } from './models.types'; 
import { ToastVariantType } from './features/toasts.types'; 

// Component style variations
export type VariantType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outlined'; 
export type SizeType = 'sm' | 'md' | 'lg'; 
export type DirectionType = 'up' | 'down'; 

// Common component properties
export interface BaseComponentInterface { 
  className?: string; 
  'aria-label'?: string; 
} 

// UI component prop types
export interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>, BaseComponentInterface { 
  variant?: VariantType; 
  size?: SizeType; 
  loading?: boolean; 
} 

export interface SelectInterface extends BaseComponentInterface { 
  options: SelectOptionType[]; 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
  size?: SizeType; 
  variant?: VariantType; 
  disabled?: boolean; 
  direction?: DirectionType; 
} 

export interface LoadingBackdropInterface extends BaseComponentInterface { 
  isLoading: boolean; 
  loadingMessage?: string; 
} 

export interface LoadingSpinnerInterface extends BaseComponentInterface { 
  size?: SizeType; 
  variant?: VariantType; 
} 

export interface ErrorMessageInterface extends BaseComponentInterface { 
  error: Error | string; 
  title?: string; 
} 

export interface ToastInterface extends BaseComponentInterface { 
  message: string; 
  variant?: ToastVariantType; 
  duration?: number; 
  onClose?: () => void; 
  'aria-controls'?: string; 
} 

// Error handling component types
export interface ErrorBoundaryStateInterface { 
  hasError: boolean; 
  error: Error | null; 
  errorInfo: ErrorInfo | null; 
} 

export interface ErrorBoundaryInterface extends BaseComponentInterface { 
  fallback?: ReactNode; 
  onError?: (error: Error, errorInfo: ErrorInfo) => void; 
  children: ReactNode; 
}
