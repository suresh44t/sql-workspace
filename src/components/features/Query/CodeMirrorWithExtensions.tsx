import { lazy } from 'react';
import { CodeMirrorInterface } from '@/types/features/codemirror.types';

// Lazy load CodeMirror with extensions
const CodeMirrorWithExtensions = lazy(async () => {
  // Load all dependencies in parallel for maximum performance
  const [
    { default: CodeMirrorComponent },
    sqlExtension,
    theme
  ] = await Promise.all([
    import('@uiw/react-codemirror'),
    import('@codemirror/lang-sql').then(mod => mod.sql()),
    import('@uiw/codemirror-theme-vscode').then(mod => mod.vscodeLight)
  ]);

  // Return component with extensions pre-loaded
  return {
    default: ({ value, onChange, onKeyDown, basicSetup, editable, height, minHeight, ...props }: CodeMirrorInterface) => (
      <CodeMirrorComponent
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        basicSetup={basicSetup}
        editable={editable}
        height={height}
        minHeight={minHeight}
        {...props}
        extensions={[sqlExtension, theme]}
      />
    )
  };
});

export default CodeMirrorWithExtensions;
