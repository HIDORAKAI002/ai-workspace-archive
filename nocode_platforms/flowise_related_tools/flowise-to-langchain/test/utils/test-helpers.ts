/**
 * Test Utilities and Helpers
 * Common utilities for testing across the test suite
 */

import { writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export interface TestFlow {
  nodes: any[];
  edges: any[];
  chatflow?: any;
}

export interface TestResult {
  success: boolean;
  data?: any;
  errors?: string[];
  warnings?: string[];
}

/**
 * Create a temporary test directory
 */
export async function createTempDir(prefix = 'flowise-test'): Promise<string> {
  const testDir = join(tmpdir(), `${prefix}-${Date.now()}`);
  await mkdir(testDir, { recursive: true });
  return testDir;
}

/**
 * Clean up a temporary test directory
 */
export async function cleanupTempDir(testDir: string): Promise<void> {
  await rm(testDir, { recursive: true, force: true });
}

/**
 * Create a test flow file
 */
export async function createTestFlowFile(testDir: string, flow: TestFlow, filename = 'test-flow.json'): Promise<string> {
  const filePath = join(testDir, filename);
  await writeFile(filePath, JSON.stringify(flow, null, 2));
  return filePath;
}

/**
 * Mock Flowise node factory - Creates proper IRNode structure
 */
/**
 * Create a proper IRNode for testing with correct parameter structure
 */
export function createIRNode(
  type: string,
  category: string,
  parameters: { name: string; value: any; type?: string; required?: boolean; description?: string }[] = [],
  overrides: Partial<any> = {}
): any {
  // Auto-detect parameter type if not specified
  const detectParameterType = (value: any): string => {
    if (value === null || value === undefined) return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (typeof value === 'object') {
      // Check if it's JSON-like
      try {
        JSON.stringify(value);
        return 'json';
      } catch {
        return 'object';
      }
    }
    // Check for code-like strings
    if (typeof value === 'string' && (value.includes('{') || value.includes('function'))) {
      return 'code';
    }
    return 'string';
  };

  const nodeId = overrides.id || `node-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id: nodeId,
    type,
    label: overrides.label || `Test_${type}`,
    category,
    inputs: overrides.inputs || [],
    outputs: overrides.outputs || [],
    parameters: parameters.map(p => ({
      name: p.name,
      value: p.value,
      type: p.type || detectParameterType(p.value),
      required: p.required !== undefined ? p.required : false,
      description: p.description || `Parameter ${p.name}`,
    })),
    position: overrides.position || { x: 100, y: 100 },
    metadata: {
      version: '2.0',
      description: overrides.metadata?.description || `Test ${type} node`,
      nodeId,
      ...overrides.metadata,
    },
    ...overrides,
  };
}

export function createMockNode(overrides: Partial<any> = {}): any {
  // Convert inputs object to parameters array if provided
  const convertInputsToParameters = (inputs: Record<string, any> = {}): any[] => {
    return Object.entries(inputs).map(([name, value]) => ({
      name,
      value,
      type: typeof value === 'number' ? 'number' : 
            typeof value === 'boolean' ? 'boolean' : 
            Array.isArray(value) ? 'array' :
            typeof value === 'object' ? 'object' : 'string',
      required: false,
    }));
  };

  // Extract the real node type from various possible locations
  const nodeType = overrides.type || 
                   overrides.data?.name || 
                   overrides.data?.type || 
                   'openAI';
  
  // Extract category
  const category = overrides.category || 
                   overrides.data?.category || 
                   'llm';
  
  // Extract label
  const label = overrides.label || 
                overrides.data?.label || 
                `Test ${nodeType}`;

  const baseNode = {
    id: overrides.id || `node-${Math.random().toString(36).substr(2, 9)}`,
    position: overrides.position || { x: 100, y: 100 },
    type: nodeType,
    label: label,
    category: category,
    inputs: overrides.inputs || [],
    outputs: overrides.outputs || [],
    parameters: [],
    metadata: {
      version: '2.0',
      description: overrides.metadata?.description || `Test ${nodeType} node`,
      ...overrides.metadata,
    },
  };

  // Handle data.inputs conversion to parameters
  if (overrides.data?.inputs && !overrides.parameters) {
    baseNode.parameters = convertInputsToParameters(overrides.data.inputs);
  }

  // Handle direct parameters override
  if (overrides.parameters) {
    baseNode.parameters = overrides.parameters;
  }

  // Return clean node structure without legacy data field
  const { data, ...cleanOverrides } = overrides;
  
  return {
    ...baseNode,
    ...cleanOverrides,
    // Ensure parameters is always an array
    parameters: baseNode.parameters || [],
  };
}

/**
 * Mock Flowise edge factory
 */
export function createMockEdge(source: string, target: string, overrides: Partial<any> = {}): any {
  return {
    source,
    target,
    sourceHandle: 'output1',
    targetHandle: 'input1',
    id: `edge-${Math.random().toString(36).substr(2, 9)}`,
    ...overrides,
  };
}

/**
 * Create a mock flow with specified number of nodes
 */
export function createMockFlow(nodeCount = 1, edgeCount = 0): TestFlow {
  const nodes = Array.from({ length: nodeCount }, (_, i) => 
    createMockNode({
      id: `node-${i}`,
      data: { 
        id: `node-${i}`,
        label: `Node ${i}`,
        type: i === 0 ? 'openAI' : 'llmChain',
      },
    })
  );

  const edges = Array.from({ length: edgeCount }, (_, i) => 
    createMockEdge(
      `node-${i}`,
      `node-${Math.min(i + 1, nodeCount - 1)}`,
      { id: `edge-${i}` }
    )
  );

  return { nodes, edges };
}

/**
 * Validate generated TypeScript code structure
 */
export function validateTypeScriptCode(code: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required imports
  if (!code.includes('import')) {
    errors.push('Missing import statements');
  }

  // Check for exports
  if (!code.includes('export')) {
    errors.push('Missing export statements');
  }

  // Check for class definition
  if (!code.match(/class \w+/)) {
    errors.push('Missing class definition');
  }

  // Check for constructor
  if (!code.includes('constructor')) {
    warnings.push('Missing constructor');
  }

  // Check for type annotations
  if (!code.match(/: \w+/)) {
    warnings.push('Missing type annotations');
  }

  // Check for async methods
  if (!code.includes('async')) {
    warnings.push('No async methods found');
  }

  // Check for error handling
  if (!code.includes('try') || !code.includes('catch')) {
    warnings.push('Missing error handling');
  }

  // Check for LangChain imports
  if (!code.includes('@langchain/') && !code.includes('langchain')) {
    errors.push('Missing LangChain imports');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Compare two code strings ignoring whitespace differences
 */
export function compareCode(expected: string, actual: string): {
  equal: boolean;
  differences: string[];
} {
  const normalize = (code: string) => 
    code.replace(/\s+/g, ' ').trim().toLowerCase();

  const normalizedExpected = normalize(expected);
  const normalizedActual = normalize(actual);

  const differences: string[] = [];

  if (normalizedExpected !== normalizedActual) {
    // Find specific differences
    const expectedLines = expected.split('\n').map(l => l.trim());
    const actualLines = actual.split('\n').map(l => l.trim());

    expectedLines.forEach((line, index) => {
      if (!actualLines.includes(line)) {
        differences.push(`Missing: ${line}`);
      }
    });

    actualLines.forEach((line, index) => {
      if (!expectedLines.includes(line)) {
        differences.push(`Extra: ${line}`);
      }
    });
  }

  return {
    equal: normalizedExpected === normalizedActual,
    differences,
  };
}

/**
 * Validate package.json structure
 */
export function validatePackageJson(packageJson: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ['name', 'version', 'scripts'];
  requiredFields.forEach(field => {
    if (!packageJson[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Check for LangChain dependencies
  const dependencies = packageJson.dependencies || {};
  const hasLangChain = Object.keys(dependencies).some(dep => 
    dep.includes('langchain') || dep.includes('@langchain/')
  );

  if (!hasLangChain) {
    errors.push('Missing LangChain dependencies');
  }

  // Check for build script
  const scripts = packageJson.scripts || {};
  if (!scripts.build) {
    errors.push('Missing build script');
  }

  // Check for TypeScript in devDependencies
  const devDependencies = packageJson.devDependencies || {};
  if (!devDependencies.typescript) {
    errors.push('Missing TypeScript in devDependencies');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Mock performance timer
 */
export class PerformanceTimer {
  private startTime: number = 0;
  private endTime: number = 0;

  start(): void {
    this.startTime = Date.now();
  }

  stop(): number {
    this.endTime = Date.now();
    return this.endTime - this.startTime;
  }

  get duration(): number {
    return this.endTime - this.startTime;
  }
}

/**
 * Mock memory usage tracker
 */
export class MemoryTracker {
  private initialMemory: number = 0;

  start(): void {
    this.initialMemory = process.memoryUsage().heapUsed;
  }

  getUsage(): {
    current: number;
    initial: number;
    difference: number;
  } {
    const current = process.memoryUsage().heapUsed;
    return {
      current,
      initial: this.initialMemory,
      difference: current - this.initialMemory,
    };
  }
}

/**
 * Test data generators
 */
export const TestData = {
  /**
   * Generate a large flow for performance testing
   */
  createLargeFlow(nodeCount: number, edgeRatio = 0.8): TestFlow {
    const nodeTypes = ['openAI', 'chatOpenAI', 'llmChain'];
    const categories = ['llm', 'llm', 'chain'];
    
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const typeIndex = i % 3;
      return createIRNode(
        nodeTypes[typeIndex],
        categories[typeIndex],
        [
          { name: 'modelName', value: `model-${i}`, type: 'string' },
          { name: 'temperature', value: 0.7, type: 'number' },
        ]
      );
    });

    const edgeCount = Math.floor(nodeCount * edgeRatio);
    const edges = Array.from({ length: edgeCount }, (_, i) => {
      const sourceIndex = i;
      const targetIndex = Math.min(i + 1, nodeCount - 1);
      return createMockEdge(`node-${sourceIndex}`, `node-${targetIndex}`);
    });

    return { nodes, edges };
  },

  /**
   * Generate a complex flow with multiple node types
   */
  createComplexFlow(): TestFlow {
    const nodes = [
      createIRNode('chatOpenAI', 'llm', [
        { name: 'modelName', value: 'gpt-4', type: 'string', required: true },
      ]),
      createIRNode('chatPromptTemplate', 'prompt', [
        { name: 'systemMessage', value: 'You are helpful', type: 'string', required: true },
        { name: 'humanMessage', value: '{input}', type: 'string', required: true },
      ]),
      createIRNode('bufferMemory', 'memory', []),
      createIRNode('conversationChain', 'chain', []),
    ];

    // Set proper IDs for edge references
    nodes[0].id = 'llm-1';
    nodes[1].id = 'prompt-1';
    nodes[2].id = 'memory-1';
    nodes[3].id = 'chain-1';

    const edges = [
      createMockEdge('llm-1', 'chain-1'),
      createMockEdge('prompt-1', 'chain-1'),
      createMockEdge('memory-1', 'chain-1'),
    ];

    return { nodes, edges };
  },

  /**
   * Generate an invalid flow for error testing
   */
  createInvalidFlow(): TestFlow {
    return {
      nodes: [
        {
          id: '', // Invalid empty ID
          position: { x: 'invalid', y: 100 }, // Invalid position
          data: {
            // Missing required fields
            label: 'Invalid Node',
          },
        },
      ],
      edges: [
        {
          source: 'nonexistent',
          target: 'alsononexistent',
          sourceHandle: 'output1',
          targetHandle: 'input1',
          id: 'invalid-edge',
        },
      ],
    };
  },
};

/**
 * Assertion helpers
 */
export const TestAssertions = {
  /**
   * Assert that code contains expected LangChain patterns
   */
  assertLangChainCode(code: string): void {
    if (!code.includes('@langchain/') && !code.includes('langchain')) {
      throw new Error('Expected LangChain imports');
    }

    if (!code.includes('export class')) {
      throw new Error('Expected exported class');
    }

    if (!code.includes('async')) {
      throw new Error('Expected async methods');
    }
  },

  /**
   * Assert that package.json has required structure
   */
  assertValidPackageJson(packageJson: any): void {
    const validation = validatePackageJson(packageJson);
    if (!validation.valid) {
      throw new Error(`Invalid package.json: ${validation.errors.join(', ')}`);
    }
  },

  /**
   * Assert performance within limits
   */
  assertPerformance(duration: number, maxDuration: number): void {
    if (duration > maxDuration) {
      throw new Error(`Performance assertion failed: ${duration}ms > ${maxDuration}ms`);
    }
  },

  /**
   * Assert memory usage within limits
   */
  assertMemoryUsage(usage: number, maxUsage: number): void {
    if (usage > maxUsage) {
      throw new Error(`Memory assertion failed: ${usage} bytes > ${maxUsage} bytes`);
    }
  },
};

export default {
  createTempDir,
  cleanupTempDir,
  createTestFlowFile,
  createIRNode,
  createMockNode,
  createMockEdge,
  createMockFlow,
  validateTypeScriptCode,
  compareCode,
  validatePackageJson,
  PerformanceTimer,
  MemoryTracker,
  TestData,
  TestAssertions,
};