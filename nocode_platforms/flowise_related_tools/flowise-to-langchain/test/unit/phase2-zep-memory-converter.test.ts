import { ZepMemoryConverter } from '../../src/registry/converters/zep-memory.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('ZepMemoryConverter', () => {
  let converter: ZepMemoryConverter;
  let context: GenerationContext;

  beforeEach(() => {
    converter = new ZepMemoryConverter();
    context = {
      project: {
        id: 'test-project',
        nodes: [],
        edges: [],
        metadata: {}
      },
      currentFile: 'test.ts',
      availableImports: new Set(),
      requiredPackages: new Set(),
      errors: [],
      warnings: []
    };
  });

  describe('Basic Properties', () => {
    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('zepMemory');
    });

    it('should have correct category', () => {
      expect(converter.category).toBe('memory');
    });

    it('should return correct dependencies', () => {
      expect(converter.getDependencies()).toEqual(['@langchain/community']);
    });
  });

  describe('Code Generation', () => {
    it('should generate correct code with all parameters', () => {
      const node: IRNode = {
        id: 'zep1',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'baseURL', value: 'http://localhost:8000', type: 'string' },
          { name: 'apiKey', value: 'test-api-key', type: 'string' },
          { name: 'sessionId', value: 'test-session-123', type: 'string' },
          { name: 'memoryKey', value: 'chat_history', type: 'string' },
          { name: 'inputKey', value: 'question', type: 'string' },
          { name: 'outputKey', value: 'text', type: 'string' },
          { name: 'returnMessages', value: true, type: 'boolean' }
        ]
      };

      const fragments = converter.convert(node, context);
      
      // Check import
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain("import { ZepMemory } from '@langchain/community/memory/zep'");

      // Check declaration
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment).toBeDefined();
      expect(declarationFragment?.content).toContain('const zep_memory_zepMemory = new ZepMemory({');
      expect(declarationFragment?.content).toContain('baseURL: "http://localhost:8000"');
      expect(declarationFragment?.content).toContain('apiKey: "test-api-key"');
      expect(declarationFragment?.content).toContain('sessionId: "test-session-123"');
      expect(declarationFragment?.content).toContain('memoryKey: "chat_history"');
      expect(declarationFragment?.content).toContain('inputKey: "question"');
      expect(declarationFragment?.content).toContain('outputKey: "text"');
      expect(declarationFragment?.content).toContain('returnMessages: true');
    });

    it('should generate code with default values', () => {
      const node: IRNode = {
        id: 'zep2',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'baseURL', value: 'http://localhost:8000', type: 'string' },
          { name: 'sessionId', value: 'test-session-456', type: 'string' }
        ]
      };

      const fragments = converter.convert(node, context);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment?.content).toContain('memoryKey: "chat_history"');
      expect(declarationFragment?.content).toContain('inputKey: "question"');
      expect(declarationFragment?.content).toContain('outputKey: "text"');
      expect(declarationFragment?.content).toContain('returnMessages: false');
    });

    it('should add setup comment when baseURL is missing', () => {
      const node: IRNode = {
        id: 'zep3',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'sessionId', value: 'test-session-789', type: 'string' }
        ]
      };

      const fragments = converter.convert(node, context);
      
      // Check for setup comment
      const commentFragment = fragments.find(f => f.type === 'initialization' && f.content.includes('Note: ZepMemory requires'));
      expect(commentFragment).toBeDefined();
      expect(commentFragment?.content).toContain('ZepMemory requires a running Zep server instance');
      expect(commentFragment?.content).toContain('https://github.com/getzep/zep');
      expect(commentFragment?.content).toContain('docker run -p 8000:8000 ghcr.io/getzep/zep:latest');

      // Check for placeholder in declaration
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      expect(declarationFragment?.content).toContain('// baseURL: "YOUR_ZEP_API_URL", // Required: Zep server URL');
    });

    it('should handle optional apiKey parameter', () => {
      const node: IRNode = {
        id: 'zep4',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'baseURL', value: 'http://localhost:8000', type: 'string' },
          { name: 'sessionId', value: 'test-session-000', type: 'string' }
        ]
      };

      const fragments = converter.convert(node, context);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      // Should not include apiKey if not provided
      expect(declarationFragment?.content).not.toContain('apiKey:');
    });

    it('should add placeholder comments for missing required parameters', () => {
      const node: IRNode = {
        id: 'zep5',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: []
      };

      const fragments = converter.convert(node, context);
      const declarationFragment = fragments.find(f => f.type === 'declaration');
      
      expect(declarationFragment?.content).toContain('// baseURL: "YOUR_ZEP_API_URL", // Required: Zep server URL');
      expect(declarationFragment?.content).toContain('// apiKey: "YOUR_ZEP_API_KEY", // Optional: Zep API key if authentication is enabled');
      expect(declarationFragment?.content).toContain('// sessionId: "SESSION_ID", // Required: Unique session identifier');
    });
  });

  describe('canConvert', () => {
    it('should return true for zepMemory nodes', () => {
      const node: IRNode = {
        id: 'zep6',
        type: 'zepMemory',
        label: 'Zep Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: []
      };

      expect(converter.canConvert(node)).toBe(true);
    });

    it('should return false for non-zepMemory nodes', () => {
      const node: IRNode = {
        id: 'buffer1',
        type: 'bufferMemory',
        label: 'Buffer Memory',
        category: 'memory',
        position: { x: 0, y: 0 },
        inputs: [],
        outputs: [],
        parameters: []
      };

      expect(converter.canConvert(node)).toBe(false);
    });
  });
});