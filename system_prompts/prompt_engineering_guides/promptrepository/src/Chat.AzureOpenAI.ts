/**
 * @module Chat.AzureOpenAI
 * 
 * Concrete implementation of GenericOpenAIChatDriver for Azure OpenAI model.
 * Provides specific configuration for Azure OpenAI model.
 */
// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module provides an Azure-specific chat driver that plugs into a generic OpenAI chat abstraction. It configures the Azure OpenAI client and maps a generic model choice to a concrete Azure deployment.
// 
// Main export:
// - AzureOpenAIChatDriver: Extends GenericOpenAIChatDriver to use Azure OpenAI. The constructor accepts an EModel and selects an Azure deployment: gpt-4.1 for large and gpt-4.1-mini for mini. It validates required configuration via environment variables AZURE_OPENAI_API_KEY and AZURE_OPENAI_ENDPOINT. On success, it constructs an AzureOpenAI client with the selected deployment and a fixed API version 2025-03-01-preview. getModelName returns the deployment string. shouldUseToolMessages returns true to enable tool/function message handling. getProviderName returns Azure OpenAI.
// 
// Key dependencies:
// - AzureOpenAI from the openai SDK, used to create the provider-bound client with endpoint, key, deployment, and API version.
// - GenericOpenAIChatDriver, the base class that provides the generic chat flow and interfaces.
// - EModel to drive deployment selection.
// - InvalidStateError to signal missing environment configuration.
// - EChatRole, IChatMessage, and IFunction are imported from ./entry but not used directly here.
// ===End StrongAI Generated Comment===

import { AzureOpenAI } from 'openai';
import { EChatRole, InvalidStateError } from './entry';
import { EModel, IChatMessage, IFunction } from './entry';
import { GenericOpenAIChatDriver } from './Chat.GenericOpenAI';

const AZURE_DEPLOYMENTS = {
   LARGE: "gpt-4.1",
   MINI: "gpt-4.1-mini"
} as const;

/**
 * Concrete implementation of GenericOpenAIChatDriver for Azure OpenAI model.
 * Provides specific configuration for Azure OpenAI model.
 * 
 * @extends {GenericOpenAIChatDriver}
 * 
 * @property {string} model - The Azure OpenAI model identifier to use
 * @property {OpenAI} openai - Instance of Azure OpenAI API client
 */
export class AzureOpenAIChatDriver extends GenericOpenAIChatDriver {
   private deployment: string;
   protected declare openai: AzureOpenAI;

   constructor(modelType: EModel) {
      super(modelType);
      this.deployment = modelType === EModel.kLarge ? AZURE_DEPLOYMENTS.LARGE : AZURE_DEPLOYMENTS.MINI;

      if (!process.env.AZURE_OPENAI_API_KEY) {
         throw new InvalidStateError('AZURE_OPENAI_API_KEY environment variable is not set');
      }
      if (!process.env.AZURE_OPENAI_ENDPOINT) {
         throw new InvalidStateError('AZURE_OPENAI_ENDPOINT environment variable is not set');
      }

      this.openai = new AzureOpenAI({
         apiKey: process.env.AZURE_OPENAI_API_KEY,
         endpoint: process.env.AZURE_OPENAI_ENDPOINT,
         deployment: this.deployment,
         apiVersion: "2025-03-01-preview"
      });
   }

   protected getModelName(): string {
      return this.deployment;
   }

   protected shouldUseToolMessages(): boolean {
      return true; // Azure OpenAI supports tool messages
   }

   protected getProviderName(): string {
      return "Azure OpenAI";
   }
} 