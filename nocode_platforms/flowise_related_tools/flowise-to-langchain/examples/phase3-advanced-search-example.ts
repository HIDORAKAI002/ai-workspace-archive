/**
 * Advanced Search APIs Example - Phase 3B
 * 
 * Demonstrates usage of all advanced search API converters
 * This example shows how different search APIs can be used for various scenarios
 */

import { 
  TavilySearchTool,
  BraveSearch,
  GoogleCustomSearch,
  ExaSearchTool,
  ArxivQueryRun,
  WolframAlphaTool,
  SerpApi,
  SearchApiTool,
  DataForSeoApiSearch,
  SearxngSearch,
} from '@langchain/community/tools';

// Example 1: AI-Optimized Search with Tavily
const tavilySearch = new TavilySearchTool({
  apiKey: process.env.TAVILY_API_KEY,
  maxResults: 5,
  searchDepth: 'advanced',
  includeAnswer: true,
  includeRawContent: false,
});

// Example 2: Privacy-Focused Search with Brave
const braveSearch = new BraveSearch({
  apiKey: process.env.BRAVE_SEARCH_API_KEY,
  count: 10,
  offset: 0,
  safesearch: 'strict',
  country: 'US',
});

// Example 3: Comprehensive Web Search with Google
const googleSearch = new GoogleCustomSearch({
  apiKey: process.env.GOOGLE_API_KEY,
  searchEngineId: process.env.GOOGLE_CSE_ID,
  num: 10,
  start: 1,
  safe: 'medium',
});

// Example 4: Developer-Optimized Search with Exa
const exaSearch = new ExaSearchTool({
  apiKey: process.env.EXA_API_KEY,
  numResults: 10,
  useAutoprompt: true,
  type: 'neural',
  contents: false,
});

// Example 5: Academic Paper Search with Arxiv
const arxivSearch = new ArxivQueryRun({
  maxResults: 3,
  sortBy: 'relevance',
  sortOrder: 'descending',
  getFullText: false,
});

// Example 6: Computational Intelligence with WolframAlpha
const wolframAlpha = new WolframAlphaTool({
  appId: process.env.WOLFRAM_ALPHA_APPID,
  format: 'plaintext',
  units: 'metric',
  timeout: 10000,
});

// Example 7: Comprehensive SERP with SerpAPI
const serpApi = new SerpApi({
  apiKey: process.env.SERPAPI_API_KEY,
  engine: 'google',
  num: 10,
  hl: 'en',
  gl: 'us',
  safe: 'off',
});

// Example 8: Real-time Search with SearchAPI
const searchApi = new SearchApiTool({
  apiKey: process.env.SEARCHAPI_API_KEY,
  engine: 'google',
  num: 10,
  page: 1,
  hl: 'en',
  gl: 'us',
});

// Example 9: Professional SEO Data with DataForSEO
const dataForSeo = new DataForSeoApiSearch({
  username: process.env.DATAFORSEO_LOGIN,
  password: process.env.DATAFORSEO_PASSWORD,
  limit: 10,
  locationName: 'United States',
  languageName: 'English',
});

// Example 10: Privacy-Focused Metasearch with SearXNG
const searxngSearch = new SearxngSearch({
  apiBase: process.env.SEARXNG_API_BASE,
  format: 'json',
  engines: ['google', 'bing'],
  categories: ['general'],
  pageno: 1,
});

/**
 * Example Usage Scenarios
 */

// Scenario 1: AI Research Query
async function aiResearchQuery(query: string) {
  console.log('🔍 AI Research Query:', query);
  
  // Use Tavily for AI-optimized results
  const tavilyResults = await tavilySearch.call(query);
  console.log('📊 Tavily Results:', tavilyResults);
  
  // Use Arxiv for academic papers
  const arxivResults = await arxivSearch.call(query);
  console.log('📚 Arxiv Results:', arxivResults);
  
  return { tavily: tavilyResults, arxiv: arxivResults };
}

// Scenario 2: Privacy-Conscious Search
async function privacySearch(query: string) {
  console.log('🔒 Privacy-Conscious Search:', query);
  
  // Use Brave for privacy-focused results
  const braveResults = await braveSearch.call(query);
  console.log('🛡️ Brave Results:', braveResults);
  
  // Use SearXNG for metasearch without tracking
  const searxResults = await searxngSearch.call(query);
  console.log('🕵️ SearXNG Results:', searxResults);
  
  return { brave: braveResults, searx: searxResults };
}

// Scenario 3: Comprehensive Market Research
async function marketResearch(query: string) {
  console.log('📈 Market Research Query:', query);
  
  // Use Google for comprehensive web search
  const googleResults = await googleSearch.call(query);
  console.log('🌐 Google Results:', googleResults);
  
  // Use SerpAPI for detailed SERP analysis
  const serpResults = await serpApi.call(query);
  console.log('📊 SERP Analysis:', serpResults);
  
  // Use DataForSEO for professional SEO insights
  const seoResults = await dataForSeo.call(query);
  console.log('🎯 SEO Insights:', seoResults);
  
  return { google: googleResults, serp: serpResults, seo: seoResults };
}

// Scenario 4: Developer-Focused Search
async function developerSearch(query: string) {
  console.log('💻 Developer Search:', query);
  
  // Use Exa for developer-optimized results
  const exaResults = await exaSearch.call(query);
  console.log('⚡ Exa Results:', exaResults);
  
  // Use SearchAPI for real-time results
  const searchResults = await searchApi.call(query);
  console.log('🔄 SearchAPI Results:', searchResults);
  
  return { exa: exaResults, searchapi: searchResults };
}

// Scenario 5: Mathematical/Scientific Query
async function scientificQuery(query: string) {
  console.log('🧮 Scientific Query:', query);
  
  // Use WolframAlpha for computational results
  const wolframResults = await wolframAlpha.call(query);
  console.log('🔬 Wolfram Results:', wolframResults);
  
  // Use Arxiv for related research papers
  const arxivResults = await arxivSearch.call(query);
  console.log('📄 Related Papers:', arxivResults);
  
  return { wolfram: wolframResults, arxiv: arxivResults };
}

/**
 * Advanced Search Orchestration
 * Combines multiple search APIs for comprehensive results
 */
async function comprehensiveSearch(query: string) {
  console.log('🎯 Comprehensive Search:', query);
  
  try {
    const results = await Promise.allSettled([
      tavilySearch.call(query),
      braveSearch.call(query),
      googleSearch.call(query),
      exaSearch.call(query),
      serpApi.call(query),
    ]);
    
    const processedResults = results.map((result, index) => {
      const sources = ['Tavily', 'Brave', 'Google', 'Exa', 'SerpAPI'];
      return {
        source: sources[index],
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : result.reason,
      };
    });
    
    console.log('📊 Combined Results:', processedResults);
    return processedResults;
    
  } catch (error) {
    console.error('❌ Search Error:', error);
    throw error;
  }
}

/**
 * Rate Limiting and Error Handling Examples
 */
class SearchOrchestrator {
  private searchApis: Map<string, any>;
  private rateLimits: Map<string, { calls: number; resetTime: number }>;
  
  constructor() {
    this.searchApis = new Map([
      ['tavily', tavilySearch],
      ['brave', braveSearch],
      ['google', googleSearch],
      ['exa', exaSearch],
      ['serpapi', serpApi],
      ['searchapi', searchApi],
      ['wolfram', wolframAlpha],
    ]);
    
    this.rateLimits = new Map();
  }
  
  async search(provider: string, query: string, options?: any) {
    const api = this.searchApis.get(provider);
    if (!api) {
      throw new Error(`Unknown search provider: ${provider}`);
    }
    
    // Check rate limits
    if (this.isRateLimited(provider)) {
      throw new Error(`Rate limit exceeded for ${provider}`);
    }
    
    try {
      const result = await api.call(query, options);
      this.updateRateLimit(provider);
      return result;
    } catch (error) {
      console.error(`Search failed for ${provider}:`, error);
      throw error;
    }
  }
  
  private isRateLimited(provider: string): boolean {
    const limit = this.rateLimits.get(provider);
    if (!limit) return false;
    
    const now = Date.now();
    if (now > limit.resetTime) {
      this.rateLimits.delete(provider);
      return false;
    }
    
    return limit.calls >= this.getProviderLimit(provider);
  }
  
  private updateRateLimit(provider: string): void {
    const now = Date.now();
    const limit = this.rateLimits.get(provider) || { calls: 0, resetTime: now + 60000 };
    
    if (now > limit.resetTime) {
      limit.calls = 1;
      limit.resetTime = now + 60000;
    } else {
      limit.calls++;
    }
    
    this.rateLimits.set(provider, limit);
  }
  
  private getProviderLimit(provider: string): number {
    const limits: Record<string, number> = {
      tavily: 100,
      brave: 1000,
      google: 100,
      exa: 1000,
      serpapi: 100,
      searchapi: 1000,
      wolfram: 2000,
    };
    
    return limits[provider] || 100;
  }
}

// Example usage
const orchestrator = new SearchOrchestrator();

export {
  aiResearchQuery,
  privacySearch,
  marketResearch,
  developerSearch,
  scientificQuery,
  comprehensiveSearch,
  SearchOrchestrator,
  orchestrator,
};