/**
 * @module embed.test
 * 
 * Unit tests for the Embed module which handles interactions with OpenAI's embedding API.
 */

// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module is a Mocha test suite for the embedding subsystem. It verifies that embedding drivers work across providers (OpenAI and Azure OpenAI), that embeddings are returned for varied inputs, that identical texts yield high cosine similarity, and that different texts produce distinct vectors. It also checks driver metadata such as deploymentName, drivenModelType, and provider, and compares output sizes between “large” and “mini” models.
// 
// It exercises exponential backoff behavior on 429 rate-limit errors using a mock driver, ensuring retries with increasing delays and a capped retry count. It asserts no retries for non-retryable cases, including 400 content filter, safety, and invalid_request errors, 403 forbidden, and malformed or empty embedding responses. Factory creation is validated for both providers and model sizes, including distinct deployment names. CosineSimilarity is tested for correctness, edge cases, input validation, performance, and numerical stability.
// 
// Key imports:
// - EmbeddingDriverFactory to construct provider- and size-specific drivers.
// - EModelProvider and EModel enums to select provider and model size.
// - CosineSimilarity utility for vector similarity checks.
// - OpenAIModelEmbeddingDriver as the base for the mock.
// - Mocha (describe, it, beforeEach, afterEach) and expect for testing.
// ===End StrongAI Generated Comment===

import { expect } from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { EmbeddingDriverFactory, EModelProvider, EModel, CosineSimilarity } from '../src/entry';
import { OpenAIModelEmbeddingDriver } from '../src/Embed';

const TEST_TIMEOUT_MS = 60000; // 60 second timeout for all tests

// Create embedding drivers for both providers outside describe blocks
const embeddingDriverFactory = new EmbeddingDriverFactory();
const providers = [EModelProvider.kOpenAI, EModelProvider.kAzureOpenAI];
const embeddingDrivers = providers.map(provider => embeddingDriverFactory.create(EModel.kLarge, provider));

// Mock class for testing exponential backoff
class MockOpenAIEmbeddingDriver extends OpenAIModelEmbeddingDriver {
   private failCount = 0;
   private shouldFail = false;
   private maxFailures = 0;
   public deploymentName = 'mock-deployment';

   constructor() {
      super(EModel.kLarge, EModelProvider.kOpenAI);
      // Mock the OpenAI client
      (this as any).openai = {
         embeddings: {
            create: async (config: any) => {
               if (this.shouldFail && this.failCount < this.maxFailures) {
                  this.failCount++;
                  const error: any = new Error('Rate limit exceeded');
                  error.status = 429;
                  throw error;
               }
               
               // Return mock embedding data
               return {
                  data: [
                     {
                        embedding: Array.from({ length: 1536 }, (_, i) => Math.random() - 0.5)
                     }
                  ]
               };
            }
         }
      };
   }

   protected getModelName(): string {
      return 'mock-embedding-model';
   }

   setShouldFail(shouldFail: boolean, maxFailures: number = 0) {
      this.shouldFail = shouldFail;
      this.maxFailures = maxFailures;
      this.failCount = 0;
   }

   getFailCount() {
      return this.failCount;
   }

   // Method to override the mock for specific tests
   setMockCreate(mockFn: () => Promise<any>) {
      (this as any).openai.embeddings.create = mockFn;
   }
}

// Run all tests for each provider
providers.forEach((provider, index) => {
  const embeddingDriver = embeddingDrivers[index];

  describe(`getEmbedding (${provider})`, () => {
    it('should successfully return embedding for simple text', async () => {
      const result = await embeddingDriver.embed('Hello world');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);

    it('should successfully return embedding for longer text', async () => {
      const longText = 'This is a longer piece of text that should still be successfully embedded by the OpenAI embedding model. It contains multiple sentences and should produce a meaningful vector representation.';
      const result = await embeddingDriver.embed(longText);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);

    it('should successfully return embedding for text with special characters', async () => {
      const specialText = 'Hello! How are you? I hope you are doing well. 😊 This includes émojis and spéciål characters.';
      const result = await embeddingDriver.embed(specialText);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);

    it('should return different embeddings for different texts', async () => {
      const text1 = 'This is about artificial intelligence and machine learning.';
      const text2 = 'This is about cooking and recipes for delicious food.';
      
      const [embedding1, embedding2] = await Promise.all([
        embeddingDriver.embed(text1),
        embeddingDriver.embed(text2)
      ]);

      expect(Array.isArray(embedding1)).toBe(true);
      expect(Array.isArray(embedding2)).toBe(true);
      expect(embedding1.length).toBe(embedding2.length);
      
      // Embeddings should be different (not identical)
      const areIdentical = embedding1.every((val, i) => val === embedding2[i]);
      expect(areIdentical).toBe(false);
    }).timeout(TEST_TIMEOUT_MS);

              it('should return highly similar embeddings for identical text', async () => {
       const text = 'This text should produce consistent embeddings.';
       
       const [embedding1, embedding2] = await Promise.all([
         embeddingDriver.embed(text),
         embeddingDriver.embed(text)
       ]);

       expect(Array.isArray(embedding1)).toBe(true);
       expect(Array.isArray(embedding2)).toBe(true);
       expect(embedding1.length).toBe(embedding2.length);
       
       // Calculate cosine similarity between the two embeddings
       const cosineSimilarity = CosineSimilarity(embedding1, embedding2);
       
       // Cosine similarity should be very close to 1.0 for identical text (allowing for floating point variations)
       expect(cosineSimilarity).toBeGreaterThan(0.999);
     }).timeout(TEST_TIMEOUT_MS);

    it('should have correct driver properties', () => {
      expect(typeof embeddingDriver.deploymentName).toBe('string');
      expect(embeddingDriver.deploymentName.length).toBeGreaterThan(0);
      expect(embeddingDriver.drivenModelType).toBe(EModel.kLarge);
      expect(embeddingDriver.drivenModelProvider).toBe(provider);
    });

    it('should handle empty string input', async () => {
      const result = await embeddingDriver.embed('');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);

    it('should handle single character input', async () => {
      const result = await embeddingDriver.embed('a');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);
  });

  // Mini model tests for each provider
  const miniEmbeddingDriver = embeddingDriverFactory.create(EModel.kMini, provider);

  describe(`Mini Model Embedding Tests (${provider})`, () => {
    it('should successfully return embedding with mini model', async () => {
      const result = await miniEmbeddingDriver.embed('Hello world');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe('number');
    }).timeout(TEST_TIMEOUT_MS);

    it('should have correct mini model properties', () => {
      expect(typeof miniEmbeddingDriver.deploymentName).toBe('string');
      expect(miniEmbeddingDriver.deploymentName.length).toBeGreaterThan(0);
      expect(miniEmbeddingDriver.drivenModelType).toBe(EModel.kMini);
      expect(miniEmbeddingDriver.drivenModelProvider).toBe(provider);
    });

    it('should return different embedding sizes for different models', async () => {
      const text = 'Test text for comparing model outputs';
      const [largeEmbedding, miniEmbedding] = await Promise.all([
        embeddingDriver.embed(text),
        miniEmbeddingDriver.embed(text)
      ]);

      expect(Array.isArray(largeEmbedding)).toBe(true);
      expect(Array.isArray(miniEmbedding)).toBe(true);
      
      // Mini model typically has smaller embedding dimensions
      if (provider === EModelProvider.kOpenAI) {
        expect(largeEmbedding.length).toBeGreaterThan(miniEmbedding.length);
      }
      // For Azure, deployment names are different but dimensions might be the same
      expect(embeddingDriver.deploymentName).not.toBe(miniEmbeddingDriver.deploymentName);
    }).timeout(TEST_TIMEOUT_MS);
  });
});

describe('Embedding Exponential Backoff Tests', () => {
   let mockDriver: MockOpenAIEmbeddingDriver;

   beforeEach(() => {
      mockDriver = new MockOpenAIEmbeddingDriver();
   });

   afterEach(() => {
      mockDriver.setShouldFail(false);
   });

   it('should retry on 429 errors and eventually succeed', async () => {
      // Set up to fail 2 times then succeed
      mockDriver.setShouldFail(true, 2);

      const startTime = Date.now();
      const result = await mockDriver.embed('test text');
      const endTime = Date.now();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(mockDriver.getFailCount()).toBe(2);

      // Verify exponential backoff timing (should be ~3 seconds: 1s + 2s)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(2500); // At least 2.5 seconds
      expect(elapsedTime).toBeLessThan(5000); // Less than 5 seconds
   }).timeout(10000);

   it('should throw error after max retries exceeded', async () => {
      // Set up to fail more than max retries (5)
      mockDriver.setShouldFail(true, 6);

      const startTime = Date.now();
      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/API error.*Rate limit exceeded|Rate limit exceeded.*API error/i);
      const endTime = Date.now();

      expect(mockDriver.getFailCount()).toBe(6); // Should have tried 6 times (1 initial + 5 retries)
      
      // Verify it took reasonable time (should be ~31 seconds: 1+2+4+8+16)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(25000); // At least 25 seconds
      expect(elapsedTime).toBeLessThan(40000); // Less than 40 seconds
   }).timeout(45000);

   it('should not retry on non-429 errors', async () => {
      // Mock to throw a different error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Authentication failed');
         error.status = 401;
         throw error;
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/API error.*Authentication failed|Authentication failed.*API error/i);
   }).timeout(5000);

   it('should handle content filter errors without retrying', async () => {
      // Mock to throw a content filter error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Content filter triggered');
         error.status = 400;
         error.error = {
            type: 'content_filter',
            message: 'Content violates OpenAI safety policies'
         };
         throw error;
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/content filter.*triggered.*safety policies|safety policies.*content filter.*triggered/i);
   }).timeout(5000);

   it('should handle safety system errors without retrying', async () => {
      // Mock to throw a safety error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Safety system triggered');
         error.status = 400;
         error.error = {
            type: 'safety',
            message: 'Content violates OpenAI safety guidelines'
         };
         throw error;
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/safety system.*triggered.*safety guidelines|safety guidelines.*safety system.*triggered/i);
   }).timeout(5000);

   it('should handle general refusal errors without retrying', async () => {
      // Mock to throw a general refusal error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Request refused');
         error.status = 400;
         error.error = {
            type: 'invalid_request',
            message: 'I cannot process this request'
         };
         throw error;
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/refused request.*cannot process|cannot process.*refused request/i);
   }).timeout(5000);

   it('should handle 403 forbidden errors as refusals', async () => {
      // Mock to throw a 403 error
      mockDriver.setMockCreate(async () => {
         const error: any = new Error('Forbidden');
         error.status = 403;
         error.message = 'Access forbidden';
         throw error;
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/refused request.*403.*Access forbidden|Access forbidden.*refused request.*403/i);
   }).timeout(5000);

   it('should handle empty embedding response', async () => {
      // Mock to return empty data array
      mockDriver.setMockCreate(async () => {
         return {
            data: []
         };
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/embedding.*API error.*No embedding data|No embedding data.*embedding.*API error/i);
   }).timeout(5000);

   it('should handle malformed embedding response', async () => {
      // Mock to return response without data property
      mockDriver.setMockCreate(async () => {
         return {
            // Missing data property
         };
      });

      await expect(
         mockDriver.embed('test text')
      ).rejects.toThrow(/embedding.*API error.*No embedding data|No embedding data.*embedding.*API error/i);
   }).timeout(5000);

   it('should retry exactly once on 429 error', async () => {
      // Set up to fail 1 time then succeed
      mockDriver.setShouldFail(true, 1);

      const startTime = Date.now();
      const result = await mockDriver.embed('test text');
      const endTime = Date.now();

      expect(Array.isArray(result)).toBe(true);
      expect(mockDriver.getFailCount()).toBe(1);

      // Verify exponential backoff timing (should be ~1 second)
      const elapsedTime = endTime - startTime;
      expect(elapsedTime).toBeGreaterThan(800); // At least 800ms
      expect(elapsedTime).toBeLessThan(2000); // Less than 2 seconds
   }).timeout(5000);
});

describe('Embedding Factory Tests', () => {
   it('should create OpenAI embedding driver', () => {
      const factory = new EmbeddingDriverFactory();
      const driver = factory.create(EModel.kLarge, EModelProvider.kOpenAI);
      
      expect(driver.drivenModelProvider).toBe(EModelProvider.kOpenAI);
      expect(driver.drivenModelType).toBe(EModel.kLarge);
      expect(typeof driver.deploymentName).toBe('string');
   });

   it('should create Azure OpenAI embedding driver', () => {
      const factory = new EmbeddingDriverFactory();
      const driver = factory.create(EModel.kMini, EModelProvider.kAzureOpenAI);
      
      expect(driver.drivenModelProvider).toBe(EModelProvider.kAzureOpenAI);
      expect(driver.drivenModelType).toBe(EModel.kMini);
      expect(typeof driver.deploymentName).toBe('string');
   });

   it('should create different drivers for different providers', () => {
      const factory = new EmbeddingDriverFactory();
      const openaiDriver = factory.create(EModel.kLarge, EModelProvider.kOpenAI);
      const azureDriver = factory.create(EModel.kLarge, EModelProvider.kAzureOpenAI);
      
      expect(openaiDriver.drivenModelProvider).toBe(EModelProvider.kOpenAI);
      expect(azureDriver.drivenModelProvider).toBe(EModelProvider.kAzureOpenAI);
      expect(openaiDriver.constructor.name).not.toBe(azureDriver.constructor.name);
   });

       it('should create different deployment names for different model sizes', () => {
       const factory = new EmbeddingDriverFactory();
       const largeDriver = factory.create(EModel.kLarge, EModelProvider.kAzureOpenAI);
       const miniDriver = factory.create(EModel.kMini, EModelProvider.kAzureOpenAI);
       
       expect(largeDriver.deploymentName).not.toBe(miniDriver.deploymentName);
       expect(largeDriver.drivenModelType).toBe(EModel.kLarge);
       expect(miniDriver.drivenModelType).toBe(EModel.kMini);
    });
 });

describe('CosineSimilarity Function Tests', () => {
   it('should return 1.0 for identical vectors', () => {
      const vector1 = [1, 2, 3, 4, 5];
      const vector2 = [1, 2, 3, 4, 5];
      const similarity = CosineSimilarity(vector1, vector2);
      expect(similarity).toBeCloseTo(1.0, 10);
   });

   it('should return 0.0 for orthogonal vectors', () => {
      const vector1 = [1, 0, 0];
      const vector2 = [0, 1, 0];
      const similarity = CosineSimilarity(vector1, vector2);
      expect(similarity).toBeCloseTo(0.0, 10);
   });

   it('should return -1.0 for opposite vectors', () => {
      const vector1 = [1, 2, 3];
      const vector2 = [-1, -2, -3];
      const similarity = CosineSimilarity(vector1, vector2);
      expect(similarity).toBeCloseTo(-1.0, 10);
   });

   it('should handle normalized vectors correctly', () => {
      const vector1 = [0.6, 0.8];
      const vector2 = [0.8, 0.6];
      const similarity = CosineSimilarity(vector1, vector2);
      // Cosine of angle between these vectors should be 0.96
      expect(similarity).toBeCloseTo(0.96, 2);
   });

   it('should handle zero vectors', () => {
      const vector1 = [0, 0, 0];
      const vector2 = [1, 2, 3];
      const similarity = CosineSimilarity(vector1, vector2);
      expect(similarity).toBe(0);
   });

   it('should throw error for vectors of different lengths', () => {
      const vector1 = [1, 2, 3];
      const vector2 = [1, 2];
      expect(() => CosineSimilarity(vector1, vector2)).toThrow('Embedding vectors must have the same length');
   });

   it('should throw error for empty vectors', () => {
      const vector1: number[] = [];
      const vector2: number[] = [];
      expect(() => CosineSimilarity(vector1, vector2)).toThrow('Embedding vectors cannot be empty');
   });

   it('should handle large vectors efficiently', () => {
      const vector1 = Array.from({ length: 1536 }, (_, i) => Math.sin(i / 100));
      const vector2 = Array.from({ length: 1536 }, (_, i) => Math.cos(i / 100));
      
      const startTime = Date.now();
      const similarity = CosineSimilarity(vector1, vector2);
      const endTime = Date.now();
      
      expect(typeof similarity).toBe('number');
      expect(similarity).toBeGreaterThan(-1);
      expect(similarity).toBeLessThan(1);
      expect(endTime - startTime).toBeLessThan(10); // Should complete in less than 10ms
   });

   it('should handle very small numbers without overflow', () => {
      const vector1 = [1e-10, 2e-10, 3e-10];
      const vector2 = [4e-10, 5e-10, 6e-10];
      const similarity = CosineSimilarity(vector1, vector2);
      expect(typeof similarity).toBe('number');
      expect(isNaN(similarity)).toBe(false);
      expect(isFinite(similarity)).toBe(true);
   });
 }); 