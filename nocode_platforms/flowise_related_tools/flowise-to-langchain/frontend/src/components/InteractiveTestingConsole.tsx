import React, { useState, useRef, useEffect } from 'react';
import { FlowiseFlow, ConversionResult } from '../types';

interface InteractiveTestingConsoleProps {
  flow: FlowiseFlow;
  conversionResult: ConversionResult;
  testConfiguration: {
    timeout: number;
    envFile: string;
    mockExternal: boolean;
    generateReport: boolean;
    fixTests: boolean;
    dryRun: boolean;
  };
  onTestComplete?: (results: any) => void;
  onTestError?: (error: Error) => void;
  apiEndpoint?: string;
  realTimeExecution?: boolean;
}

interface ConsoleMessage {
  id: string;
  type: 'input' | 'output' | 'error' | 'info' | 'warning' | 'success';
  content: string;
  timestamp: Date;
  duration?: number;
  metadata?: {
    testType?: string;
    executionId?: string;
    stackTrace?: string;
    suggestions?: string[];
  };
}

export const InteractiveTestingConsole: React.FC<InteractiveTestingConsoleProps> = ({
  flow,
  conversionResult,
  testConfiguration,
  onTestComplete,
  onTestError,
  apiEndpoint = '/api/test',
  realTimeExecution = false,
}) => {
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [testResults, setTestResults] = useState<any>(null);
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'info',
      content: `Welcome to ${flow.name} Interactive Console`,
      timestamp: new Date(),
      metadata: {
        executionId: 'init-1',
      },
    },
    {
      id: '2',
      type: 'info',
      content: `Generated ${conversionResult.filesGenerated.length} files in ${conversionResult.metadata.format} format`,
      timestamp: new Date(),
      metadata: {
        executionId: 'init-2',
      },
    },
    {
      id: '3',
      type: 'info',
      content: `Test configuration: timeout=${testConfiguration.timeout}ms, mockExternal=${testConfiguration.mockExternal}`,
      timestamp: new Date(),
      metadata: {
        executionId: 'init-3',
      },
    },
  ]);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    type: ConsoleMessage['type'], 
    content: string, 
    metadata?: ConsoleMessage['metadata'],
    duration?: number
  ) => {
    const newMessage: ConsoleMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      timestamp: new Date(),
      duration,
      metadata,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const executeRealTimeCommand = async (command: string): Promise<any> => {
    if (!realTimeExecution) {
      throw new Error('Real-time execution not enabled');
    }

    const executionId = `exec-${Date.now()}`;
    const startTime = Date.now();

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          flow: flow.id,
          conversionResult: conversionResult.metadata,
          configuration: testConfiguration,
          executionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const duration = Date.now() - startTime;

      return { ...result, duration, executionId };
    } catch (error) {
      const duration = Date.now() - startTime;
      throw { error, duration, executionId };
    }
  };

  const handleRunCode = async () => {
    if (!input.trim()) return;

    const commandInput = input.trim();
    const executionId = `cmd-${Date.now()}`;
    const startTime = Date.now();
    
    // Add to execution history
    setExecutionHistory(prev => {
      const newHistory = [commandInput, ...prev.filter(cmd => cmd !== commandInput)];
      return newHistory.slice(0, 50); // Keep last 50 commands
    });
    setHistoryIndex(-1);
    
    addMessage('input', `> ${commandInput}`, { executionId });
    setInput('');
    setIsRunning(true);

    try {
      let result;
      let duration;
      
      if (realTimeExecution) {
        // Execute real command via API
        result = await executeRealTimeCommand(commandInput);
        duration = result.duration;
        
        if (result.success) {
          addMessage('output', result.output, { 
            executionId,
            testType: result.testType 
          }, duration);
          
          if (result.testResults) {
            setTestResults(result.testResults);
            onTestComplete?.(result.testResults);
          }
        } else {
          addMessage('error', result.error, {
            executionId,
            stackTrace: result.stackTrace,
            suggestions: result.suggestions,
          }, duration);
        }
      } else {
        // Simulate enhanced responses
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));
        duration = Date.now() - startTime;
        
        if (commandInput.includes('invoke')) {
          const mockResponse = {
            success: true,
            result: 'This is a mock response from the LangChain implementation',
            timestamp: new Date().toISOString(),
            executionTime: duration,
          };
          addMessage('success', `Chain invoked successfully\n${JSON.stringify(mockResponse, null, 2)}`, {
            executionId,
            testType: 'chain-invocation',
          }, duration);
        } else if (commandInput.includes('configuration') || commandInput.includes('config')) {
          const config = {
            format: conversionResult.metadata.format,
            target: conversionResult.metadata.target,
            nodes: flow.nodes.length,
            timestamp: conversionResult.metadata.timestamp,
            testConfiguration,
          };
          addMessage('output', JSON.stringify(config, null, 2), {
            executionId,
            testType: 'configuration',
          }, duration);
        } else if (commandInput.includes('test')) {
          const testResults = {
            totalTests: 15,
            passed: 13,
            failed: 2,
            coverage: '87.5%',
            duration: duration,
            failedTests: [
              { name: 'memory_test', error: 'Memory overflow in buffer chain' },
              { name: 'async_test', error: 'Promise timeout after 5000ms' },
            ],
          };
          
          setTestResults(testResults);
          addMessage('success', `Test suite completed\n✅ ${testResults.passed} passed\n❌ ${testResults.failed} failed\n📊 Coverage: ${testResults.coverage}`, {
            executionId,
            testType: 'test-suite',
            suggestions: testResults.failed > 0 ? ['Check memory allocation', 'Review async timeouts'] : undefined,
          }, duration);
          
          onTestComplete?.(testResults);
        } else if (commandInput.includes('error')) {
          const error = new Error('Simulated error for testing');
          addMessage('error', `Error: ${error.message}\nStack trace: at test.js:1:1\nat handleRunCode:1:1`, {
            executionId,
            stackTrace: error.stack,
            suggestions: ['Check input parameters', 'Verify environment setup'],
          }, duration);
          
          onTestError?.(error);
        } else if (commandInput.includes('help')) {
          const helpText = `Available commands:
- invoke(input): Test chain invocation
- getConfig(): Get configuration
- test(): Run test suite
- benchmark(): Performance benchmark
- validate(): Validate generated code
- deploy(): Test deployment
- monitor(): Monitor performance
- clear: Clear console
- history: Show command history
- help: Show this help`;
          addMessage('info', helpText, { executionId }, duration);
        } else if (commandInput === 'clear') {
          setMessages([]);
        } else if (commandInput === 'history') {
          const historyText = `Command history:\n${executionHistory.slice(0, 10).map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')}`;
          addMessage('info', historyText, { executionId }, duration);
        } else if (commandInput.includes('benchmark')) {
          const benchmarkResults = {
            averageResponseTime: '245ms',
            throughput: '412 req/min',
            memoryUsage: '156MB',
            cpuUsage: '12%',
          };
          addMessage('output', `Performance Benchmark Results:\n${JSON.stringify(benchmarkResults, null, 2)}`, {
            executionId,
            testType: 'benchmark',
          }, duration);
        } else {
          addMessage('output', `Executed: ${commandInput}\nOutput: Mock execution result\nExecution time: ${duration}ms`, {
            executionId,
          }, duration);
        }
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      addMessage('error', `Execution failed: ${errorMessage}`, {
        executionId,
        suggestions: ['Check command syntax', 'Verify API connection'],
      }, duration);
      
      onTestError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRunCode();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < executionHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(executionHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(executionHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete logic could go here
      const commands = ['invoke', 'test', 'config', 'help', 'clear', 'benchmark', 'validate', 'deploy', 'monitor'];
      const match = commands.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  const getMessageIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'input':
        return '>';
      case 'output':
        return '📤';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '';
    }
  };

  const getMessageTypeColor = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error':
        return '#ff6b6b';
      case 'success':
        return '#51cf66';
      case 'warning':
        return '#ffd43b';
      case 'info':
        return '#74c0fc';
      case 'input':
        return '#868e96';
      default:
        return '#495057';
    }
  };

  const exampleCommands = [
    {
      label: 'Test Chain Invoke',
      command: 'await chain.invoke("Hello, world!")',
      description: 'Test the main chain with sample input',
    },
    {
      label: 'Get Configuration',
      command: 'getConfig()',
      description: 'View the current chain configuration',
    },
    {
      label: 'Run Full Test Suite',
      command: 'test',
      description: 'Execute the complete test suite',
    },
    {
      label: 'Performance Benchmark',
      command: 'benchmark',
      description: 'Run performance benchmarks',
    },
    {
      label: 'Validate Code',
      command: 'validate',
      description: 'Validate generated code quality',
    },
    {
      label: 'Show Command History',
      command: 'history',
      description: 'Display recent command history',
    },
    {
      label: 'Show Help',
      command: 'help',
      description: 'Display all available commands',
    },
    {
      label: 'Simulate Error',
      command: 'error test',
      description: 'Test error handling capabilities',
    },
  ];

  return (
    <div className="interactive-testing-console">
      <div className="console-header">
        <h3>Interactive Testing Console</h3>
        <div className="console-meta">
          <span className="meta-item">
            📄 {flow.name}
          </span>
          <span className="meta-item">
            🔧 {conversionResult.metadata.format.toUpperCase()}
          </span>
          <span className="meta-item">
            📊 {conversionResult.filesGenerated.length} files
          </span>
        </div>
      </div>
      
      <div className="console-content">
        <div className="console-output">
          <div className="messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`console-message ${message.type}`}
              >
                <span className="message-icon">
                  {getMessageIcon(message.type)}
                </span>
                <div className="message-content">
                  <pre 
                    className="message-text"
                    style={{ color: getMessageTypeColor(message.type) }}
                  >
                    {message.content}
                  </pre>
                  <div className="message-metadata">
                    <span className="message-timestamp">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.duration && (
                      <span className="message-duration">
                        ({message.duration}ms)
                      </span>
                    )}
                    {message.metadata?.executionId && (
                      <span className="execution-id">
                        ID: {message.metadata.executionId.slice(-6)}
                      </span>
                    )}
                  </div>
                  {message.metadata?.suggestions && (
                    <div className="message-suggestions">
                      <strong>Suggestions:</strong>
                      <ul>
                        {message.metadata.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isRunning && (
              <div className="console-message running">
                <span className="message-icon">
                  <div className="spinner"></div>
                </span>
                <div className="message-content">
                  <span className="message-text">Executing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="console-input-container">
          <div className="input-header">
            <span className="input-prompt">Enter command:</span>
            <span className="input-hint">Ctrl+Enter to execute</span>
          </div>
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your command here... (e.g., await chain.invoke('test'))\nUse ↑/↓ for history, Tab for autocomplete, Ctrl+Enter to execute"
              rows={3}
              disabled={isRunning}
              className="console-input"
              spellCheck={false}
            />
            <button 
              onClick={handleRunCode}
              disabled={isRunning || !input.trim()}
              className="run-button"
              type="button"
            >
              {isRunning ? (
                <>
                  <div className="button-spinner"></div>
                  Running...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Run
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="console-examples">
        <h4>Example Commands</h4>
        <div className="examples-grid">
          {exampleCommands.map((example, index) => (
            <div key={index} className="example-item">
              <button 
                onClick={() => setInput(example.command)}
                className="example-button"
                type="button"
                disabled={isRunning}
              >
                <span className="example-label">{example.label}</span>
                <span className="example-command">{example.command}</span>
              </button>
              <p className="example-description">{example.description}</p>
            </div>
          ))}
        </div>
        
        <div className="console-actions">
          <button 
            onClick={() => setMessages([])}
            className="clear-button"
            type="button"
          >
            🗑️ Clear Console
          </button>
          <button 
            onClick={() => inputRef.current?.focus()}
            className="focus-button"
            type="button"
          >
            🎯 Focus Input
          </button>
          {testResults && (
            <button 
              onClick={() => onTestComplete?.(testResults)}
              className="export-button"
              type="button"
            >
              📤 Export Results
            </button>
          )}
          <button 
            onClick={() => {
              const exportData = {
                messages: messages.slice(-20), // Last 20 messages
                testResults,
                executionHistory: executionHistory.slice(0, 10),
                timestamp: new Date().toISOString(),
              };
              console.log('Console session export:', exportData);
              // Could trigger download of session data
            }}
            className="export-session-button"
            type="button"
          >
            💾 Export Session
          </button>
        </div>
        
        {testResults && (
          <div className="test-results-summary">
            <h4>Latest Test Results</h4>
            <div className="results-grid">
              <div className="result-item">
                <span className="result-label">Total Tests:</span>
                <span className="result-value">{testResults.totalTests}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Passed:</span>
                <span className="result-value success">{testResults.passed}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Failed:</span>
                <span className="result-value error">{testResults.failed}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Coverage:</span>
                <span className="result-value">{testResults.coverage}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {realTimeExecution && (
        <div className="real-time-indicator">
          🔗 Connected to real-time execution environment
        </div>
      )}
    </div>
  );
};