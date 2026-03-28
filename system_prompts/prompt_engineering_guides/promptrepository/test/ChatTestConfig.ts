/**
 * @module ChatTestConfig
 * 
 * Shared configuration for chat driver tests across all test files.
 * Enforces consistent provider enumeration and driver initialization.
 */
// Copyright (c) 2025, 2026 Jon Verrier

import { ChatDriverFactory, EModelProvider, EModel, IChatDriver } from '../src/entry';

const TEST_TIMEOUT_MS = 60000; // 60 second timeout for all tests

/**
 * Providers to test - currently only Gemini for initial testing.
 * Once Gemini is validated, uncomment other providers for regression testing.
 */

// ===Start StrongAI Generated Comment (20260219)===
// This module centralizes configuration for chat driver tests. It defines a single source of truth for which model providers are exercised and how drivers are created. Tests import this to ensure consistent provider coverage, driver initialization, and shared timeouts.
// 
// It exports TEST_TIMEOUT_MS, a 60-second timeout to apply uniformly across test suites. It exports CHAT_TEST_PROVIDERS, an ordered list of providers to test: OpenAI, Azure OpenAI, and Google Gemini. This list can be adjusted to enable or limit regression coverage without touching individual tests.
// 
// The createChatDrivers function builds drivers for the configured providers using a common model selection. It defaults to a large model and returns an array aligned with the provider list. For any provider that cannot initialize, it returns null instead of throwing, allowing tests to detect and skip missing or misconfigured providers (for example, absent API keys).
// 
// Key imports are ChatDriverFactory for instantiating drivers, EModelProvider for provider identifiers, EModel for model selection, and IChatDriver as the interface tests interact with.
// ===End StrongAI Generated Comment===
export const CHAT_TEST_PROVIDERS: EModelProvider[] = [
   EModelProvider.kOpenAI, 
   EModelProvider.kAzureOpenAI,
   EModelProvider.kGoogleGemini
];

/**
 * Creates chat drivers for all configured providers.
 * Returns null for providers that fail to initialize (e.g., missing API key).
 */
export function createChatDrivers(model: EModel = EModel.kLarge): (IChatDriver | null)[] {
   const chatDriverFactory = new ChatDriverFactory();
   return CHAT_TEST_PROVIDERS.map(provider => {
      try {
         return chatDriverFactory.create(model, provider);
      } catch (error) {
         // If provider initialization fails (e.g., missing API key), return null
         // Tests will skip providers that fail to initialize
         return null;
      }
   });
}

/**
 * Global test configuration flag to control verbosity parameter usage.
 * Set to false when testing with models that don't support EVerbosity.kLow/kHigh (e.g., GPT-4).
 * Set to true when testing with models that support all verbosity levels.
 */
export const TEST_TARGET_SUPPORTS_VERBOSITY = false;

export { TEST_TIMEOUT_MS };

