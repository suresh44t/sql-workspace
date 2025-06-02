import { KeyboardEvent } from 'react';

export interface CodeMirrorInterface {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  basicSetup: Record<string, boolean | number>;
  editable: boolean;
  height: string;
  minHeight: string;
  [key: string]: any; // For any additional props passed to CodeMirror
}
