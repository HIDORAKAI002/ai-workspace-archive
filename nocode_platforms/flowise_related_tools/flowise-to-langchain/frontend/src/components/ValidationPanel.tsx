import React from 'react';
import { ValidationResult, FlowiseNode } from '../types';

interface ValidationPanelProps {
  validationResult: ValidationResult;
  onClose: () => void;
  onNodeSelect: (node: FlowiseNode) => void;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  validationResult,
  onClose,
  onNodeSelect,
}) => {
  return (
    <div className="validation-panel-overlay">
      <div className="validation-panel">
        <div className="validation-header">
          <h3>Validation Results</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="validation-content">
          <div className="validation-summary">
            <span className={`status ${validationResult.isValid ? 'valid' : 'invalid'}`}>
              {validationResult.isValid ? '✅ Valid' : '❌ Invalid'}
            </span>
            <span>{validationResult.nodeCount} nodes, {validationResult.edgeCount} edges</span>
          </div>
          
          {validationResult.errors.length > 0 && (
            <div className="validation-section">
              <h4>❌ Errors ({validationResult.errors.length})</h4>
              {validationResult.errors.map((error, index) => (
                <div key={index} className="validation-item error">
                  <div className="message">{error.message}</div>
                  {error.suggestion && (
                    <div className="suggestion">💡 {error.suggestion}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {validationResult.warnings.length > 0 && (
            <div className="validation-section">
              <h4>⚠️ Warnings ({validationResult.warnings.length})</h4>
              {validationResult.warnings.map((warning, index) => (
                <div key={index} className="validation-item warning">
                  <div className="message">{warning.message}</div>
                </div>
              ))}
            </div>
          )}
          
          {validationResult.suggestions.length > 0 && (
            <div className="validation-section">
              <h4>💡 Suggestions ({validationResult.suggestions.length})</h4>
              {validationResult.suggestions.map((suggestion, index) => (
                <div key={index} className="validation-item suggestion">
                  <div className="message">{suggestion.message}</div>
                  <div className="impact">Impact: {suggestion.impact}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};