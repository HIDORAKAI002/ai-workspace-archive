import React from 'react';
import { FlowiseFlow, ConversionResult } from '../types';

interface TestConfigurationProps {
  configuration: any;
  onConfigurationChange: (config: any) => void;
  flow: FlowiseFlow;
  conversionResult: ConversionResult;
  selectedTestType: 'unit' | 'integration' | 'e2e' | 'all';
  onTestTypeChange: (type: 'unit' | 'integration' | 'e2e' | 'all') => void;
}

export const TestConfiguration: React.FC<TestConfigurationProps> = ({
  configuration,
  onConfigurationChange,
  flow,
  conversionResult,
  selectedTestType,
  onTestTypeChange,
}) => {
  return (
    <div className="test-configuration">
      <h3>Test Configuration</h3>
      
      <div className="config-group">
        <h4>Test Type</h4>
        <div className="test-type-options">
          {['unit', 'integration', 'e2e', 'all'].map((type) => (
            <label key={type} className="radio-option">
              <input
                type="radio"
                name="testType"
                value={type}
                checked={selectedTestType === type}
                onChange={(e) => onTestTypeChange(e.target.value as any)}
              />
              <span>{type === 'e2e' ? 'End-to-End' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="config-group">
        <h4>Test Settings</h4>
        
        <div className="config-item">
          <label htmlFor="timeout">Timeout (ms):</label>
          <input
            id="timeout"
            type="number"
            value={configuration.timeout}
            onChange={(e) => onConfigurationChange({
              ...configuration,
              timeout: parseInt(e.target.value)
            })}
          />
        </div>
        
        <div className="config-item">
          <label htmlFor="envFile">Environment File:</label>
          <input
            id="envFile"
            type="text"
            value={configuration.envFile}
            onChange={(e) => onConfigurationChange({
              ...configuration,
              envFile: e.target.value
            })}
          />
        </div>
        
        <div className="config-item checkbox">
          <input
            id="mockExternal"
            type="checkbox"
            checked={configuration.mockExternal}
            onChange={(e) => onConfigurationChange({
              ...configuration,
              mockExternal: e.target.checked
            })}
          />
          <label htmlFor="mockExternal">Mock external API calls</label>
        </div>
        
        <div className="config-item checkbox">
          <input
            id="generateReport"
            type="checkbox"
            checked={configuration.generateReport}
            onChange={(e) => onConfigurationChange({
              ...configuration,
              generateReport: e.target.checked
            })}
          />
          <label htmlFor="generateReport">Generate detailed report</label>
        </div>
        
        <div className="config-item checkbox">
          <input
            id="fixTests"
            type="checkbox"
            checked={configuration.fixTests}
            onChange={(e) => onConfigurationChange({
              ...configuration,
              fixTests: e.target.checked
            })}
          />
          <label htmlFor="fixTests">Auto-fix failing tests</label>
        </div>
      </div>
      
      <div className="config-summary">
        <h4>Test Summary</h4>
        <p>Flow: {flow.name}</p>
        <p>Generated Files: {conversionResult.filesGenerated.length}</p>
        <p>Test Type: {selectedTestType}</p>
      </div>
    </div>
  );
};