/**
 * Test Setup File
 * Global configuration and utilities for all tests
 */

import { jest } from '@jest/globals';

// Extend Jest matchers if needed
expect.extend({
  toBeValidLangChainCode(received: string) {
    const hasImports = received.includes('import');
    const hasExports = received.includes('export') || received.includes('module.exports');
    const hasLangChainImports = received.includes('@langchain/') || received.includes('langchain');
    
    const pass = hasImports && hasExports && hasLangChainImports;
    
    return {
      message: () => 
        pass 
          ? `Expected code not to be valid LangChain code`
          : `Expected code to be valid LangChain code (missing: ${!hasImports ? 'imports' : ''} ${!hasExports ? 'exports' : ''} ${!hasLangChainImports ? 'langchain imports' : ''})`,
      pass,
    };
  },
});

// Global test utilities
declare global {
  var testUtils: {
    createMockFlowiseNode: (overrides?: any) => any;
    createMockFlowiseFlow: (nodes?: any[], edges?: any[]) => any;
    waitFor: (ms: number) => Promise<unknown>;
    captureConsole: () => { logs: string[]; errors: string[]; restore: () => void };
  };
}

(global as any).testUtils = {
  /**
   * Create a mock Flowise node
   */
  createMockFlowiseNode: (overrides: any = {}) => ({
    id: 'test-node',
    position: { x: 100, y: 100 },
    type: 'customNode',
    data: {
      id: 'test-node',
      label: 'Test Node',
      version: 2,
      name: 'testNode',
      type: 'openAI',
      baseClasses: ['BaseLanguageModel'],
      category: 'llm',
      description: 'A test node',
      inputParams: [],
      inputAnchors: [],
      inputs: {},
      outputAnchors: [{
        id: 'output1',
        name: 'output',
        label: 'Output',
        type: 'BaseLanguageModel',
      }],
      ...overrides.data,
    },
    ...overrides,
  }),

  /**
   * Create a mock Flowise flow
   */
  createMockFlowiseFlow: (nodes: any[] = [], edges: any[] = []) => ({
    nodes: nodes.length > 0 ? nodes : [(global as any).testUtils.createMockFlowiseNode()],
    edges,
    chatflow: {
      id: 'test-chatflow',
      name: 'Test Chatflow',
      flowData: '{}',
      deployed: false,
      isPublic: false,
      apikeyid: '',
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-01T00:00:00.000Z',
    },
  }),

  /**
   * Wait for a promise to resolve
   */
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Capture console output
   */
  captureConsole: () => {
    const originalLog = console.log;
    const originalError = console.error;
    const logs: string[] = [];
    const errors: string[] = [];

    console.log = jest.fn((...args) => logs.push(args.join(' ')));
    console.error = jest.fn((...args) => errors.push(args.join(' ')));

    return {
      logs,
      errors,
      restore: () => {
        console.log = originalLog;
        console.error = originalError;
      }
    };
  },
};

// Setup global error handler for tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Set test timeout
jest.setTimeout(30000);