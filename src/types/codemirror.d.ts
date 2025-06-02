declare module '@uiw/react-codemirror' {
  import { FC } from 'react';
  import { Extension } from '@codemirror/state';

  interface CodeMirrorProps {
    value?: string;
    height?: string;
    minHeight?: string;
    theme?: Extension;
    extensions?: Extension[];
    editable?: boolean;
    onChange?: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    basicSetup?: {
      lineNumbers?: boolean;
      highlightActiveLine?: boolean;
      foldGutter?: boolean;
      highlightActiveLineGutter?: boolean;
      history?: boolean;
      drawSelection?: boolean;
      syntaxHighlighting?: boolean;
      defaultKeymap?: boolean;
      dropCursor?: boolean;
      allowMultipleSelections?: boolean;
      indentOnInput?: boolean;
      tabSize?: number;
    };
  }

  const CodeMirror: FC<CodeMirrorProps>;
  export default CodeMirror;
}

declare module '@codemirror/lang-sql' {
  import { Extension } from '@codemirror/state';
  export function sql(): Extension;
}

declare module '@uiw/codemirror-theme-vscode' {
  import { Extension } from '@codemirror/state';
  export const vscodeLight: Extension;
}
