import { useCallback } from 'react'; 
import { useAppDispatch, useAppSelector } from '@/store/hooks'; 
import { 
  addToast, 
  removeToast, 
  clearToasts, 
  selectAllToasts, 
  selectLatestToast, 
  selectToastsByType, 
  selectToastStats 
} from '@/store/slices'; 
import { 
  ToastOptionsInterface, 
  UseToastsReturnInterface, 
  ToastVariantType, 
  ToastItemInterface 
} from '@/types'; 

export const useToasts = (): UseToastsReturnInterface => { 
  const dispatch = useAppDispatch(); 

  // Get toast notifications state from store
  const toasts = useAppSelector(selectAllToasts); 
  const latestToast = useAppSelector(selectLatestToast); 
  const toastsByType = useAppSelector(selectToastsByType); 
  const stats = useAppSelector(selectToastStats); 

  // Create and display new toast notification
  const showToast = useCallback(( 
    message: string, 
    type: ToastVariantType, 
    options: ToastOptionsInterface = {} 
  ) => { 
    const toast: Omit<ToastItemInterface, 'id'> = { 
      type, 
      message, 
      ...options 
    }; 
    dispatch(addToast(toast)); 
  }, [dispatch]); 

  // Toast removal handlers
  const handleRemoveToast = (id: string) => { 
    dispatch(removeToast(id)); 
  }; 

  const handleClearToasts = () => { 
    dispatch(clearToasts()); 
  }; 

  // Convenience methods for different toast types
  const success = (message: string, options?: ToastOptionsInterface) => 
    showToast(message, 'success', options); 

  const error = (message: string, options?: ToastOptionsInterface) => 
    showToast(message, 'error', options); 

  const warning = (message: string, options?: ToastOptionsInterface) => 
    showToast(message, 'warning', options); 

  const info = (message: string, options?: ToastOptionsInterface) => 
    showToast(message, 'info', options); 

  return { 
    // Current toast notifications
    toasts, 
    latestToast, 
    toastsByType, 
    stats, 

    // Toast management methods
    remove: handleRemoveToast, 
    clear: handleClearToasts, 
    success, 
    error, 
    warning, 
    info 
  }; 
};
