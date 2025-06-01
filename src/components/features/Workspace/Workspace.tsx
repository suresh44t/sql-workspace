// Component imports and type definitions
import { FC } from 'react'; 
import { ErrorBoundary } from '@/components/common'; 
import { Query } from '../Query/Query'; 
import { Results } from '../Results/Results'; 
import { History } from '../History/History'; 
import { WorkspaceInterface } from '@/types'; 
import './Workspace.scss'; 

// Main workspace layout component
const WorkspaceContent: FC<WorkspaceInterface> = ({ 
  className = '' 
}) => { 
  // Handle keyboard shortcuts for workspace navigation
  const handleKeyDown = (e: React.KeyboardEvent) => { 
    if ((e.altKey || e.metaKey) && ['1', '2', '3'].includes(e.key)) { 
      e.preventDefault(); 
      const target = document.querySelector<HTMLElement>(`#${ 
        e.key === '1' ? 'query' : 
        e.key === '2' ? 'results' : 
        'history' 
      }`); 
      target?.focus(); 
    } 

    // Escape to return to editor 
    if (e.key === 'Escape') { 
      e.preventDefault(); 
      document.querySelector<HTMLElement>('#query')?.focus(); 
    } 
  }; 

  return ( 
    <> 
      <nav className="skip-links" aria-label="Skip to main sections"> 
        <a href="#query" className="skip-link">Skip to Query</a> 
        <a href="#results" className="skip-link">Skip to Results</a> 
        <a href="#history" className="skip-link">Skip to History</a> 
      </nav> 

      <main 
        className={`workspace ${className}`.trim()} 
        role="main" 
        aria-label="SQL Query Workspace" 
        onKeyDown={handleKeyDown} 
      > 
        <div 
          className="workspace-main" 
          role="region" 
          aria-label="Main Editor and Results Area" 
        > 
          <Query /> 
          <Results 
            config={{ 
              allowExport: true 
            }} 
          /> 
        </div> 

        <aside 
          className='workspace-aside' 
          aria-label="Query History Panel" 
        > 
          <History /> 
        </aside> 

      </main> 
    </> 
  ); 
}; 

WorkspaceContent.displayName = 'WorkspaceContent'; 

// Workspace component with error boundary
export const Workspace: FC<WorkspaceInterface> = props => { 
  return ( 
    <ErrorBoundary 
      onError={(error: Error) => { 
        console.error('Workspace Error:', error); 
      }} 
    > 
      <WorkspaceContent {...props} /> 
    </ErrorBoundary> 
  ); 
}; 

Workspace.displayName = 'Workspace';
