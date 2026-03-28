/**
 * Advanced Search API Converters - Phase 3B
 *
 * Converts Flowise advanced search API nodes into LangChain implementations
 * 100% Coverage: Tavily, Brave, Google, Exa, Arxiv, WolframAlpha, SerpAPI, SearchAPI, DataForSEO, SearXNG
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Base Search API converter with common functionality
 */
abstract class BaseSearchAPIConverter extends BaseConverter {
  readonly category = 'search-api';

  /**
   * Override getParameterValue to handle both parameter array and data object patterns
   */
  protected override getParameterValue<T = unknown>(
    node: IRNode,
    paramName: string,
    defaultValue?: T
  ): T | undefined {
    // First try the standard parameters array approach
    if (node.parameters && Array.isArray(node.parameters)) {
      const param = node.parameters.find((p) => p.name === paramName);
      if (param !== undefined) {
        return (param?.value as T) ?? defaultValue;
      }
    }

    // Fallback to data object approach for search API nodes
    if ((node as any).data && typeof (node as any).data === 'object') {
      const value = (node as any).data[paramName];
      if (value !== undefined) {
        return value as T;
      }
    }

    return defaultValue;
  }

  protected generateSearchAPIConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractSearchConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractSearchConfig(node: IRNode): Record<string, unknown>;
  protected abstract getSearchProvider(): string;

  override convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(
      node,
      `${this.getSearchProvider()}_search`
    );
    const config = this.generateSearchAPIConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(config.packageName, config.imports),
        [config.packageName],
        node.id,
        1
      )
    );

    // Configuration fragment
    const configStr = this.generateConfigurationString(config.config);
    const initCode = configStr
      ? `const ${variableName} = new ${config.className}(${configStr});`
      : `const ${variableName} = new ${config.className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        100
      )
    );

    return fragments;
  }

  protected generateConfigurationString(
    config: Record<string, unknown>
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }
}

/**
 * Tavily API Converter
 * AI-optimized search engine
 */
export class TavilySearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'tavilySearch';

  protected getRequiredImports(): string[] {
    return ['TavilySearchTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/tavily_search';
  }

  protected getClassName(): string {
    return 'TavilySearchTool';
  }

  protected getSearchProvider(): string {
    return 'tavily';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.TAVILY_API_KEY'
    );
    const maxResults = this.getParameterValue(node, 'maxResults', 5);
    const searchDepth = this.getParameterValue(node, 'searchDepth', 'basic');
    const includeAnswer = this.getParameterValue(node, 'includeAnswer', true);
    const includeRawContent = this.getParameterValue(
      node,
      'includeRawContent',
      false
    );

    config['apiKey'] =
      apiKey === 'process.env.TAVILY_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['maxResults'] = maxResults;
    config['searchDepth'] = searchDepth;
    config['includeAnswer'] = includeAnswer;
    config['includeRawContent'] = includeRawContent;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * Brave Search API Converter
 * Privacy-focused search engine
 */
export class BraveSearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'braveSearch';

  protected getRequiredImports(): string[] {
    return ['BraveSearch'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/brave_search';
  }

  protected getClassName(): string {
    return 'BraveSearch';
  }

  protected getSearchProvider(): string {
    return 'brave';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.BRAVE_SEARCH_API_KEY'
    );
    const count = this.getParameterValue(node, 'count', 10);
    const offset = this.getParameterValue(node, 'offset', 0);
    const safesearch = this.getParameterValue(node, 'safesearch', 'moderate');
    const country = this.getParameterValue(node, 'country', 'US');

    config['apiKey'] =
      apiKey === 'process.env.BRAVE_SEARCH_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['count'] = count;
    config['offset'] = offset;
    config['safesearch'] = safesearch;
    config['country'] = country;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * Google Search API Converter
 * Comprehensive web search
 */
export class GoogleSearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'googleSearchAPI';

  protected getRequiredImports(): string[] {
    return ['GoogleCustomSearch'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_custom_search';
  }

  protected getClassName(): string {
    return 'GoogleCustomSearch';
  }

  protected getSearchProvider(): string {
    return 'google';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.GOOGLE_API_KEY'
    );
    const searchEngineId = this.getParameterValue(
      node,
      'searchEngineId',
      'process.env.GOOGLE_CSE_ID'
    );
    const num = this.getParameterValue(node, 'num', 10);
    const start = this.getParameterValue(node, 'start', 1);
    const safe = this.getParameterValue(node, 'safe', 'medium');

    config['apiKey'] =
      apiKey === 'process.env.GOOGLE_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['searchEngineId'] =
      searchEngineId === 'process.env.GOOGLE_CSE_ID'
        ? searchEngineId
        : this.formatParameterValue(searchEngineId);
    config['num'] = num;
    config['start'] = start;
    config['safe'] = safe;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * Exa Search Converter
 * Developer-optimized search
 */
export class ExaSearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'exaSearch';

  protected getRequiredImports(): string[] {
    return ['ExaSearchTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/exa_search';
  }

  protected getClassName(): string {
    return 'ExaSearchTool';
  }

  protected getSearchProvider(): string {
    return 'exa';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.EXA_API_KEY'
    );
    const numResults = this.getParameterValue(node, 'numResults', 10);
    const useAutoprompt = this.getParameterValue(node, 'useAutoprompt', true);
    const type = this.getParameterValue(node, 'type', 'neural');
    const contents = this.getParameterValue(node, 'contents', false);

    config['apiKey'] =
      apiKey === 'process.env.EXA_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['numResults'] = numResults;
    config['useAutoprompt'] = useAutoprompt;
    config['type'] = type;
    config['contents'] = contents;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * Arxiv Search Converter
 * Academic paper search
 */
export class ArxivSearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'arxivSearch';

  protected getRequiredImports(): string[] {
    return ['ArxivQueryRun'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/arxiv';
  }

  protected getClassName(): string {
    return 'ArxivQueryRun';
  }

  protected getSearchProvider(): string {
    return 'arxiv';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const maxResults = this.getParameterValue(node, 'maxResults', 3);
    const sortBy = this.getParameterValue(node, 'sortBy', 'relevance');
    const sortOrder = this.getParameterValue(node, 'sortOrder', 'descending');
    const getFullText = this.getParameterValue(node, 'getFullText', false);

    config['maxResults'] = maxResults;
    config['sortBy'] = sortBy;
    config['sortOrder'] = sortOrder;
    config['getFullText'] = getFullText;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * WolframAlpha Converter
 * Computational intelligence
 */
export class WolframAlphaConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'wolframAlpha';

  protected getRequiredImports(): string[] {
    return ['WolframAlphaTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/wolfram_alpha';
  }

  protected getClassName(): string {
    return 'WolframAlphaTool';
  }

  protected getSearchProvider(): string {
    return 'wolfram';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const appId = this.getParameterValue(
      node,
      'appId',
      'process.env.WOLFRAM_ALPHA_APPID'
    );
    const format = this.getParameterValue(node, 'format', 'plaintext');
    const units = this.getParameterValue(node, 'units', 'metric');
    const timeout = this.getParameterValue(node, 'timeout', 10000);

    config['appId'] =
      appId === 'process.env.WOLFRAM_ALPHA_APPID'
        ? appId
        : this.formatParameterValue(appId);
    config['format'] = format;
    config['units'] = units;
    config['timeout'] = timeout;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * SerpAPI Converter
 * Comprehensive search engine results API
 */
export class SerpAPIConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'serpAPIAdvanced';

  protected getRequiredImports(): string[] {
    return ['SerpApi'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/serpapi';
  }

  protected getClassName(): string {
    return 'SerpApi';
  }

  protected getSearchProvider(): string {
    return 'serpapi';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.SERPAPI_API_KEY'
    );
    const engine = this.getParameterValue(node, 'engine', 'google');
    const num = this.getParameterValue(node, 'num', 10);
    const hl = this.getParameterValue(node, 'hl', 'en');
    const gl = this.getParameterValue(node, 'gl', 'us');
    const safe = this.getParameterValue(node, 'safe', 'off');

    config['apiKey'] =
      apiKey === 'process.env.SERPAPI_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['engine'] = engine;
    config['num'] = num;
    config['hl'] = hl;
    config['gl'] = gl;
    config['safe'] = safe;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * SearchAPI Converter
 * Real-time search results API
 */
export class SearchAPIConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'searchAPI';

  protected getRequiredImports(): string[] {
    return ['SearchApiTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/searchapi';
  }

  protected getClassName(): string {
    return 'SearchApiTool';
  }

  protected getSearchProvider(): string {
    return 'searchapi';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.SEARCHAPI_API_KEY'
    );
    const engine = this.getParameterValue(node, 'engine', 'google');
    const num = this.getParameterValue(node, 'num', 10);
    const page = this.getParameterValue(node, 'page', 1);
    const hl = this.getParameterValue(node, 'hl', 'en');
    const gl = this.getParameterValue(node, 'gl', 'us');

    config['apiKey'] =
      apiKey === 'process.env.SEARCHAPI_API_KEY'
        ? apiKey
        : this.formatParameterValue(apiKey);
    config['engine'] = engine;
    config['num'] = num;
    config['page'] = page;
    config['hl'] = hl;
    config['gl'] = gl;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * DataForSEO API Search Converter
 * Professional SEO search data
 */
export class DataForSEOConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'dataForSEO';

  protected getRequiredImports(): string[] {
    return ['DataForSeoApiSearch'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/dataforseo_api_search';
  }

  protected getClassName(): string {
    return 'DataForSeoApiSearch';
  }

  protected getSearchProvider(): string {
    return 'dataforseo';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const username = this.getParameterValue(
      node,
      'username',
      'process.env.DATAFORSEO_LOGIN'
    );
    const password = this.getParameterValue(
      node,
      'password',
      'process.env.DATAFORSEO_PASSWORD'
    );
    const limit = this.getParameterValue(node, 'limit', 10);
    const locationName = this.getParameterValue(
      node,
      'locationName',
      'United States'
    );
    const languageName = this.getParameterValue(
      node,
      'languageName',
      'English'
    );

    config['username'] =
      username === 'process.env.DATAFORSEO_LOGIN'
        ? username
        : this.formatParameterValue(username);
    config['password'] =
      password === 'process.env.DATAFORSEO_PASSWORD'
        ? password
        : this.formatParameterValue(password);
    config['limit'] = limit;
    config['locationName'] = locationName;
    config['languageName'] = languageName;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}

/**
 * SearXNG Search Converter
 * Privacy-focused metasearch engine
 */
export class SearXNGSearchConverter extends BaseSearchAPIConverter {
  readonly flowiseType = 'searxngSearch';

  protected getRequiredImports(): string[] {
    return ['SearxngSearch'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/searxng_search';
  }

  protected getClassName(): string {
    return 'SearxngSearch';
  }

  protected getSearchProvider(): string {
    return 'searxng';
  }

  protected extractSearchConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const apiBase = this.getParameterValue(
      node,
      'apiBase',
      'process.env.SEARXNG_API_BASE'
    );
    const format = this.getParameterValue(node, 'format', 'json');
    const engines = this.getParameterValue(node, 'engines', ['google', 'bing']);
    const categories = this.getParameterValue(node, 'categories', ['general']);
    const pageno = this.getParameterValue(node, 'pageno', 1);

    config['apiBase'] =
      apiBase === 'process.env.SEARXNG_API_BASE'
        ? apiBase
        : this.formatParameterValue(apiBase);
    config['format'] = format;
    config['engines'] = engines;
    config['categories'] = categories;
    config['pageno'] = pageno;

    return config;
  }

  override getDependencies(): string[] {
    return ['@langchain/community'];
  }
}
