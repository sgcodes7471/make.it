"use client"
import Editor from '@monaco-editor/react';
import { FileItem } from '../types';

interface CodeEditorProps {
  file: FileItem | null;
  onChange: (path: string, content: string) => void;
}

export function CodeEditor({ file , onChange }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="vs-dark"
      value={file.content || ''}
      onChange={(val) => {
        if (file && val !== undefined) {
          onChange(file.path, val);
        }
      }}
      options={{
        // readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
}