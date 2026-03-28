/**
 * @module chatwithattachmentfactory.test
 * 
 * Unit tests for the ChatWithAttachmentFactory module.
 */
// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module contains Mocha unit tests for ChatWithAttachmentDriverFactory and its drivers. It verifies that a factory can create chat-with-attachment drivers for multiple model providers and model sizes, and that created drivers expose the required methods. Tests are generated per provider from a shared provider list and skip gracefully when a driver cannot initialize, such as when an API key is missing.
// 
// The module does not export any symbols. It is intended to be executed by the test runner.
// 
// Key behaviors covered:
// - Factory creates drivers for kMini and kLarge models.
// - Drivers implement the expected API: getModelResponse, uploadAttachment, and deleteAttachment.
// - Created drivers conform to the IChatWithAttachmentDriver interface at the type level.
// - Factory returns distinct driver instances for different providers.
// 
// Important imports:
// - expect from expect for assertions, and describe/it from mocha for test structure.
// - ChatWithAttachmentDriverFactory, EModelProvider, EModel, and IChatWithAttachmentDriver from the main entry module under test.
// - CHAT_WITH_ATTACHMENT_TEST_PROVIDERS and createChatWithAttachmentDrivers from the test config to enumerate providers and precreate drivers.
// ===End StrongAI Generated Comment===

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { ChatWithAttachmentDriverFactory, EModelProvider, EModel, IChatWithAttachmentDriver } from '../src/entry';
import { CHAT_WITH_ATTACHMENT_TEST_PROVIDERS, createChatWithAttachmentDrivers } from './ChatWithAttachmentTestConfig';

// Create factory for tests that need to create drivers directly
const factory = new ChatWithAttachmentDriverFactory();

// Enumerate all providers to test
const providers = CHAT_WITH_ATTACHMENT_TEST_PROVIDERS;

// Create drivers for all providers
const drivers = createChatWithAttachmentDrivers(EModel.kLarge);

// Run tests for each provider
providers.forEach((provider, index) => {
   const driver = drivers[index];

   // Skip tests if driver failed to initialize (e.g., missing API key)
   if (!driver) {
      console.warn(`Skipping tests for ${provider} - driver initialization failed (likely missing API key)`);
      return;
   }

   describe(`ChatWithAttachmentDriverFactory (${provider})`, () => {
      it('creates driver with required methods', () => {
         expect(driver).toBeDefined();
         expect(driver).toBeInstanceOf(Object);
         expect(driver.getModelResponse).toBeDefined();
         expect(driver.uploadAttachment).toBeDefined();
         expect(driver.deleteAttachment).toBeDefined();
      });

      it('creates driver for kMini model', () => {
         const miniDriver = factory.create(EModel.kMini, provider);
         expect(miniDriver).toBeDefined();
         expect(miniDriver.getModelResponse).toBeDefined();
      });

      it('creates driver for kLarge model', () => {
         const largeDriver = factory.create(EModel.kLarge, provider);
         expect(largeDriver).toBeDefined();
         expect(largeDriver.getModelResponse).toBeDefined();
      });

      it('implements IChatWithAttachmentDriverFactory interface', () => {
         // Type check: driver should be assignable to IChatWithAttachmentDriver
         const typedDriver: IChatWithAttachmentDriver = driver;
         expect(typedDriver).toBeDefined();
      });
   });
});

describe('ChatWithAttachmentDriverFactory - Cross-provider tests', () => {
   it('creates different driver instances for different providers', () => {
      const openAIDriver = factory.create(EModel.kLarge, EModelProvider.kOpenAI);
      const azureDriver = factory.create(EModel.kLarge, EModelProvider.kAzureOpenAI);
      
      expect(openAIDriver).not.toBe(azureDriver);
   });
});

