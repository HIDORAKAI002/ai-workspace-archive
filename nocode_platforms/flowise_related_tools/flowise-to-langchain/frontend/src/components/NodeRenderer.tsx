import React from 'react';
import { FlowiseNode, ValidationResult } from '../types';

interface NodeRendererProps {
  node: FlowiseNode;
  isSelected: boolean;
  onClick: (node: FlowiseNode) => void;
  readOnly?: boolean;
  validationResult?: ValidationResult | null;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  isSelected,
  onClick,
  readOnly = false,
  validationResult,
}) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'llm':
        return '🤖';
      case 'prompt':
        return '💬';
      case 'memory':
        return '💾';
      case 'tool':
        return '🛠️';
      case 'chain':
        return '🔗';
      case 'agent':
        return '🎯';
      default:
        return '📦';
    }
  };

  const hasValidationIssues = validationResult?.errors.some(error => error.path === node.id) ||
                             validationResult?.warnings.some(warning => warning.path === node.id);

  return (
    <div
      className={`node-renderer ${isSelected ? 'selected' : ''} ${hasValidationIssues ? 'has-issues' : ''}`}
      style={{
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
        width: 200,
        minHeight: 80,
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        padding: '12px',
        cursor: readOnly ? 'default' : 'pointer',
        boxShadow: isSelected ? '0 0 10px rgba(0, 123, 255, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
      }}
      onClick={() => onClick(node)}
    >
      <div className="node-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span className="node-icon" style={{ marginRight: '8px', fontSize: '18px' }}>
          {getNodeIcon(node.type)}
        </span>
        <span className="node-type" style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
          {node.type}
        </span>
      </div>
      
      <div className="node-title" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {node.label || node.id}
      </div>
      
      {hasValidationIssues && (
        <div className="node-validation" style={{ marginTop: '8px' }}>
          <span style={{ color: '#e74c3c', fontSize: '12px' }}>⚠️ Issues</span>
        </div>
      )}
    </div>
  );
};