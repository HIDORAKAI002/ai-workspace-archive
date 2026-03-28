/**
 * Cache System Converters
 *
 * Converts Flowise cache nodes into LangChain cache implementations
 * Supports Redis, Momento, Upstash, and InMemory cache systems
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Base Cache Converter with common functionality
 */
abstract class BaseCacheConverter extends BaseConverter {
  readonly category = 'cache';

  protected generateCacheConfiguration(
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
      config: this.extractCacheConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractCacheConfig(node: IRNode): Record<string, unknown>;
  protected abstract getCacheType(): string;

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(
      node,
      `${this.getCacheType()}_cache`
    );
    const config = this.generateCacheConfiguration(node, context);
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
 * Redis Cache Converter
 * Most common production cache system
 */
export class RedisCacheConverter extends BaseCacheConverter {
  readonly flowiseType = 'redisCache';

  protected getRequiredImports(): string[] {
    return ['RedisCache'];
  }

  protected getPackageName(): string {
    return '@langchain/community/caches/redis';
  }

  protected getClassName(): string {
    return 'RedisCache';
  }

  protected getCacheType(): string {
    return 'redis';
  }

  protected extractCacheConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Redis connection configuration - use proper getParameterValue method
    const redisUrl = this.getParameterValue(
      node,
      'redisUrl',
      'redis://localhost:6379'
    );
    const database = this.getParameterValue(node, 'database', 0);
    const keyPrefix = this.getParameterValue(node, 'keyPrefix', 'langchain:');
    const ttl = this.getParameterValue(node, 'ttl', 3600); // 1 hour default

    if (redisUrl !== 'redis://localhost:6379') {
      config.redisUrl = redisUrl;
    }

    if (database !== 0) {
      config.database = database;
    }

    if (keyPrefix !== 'langchain:') {
      config.keyPrefix = keyPrefix;
    }

    if (ttl !== 3600) {
      config.ttl = ttl;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return ['redis', '@langchain/community'];
  }
}

/**
 * In-Memory Cache Converter
 * Simple cache for development and testing
 */
export class InMemoryCacheConverter extends BaseCacheConverter {
  readonly flowiseType = 'inMemoryCache';

  protected getRequiredImports(): string[] {
    return ['InMemoryCache'];
  }

  protected getPackageName(): string {
    return '@langchain/core/caches/memory';
  }

  protected getClassName(): string {
    return 'InMemoryCache';
  }

  protected getCacheType(): string {
    return 'memory';
  }

  protected extractCacheConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // InMemory cache configuration - use proper getParameterValue method
    const maxSize = this.getParameterValue(node, 'maxSize', 1000);
    const ttl = this.getParameterValue(node, 'ttl', 3600);

    if (maxSize !== 1000) {
      config.maxSize = maxSize;
    }

    if (ttl !== 3600) {
      config.ttl = ttl;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return ['@langchain/core'];
  }
}

/**
 * Momento Cache Converter
 * Serverless cache solution
 */
export class MomentoCacheConverter extends BaseCacheConverter {
  readonly flowiseType = 'momentoCache';

  protected getRequiredImports(): string[] {
    return ['MomentoCache'];
  }

  protected getPackageName(): string {
    return '@langchain/community/caches/momento';
  }

  protected getClassName(): string {
    return 'MomentoCache';
  }

  protected getCacheType(): string {
    return 'momento';
  }

  protected extractCacheConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Momento cache configuration - use proper getParameterValue method
    const apiKey = this.getParameterValue(
      node,
      'apiKey',
      'process.env.MOMENTO_API_KEY'
    );
    const cacheName = this.getParameterValue(
      node,
      'cacheName',
      'langchain-cache'
    );
    const ttl = this.getParameterValue(node, 'ttl', 3600);

    config.apiKey =
      apiKey === 'process.env.MOMENTO_API_KEY'
        ? 'process.env.MOMENTO_API_KEY'
        : apiKey;
    config.cacheName = cacheName;

    if (ttl !== 3600) {
      config.ttl = ttl;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return ['@gomomento/sdk', '@langchain/community'];
  }
}

/**
 * Upstash Redis Cache Converter
 * Edge computing cache solution
 */
export class UpstashRedisCacheConverter extends BaseCacheConverter {
  readonly flowiseType = 'upstashRedisCache';

  protected getRequiredImports(): string[] {
    return ['UpstashRedisCache'];
  }

  protected getPackageName(): string {
    return '@langchain/community/caches/upstash_redis';
  }

  protected getClassName(): string {
    return 'UpstashRedisCache';
  }

  protected getCacheType(): string {
    return 'upstash';
  }

  protected extractCacheConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    // Upstash Redis cache configuration - use proper getParameterValue method
    const url = this.getParameterValue(
      node,
      'url',
      'process.env.UPSTASH_REDIS_REST_URL'
    );
    const token = this.getParameterValue(
      node,
      'token',
      'process.env.UPSTASH_REDIS_REST_TOKEN'
    );
    const keyPrefix = this.getParameterValue(node, 'keyPrefix', 'langchain:');
    const ttl = this.getParameterValue(node, 'ttl', 3600);

    config.url =
      url === 'process.env.UPSTASH_REDIS_REST_URL'
        ? 'process.env.UPSTASH_REDIS_REST_URL'
        : url;
    config.token =
      token === 'process.env.UPSTASH_REDIS_REST_TOKEN'
        ? 'process.env.UPSTASH_REDIS_REST_TOKEN'
        : token;

    if (keyPrefix !== 'langchain:') {
      config.keyPrefix = keyPrefix;
    }

    if (ttl !== 3600) {
      config.ttl = ttl;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return ['@upstash/redis', '@langchain/community'];
  }
}
