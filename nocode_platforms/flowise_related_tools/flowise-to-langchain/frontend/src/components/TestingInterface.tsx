import React, { useState, useCallback, useEffect } from 'react';
import { TestingInterfaceProps, TestResult } from '../types';
import { TestRunner } from './TestRunner';
import { TestResults } from './TestResults';
import { TestConfiguration } from './TestConfiguration';
import { InteractiveTestingConsole } from './InteractiveTestingConsole';
import './TestingInterface.css';

export const TestingInterface: React.FC<TestingInterfaceProps> = ({
  flow,
  conversionResult,
  onRunTest,
  isTesting,
  testResult,
  className,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'runner' | 'results' | 'interactive'>('config');
  const [testConfiguration, setTestConfiguration] = useState({
    timeout: 30000,
    envFile: '.env.test',
    mockExternal: true,
    generateReport: true,
    fixTests: false,
    dryRun: false,
  });
  const [selectedTestType, setSelectedTestType] = useState<'unit' | 'integration' | 'e2e' | 'all'>('all');
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);

  // Add completed test to history
  useEffect(() => {
    if (testResult && !isTesting) {
      setTestHistory(prev => [testResult, ...prev.slice(0, 9)]);
    }
  }, [testResult, isTesting]);

  const handleRunTest = useCallback(() => {
    if (!isTesting) {
      onRunTest(selectedTestType);
      setActiveTab('results');
    }
  }, [isTesting, onRunTest, selectedTestType]);

  const handleTestTypeChange = useCallback((type: typeof selectedTestType) => {
    setSelectedTestType(type);
  }, []);

  const handleConfigurationChange = useCallback((config: typeof testConfiguration) => {
    setTestConfiguration(config);
  }, []);

  const getTestStatusIcon = (success: boolean) => {
    return success ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'config':
        return (
          <TestConfiguration
            configuration={testConfiguration}
            onConfigurationChange={handleConfigurationChange}
            flow={flow}
            conversionResult={conversionResult}
            selectedTestType={selectedTestType}
            onTestTypeChange={handleTestTypeChange}
          />
        );
      
      case 'runner':
        return (
          <TestRunner
            flow={flow}
            conversionResult={conversionResult}
            testConfiguration={testConfiguration}
            selectedTestType={selectedTestType}
            onRunTest={handleRunTest}
            isTesting={isTesting}
            testResult={testResult}
          />
        );
      
      case 'results':
        return (
          <TestResults
            testResult={testResult}
            isTesting={isTesting}
            testHistory={testHistory}
            onRerunTest={handleRunTest}
            flow={flow}
            conversionResult={conversionResult}
          />
        );
      
      case 'interactive':
        return (
          <InteractiveTestingConsole
            flow={flow}
            conversionResult={conversionResult}
            testConfiguration={testConfiguration}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`testing-interface ${className || ''}`}>
      <div className="testing-header">
        <div className="testing-title">
          <h2>Test Converted Code</h2>
          <p>Validate your LangChain implementation</p>
        </div>
        
        <div className="testing-actions">
          <div className="test-type-selector">
            <label htmlFor="test-type">Test Type:</label>
            <select
              id="test-type"
              value={selectedTestType}
              onChange={(e) => handleTestTypeChange(e.target.value as typeof selectedTestType)}
            >
              <option value="all">All Tests</option>
              <option value="unit">Unit Tests</option>
              <option value="integration">Integration Tests</option>
              <option value="e2e">End-to-End Tests</option>
            </select>
          </div>
          
          <button
            className="run-test-button"
            onClick={handleRunTest}
            disabled={isTesting}
            type="button"
          >
            {isTesting ? (
              <>
                <div className="spinner"></div>
                Running Tests...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Run Tests
              </>
            )}
          </button>
        </div>
      </div>

      <div className="testing-content">
        <div className="testing-tabs">
          <button
            className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Configuration
          </button>
          
          <button
            className={`tab-button ${activeTab === 'runner' ? 'active' : ''}`}
            onClick={() => setActiveTab('runner')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Test Runner
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
            {testResult && (
              <span className={`result-indicator ${testResult.success ? 'success' : 'error'}`}>
                {getTestStatusIcon(testResult.success)}
              </span>
            )}
          </button>
          
          <button
            className={`tab-button ${activeTab === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactive')}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 21v-7" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 10V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 21v-9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 21v-5" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 12V3" stroke="currentColor" strokeWidth="2"/>
              <path d="M1 14h6" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 8h6" stroke="currentColor" strokeWidth="2"/>
              <path d="M17 16h6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Interactive
          </button>
        </div>

        <div className="testing-main">
          <div className="testing-sidebar">
            <div className="conversion-summary">
              <h3>Conversion Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-label">Files Generated</span>
                  <span className="stat-value">{conversionResult.filesGenerated.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Nodes Converted</span>
                  <span className="stat-value">{conversionResult.nodesConverted}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Format</span>
                  <span className="stat-value">{conversionResult.metadata.format}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Target</span>
                  <span className="stat-value">{conversionResult.metadata.target}</span>
                </div>
              </div>
            </div>

            <div className="test-summary">
              <h3>Test Summary</h3>
              {testResult ? (
                <div className="test-stats">
                  <div className={`stat ${testResult.success ? 'success' : 'error'}`}>
                    <span className="stat-label">Status</span>
                    <span className="stat-value">
                      {getTestStatusIcon(testResult.success)}
                      {testResult.success ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Total Tests</span>
                    <span className="stat-value">{testResult.totalTests}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Passed</span>
                    <span className="stat-value">{testResult.passedTests}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Failed</span>
                    <span className="stat-value">{testResult.failedTests.length}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{testResult.duration}ms</span>
                  </div>
                  {testResult.coverage && (
                    <div className="stat">
                      <span className="stat-label">Coverage</span>
                      <span className="stat-value">{testResult.coverage}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-test-data">
                  <p>No test results yet</p>
                </div>
              )}
            </div>

            <div className="test-files">
              <h3>Generated Files</h3>
              <div className="file-list">
                {conversionResult.filesGenerated.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </span>
                    <span className="file-name">{file.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="testing-content-area">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};