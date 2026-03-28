import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FlowViewerProps, FlowiseNode, FlowiseEdge, ValidationResult } from '../types';
import { useFlowiseConverter } from '../hooks/useFlowiseConverter';
import { NodeRenderer } from './NodeRenderer';
import { EdgeRenderer } from './EdgeRenderer';
import { ValidationPanel } from './ValidationPanel';
import { MiniMap } from './MiniMap';
import './FlowViewer.css';

interface ExtendedFlowViewerProps extends FlowViewerProps {
  onNavigateToWorkspace: () => void;
}

export const FlowViewer: React.FC<ExtendedFlowViewerProps> = ({
  flow,
  onNodeSelect,
  onEdgeSelect,
  selectedNode,
  selectedEdge,
  readOnly = false,
  showValidation = true,
  validationResult,
  onNavigateToWorkspace,
  className,
  children,
}) => {
  const [viewportTransform, setViewportTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showValidationPanel, setShowValidationPanel] = useState(false);
  const [currentValidationResult, setCurrentValidationResult] = useState<ValidationResult | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { validateFlow } = useFlowiseConverter();

  // Validate flow on mount if showValidation is true
  useEffect(() => {
    if (showValidation && !validationResult) {
      validateFlow(flow).then(setCurrentValidationResult);
    } else if (validationResult) {
      setCurrentValidationResult(validationResult);
    }
  }, [flow, showValidation, validationResult, validateFlow]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setViewportTransform(prev => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(viewportTransform.scale * delta, 0.1), 3);
    
    setViewportTransform(prev => ({
      ...prev,
      scale: newScale,
    }));
  }, [viewportTransform.scale]);

  const handleNodeClick = useCallback((node: FlowiseNode) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);

  const handleEdgeClick = useCallback((edge: FlowiseEdge) => {
    if (onEdgeSelect) {
      onEdgeSelect(edge);
    }
  }, [onEdgeSelect]);

  const handleResetView = useCallback(() => {
    setViewportTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setViewportTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewportTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.1),
    }));
  }, []);

  const handleFitToScreen = useCallback(() => {
    if (!containerRef.current || flow.nodes.length === 0) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate bounds of all nodes
    const bounds = flow.nodes.reduce(
      (acc, node) => ({
        minX: Math.min(acc.minX, node.position.x),
        minY: Math.min(acc.minY, node.position.y),
        maxX: Math.max(acc.maxX, node.position.x + 200), // Assume node width
        maxY: Math.max(acc.maxY, node.position.y + 100), // Assume node height
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );

    const flowWidth = bounds.maxX - bounds.minX;
    const flowHeight = bounds.maxY - bounds.minY;
    
    const scaleX = (containerRect.width * 0.8) / flowWidth;
    const scaleY = (containerRect.height * 0.8) / flowHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    
    const centerX = containerRect.width / 2 - (bounds.minX + flowWidth / 2) * scale;
    const centerY = containerRect.height / 2 - (bounds.minY + flowHeight / 2) * scale;
    
    setViewportTransform({
      x: centerX,
      y: centerY,
      scale,
    });
  }, [flow.nodes]);

  const getValidationStatus = () => {
    if (!currentValidationResult) return 'unknown';
    if (currentValidationResult.isValid) return 'valid';
    if (currentValidationResult.errors.length > 0) return 'invalid';
    return 'warnings';
  };

  const getValidationIcon = () => {
    const status = getValidationStatus();
    switch (status) {
      case 'valid':
        return <span className="validation-icon valid">✓</span>;
      case 'invalid':
        return <span className="validation-icon invalid">✗</span>;
      case 'warnings':
        return <span className="validation-icon warnings">⚠</span>;
      default:
        return <span className="validation-icon unknown">?</span>;
    }
  };

  return (
    <div className={`flow-viewer ${className || ''}`}>
      <div className="flow-viewer-header">
        <div className="flow-info">
          <h2>{flow.name}</h2>
          <div className="flow-meta">
            <span>{flow.nodes.length} nodes</span>
            <span>{flow.edges.length} connections</span>
            <span>Version {flow.version}</span>
            {showValidation && (
              <span className="validation-status">
                {getValidationIcon()}
                {getValidationStatus()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flow-actions">
          {showValidation && currentValidationResult && (
            <button
              className="validation-button"
              onClick={() => setShowValidationPanel(true)}
              type="button"
            >
              View Validation
            </button>
          )}
          
          <button
            className="convert-button"
            onClick={onNavigateToWorkspace}
            type="button"
          >
            Convert to LangChain
          </button>
        </div>
      </div>

      <div className="flow-viewer-content">
        <div className="flow-controls">
          <button onClick={handleZoomIn} type="button" title="Zoom In">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
              <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <button onClick={handleZoomOut} type="button" title="Zoom Out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <button onClick={handleFitToScreen} type="button" title="Fit to Screen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <button onClick={handleResetView} type="button" title="Reset View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <div
          ref={containerRef}
          className="flow-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="flow-content"
            style={{
              transform: `translate(${viewportTransform.x}px, ${viewportTransform.y}px) scale(${viewportTransform.scale})`,
            }}
          >
            {/* Render edges first (behind nodes) */}
            {flow.edges.map((edge) => (
              <EdgeRenderer
                key={edge.id}
                edge={edge}
                nodes={flow.nodes}
                isSelected={selectedEdge?.id === edge.id}
                onClick={handleEdgeClick}
                validationResult={currentValidationResult}
              />
            ))}
            
            {/* Render nodes */}
            {flow.nodes.map((node) => (
              <NodeRenderer
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onClick={handleNodeClick}
                readOnly={readOnly}
                validationResult={currentValidationResult}
              />
            ))}
          </div>
        </div>

        <MiniMap
          nodes={flow.nodes}
          edges={flow.edges}
          viewportTransform={viewportTransform}
          containerRect={containerRef.current?.getBoundingClientRect()}
          onViewportChange={setViewportTransform}
        />
      </div>

      {showValidationPanel && currentValidationResult && (
        <ValidationPanel
          validationResult={currentValidationResult}
          onClose={() => setShowValidationPanel(false)}
          onNodeSelect={handleNodeClick}
        />
      )}

      {children}
    </div>
  );
};