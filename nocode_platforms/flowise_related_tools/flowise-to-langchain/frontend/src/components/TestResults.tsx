import React from 'react';
import { TestResult, FlowiseFlow, ConversionResult } from '../types';

interface TestResultsProps {
  testResult?: TestResult;
  isTesting: boolean;
  testHistory: TestResult[];
  onRerunTest: () => void;
  flow: FlowiseFlow;
  conversionResult: ConversionResult;
}

export const TestResults: React.FC<TestResultsProps> = ({
  testResult,
  isTesting,
  testHistory,
  onRerunTest,
  flow,
  conversionResult,
}) => {
  if (isTesting) {
    return (
      <div className="test-results loading">
        <div className="spinner"></div>
        <p>Running tests...</p>
      </div>
    );
  }

  if (!testResult) {
    return (
      <div className="test-results empty">
        <p>No test results yet. Run tests to see results here.</p>
      </div>
    );
  }

  return (
    <div className="test-results">
      <div className={`result-status ${testResult.success ? 'success' : 'error'}`}>
        {testResult.success ? '✅ All Tests Passed' : '❌ Some Tests Failed'}
      </div>
      
      <div className="test-summary">
        <div className="summary-item">
          <span className="label">Total Tests:</span>
          <span className="value">{testResult.totalTests}</span>
        </div>
        <div className="summary-item">
          <span className="label">Passed:</span>
          <span className="value">{testResult.passedTests}</span>
        </div>
        <div className="summary-item">
          <span className="label">Failed:</span>
          <span className="value">{testResult.failedTests.length}</span>
        </div>
        <div className="summary-item">
          <span className="label">Duration:</span>
          <span className="value">{testResult.duration}ms</span>
        </div>
        {testResult.coverage && (
          <div className="summary-item">
            <span className="label">Coverage:</span>
            <span className="value">{testResult.coverage}</span>
          </div>
        )}
      </div>
      
      {testResult.failedTests.length > 0 && (
        <div className="failed-tests">
          <h4>Failed Tests</h4>
          {testResult.failedTests.map((test, index) => (
            <div key={index} className="failed-test">
              <h5>{test.name}</h5>
              <p className="error">{test.error}</p>
              {test.suggestion && (
                <p className="suggestion">💡 {test.suggestion}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="test-actions">
        <button 
          className="rerun-button"
          onClick={onRerunTest}
          type="button"
        >
          Rerun Tests
        </button>
      </div>
    </div>
  );
};