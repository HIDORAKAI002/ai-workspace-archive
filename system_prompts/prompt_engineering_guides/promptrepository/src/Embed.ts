/**
 * @module Embed
 * 
 * Base functionality for interacting with OpenAI's embedding API.
 * Provides abstract base class and common utilities for embedding services.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import OpenAI, { AzureOpenAI } from 'openai';
import { EModel, EModelProvider, IEmbeddingModelDriver, InvalidParameterError, InvalidOperationError, ConnectionError } from './entry';
import { retryWithExponentialBackoff, MAX_RETRIES } from './DriverHelpers';

/**
 * Calculates the cosine similarity between two embedding vectors.
 * Cosine similarity measures the cosine of the angle between two vectors,
 * providing a value between -1 and 1 where 1 indicates identical vectors.
 * 
 * @param embedding1 - First embedding vector
 * @param embedding2 - Second embedding vector
 * @returns Cosine similarity value between -1 and 1
 * @throws Error if vectors have different lengths
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides shared embedding functionality for OpenAI and Azure OpenAI. Exposes a cosineSimilarity function and an abstract base driver for embedding models. Use this module to compute vector similarity and to implement concrete drivers that call the embeddings API with retries and robust error handling.
// 
// cosineSimilarity compares two numeric vectors. It validates equal length and non-empty input. It returns the cosine similarity, or 0 if any vector has zero magnitude. It throws InvalidParameterError on invalid inputs.
// 
// OpenAIModelEmbeddingDriver is an abstract class that implements IEmbeddingModelDriver. It tracks the deployment/model name, the model type (EModel), and the provider (EModelProvider). Subclasses must provide getModelName and a populated OpenAI or AzureOpenAI client. The embed method sends text to the embeddings API using retryWithExponentialBackoff and MAX_RETRIES. It validates the response and returns the first embedding vector. It converts underlying failures into ConnectionError or InvalidOperationError with provider-specific messages.
// 
// Key imports: OpenAI and AzureOpenAI clients, EModel/EModelProvider enums, IEmbeddingModelDriver interface, custom errors, and retry utilities.
// ===End StrongAI Generated Comment===

export function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
   if (embedding1.length !== embedding2.length) {
      throw new InvalidParameterError('Embedding vectors must have the same length');
   }

   if (embedding1.length === 0) {
      throw new InvalidParameterError('Embedding vectors cannot be empty');
   }

   // Calculate dot product
   const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
   
   // Calculate magnitudes
   const magnitude1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val * val, 0));
   const magnitude2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val * val, 0));
   
   // Handle zero magnitude vectors
   if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
   }
   
   // Calculate cosine similarity
   return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Abstract base class for OpenAI embedding model drivers.
 * Provides common functionality for interacting with OpenAI's embedding API
 * including authentication and error handling.
 * 
 * @implements {IEmbeddingModelDriver}
 * @abstract
 * 
 * @property {string} deploymentName - The deployment/model name to use
 * @property {EModel} drivenModelType - The model type (large or mini)
 * @property {EModelProvider} drivenModelProvider - The provider type
 * @property {OpenAI} openai - Instance of OpenAI API client
 */
export abstract class OpenAIModelEmbeddingDriver implements IEmbeddingModelDriver {
   public abstract deploymentName: string;
   public drivenModelType: EModel;
   public drivenModelProvider: EModelProvider;
   protected openai!: OpenAI | AzureOpenAI;

   constructor(modelType: EModel, provider: EModelProvider) {
      this.drivenModelType = modelType;
      this.drivenModelProvider = provider;
   }

   protected abstract getModelName(): string;

   /**
    * Returns the provider name for error messages
    */
   protected getProviderName(): string {
      return this.drivenModelProvider === EModelProvider.kAzureOpenAI ? "Azure OpenAI" : "OpenAI";
   }

   /**
    * Converts text into a vector embedding representation.
    * 
    * @param {string} text - The input text to be embedded
    * @returns {Promise<Array<number>>} A promise that resolves to an array of numbers 
    *         representing the text embedding vector
    */
   async embed(text: string): Promise<Array<number>> {
      try {
         const response = await retryWithExponentialBackoff(() => 
            this.openai.embeddings.create({
               input: text,
               model: this.getModelName()
            }),
            MAX_RETRIES,
            this.getProviderName()
         );

         if (!response.data || response.data.length === 0) {
            throw new InvalidOperationError(`${this.getProviderName()} embedding API error: No embedding data received from ${this.getProviderName()}`);
         }

         return response.data[0].embedding;
      } catch (error) {
         // If error is already a ConnectionError or InvalidOperationError from retryWithExponentialBackoff, just rethrow it
         if (error instanceof ConnectionError || error instanceof InvalidOperationError) {
            throw error;
         }
         // Otherwise, wrap it with provider-specific message
         if (error instanceof Error) {
            throw new ConnectionError(`${this.getProviderName()} embedding API error: ${error.message}`);
         }
         throw new ConnectionError(`Unknown error occurred while calling ${this.getProviderName()} embedding API`);
      }
   }
}