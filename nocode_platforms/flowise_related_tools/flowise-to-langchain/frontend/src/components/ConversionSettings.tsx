import React from 'react';
import { ConversionOptions, FlowiseFlow } from '../types';

interface ConversionSettingsProps {
  options: ConversionOptions;
  onOptionsChange: (options: Partial<ConversionOptions>) => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  flow: FlowiseFlow;
}

export const ConversionSettings: React.FC<ConversionSettingsProps> = ({
  options,
  onOptionsChange,
  showAdvanced,
  onToggleAdvanced,
  flow,
}) => {
  return (
    <div className="conversion-settings">
      <h3>Conversion Settings</h3>
      
      <div className="settings-group">
        <h4>Basic Settings</h4>
        
        <div className="setting-item">
          <label htmlFor="format">Output Format:</label>
          <select
            id="format"
            value={options.format}
            onChange={(e) => onOptionsChange({ format: e.target.value as any })}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="target">Target Runtime:</label>
          <select
            id="target"
            value={options.target}
            onChange={(e) => onOptionsChange({ target: e.target.value as any })}
          >
            <option value="node">Node.js</option>
            <option value="browser">Browser</option>
            <option value="edge">Edge Runtime</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label htmlFor="outputPath">Output Directory:</label>
          <input
            id="outputPath"
            type="text"
            value={options.outputPath}
            onChange={(e) => onOptionsChange({ outputPath: e.target.value })}
          />
        </div>
      </div>
      
      <div className="settings-group">
        <h4>Generation Options</h4>
        
        <div className="setting-item checkbox">
          <input
            id="includeTests"
            type="checkbox"
            checked={options.includeTests}
            onChange={(e) => onOptionsChange({ includeTests: e.target.checked })}
          />
          <label htmlFor="includeTests">Include test files</label>
        </div>
        
        <div className="setting-item checkbox">
          <input
            id="includeDocs"
            type="checkbox"
            checked={options.includeDocs}
            onChange={(e) => onOptionsChange({ includeDocs: e.target.checked })}
          />
          <label htmlFor="includeDocs">Include documentation</label>
        </div>
        
        <div className="setting-item checkbox">
          <input
            id="withLangfuse"
            type="checkbox"
            checked={options.withLangfuse}
            onChange={(e) => onOptionsChange({ withLangfuse: e.target.checked })}
          />
          <label htmlFor="withLangfuse">Include Langfuse integration</label>
        </div>
      </div>
      
      <button 
        className="toggle-advanced"
        onClick={onToggleAdvanced}
        type="button"
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </button>
      
      {showAdvanced && (
        <div className="settings-group">
          <h4>Advanced Settings</h4>
          
          <div className="setting-item">
            <label htmlFor="flowiseVersion">Flowise Version:</label>
            <input
              id="flowiseVersion"
              type="text"
              value={options.flowiseVersion}
              onChange={(e) => onOptionsChange({ flowiseVersion: e.target.value })}
            />
          </div>
          
          <div className="setting-item checkbox">
            <input
              id="selfTest"
              type="checkbox"
              checked={options.selfTest}
              onChange={(e) => onOptionsChange({ selfTest: e.target.checked })}
            />
            <label htmlFor="selfTest">Run self-test after conversion</label>
          </div>
          
          <div className="setting-item checkbox">
            <input
              id="overwrite"
              type="checkbox"
              checked={options.overwrite}
              onChange={(e) => onOptionsChange({ overwrite: e.target.checked })}
            />
            <label htmlFor="overwrite">Overwrite existing files</label>
          </div>
        </div>
      )}
    </div>
  );
};