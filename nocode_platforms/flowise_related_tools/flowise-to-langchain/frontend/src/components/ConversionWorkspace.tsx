import React, { useState, useCallback } from 'react';
import { ConversionWorkspaceProps, ConversionOptions } from '../types';
import { CodePreview } from './CodePreview';
import { ConversionSettings } from './ConversionSettings';
import { ConversionProgress } from './ConversionProgress';
import { ConversionResults } from './ConversionResults';
import './ConversionWorkspace.css';

interface ExtendedConversionWorkspaceProps extends ConversionWorkspaceProps {
  onNavigateToTesting: () => void;
}

export const ConversionWorkspace: React.FC<ExtendedConversionWorkspaceProps> = ({
  flow,
  options,
  onOptionsChange,
  onConvert,
  isConverting,
  result,
  onNavigateToTesting,
  className,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'preview' | 'results'>('settings');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleOptionsChange = useCallback((newOptions: Partial<ConversionOptions>) => {
    onOptionsChange({ ...options, ...newOptions });
  }, [options, onOptionsChange]);

  const handleConvert = useCallback(() => {
    if (!isConverting) {
      onConvert();
      setActiveTab('results');
    }
  }, [isConverting, onConvert]);

  const canConvert = !isConverting && flow.nodes.length > 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <ConversionSettings
            options={options}
            onOptionsChange={handleOptionsChange}
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
            flow={flow}
          />
        );
      
      case 'preview':
        return (
          <CodePreview
            flow={flow}
            options={options}
            isGenerating={isConverting}
            generatedCode={result?.generatedCode}
          />
        );
      
      case 'results':
        return (
          <ConversionResults
            result={result}
            isConverting={isConverting}
            onNavigateToTesting={onNavigateToTesting}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`conversion-workspace ${className || ''}`}>
      <div className="workspace-header">
        <div className="workspace-title">
          <h2>Convert to LangChain</h2>
          <p>Configure settings and convert your Flowise flow</p>
        </div>
        
        <div className="workspace-actions">
          <button
            className="convert-button"
            onClick={handleConvert}
            disabled={!canConvert}
            type="button"
          >
            {isConverting ? (
              <>
                <div className="spinner"></div>
                Converting...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Convert Flow
              </>
            )}
          </button>
          
          {result && result.success && (
            <button
              className="test-button"
              onClick={onNavigateToTesting}
              type="button"
            >
              Test Code
            </button>
          )}
        </div>
      </div>

      <div className="workspace-content">
        <div className="workspace-tabs">
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Settings
          </button>
          
          <button
            className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Preview
          </button>
          
          <button
            className={`tab-button ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Results
            {result && (
              <span className={`result-indicator ${result.success ? 'success' : 'error'}`}>
                {result.success ? '✓' : '✗'}
              </span>
            )}
          </button>
        </div>

        <div className="workspace-main">
          <div className="workspace-sidebar">
            <div className="flow-summary">
              <h3>Flow Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-label">Nodes</span>
                  <span className="stat-value">{flow.nodes.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Connections</span>
                  <span className="stat-value">{flow.edges.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Version</span>
                  <span className="stat-value">{flow.version}</span>
                </div>
              </div>
            </div>

            <div className="node-types">
              <h3>Node Types</h3>
              <div className="node-type-list">
                {Array.from(new Set(flow.nodes.map(node => node.type))).map(type => (
                  <div key={type} className="node-type-item">
                    <span className="node-type-name">{type}</span>
                    <span className="node-type-count">
                      {flow.nodes.filter(node => node.type === type).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="conversion-options-summary">
              <h3>Current Settings</h3>
              <div className="options-summary">
                <div className="option-item">
                  <span className="option-label">Format:</span>
                  <span className="option-value">{options.format}</span>
                </div>
                <div className="option-item">
                  <span className="option-label">Target:</span>
                  <span className="option-value">{options.target}</span>
                </div>
                <div className="option-item">
                  <span className="option-label">Tests:</span>
                  <span className="option-value">{options.includeTests ? 'Yes' : 'No'}</span>
                </div>
                <div className="option-item">
                  <span className="option-label">Docs:</span>
                  <span className="option-value">{options.includeDocs ? 'Yes' : 'No'}</span>
                </div>
                <div className="option-item">
                  <span className="option-label">Langfuse:</span>
                  <span className="option-value">{options.withLangfuse ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="workspace-content-area">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {isConverting && (
        <ConversionProgress
          flow={flow}
          options={options}
        />
      )}

      {children}
    </div>
  );
};