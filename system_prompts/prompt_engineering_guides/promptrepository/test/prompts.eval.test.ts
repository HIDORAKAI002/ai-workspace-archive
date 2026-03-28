/**
 * Test module for evaluating prompt responses.
 * Contains integration tests that verify prompts produce consistent and appropriate 
 * responses when processed by the LLM. 
 * Tests cover three cases: 
 * 1) Simple input/output with known content, 
 * 2) Similar input that should produce same output, and 
 * 3) Variant input that should produce different output.
 */

// Copyright (c) 2025, 2026 Jon Verrier

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { IPrompt, IPromptRepository, EModel, EVerbosity, EModelProvider } from '../src/entry';
import { PromptInMemoryRepository } from '../src/PromptRepository';
import { CHAT_TEST_PROVIDERS, createChatDrivers, TEST_TIMEOUT_MS, TEST_TARGET_SUPPORTS_VERBOSITY } from './ChatTestConfig';
import prompts from './template-prompt.json';

const typedPrompts = prompts as IPrompt[];

// Create chat drivers for all providers outside describe blocks
const providers = CHAT_TEST_PROVIDERS;
const chatDrivers = createChatDrivers(EModel.kLarge);

/**
 * Returns the appropriate timeout for a test based on the provider.
 * kGoogleGemini tests use 120s timeout, others use the default TEST_TIMEOUT_MS.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module defines integration tests that verify a template-based “Motor Racing Welcome” prompt produces consistent, provider-agnostic responses. It runs the same suite across all configured chat providers and compares outputs for similar and variant user inputs to ensure stability and correctness.
// 
// There are no exports. The module creates chat drivers once, then for each provider runs a Mocha describe block with four tests. It pulls a specific prompt (template-prompt-002) from a JSON file via PromptInMemoryRepository, expands system and user prompts, and requests a response at medium verbosity. Assertions check that the response includes the expected location, matches a welcome-style phrasing, and does not repeat the location token (validated by a single occurrence split). It also confirms Silverstone output differs from Monaco.
// 
// Key imports: expect for assertions; describe and it from mocha for test structure; IPrompt, IPromptRepository, EModel, EVerbosity, EModelProvider from the entry module; PromptInMemoryRepository for prompt retrieval and expansion; CHAT_TEST_PROVIDERS, createChatDrivers, and TEST_TIMEOUT_MS for provider orchestration; a custom timeout prefers 120s for Google Gemini.
// ===End StrongAI Generated Comment===
const getTestTimeout = (provider: EModelProvider): number => {
   return provider === EModelProvider.kGoogleGemini ? 120000 : TEST_TIMEOUT_MS;
};

// Run tests for each provider
providers.forEach((provider, index) => {
   const chatDriver = chatDrivers[index];

   // Skip tests if driver failed to initialize (e.g., missing API key)
   if (!chatDriver) {
      console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
      return;
   }

   describe(`Motor Racing Welcome Prompt Tests (${provider})`, () => {
      let prompt: IPrompt = typedPrompts.find(p => p.id === "template-prompt-002")!;
      const promptRepo : IPromptRepository= new PromptInMemoryRepository([prompt]);

      it('should generate appropriate welcome message for Monaco', async () => {
         const prompt = promptRepo.getPrompt('template-prompt-002');
         expect(prompt).toBeDefined();
         
         const systemPrompt = promptRepo.expandSystemPrompt(prompt!, {});
         const userPrompt = promptRepo.expandUserPrompt(prompt!, { LOCATION: 'Monaco' });
         
         const response = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
         
         // The response should contain 'Monaco' but not duplicate these words
         expect(response).toContain('Monaco');
         expect(response.toLowerCase()).toMatch(/welcome|greetings/);
         expect(response.split('Monaco').length).toBe(2); // Only one occurrence
         
      }).timeout(getTestTimeout(provider));

      it('should generate same welcome pattern for Monaco Monaco', async () => {
         const prompt = promptRepo.getPrompt('template-prompt-002');
         expect(prompt).toBeDefined();
         
         const systemPrompt = promptRepo.expandSystemPrompt(prompt!, {});
         const userPrompt = promptRepo.expandUserPrompt(prompt!, { LOCATION: 'Monaco Monaco' });
         
         const response = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
         
         // Should follow same pattern as Monaco test since Monte Carlo is the same location
         expect(response).toContain('Monaco');
         expect(response.toLowerCase()).toMatch(/welcome|greetings/);
         expect(response.split('Monaco').length).toBe(2); // Only one occurrence
         
      }).timeout(getTestTimeout(provider));

      it('should generate same welcome pattern for Monaco Grand Prix', async () => {
         const prompt = promptRepo.getPrompt('template-prompt-002');
         expect(prompt).toBeDefined();
         
         const systemPrompt = promptRepo.expandSystemPrompt(prompt!, {});
         const userPrompt = promptRepo.expandUserPrompt(prompt!, { LOCATION: 'Monaco Grand Prix' });
         
         const response = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
         
         // Should follow same pattern as Monaco test since Monte Carlo is the same location
         expect(response).toContain('Monaco');
         expect(response.toLowerCase()).toMatch(/welcome|greetings/);
         expect(response.split('Grand Prix').length).toBe(2); // Only one occurrence
         
      }).timeout(getTestTimeout(provider));

      it('should generate different welcome message for Silverstone', async () => {
         const prompt = promptRepo.getPrompt('template-prompt-002');
         expect(prompt).toBeDefined();
         
         const systemPrompt = promptRepo.expandSystemPrompt(prompt!, {});
         const userPrompt = promptRepo.expandUserPrompt(prompt!, { LOCATION: 'Silverstone' });
         
         const response = await chatDriver.getModelResponse(systemPrompt, userPrompt, EVerbosity.kMedium);
         
         // Should contain Silverstone-specific content
         expect(response).toContain('Silverstone');
         expect(response.toLowerCase()).toMatch(/welcome|greetings|delighted/);
         expect(response.split('Silverstone').length).toBe(2); // Only one occurrence
         // Verify it's different from Monaco/Monte Carlo responses
         expect(response).not.toContain('Monaco');
         expect(response).not.toContain('Monte Carlo');

      }).timeout(getTestTimeout(provider));
   });
});
