import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'; 
import { generateId } from '@/utils'; 
import { 
  ToastVariantType, 
  ToastItemInterface, 
  ToastStatsInterface, 
  ToastsStoreType, 
  StateWithToast 
} from '@/types'; 

// Initialize notification system state
const initialState: ToastsStoreType = { 
  items: [], 
  limit: 5, 
  stats: { 
    total: 0, 
    byType: { 
      success: 0, 
      error: 0, 
      warning: 0, 
      info: 0 
    } 
  } 
}; 

// Define notification state updates
const toastSlice = createSlice({ 
  name: 'toast', 
  initialState, 
  reducers: { 
    // Display new notification message
    addToast: (state, action: PayloadAction<Omit<ToastItemInterface, 'id'>>) => { 
      const toast: ToastItemInterface = { 
        ...action.payload, 
        id: generateId() 
      }; 
      state.items.push(toast); 
      
      // Update notification statistics
      state.stats.total++; 
      state.stats.byType[toast.type]++; 
      
      // Remove old notifications when limit reached
      if (state.items.length > state.limit) { 
        const removed = state.items.shift(); 
        if (removed) { 
          state.stats.total--; 
          state.stats.byType[removed.type]--; 
        } 
      } 
    }, 

    // Remove single notification
    removeToast: (state, action: PayloadAction<string>) => { 
      const removed = state.items.find(toast => toast.id === action.payload); 
      if (removed) { 
        state.items = state.items.filter(toast => toast.id !== action.payload); 
        state.stats.total--; 
        state.stats.byType[removed.type]--; 
      } 
    }, 

    // Remove all notifications
    clearToasts: (state) => { 
      state.items = []; 
      state.stats = { 
        total: 0, 
        byType: { 
          success: 0, 
          error: 0, 
          warning: 0, 
          info: 0 
        } 
      }; 
    } 
  } 
}); 

// Export notification reducers
export const { 
  addToast, 
  removeToast, 
  clearToasts 
} = toastSlice.actions; 

// Get notification data from store
export const selectAllToasts = (state: StateWithToast) => 
  state.toast.items; 

// Get subset of recent notifications
export const selectLimitedToasts = createSelector( 
  [ 
    (state: StateWithToast) => state.toast.items, 
    (_state: StateWithToast, limit: number) => limit 
  ], 
  (toasts, limit) => toasts.slice(-limit) 
); 

// Get most recent notification
export const selectLatestToast = createSelector( 
  [selectAllToasts], 
  (toasts): ToastItemInterface | null => toasts[toasts.length - 1] || null 
); 

// Group notifications by type
export const selectToastsByType = createSelector( 
  [selectAllToasts], 
  (toasts): Record<ToastVariantType, ToastItemInterface[]> => 
    toasts.reduce((acc, toast) => { 
      acc[toast.type] = acc[toast.type] || []; 
      acc[toast.type].push(toast); 
      return acc; 
    }, {} as Record<ToastVariantType, ToastItemInterface[]>) 
); 

// Get notification counts by type
export const selectToastStats = createSelector( 
  [selectAllToasts], 
  (toasts): ToastStatsInterface => ({ 
    total: toasts.length, 
    byType: { 
      success: toasts.filter(t => t.type === 'success').length, 
      error: toasts.filter(t => t.type === 'error').length, 
      warning: toasts.filter(t => t.type === 'warning').length, 
      info: toasts.filter(t => t.type === 'info').length 
    } 
  }) 
); 

export default toastSlice.reducer;
