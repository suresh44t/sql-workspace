// Component imports and type definitions
import { FC, memo, useCallback } from 'react'; 
import CodeMirror from '@uiw/react-codemirror'; 
import { sql } from '@codemirror/lang-sql'; 
import { vscodeLight } from '@uiw/codemirror-theme-vscode'; 
import { Button, ErrorBoundary, Select, LoadingBackdrop } from '@/components/common'; 
import { useQuery, useResults } from '@/hooks'; 
import { 
  CompanyNameType, 
  QueryInterface, 
  QueryOptionsType, 
  PredefinedQueryType 
} from '@/types'; 
import './Query.scss'; 

// SQL query editor with code mirror integration
const QueryContent: FC<QueryInterface> = memo(({ 
  className = '' 
}) => { 
  // Initialize query and results state
  const { 
    text, 
    isValid, 
    setText, 
    setValidity, 
    executeQuery 
  } = useQuery(); 

  const { status } = useResults(); 

  // Track query execution status
  const isLoading = status === 'loading'; 

  // Handle query text changes and validation
  const handleEditorChange = useCallback((value: string) => { 
    if (isLoading) {return;} 
    setText(value); 

    const trimmedValue = value.trim(); 
    // Validate if query matches "select * from companyName" format 
    const isValidQuery = /^select \* from \w+$/i.test(trimmedValue); 
    setValidity(isValidQuery); 
  }, [isLoading, setText, setValidity]); 

  // Execute SQL query with validation
  const handleExecute = useCallback(() => { 
    if (!text.trim() || !isValid || isLoading) {return;} 
    executeQuery(); 
  }, [text, isValid, isLoading, executeQuery]); 

  // Handle keyboard shortcuts for query execution
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => { 
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { 
      e.preventDefault(); 
      handleExecute(); 
    } 
  }, [handleExecute]); 

  const queryOptions: QueryOptionsType = [ 
    { value: '', label: 'Select a predefined SQL query' }, 
    ...(['pega', 'atlan', 'google', 'microsoft', 'meta', 'apple'] as CompanyNameType[]).map(company => ({ 
      value: `select * from ${company}`, 
      label: `SELECT * FROM ${company.toUpperCase()}` 
    } as PredefinedQueryType)) 
  ]; 

  return ( 
    <section 
      id="query-editor" 
      className={`query ${className}`.trim()} 
      aria-label="SQL Query Editor" 
    > 
      <div 
        className="query-editor" 
        role="group" 
        aria-labelledby="editor-label" 
      > 
        <label id="editor-label" className="sr-only">SQL Query Input</label> 
        <CodeMirror 
          value={text} 
          theme={vscodeLight} 
          extensions={[sql()]} 
          onChange={handleEditorChange} 
          onKeyDown={handleKeyDown} 
          basicSetup={{ 
            lineNumbers: true, 
            highlightActiveLine: true, 
            highlightActiveLineGutter: true, 
            foldGutter: false, 
            dropCursor: true, 
            allowMultipleSelections: true, 
            indentOnInput: true, 
            tabSize: 2 
          }} 
          editable={!isLoading} 
          height="200px" 
          minHeight="200px" 
          aria-invalid={!isValid && !!text} 
        /> 
      </div> 

      <div 
        className="query-actions" 
        role="toolbar" 
        aria-label="SQL Query Actions" 
      > 
        <Select 
          options={queryOptions} 
          value={text} 
          onChange={useCallback((value: string) => { 
            setText(value); 
            setValidity(!!value); 
          }, [setText, setValidity])} 
          placeholder="Select a predefined SQL query" 
          size="sm" 
          variant="outlined" 
          disabled={isLoading} 
          aria-label="Select a predefined SQL query template" 
        /> 
        <Button 
          onClick={() => { 
            setText(''); 
            setValidity(false); 
          }} 
          variant="outlined" 
          disabled={!text.trim()} 
          aria-label="Reset SQL query input" 
        > 
          Reset 
        </Button> 
        <Button 
          onClick={handleExecute} 
          disabled={!text.trim() || !isValid} 
          aria-label="Execute SQL query" 
        > 
          Execute Query 
        </Button> 
      </div> 

      {isLoading && ( 
        <LoadingBackdrop 
          isLoading 
          loadingMessage="Executing SQL query, please wait..." 
        /> 
      )} 
    </section> 
  ); 
}); 

QueryContent.displayName = 'QueryContent'; 

// Query component with error boundary wrapper
export const Query: FC<QueryInterface> = props => { 
  return ( 
    <ErrorBoundary 
      onError={(error: Error) => { 
        console.error('SQL Query Editor Error:', error); 
      }} 
    > 
      <QueryContent {...props} /> 
    </ErrorBoundary> 
  ); 
}; 

Query.displayName = 'Query';
