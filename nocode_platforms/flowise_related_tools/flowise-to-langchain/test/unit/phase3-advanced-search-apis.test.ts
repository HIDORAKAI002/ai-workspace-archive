/**
 * Advanced Search APIs Test Suite - Phase 3B
 * 
 * Comprehensive tests for all advanced search API converters
 */

import { describe, test as it, expect, beforeEach } from '@jest/globals';
import {
  TavilySearchConverter,
  BraveSearchConverter,
  GoogleSearchConverter,
  ExaSearchConverter,
  ArxivSearchConverter,
  WolframAlphaConverter,
  SerpAPIConverter,
  SearchAPIConverter,
  DataForSEOConverter,
  SearXNGSearchConverter,
} from '../../src/registry/converters/advanced-search-apis.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Advanced Search APIs Converters', () => {
  let context: GenerationContext;

  beforeEach(() => {
    context = {
      nodeMap: new Map(),
      variables: new Map(),
      imports: new Set(),
      version: '0.2.0',
    };
  });

  describe('TavilySearchConverter', () => {
    let converter: TavilySearchConverter;

    beforeEach(() => {
      converter = new TavilySearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('tavilySearch');
    });

    it('should generate correct imports', () => {
      const node: IRNode = {
        id: 'tavily_1',
        type: 'tavilySearch',
        data: {},
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const importFragment = fragments[0];
      
      expect(importFragment.content).toContain('import { TavilySearchTool }');
      expect(importFragment.content).toContain('@langchain/community/tools/tavily_search');
    });

    it('should extract configuration correctly', () => {
      const node: IRNode = {
        id: 'tavily_1',
        type: 'tavilySearch',
        data: {
          apiKey: 'test-api-key',
          maxResults: 10,
          searchDepth: 'advanced',
          includeAnswer: false,
          includeRawContent: true,
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new TavilySearchTool');
      expect(initFragment.content).toContain('apiKey: "test-api-key"');
      expect(initFragment.content).toContain('maxResults: 10');
      expect(initFragment.content).toContain('searchDepth: "advanced"');
      expect(initFragment.content).toContain('includeAnswer: false');
      expect(initFragment.content).toContain('includeRawContent: true');
    });

    it('should use default values when parameters not provided', () => {
      const node: IRNode = {
        id: 'tavily_1',
        type: 'tavilySearch',
        data: {},
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('apiKey: process.env.TAVILY_API_KEY');
      expect(initFragment.content).toContain('maxResults: 5');
      expect(initFragment.content).toContain('searchDepth: "basic"');
      expect(initFragment.content).toContain('includeAnswer: true');
      expect(initFragment.content).toContain('includeRawContent: false');
    });
  });

  describe('BraveSearchConverter', () => {
    let converter: BraveSearchConverter;

    beforeEach(() => {
      converter = new BraveSearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('braveSearch');
    });

    it('should generate correct imports', () => {
      const node: IRNode = {
        id: 'brave_1',
        type: 'braveSearch',
        data: {},
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const importFragment = fragments[0];
      
      expect(importFragment.content).toContain('import { BraveSearch }');
      expect(importFragment.content).toContain('@langchain/community/tools/brave_search');
    });

    it('should extract configuration with privacy settings', () => {
      const node: IRNode = {
        id: 'brave_1',
        type: 'braveSearch',
        data: {
          apiKey: 'brave-api-key',
          count: 20,
          offset: 10,
          safesearch: 'strict',
          country: 'CA',
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new BraveSearch');
      expect(initFragment.content).toContain('apiKey: "brave-api-key"');
      expect(initFragment.content).toContain('count: 20');
      expect(initFragment.content).toContain('offset: 10');
      expect(initFragment.content).toContain('safesearch: "strict"');
      expect(initFragment.content).toContain('country: "CA"');
    });
  });

  describe('GoogleSearchConverter', () => {
    let converter: GoogleSearchConverter;

    beforeEach(() => {
      converter = new GoogleSearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('googleSearchAPI');
    });

    it('should extract both API key and search engine ID', () => {
      const node: IRNode = {
        id: 'google_1',
        type: 'googleSearchAPI',
        data: {
          apiKey: 'google-api-key',
          searchEngineId: 'search-engine-id',
          num: 15,
          start: 5,
          safe: 'high',
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new GoogleCustomSearch');
      expect(initFragment.content).toContain('apiKey: "google-api-key"');
      expect(initFragment.content).toContain('searchEngineId: "search-engine-id"');
      expect(initFragment.content).toContain('num: 15');
      expect(initFragment.content).toContain('start: 5');
      expect(initFragment.content).toContain('safe: "high"');
    });
  });

  describe('ExaSearchConverter', () => {
    let converter: ExaSearchConverter;

    beforeEach(() => {
      converter = new ExaSearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('exaSearch');
    });

    it('should extract developer-optimized configuration', () => {
      const node: IRNode = {
        id: 'exa_1',
        type: 'exaSearch',
        data: {
          apiKey: 'exa-api-key',
          numResults: 25,
          useAutoprompt: false,
          type: 'keyword',
          contents: true,
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new ExaSearchTool');
      expect(initFragment.content).toContain('apiKey: "exa-api-key"');
      expect(initFragment.content).toContain('numResults: 25');
      expect(initFragment.content).toContain('useAutoprompt: false');
      expect(initFragment.content).toContain('type: "keyword"');
      expect(initFragment.content).toContain('contents: true');
    });
  });

  describe('ArxivSearchConverter', () => {
    let converter: ArxivSearchConverter;

    beforeEach(() => {
      converter = new ArxivSearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('arxivSearch');
    });

    it('should extract academic search configuration', () => {
      const node: IRNode = {
        id: 'arxiv_1',
        type: 'arxivSearch',
        data: {
          maxResults: 5,
          sortBy: 'submittedDate',
          sortOrder: 'ascending',
          getFullText: true,
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new ArxivQueryRun');
      expect(initFragment.content).toContain('maxResults: 5');
      expect(initFragment.content).toContain('sortBy: "submittedDate"');
      expect(initFragment.content).toContain('sortOrder: "ascending"');
      expect(initFragment.content).toContain('getFullText: true');
    });
  });

  describe('WolframAlphaConverter', () => {
    let converter: WolframAlphaConverter;

    beforeEach(() => {
      converter = new WolframAlphaConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('wolframAlpha');
    });

    it('should extract computational configuration', () => {
      const node: IRNode = {
        id: 'wolfram_1',
        type: 'wolframAlpha',
        data: {
          appId: 'wolfram-app-id',
          format: 'image',
          units: 'imperial',
          timeout: 15000,
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new WolframAlphaTool');
      expect(initFragment.content).toContain('appId: "wolfram-app-id"');
      expect(initFragment.content).toContain('format: "image"');
      expect(initFragment.content).toContain('units: "imperial"');
      expect(initFragment.content).toContain('timeout: 15000');
    });
  });

  describe('SerpAPIConverter', () => {
    let converter: SerpAPIConverter;

    beforeEach(() => {
      converter = new SerpAPIConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('serpAPI');
    });

    it('should extract comprehensive SERP configuration', () => {
      const node: IRNode = {
        id: 'serp_1',
        type: 'serpAPI',
        data: {
          apiKey: 'serp-api-key',
          engine: 'bing',
          num: 20,
          hl: 'es',
          gl: 'es',
          safe: 'active',
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new SerpApi');
      expect(initFragment.content).toContain('apiKey: "serp-api-key"');
      expect(initFragment.content).toContain('engine: "bing"');
      expect(initFragment.content).toContain('num: 20');
      expect(initFragment.content).toContain('hl: "es"');
      expect(initFragment.content).toContain('gl: "es"');
      expect(initFragment.content).toContain('safe: "active"');
    });
  });

  describe('SearchAPIConverter', () => {
    let converter: SearchAPIConverter;

    beforeEach(() => {
      converter = new SearchAPIConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('searchAPI');
    });

    it('should extract real-time search configuration', () => {
      const node: IRNode = {
        id: 'searchapi_1',
        type: 'searchAPI',
        data: {
          apiKey: 'searchapi-key',
          engine: 'yahoo',
          num: 30,
          page: 2,
          hl: 'fr',
          gl: 'fr',
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new SearchApiTool');
      expect(initFragment.content).toContain('apiKey: "searchapi-key"');
      expect(initFragment.content).toContain('engine: "yahoo"');
      expect(initFragment.content).toContain('num: 30');
      expect(initFragment.content).toContain('page: 2');
      expect(initFragment.content).toContain('hl: "fr"');
      expect(initFragment.content).toContain('gl: "fr"');
    });
  });

  describe('DataForSEOConverter', () => {
    let converter: DataForSEOConverter;

    beforeEach(() => {
      converter = new DataForSEOConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('dataForSEO');
    });

    it('should extract SEO-focused configuration', () => {
      const node: IRNode = {
        id: 'dataforseo_1',
        type: 'dataForSEO',
        data: {
          username: 'seo-username',
          password: 'seo-password',
          limit: 25,
          locationName: 'United Kingdom',
          languageName: 'Spanish',
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new DataForSeoApiSearch');
      expect(initFragment.content).toContain('username: "seo-username"');
      expect(initFragment.content).toContain('password: "seo-password"');
      expect(initFragment.content).toContain('limit: 25');
      expect(initFragment.content).toContain('locationName: "United Kingdom"');
      expect(initFragment.content).toContain('languageName: "Spanish"');
    });
  });

  describe('SearXNGSearchConverter', () => {
    let converter: SearXNGSearchConverter;

    beforeEach(() => {
      converter = new SearXNGSearchConverter();
    });

    it('should have correct flowiseType', () => {
      expect(converter.flowiseType).toBe('searxngSearch');
    });

    it('should extract privacy-focused metasearch configuration', () => {
      const node: IRNode = {
        id: 'searxng_1',
        type: 'searxngSearch',
        data: {
          apiBase: 'https://searx.example.com',
          format: 'json',
          engines: ['duckduckgo', 'startpage'],
          categories: ['general', 'science'],
          pageno: 3,
        },
        edges: { input: [], output: [] },
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('new SearxngSearch');
      expect(initFragment.content).toContain('apiBase: "https://searx.example.com"');
      expect(initFragment.content).toContain('format: "json"');
      expect(initFragment.content).toContain('engines: ["duckduckgo","startpage"]');
      expect(initFragment.content).toContain('categories: ["general","science"]');
      expect(initFragment.content).toContain('pageno: 3');
    });
  });

  describe('Rate Limiting and Error Handling', () => {
    it('should include proper environment variable handling for API keys', () => {
      const converters = [
        new TavilySearchConverter(),
        new BraveSearchConverter(),
        new GoogleSearchConverter(),
        new ExaSearchConverter(),
        new WolframAlphaConverter(),
        new SerpAPIConverter(),
        new SearchAPIConverter(),
        new DataForSEOConverter(),
        new SearXNGSearchConverter(),
      ];

      converters.forEach(converter => {
        const node: IRNode = {
          id: 'test_1',
          type: converter.flowiseType,
          data: {},
          edges: { input: [], output: [] },
        };

        const fragments = converter.convert(node, context);
        const initFragment = fragments[1];
        
        // Should use environment variables by default
        expect(initFragment.content).toMatch(/process\.env\./);
      });
    });

    it('should have correct dependencies for all converters', () => {
      const converters = [
        new TavilySearchConverter(),
        new BraveSearchConverter(),
        new GoogleSearchConverter(),
        new ExaSearchConverter(),
        new ArxivSearchConverter(),
        new WolframAlphaConverter(),
        new SerpAPIConverter(),
        new SearchAPIConverter(),
        new DataForSEOConverter(),
        new SearXNGSearchConverter(),
      ];

      converters.forEach(converter => {
        const dependencies = converter.getDependencies({} as IRNode, context);
        expect(dependencies).toContain('@langchain/community');
      });
    });
  });

  describe('Integration Testing', () => {
    it('should generate valid TypeScript code for all converters', () => {
      const converters = [
        { converter: new TavilySearchConverter(), type: 'tavilySearch' },
        { converter: new BraveSearchConverter(), type: 'braveSearch' },
        { converter: new GoogleSearchConverter(), type: 'googleSearchAPI' },
        { converter: new ExaSearchConverter(), type: 'exaSearch' },
        { converter: new ArxivSearchConverter(), type: 'arxivSearch' },
        { converter: new WolframAlphaConverter(), type: 'wolframAlpha' },
        { converter: new SerpAPIConverter(), type: 'serpAPI' },
        { converter: new SearchAPIConverter(), type: 'searchAPI' },
        { converter: new DataForSEOConverter(), type: 'dataForSEO' },
        { converter: new SearXNGSearchConverter(), type: 'searxngSearch' },
      ];

      converters.forEach(({ converter, type }) => {
        const node: IRNode = {
          id: `${type}_1`,
          type: type,
          data: {},
          edges: { input: [], output: [] },
        };

        const fragments = converter.convert(node, context);
        
        expect(fragments).toHaveLength(2);
        expect(fragments[0].type).toBe('import');
        expect(fragments[1].type).toBe('initialization');
        
        // Code should be syntactically valid
        expect(fragments[0].content).toMatch(/^import.*from.*$/);
        expect(fragments[1].content).toMatch(/^const.*=.*new.*$/);
      });
    });
  });
});