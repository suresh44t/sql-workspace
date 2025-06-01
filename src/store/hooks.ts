import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'; 
import { RootStoreInterface, AppDispatchType } from '@/types'; 

// Custom hooks with TypeScript support for Redux store
export const useAppDispatch = () => useDispatch<AppDispatchType>(); 
export const useAppSelector: TypedUseSelectorHook<RootStoreInterface> = useSelector;
