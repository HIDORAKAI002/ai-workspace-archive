import React from 'react';
import { FlowiseFlow, ConversionOptions } from '../types';

interface CodePreviewProps {
  flow: FlowiseFlow;
  options: ConversionOptions;
  isGenerating: boolean;
  generatedCode?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  flow,
  options,
  isGenerating,
  generatedCode,
}) => {
  const previewCode = generatedCode || `
// Preview of generated ${options.format} code for: ${flow.name}
// This will show the actual generated code once conversion is complete

import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

export class ${flow.name.replace(/\s+/g, '')}Chain {
  // Generated code will appear here...
}
`;

  return (
    <div className="code-preview">
      <div className="code-preview-header">
        <h3>Code Preview</h3>
        <span className="language-badge">{options.format}</span>
      </div>
      
      <div className="code-preview-content">
        {isGenerating ? (
          <div className="generating-placeholder">
            <div className="spinner"></div>
            <p>Generating code preview...</p>
          </div>
        ) : (
          <pre className="code-block">
            <code>{previewCode}</code>
          </pre>
        )}
      </div>
    </div>
  );
};