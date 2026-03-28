/**
 * Phase 3A: Cache Systems Example
 * 
 * Demonstrates all supported cache converters:
 * - Redis Cache (production caching)
 * - InMemory Cache (development/testing)
 * - Momento Cache (serverless caching)
 * - Upstash Redis Cache (edge caching)
 */

import { RedisCache } from '@langchain/community/caches/redis';
import { InMemoryCache } from '@langchain/core/caches/memory';
import { MomentoCache } from '@langchain/community/caches/momento';
import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';
import { ChatOpenAI } from '@langchain/openai';

// Example 1: Redis Cache for Production
// Generated from Flowise redisCache node
const redisCache = new RedisCache({
  redisUrl: "redis://localhost:6379",
  database: 0,
  keyPrefix: "langchain:",
  ttl: 3600
});

// Example 2: InMemory Cache for Development
// Generated from Flowise inMemoryCache node  
const memoryCache = new InMemoryCache({
  maxSize: 1000,
  ttl: 3600
});

// Example 3: Momento Cache for Serverless
// Generated from Flowise momentoCache node
const momentoCache = new MomentoCache({
  apiKey: process.env.MOMENTO_API_KEY,
  cacheName: "langchain-cache",
  ttl: 3600
});

// Example 4: Upstash Redis Cache for Edge Computing
// Generated from Flowise upstashRedisCache node
const upstashCache = new UpstashRedisCache({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  keyPrefix: "langchain:",
  ttl: 3600
});

// Example usage with LLMs
const llmWithRedisCache = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  cache: redisCache
});

const llmWithMemoryCache = new ChatOpenAI({
  modelName: "gpt-3.5-turbo", 
  temperature: 0,
  cache: memoryCache
});

const llmWithMomentoCache = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  cache: momentoCache
});

const llmWithUpstashCache = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  cache: upstashCache
});

// Example function demonstrating cache performance
async function demonstrateCachePerformance() {
  const prompt = "What is the capital of France?";
  
  console.log("Testing cache performance...");
  
  // First call - will hit the LLM
  console.time("First call (no cache)");
  const response1 = await llmWithRedisCache.invoke([{ role: "human", content: prompt }]);
  console.timeEnd("First call (no cache)");
  
  // Second call - should hit the cache
  console.time("Second call (cached)");
  const response2 = await llmWithRedisCache.invoke([{ role: "human", content: prompt }]);
  console.timeEnd("Second call (cached)");
  
  console.log("Cache working:", response1.content === response2.content);
}

// Example with different cache configurations
export const cacheExamples = {
  // High-performance Redis setup
  productionRedis: new RedisCache({
    redisUrl: "redis://production-redis:6379",
    database: 1,
    keyPrefix: "prod:langchain:",
    ttl: 7200  // 2 hours
  }),
  
  // Development memory cache
  developmentMemory: new InMemoryCache({
    maxSize: 500,
    ttl: 1800  // 30 minutes
  }),
  
  // Serverless Momento cache
  serverlessMomento: new MomentoCache({
    apiKey: process.env.MOMENTO_API_KEY,
    cacheName: "production-cache",
    ttl: 10800  // 3 hours
  }),
  
  // Edge Upstash cache
  edgeUpstash: new UpstashRedisCache({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    keyPrefix: "edge:",
    ttl: 14400  // 4 hours
  })
};

// Export for use in other modules
export {
  redisCache,
  memoryCache, 
  momentoCache,
  upstashCache,
  llmWithRedisCache,
  llmWithMemoryCache,
  llmWithMomentoCache,
  llmWithUpstashCache,
  demonstrateCachePerformance
};