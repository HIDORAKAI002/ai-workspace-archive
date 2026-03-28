import React from 'react';
import { FlowiseEdge, FlowiseNode, ValidationResult } from '../types';

interface EdgeRendererProps {
  edge: FlowiseEdge;
  nodes: FlowiseNode[];
  isSelected: boolean;
  onClick: (edge: FlowiseEdge) => void;
  validationResult?: ValidationResult | null;
}

export const EdgeRenderer: React.FC<EdgeRendererProps> = ({
  edge,
  nodes,
  isSelected,
  onClick,
  validationResult,
}) => {
  const sourceNode = nodes.find(node => node.id === edge.source);
  const targetNode = nodes.find(node => node.id === edge.target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const sourceX = sourceNode.position.x + 200; // Node width
  const sourceY = sourceNode.position.y + 40; // Node height / 2
  const targetX = targetNode.position.x;
  const targetY = targetNode.position.y + 40; // Node height / 2

  // Simple straight line for now
  const path = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <path
        d={path}
        stroke={isSelected ? '#007bff' : '#999'}
        strokeWidth={isSelected ? 3 : 2}
        fill="none"
        markerEnd="url(#arrowhead)"
        style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
        onClick={() => onClick(edge)}
      />
      
      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={isSelected ? '#007bff' : '#999'}
          />
        </marker>
      </defs>
      
      {/* Edge label */}
      {edge.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={(sourceY + targetY) / 2 - 5}
          textAnchor="middle"
          fontSize="12"
          fill="#666"
          style={{ pointerEvents: 'none' }}
        >
          {edge.label}
        </text>
      )}
    </svg>
  );
};