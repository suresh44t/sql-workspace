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
  return ( 
    <main 
      className={`workspace ${className}`.trim()} 
      role="main" 
      aria-label="SQL Query Workspace" 
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
