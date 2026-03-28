/**
 * @module ChatWithAttachmentTestConfig
 * 
 * Shared configuration for ChatWithAttachment driver tests.
 * Enforces consistent provider enumeration and driver initialization.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { ChatWithAttachmentDriverFactory, EModelProvider, EModel, IChatWithAttachmentDriver } from '../src/entry';

const TEST_TIMEOUT_MS = 60000; // 60 second timeout for all tests

/**
 * Providers to test - currently only Gemini for initial testing.
 * Once Gemini is validated, uncomment other providers for regression testing.
 */

// ===Start StrongAI Generated Comment (20260219)===
// Provides shared test configuration for ChatWithAttachment driver integration tests. It standardizes which model providers are exercised and how drivers are instantiated so test suites stay consistent across environments.
// 
// Main exports:
// - CHAT_WITH_ATTACHMENT_TEST_PROVIDERS: an ordered list of EModelProvider values to test. It currently targets Google Gemini only; OpenAI and Azure OpenAI are commented out for later regression runs.
// - createChatWithAttachmentDrivers(model?): a helper that builds one ChatWithAttachment driver per configured provider using a factory. It defaults to EModel.kLarge. Initialization is wrapped in try/catch; if a provider cannot initialize (such as missing API credentials), the function returns null in that slot so tests can detect and skip unavailable providers.
// - TEST_TIMEOUT_MS: a 60,000 ms timeout constant intended to unify per-test timeouts.
// 
// Key imports:
// - ChatWithAttachmentDriverFactory: constructs concrete drivers for a given model and provider.
// - EModelProvider: enumerates supported provider backends.
// - EModel: identifies model tiers or variants selectable for tests.
// - IChatWithAttachmentDriver: the driver interface returned by the factory and used by tests.
// ===End StrongAI Generated Comment===
export const CHAT_WITH_ATTACHMENT_TEST_PROVIDERS: EModelProvider[] = [
   // EModelProvider.kOpenAI,
   // EModelProvider.kAzureOpenAI,
   EModelProvider.kGoogleGemini
];

/**
 * Creates ChatWithAttachment drivers for all configured providers.
 * Returns null for providers that fail to initialize (e.g., missing API key).
 */
export function createChatWithAttachmentDrivers(model: EModel = EModel.kLarge): (IChatWithAttachmentDriver | null)[] {
   const factory = new ChatWithAttachmentDriverFactory();
   return CHAT_WITH_ATTACHMENT_TEST_PROVIDERS.map(provider => {
      try {
         return factory.create(model, provider);
      } catch (error) {
         // If provider initialization fails (e.g., missing API key), return null
         // Tests will skip providers that fail to initialize
         return null;
      }
   });
}

export { TEST_TIMEOUT_MS };

