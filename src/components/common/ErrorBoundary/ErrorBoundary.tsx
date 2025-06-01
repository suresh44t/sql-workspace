// React and component imports
import { Component, ErrorInfo } from 'react'; 
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'; 
import { ErrorBoundaryInterface, ErrorBoundaryStateInterface } from '@/types'; 

// Error boundary component to catch and handle component errors
export class ErrorBoundary extends Component<ErrorBoundaryInterface, ErrorBoundaryStateInterface> { 
  // Initialize error state
  public state: ErrorBoundaryStateInterface = { 
    hasError: false, 
    error: null, 
    errorInfo: null 
  }; 

  // Update state when error occurs
  public static getDerivedStateFromError(error: Error): ErrorBoundaryStateInterface { 
    return { 
      hasError: true, 
      error, 
      errorInfo: null 
    }; 
  } 

  // Log error and call error handler
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) { 
    console.error('Error caught by boundary:', error, errorInfo); 
    this.setState({ errorInfo }); 
    this.props.onError?.(error, errorInfo); 
  } 

  // Render error UI or children
  public render() { 
    const { 
      fallback, 
      className = '', 
      children 
    } = this.props; 

    if (this.state.hasError) { 
      const errorComponent = ( 
        <div 
          className={`error-boundary ${className}`.trim()} 
          role="alert" 
        > 
          <ErrorMessage 
            title="Component Error" 
            error={this.state.error?.message || 'An unexpected error occurred'} 
          /> 
        </div> 
      ); 

      return fallback || errorComponent; 
    } 

    return children; 
  } 
}
