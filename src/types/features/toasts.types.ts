import { BaseComponentInterface } from '../ui.types'; 

// Toast notification styles
export type ToastVariantType = 'success' | 'error' | 'warning' | 'info'; 

// Toast container component props
export interface ToastsInterface extends BaseComponentInterface { 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; 
  limit?: number; 
} 

// Toast creation configuration
export interface ToastOptionsInterface { 
  duration?: number; 
  'aria-label'?: string; 
  'aria-controls'?: string; 
} 

// Common toast notification properties
export interface BaseToastProps { 
  message: string; 
  type: ToastVariantType; 
  duration?: number; 
  className?: string; 
} 

// Single toast notification data
export interface ToastItemInterface extends BaseToastProps { 
  id: string; 
} 

// Individual toast component props
export interface ToastProps extends ToastItemInterface { 
  onClose: (id: string) => void; 
} 

// Toast notification statistics
export interface ToastStatsInterface { 
  total: number; 
  byType: Record<ToastVariantType, number>; 
} 

// Toast state in Redux store
export type ToastsStoreType = { 
  items: ToastItemInterface[]; 
  limit: number; 
  stats: ToastStatsInterface; 
}; 

// Toast hook return values and methods
export interface UseToastsReturnInterface { 
  // Current toast notifications
  toasts: ToastItemInterface[]; 
  latestToast: ToastItemInterface | null; 
  toastsByType: Record<ToastVariantType, ToastItemInterface[]>; 
  stats: ToastStatsInterface; 

  // Toast management methods
  remove: (id: string) => void; 
  clear: () => void; 
  success: (message: string, options?: ToastOptionsInterface) => void; 
  error: (message: string, options?: ToastOptionsInterface) => void; 
  warning: (message: string, options?: ToastOptionsInterface) => void; 
  info: (message: string, options?: ToastOptionsInterface) => void; 
}
