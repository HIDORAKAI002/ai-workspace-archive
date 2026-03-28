/**
 * Simple Phase 1 Test - Validation Test
 * 
 * Basic test to validate Phase 1 converter structure
 */

import { describe, test, expect } from '@jest/globals';
import type { IRNode, GenerationContext } from '../../src/ir/types.js';

// Import BedrockChat converter for basic testing
import { BedrockChatConverter } from '../../src/registry/converters/bedrock.js';

// Simple test utility
function createSimpleNode(): IRNode {
  return {
    id: 'test-node-1',
    type: 'bedrockChat',
    label: 'Test_Bedrock_Chat',
    category: 'llm',
    inputs: [],
    outputs: [],
    parameters: [
      { name: 'modelName', value: 'anthropic.claude-v2', type: 'string' },
      { name: 'temperature', value: 0.7, type: 'number' },
      { name: 'region', value: 'us-east-1', type: 'string' },
    ],
    position: { x: 100, y: 100 },
  };
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-simple',
  includeTests: false,
  includeDocs: false,
  includeLangfuse: false,
  packageManager: 'npm',
  environment: {},
  codeStyle: {
    indentSize: 2,
    useSpaces: true,
    semicolons: true,
    singleQuotes: true,
    trailingCommas: true
  }
};

describe('Phase 1 Simple Validation', () => {
  test('should instantiate BedrockChat converter', () => {
    const converter = new BedrockChatConverter();
    expect(converter).toBeInstanceOf(BedrockChatConverter);
    expect(converter.flowiseType).toBe('bedrockChat');
    expect(converter.category).toBe('llm');
  });

  test('should provide correct dependencies', () => {
    const converter = new BedrockChatConverter();
    const dependencies = converter.getDependencies();
    expect(dependencies).toContain('@langchain/community');
    expect(dependencies).toContain('@langchain/core');
  });

  test('should convert simple node', () => {
    const converter = new BedrockChatConverter();
    const node = createSimpleNode();
    
    const fragments = converter.convert(node, mockContext);
    console.log('Generated fragments:', fragments.map(f => ({ type: f.type, content: f.content ? f.content.substring(0, 100) : 'NO CONTENT' })));
    console.log('Fragment count:', fragments.length);
    
    expect(fragments.length).toBeGreaterThan(0);
    
    const importFragment = fragments.find(f => f.type === 'import');
    if (importFragment) {
      expect(importFragment.content).toContain('BedrockChat');
    }
    
    const declarationFragment = fragments.find(f => f.type === 'declaration');
    if (declarationFragment) {
      expect(declarationFragment.content).toContain('BedrockChat');
    }
  });

  test('should handle parameter extraction correctly', () => {
    const converter = new BedrockChatConverter();
    const node = createSimpleNode();
    
    const fragments = converter.convert(node, mockContext);
    const declarationFragment = fragments.find(f => f.type === 'declaration');
    
    expect(declarationFragment!.content).toContain('anthropic.claude-v2');
    expect(declarationFragment!.content).toContain('0.7');
    expect(declarationFragment!.content).toContain('us-east-1');
  });
});