/**
 * Phase 3A: Cache Converter Tests
 * 
 * Comprehensive testing for all cache system converters
 * Tests Redis, InMemory, Momento, and Upstash Redis cache implementations
 */

import { describe, test, expect, beforeEach } from '@jest/globals';
import { 
  RedisCacheConverter, 
  InMemoryCacheConverter,
  MomentoCacheConverter,
  UpstashRedisCacheConverter 
} from '../../src/registry/converters/cache.js';
import { IRNode, GenerationContext } from '../../src/ir/types.js';

describe('Phase 3A: Cache Converters', () => {
  let context: GenerationContext;

  beforeEach(() => {
    context = {
      projectStructure: 'typescript',
      targetLanguage: 'typescript',
      outputPath: './generated',
      dependencies: new Set(),
      generatedFiles: new Map(),
      nodeExecutionOrder: [],
      variableMap: new Map(),
      configMap: new Map()
    };
  });

  describe('RedisCacheConverter', () => {
    let converter: RedisCacheConverter;

    beforeEach(() => {
      converter = new RedisCacheConverter();
    });

    test('should have correct type and category', () => {
      expect(converter.flowiseType).toBe('redisCache');
      expect(converter.category).toBe('cache');
    });

    test('should generate Redis cache with default configuration', () => {
      const node: IRNode = {
        id: 'redis_cache_1',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      // Check import fragment
      const importFragment = fragments[0];
      expect(importFragment.type).toBe('import');
      expect(importFragment.content).toContain('@langchain/community/caches/redis');
      expect(importFragment.content).toContain('RedisCache');
      
      // Check initialization fragment
      const initFragment = fragments[1];
      expect(initFragment.type).toBe('initialization');
      expect(initFragment.content).toContain('const redis_cache_redis_cache = new RedisCache();');
    });

    test('should generate Redis cache with custom configuration', () => {
      const node: IRNode = {
        id: 'redis_cache_2',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {
          redisUrl: 'redis://custom:6379',
          database: 1,
          keyPrefix: 'myapp:',
          ttl: 7200
        },
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('redisUrl: "redis://custom:6379"');
      expect(initFragment.content).toContain('database: 1');
      expect(initFragment.content).toContain('keyPrefix: "myapp:"');
      expect(initFragment.content).toContain('ttl: 7200');
    });

    test('should return correct dependencies', () => {
      const node: IRNode = {
        id: 'redis_cache_3',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('redis');
      expect(deps).toContain('@langchain/community');
    });

    test('should validate conversion capability', () => {
      const validNode: IRNode = {
        id: 'redis_cache_4',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const invalidNode: IRNode = {
        id: 'not_cache',
        type: 'notACache',
        label: 'Not a Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      expect(converter.canConvert(validNode)).toBe(true);
      expect(converter.canConvert(invalidNode)).toBe(false);
    });
  });

  describe('InMemoryCacheConverter', () => {
    let converter: InMemoryCacheConverter;

    beforeEach(() => {
      converter = new InMemoryCacheConverter();
    });

    test('should have correct type and category', () => {
      expect(converter.flowiseType).toBe('inMemoryCache');
      expect(converter.category).toBe('cache');
    });

    test('should generate InMemory cache with default configuration', () => {
      const node: IRNode = {
        id: 'memory_cache_1',
        type: 'inMemoryCache',
        label: 'Memory Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      // Check import fragment
      const importFragment = fragments[0];
      expect(importFragment.type).toBe('import');
      expect(importFragment.content).toContain('@langchain/core/caches/memory');
      expect(importFragment.content).toContain('InMemoryCache');
      
      // Check initialization fragment
      const initFragment = fragments[1];
      expect(initFragment.type).toBe('initialization');
      expect(initFragment.content).toContain('const memory_cache_memory_cache = new InMemoryCache();');
    });

    test('should generate InMemory cache with custom configuration', () => {
      const node: IRNode = {
        id: 'memory_cache_2',
        type: 'inMemoryCache',
        label: 'Memory Cache',
        position: { x: 0, y: 0 },
        parameters: {
          maxSize: 500,
          ttl: 1800
        },
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('maxSize: 500');
      expect(initFragment.content).toContain('ttl: 1800');
    });

    test('should return correct dependencies', () => {
      const node: IRNode = {
        id: 'memory_cache_3',
        type: 'inMemoryCache',
        label: 'Memory Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('@langchain/core');
    });
  });

  describe('MomentoCacheConverter', () => {
    let converter: MomentoCacheConverter;

    beforeEach(() => {
      converter = new MomentoCacheConverter();
    });

    test('should have correct type and category', () => {
      expect(converter.flowiseType).toBe('momentoCache');
      expect(converter.category).toBe('cache');
    });

    test('should generate Momento cache with default configuration', () => {
      const node: IRNode = {
        id: 'momento_cache_1',
        type: 'momentoCache',
        label: 'Momento Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      // Check import fragment
      const importFragment = fragments[0];
      expect(importFragment.type).toBe('import');
      expect(importFragment.content).toContain('@langchain/community/caches/momento');
      expect(importFragment.content).toContain('MomentoCache');
      
      // Check initialization fragment
      const initFragment = fragments[1];
      expect(initFragment.type).toBe('initialization');
      expect(initFragment.content).toContain('apiKey: "process.env.MOMENTO_API_KEY"');
      expect(initFragment.content).toContain('cacheName: "langchain-cache"');
    });

    test('should generate Momento cache with custom configuration', () => {
      const node: IRNode = {
        id: 'momento_cache_2',
        type: 'momentoCache',
        label: 'Momento Cache',
        position: { x: 0, y: 0 },
        parameters: {
          apiKey: 'custom-api-key',
          cacheName: 'my-cache',
          ttl: 1200
        },
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('apiKey: "custom-api-key"');
      expect(initFragment.content).toContain('cacheName: "my-cache"');
      expect(initFragment.content).toContain('ttl: 1200');
    });

    test('should return correct dependencies', () => {
      const node: IRNode = {
        id: 'momento_cache_3',
        type: 'momentoCache',
        label: 'Momento Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('@gomomento/sdk');
      expect(deps).toContain('@langchain/community');
    });
  });

  describe('UpstashRedisCacheConverter', () => {
    let converter: UpstashRedisCacheConverter;

    beforeEach(() => {
      converter = new UpstashRedisCacheConverter();
    });

    test('should have correct type and category', () => {
      expect(converter.flowiseType).toBe('upstashRedisCache');
      expect(converter.category).toBe('cache');
    });

    test('should generate Upstash Redis cache with default configuration', () => {
      const node: IRNode = {
        id: 'upstash_cache_1',
        type: 'upstashRedisCache',
        label: 'Upstash Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      
      expect(fragments).toHaveLength(2);
      
      // Check import fragment
      const importFragment = fragments[0];
      expect(importFragment.type).toBe('import');
      expect(importFragment.content).toContain('@langchain/community/caches/upstash_redis');
      expect(importFragment.content).toContain('UpstashRedisCache');
      
      // Check initialization fragment
      const initFragment = fragments[1];
      expect(initFragment.type).toBe('initialization');
      expect(initFragment.content).toContain('url: "process.env.UPSTASH_REDIS_REST_URL"');
      expect(initFragment.content).toContain('token: "process.env.UPSTASH_REDIS_REST_TOKEN"');
    });

    test('should generate Upstash Redis cache with custom configuration', () => {
      const node: IRNode = {
        id: 'upstash_cache_2',
        type: 'upstashRedisCache',
        label: 'Upstash Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {
          url: 'https://custom-upstash.redis.com',
          token: 'custom-token',
          keyPrefix: 'prefix:',
          ttl: 5400
        },
        connections: { input: [], output: [] }
      };

      const fragments = converter.convert(node, context);
      const initFragment = fragments[1];
      
      expect(initFragment.content).toContain('url: "https://custom-upstash.redis.com"');
      expect(initFragment.content).toContain('token: "custom-token"');
      expect(initFragment.content).toContain('keyPrefix: "prefix:"');
      expect(initFragment.content).toContain('ttl: 5400');
    });

    test('should return correct dependencies', () => {
      const node: IRNode = {
        id: 'upstash_cache_3',
        type: 'upstashRedisCache',
        label: 'Upstash Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const deps = converter.getDependencies(node, context);
      expect(deps).toContain('@upstash/redis');
      expect(deps).toContain('@langchain/community');
    });
  });

  describe('Cache Converter Integration Tests', () => {
    test('should handle all cache types in registry', () => {
      const cacheConverters = [
        new RedisCacheConverter(),
        new InMemoryCacheConverter(),
        new MomentoCacheConverter(),
        new UpstashRedisCacheConverter()
      ];

      cacheConverters.forEach(converter => {
        expect(converter.category).toBe('cache');
        expect(typeof converter.flowiseType).toBe('string');
        expect(converter.flowiseType).toBeTruthy();
      });
    });

    test('should generate unique variable names for different cache instances', () => {
      const redisConverter = new RedisCacheConverter();
      const memoryConverter = new InMemoryCacheConverter();

      const redisNode: IRNode = {
        id: 'cache_1',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const memoryNode: IRNode = {
        id: 'cache_2',
        type: 'inMemoryCache',
        label: 'Memory Cache',
        position: { x: 0, y: 0 },
        parameters: {},
        connections: { input: [], output: [] }
      };

      const redisFragments = redisConverter.convert(redisNode, context);
      const memoryFragments = memoryConverter.convert(memoryNode, context);

      expect(redisFragments[1].content).toContain('const redis_cache_redis_cache = new RedisCache');
      expect(memoryFragments[1].content).toContain('const memory_cache_memory_cache = new InMemoryCache');
    });

    test('should handle edge cases and error conditions', () => {
      const converter = new RedisCacheConverter();
      
      const nodeWithMissingParams: IRNode = {
        id: 'cache_edge',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: undefined as any,
        connections: { input: [], output: [] }
      };

      // Should not throw and should provide defaults
      expect(() => converter.convert(nodeWithMissingParams, context)).not.toThrow();
    });

    test('should validate configuration values properly', () => {
      const converter = new InMemoryCacheConverter();
      
      const nodeWithInvalidConfig: IRNode = {
        id: 'cache_invalid',
        type: 'inMemoryCache',
        label: 'Memory Cache',
        position: { x: 0, y: 0 },
        parameters: {
          maxSize: 'invalid' as any,
          ttl: -1
        },
        connections: { input: [], output: [] }
      };

      // Should handle invalid values gracefully
      const fragments = converter.convert(nodeWithInvalidConfig, context);
      expect(fragments).toHaveLength(2);
    });
  });

  describe('Cache Configuration Performance Tests', () => {
    test('should handle large configuration objects efficiently', () => {
      const converter = new RedisCacheConverter();
      
      const nodeWithLargeConfig: IRNode = {
        id: 'cache_large',
        type: 'redisCache',
        label: 'Redis Cache',
        position: { x: 0, y: 0 },
        parameters: {
          redisUrl: 'redis://localhost:6379',
          database: 0,
          keyPrefix: 'test:',
          ttl: 3600,
          // Add many additional parameters
          ...Object.fromEntries(Array.from({length: 50}, (_, i) => [`param${i}`, `value${i}`]))
        },
        connections: { input: [], output: [] }
      };

      const startTime = performance.now();
      const fragments = converter.convert(nodeWithLargeConfig, context);
      const endTime = performance.now();

      expect(fragments).toHaveLength(2);
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });
  });
});