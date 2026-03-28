import { DuckDuckGoSearchConverter } from '../../src/registry/converters/search-tool';
import { IRNode, GenerationContext } from '../../src/ir/types';

describe('DuckDuckGoSearchConverter', () => {
  let converter: DuckDuckGoSearchConverter;
  let context: GenerationContext;

  beforeEach(() => {
    converter = new DuckDuckGoSearchConverter();
    context = {
      target: 'typescript',
      outputDir: '/tmp/test',
      options: {},
      metadata: {},
    };
  });

  describe('canConvert', () => {
    it('should return true for duckDuckGoSearch nodes', () => {
      const node: IRNode = {
        id: 'duckduckgo_1',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 0, y: 0 },
        metadata: {},
      };
      expect(converter.canConvert(node)).toBe(true);
    });

    it('should return false for other tool types', () => {
      const node: IRNode = {
        id: 'calc_1',
        type: 'calculator',
        label: 'Calculator',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 0, y: 0 },
        metadata: {},
      };
      expect(converter.canConvert(node)).toBe(false);
    });
  });

  describe('convert', () => {
    it('should generate correct code fragments with default settings', () => {
      const node: IRNode = {
        id: 'duckduckgo_1',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search Tool',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      

      expect(fragments).toHaveLength(2);

      // Check import fragment
      const importFragment = fragments.find((f) => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment?.content).toContain(
        "import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';"
      );

      // Check initialization fragment
      const initFragment = fragments.find((f) => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      expect(initFragment?.content).toContain('new DuckDuckGoSearch({');
      expect(initFragment?.content).toContain('maxResults: 4');
    });

    it('should include custom maxResults when provided', () => {
      const node: IRNode = {
        id: 'duckduckgo_1',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search Tool',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'maxResults', value: 10, type: 'number' },
        ],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find((f) => f.type === 'initialization');

      expect(initFragment?.content).toContain('maxResults: 10');
    });

    it('should include searchParams when provided', () => {
      const node: IRNode = {
        id: 'duckduckgo_1',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search Tool',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [
          { 
            name: 'searchParams',
            value: { 
              region: 'us-en', 
              safesearch: 'moderate' 
            },
            type: 'object'
          },
        ],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find((f) => f.type === 'initialization');

      expect(initFragment?.content).toContain('searchParams:');
      expect(initFragment?.content).toContain('region: "us-en"');
      expect(initFragment?.content).toContain('safesearch: "moderate"');
    });

    it('should include timeout when provided', () => {
      const node: IRNode = {
        id: 'duckduckgo_1',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search Tool',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'timeout', value: 5000, type: 'number' },
        ],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find((f) => f.type === 'initialization');

      expect(initFragment?.content).toContain('timeout: 5000');
    });

    it('should generate unique variable names', () => {
      const node: IRNode = {
        id: 'ddg_tool_123',
        type: 'duckDuckGoSearch',
        label: 'DuckDuckGo Search',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find((f) => f.type === 'initialization');

      expect(initFragment?.content).toMatch(/const \w+_tool = new DuckDuckGoSearch/);
    });
  });

  describe('getDependencies', () => {
    it('should return @langchain/community as dependency', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community');
    });
  });

  describe('getSupportedVersions', () => {
    it('should return supported versions including 0.2.33', () => {
      const versions = converter.getSupportedVersions();
      expect(versions).toContain('0.2.33');
      expect(versions).toContain('0.2.0');
    });
  });

  describe('complex configuration', () => {
    it('should handle all parameters together', () => {
      const node: IRNode = {
        id: 'duckduckgo_advanced',
        type: 'duckDuckGoSearch',
        label: 'Advanced DuckDuckGo Search',
        category: 'tool',
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'maxResults', value: 8, type: 'number' },
          { name: 'timeout', value: 10000, type: 'number' },
          {
            name: 'searchParams',
            value: {
              region: 'uk-en',
              safesearch: 'strict',
              timeRange: 'w', // past week
            },
            type: 'object'
          },
        ],
        position: { x: 0, y: 0 },
        metadata: {},
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments.find((f) => f.type === 'initialization');

      expect(initFragment?.content).toContain('maxResults: 8');
      expect(initFragment?.content).toContain('timeout: 10000');
      expect(initFragment?.content).toContain('searchParams:');
      expect(initFragment?.content).toContain('region: "uk-en"');
      expect(initFragment?.content).toContain('safesearch: "strict"');
      expect(initFragment?.content).toContain('timeRange: "w"');
    });
  });
});