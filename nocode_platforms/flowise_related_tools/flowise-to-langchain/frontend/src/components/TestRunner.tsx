import React from 'react';
import { FlowiseFlow, ConversionResult, TestResult } from '../types';

interface TestRunnerProps {
  flow: FlowiseFlow;
  conversionResult: ConversionResult;
  testConfiguration: any;
  selectedTestType: 'unit' | 'integration' | 'e2e' | 'all';
  onRunTest: () => void;
  isTesting: boolean;
  testResult?: TestResult;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  flow,
  conversionResult,
  testConfiguration,
  selectedTestType,
  onRunTest,
  isTesting,
  testResult,
}) => {
  return (
    <div className="test-runner">
      <h3>Test Runner</h3>
      
      <div className="test-summary">
        <div className="summary-item">
          <span className="label">Flow:</span>
          <span className="value">{flow.name}</span>
        </div>
        <div className="summary-item">
          <span className="label">Test Type:</span>
          <span className="value">{selectedTestType}</span>
        </div>
        <div className="summary-item">
          <span className="label">Files:</span>
          <span className="value">{conversionResult.filesGenerated.length}</span>
        </div>
      </div>
      
      <div className="test-actions">
        <button 
          className="run-test-button"
          onClick={onRunTest}
          disabled={isTesting}
          type="button"
        >
          {isTesting ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>
      
      {isTesting && (
        <div className="test-progress">
          <div className="spinner"></div>
          <p>Running {selectedTestType} tests...</p>
        </div>
      )}
      
      {testResult && (
        <div className="quick-results">
          <div className={`result-status ${testResult.success ? 'success' : 'error'}`}>
            {testResult.success ? '✅ Tests Passed' : '❌ Tests Failed'}
          </div>
          <p>{testResult.passedTests}/{testResult.totalTests} tests passed</p>
        </div>
      )}
    </div>
  );
};