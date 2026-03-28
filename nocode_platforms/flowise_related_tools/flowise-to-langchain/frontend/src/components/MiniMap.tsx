import React from 'react';
import { FlowiseNode, FlowiseEdge } from '../types';

interface MiniMapProps {
  nodes: FlowiseNode[];
  edges: FlowiseEdge[];
  viewportTransform: { x: number; y: number; scale: number };
  containerRect?: DOMRect;
  onViewportChange: (transform: { x: number; y: number; scale: number }) => void;
}

export const MiniMap: React.FC<MiniMapProps> = ({
  nodes,
  edges,
  viewportTransform,
  containerRect,
  onViewportChange,
}) => {
  if (!containerRect || nodes.length === 0) return null;

  const miniMapSize = 150;
  const scale = 0.1;

  return (
    <div
      className="mini-map"
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        width: miniMapSize,
        height: miniMapSize,
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        overflow: 'hidden',
        zIndex: 1000,
      }}
    >
      <svg width={miniMapSize} height={miniMapSize}>
        {/* Render nodes */}
        {nodes.map((node) => (
          <rect
            key={node.id}
            x={node.position.x * scale}
            y={node.position.y * scale}
            width={200 * scale}
            height={80 * scale}
            fill="#007bff"
            stroke="#005cbf"
            strokeWidth="0.5"
            rx="2"
          />
        ))}
        
        {/* Render edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          return (
            <line
              key={edge.id}
              x1={(sourceNode.position.x + 200) * scale}
              y1={(sourceNode.position.y + 40) * scale}
              x2={targetNode.position.x * scale}
              y2={(targetNode.position.y + 40) * scale}
              stroke="#999"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Viewport indicator */}
        <rect
          x={-viewportTransform.x * scale / viewportTransform.scale}
          y={-viewportTransform.y * scale / viewportTransform.scale}
          width={containerRect.width * scale / viewportTransform.scale}
          height={containerRect.height * scale / viewportTransform.scale}
          fill="rgba(0, 123, 255, 0.2)"
          stroke="#007bff"
          strokeWidth="1"
          rx="1"
        />
      </svg>
    </div>
  );
};