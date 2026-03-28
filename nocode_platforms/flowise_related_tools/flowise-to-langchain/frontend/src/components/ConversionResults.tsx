import React from 'react';
import { ConversionResult } from '../types';

interface ConversionResultsProps {
  result: ConversionResult | null;
  isConverting: boolean;
  onNavigateToTesting: () => void;
}

export const ConversionResults: React.FC<ConversionResultsProps> = ({
  result,
  isConverting,
  onNavigateToTesting,
}) => {
  if (isConverting) {
    return (
      <div className="conversion-results loading">
        <div className="spinner"></div>
        <p>Converting...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="conversion-results empty">
        <p>No conversion results yet. Start a conversion to see results here.</p>
      </div>
    );
  }

  return (
    <div className="conversion-results">
      <div className={`result-status ${result.success ? 'success' : 'error'}`}>
        {result.success ? '✅ Conversion Successful' : '❌ Conversion Failed'}
      </div>
      
      <div className="result-summary">
        <div className="summary-item">
          <span className="label">Nodes Converted:</span>
          <span className="value">{result.nodesConverted}</span>
        </div>
        <div className="summary-item">
          <span className="label">Files Generated:</span>
          <span className="value">{result.filesGenerated.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Format:</span>
          <span className="value">{result.metadata.format}</span>
        </div>
        <div className="summary-item">
          <span className="label">Target:</span>
          <span className="value">{result.metadata.target}</span>
        </div>
      </div>
      
      {result.filesGenerated.length > 0 && (
        <div className="generated-files">
          <h4>Generated Files</h4>
          <ul>
            {result.filesGenerated.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
      
      {result.warnings.length > 0 && (
        <div className="warnings">
          <h4>Warnings</h4>
          <ul>
            {result.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
      
      {result.errors.length > 0 && (
        <div className="errors">
          <h4>Errors</h4>
          <ul>
            {result.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {result.success && (
        <div className="result-actions">
          <button 
            className="test-button"
            onClick={onNavigateToTesting}
            type="button"
          >
            Test Generated Code
          </button>
        </div>
      )}
    </div>
  );
};