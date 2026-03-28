import { describe, it, expect, beforeEach } from '@jest/globals';
import { AgentNodeConverter, BaseAgentFlowV2Converter } from '../../src/registry/converters/agentflow-v2.js';
import type { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('AgentFlow V2 Reference Resolution', () => {
  let converter: AgentNodeConverter;
  let mockContext: GenerationContext;

  beforeEach(() => {
    converter = new AgentNodeConverter();
    // Reset the reference resolver before each test
    BaseAgentFlowV2Converter.resetReferenceResolver();
    mockContext = {
      targetLanguage: 'typescript',
      includeLangfuse: false,
      includeComments: true,
      outputFormat: 'esm',
    };
  });

  describe('ReferenceResolver Basic Functionality', () => {
    it('should register nodes and track dependencies', () => {
      const resolver = BaseAgentFlowV2Converter.getReferenceResolver();
      
      // Test node registration
      resolver.registerNode('llm-1', 'llm_node', 'llm');
      resolver.registerNode('tool-1', 'tool_node', 'tool');
      resolver.registerNode('agent-1', 'agent_node', 'agent');
      
      // Add dependencies manually
      resolver.addDependency('agent-1', 'llm-1');
      resolver.addDependency('agent-1', 'tool-1');

      // Test dependency tracking
      expect(resolver.getDependencies('agent-1')).toContain('llm-1');
      expect(resolver.getDependencies('agent-1')).toContain('tool-1');
      
      // Test reference resolution
      expect(resolver.resolveReference('llm-1')).toBe('llm_node');
      expect(resolver.resolveReference('tool-1')).toBe('tool_node');
      expect(resolver.resolveReference('agent-1')).toBe('agent_node');
    });

    it('should detect circular dependencies', () => {
      const resolver = BaseAgentFlowV2Converter.getReferenceResolver();
      
      // Create circular dependency: A -> B -> C -> A
      resolver.addDependency('A', 'B');
      resolver.addDependency('B', 'C');
      resolver.addDependency('C', 'A');

      expect(resolver.hasCircularDependency('A')).toBe(true);
      expect(resolver.hasCircularDependency('B')).toBe(true);
      expect(resolver.hasCircularDependency('C')).toBe(true);
    });

    it('should provide correct topological order', () => {
      const resolver = BaseAgentFlowV2Converter.getReferenceResolver();
      
      // Register nodes
      resolver.registerNode('A', 'nodeA', 'llm');
      resolver.registerNode('B', 'nodeB', 'tool'); 
      resolver.registerNode('C', 'nodeC', 'agent');
      resolver.registerNode('D', 'nodeD', 'memory');
      
      // Create dependency chain: D -> C -> B -> A
      resolver.addDependency('D', 'C');
      resolver.addDependency('C', 'B');
      resolver.addDependency('B', 'A');

      const order = resolver.getTopologicalOrder();
      
      // A should come before B, B before C, C before D
      const indexA = order.indexOf('A');
      const indexB = order.indexOf('B');
      const indexC = order.indexOf('C');
      const indexD = order.indexOf('D');
      
      expect(indexA).toBeLessThan(indexB);
      expect(indexB).toBeLessThan(indexC);
      expect(indexC).toBeLessThan(indexD);
    });
  });

  describe('Agent Node Conversion with Dependencies', () => {
    it('should generate agent code with resolved LLM reference', () => {
      const agentNode: IRNode = {
        id: 'agent-1',
        type: 'agentNode',
        label: 'Main Agent',
        parameters: [
          { name: 'llm', value: 'llm-ref' },
          { name: 'tools', value: ['tool-ref'] },
          { name: 'agentType', value: 'openai-functions' },
          { name: 'maxIterations', value: 10 }
        ],
        inputs: {},
        outputs: {},
      };

      const context = {
        ...mockContext,
        graph: {
          nodes: [agentNode],
          edges: [],
          metadata: { name: 'test-graph', version: '1.0.0' }
        }
      };

      const fragments = converter.convert(agentNode, context);
      const code = fragments.map(f => f.content).join('\n');

      expect(fragments).toHaveLength(4); // import, initialization, post-init
      expect(code).toContain('AgentExecutor');
      expect(code).toContain('createOpenAIFunctionsAgent');
      expect(code).toContain('defaultLLM'); // Default when no LLM found
    });

    it('should handle missing node references gracefully', () => {
      const agentNode: IRNode = {
        id: 'agent-1',
        type: 'agentNode',
        label: 'Agent with missing refs',
        parameters: [
          { name: 'llm', value: 'missing-llm' },
          { name: 'tools', value: ['missing-tool'] },
          { name: 'agentType', value: 'openai-functions' }
        ],
        inputs: {},
        outputs: {},
      };

      const fragments = converter.convert(agentNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');
      
      // Should still generate valid code structure
      expect(code).toContain('AgentExecutor');
      expect(code).toContain('defaultLLM'); // Fallback when reference not found
      expect(code).toContain('[]'); // Empty tools array when not found
    });

    it('should return correct dependencies for different agent types', () => {
      const agentNode: IRNode = {
        id: 'agent-1',
        type: 'agentNode',
        label: 'OpenAI Functions Agent',
        parameters: [
          { name: 'agentType', value: 'openai-functions' },
          { name: 'enableCallbacks', value: true }
        ],
        inputs: {},
        outputs: {},
      };

      const dependencies = converter.getDependencies(agentNode, mockContext);
      
      expect(dependencies).toContain('langchain');
      expect(dependencies).toContain('@langchain/core');
      expect(dependencies).toContain('@langchain/openai');
      expect(dependencies).toContain('@langchain/core/callbacks');
    });
  });

  describe('Configuration Validation', () => {
    it('should validate agent configuration correctly', () => {
      const validNode: IRNode = {
        id: 'agent-1',
        type: 'agentNode',
        label: 'Valid Agent',
        parameters: [
          { name: 'llm', value: 'llm-ref' },
          { name: 'tools', value: ['tool-ref'] },
          { name: 'maxIterations', value: 5 },
          { name: 'agentType', value: 'openai-functions' }
        ],
        inputs: {},
        outputs: {},
      };

      expect(converter.canConvert(validNode)).toBe(true);
      
      const validation = converter.validateConfiguration(validNode);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect invalid configuration', () => {
      const invalidNode: IRNode = {
        id: 'agent-1',
        type: 'agentNode',
        label: 'Invalid Agent',
        parameters: [
          { name: 'maxIterations', value: 150 }, // Too high
          { name: 'agentType', value: 'invalid-type' } // Invalid type
        ],
        inputs: {},
        outputs: {},
      };

      const validation = converter.validateConfiguration(invalidNode);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors.some(e => e.includes('maxIterations'))).toBe(true);
      expect(validation.errors.some(e => e.includes('Unsupported agent type'))).toBe(true);
    });
  });

  describe('Supported Agent Types', () => {
    it('should return list of supported agent types', () => {
      const supportedTypes = converter.getSupportedAgentTypes();
      
      expect(supportedTypes).toContain('openai-functions');
      expect(supportedTypes).toContain('structured-chat');
      expect(supportedTypes).toContain('react');
      expect(supportedTypes).toContain('conversational-react');
      expect(supportedTypes).toContain('zero-shot-react');
    });
  });
});