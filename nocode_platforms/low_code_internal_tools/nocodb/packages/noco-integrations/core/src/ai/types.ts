import {
  generateText as sdkGenerateText,
  Output,
  wrapLanguageModel,
  defaultSettingsMiddleware,
} from 'ai';
import { IntegrationWrapper } from '../integration';
import type { ModelMessage, ToolSet } from 'ai';
import type { LanguageModelV3 as LanguageModel } from '@ai-sdk/provider';

export type ModelCapability = 'text' | 'vision' | 'tools' | 'image-generation';

export interface ModelInfo {
  value: string;
  label: string;
  capabilities: ModelCapability[];
}

/**
 * Normalized, provider-agnostic reasoning intensity.
 *
 * Every supported provider exposes reasoning differently (OpenAI `reasoningEffort`,
 * Anthropic `effort`/`thinking`, Google `thinkingConfig`, Bedrock `reasoningConfig`,
 * …). Callers speak this single vocabulary; each integration translates it onto its
 * own provider knob via {@link AiIntegration.reasoningProviderOptions}.
 *
 *   off → disable reasoning where the provider allows it
 *   max → the provider's strongest reasoning setting
 */
export type AiReasoningEffort =
  | 'off'
  | 'minimal'
  | 'low'
  | 'medium'
  | 'high'
  | 'max';

type AiJsonValue =
  | null
  | string
  | number
  | boolean
  | { [key: string]: AiJsonValue }
  | AiJsonValue[];

/**
 * Provider-namespaced options bag, e.g. `{ openai: { reasoningEffort: 'minimal' } }`.
 * Structurally mirrors the AI SDK's `SharedV2ProviderOptions`.
 */
export type AiReasoningProviderOptions = Record<
  string,
  Record<string, AiJsonValue>
>;

/**
 * Map the normalized effort onto the OpenAI Responses `reasoningEffort` value.
 * Shared by every OpenAI-family provider (OpenAI, OpenAI-compatible, NocoDB AI).
 */
export function openAiReasoningEffort(
  effort: AiReasoningEffort,
): 'none' | 'low' | 'medium' | 'high' | 'xhigh' {
  switch (effort) {
    case 'off':
      return 'none';
    case 'minimal':
      // 'minimal' is NOT supported across all GPT-5.x models — e.g. gpt-5.4 only
      // accepts none/low/medium/high/xhigh and 400s on 'minimal'. Clamp to the
      // universally-supported floor; still far cheaper than the default 'medium'.
      return 'low';
    case 'max':
      return 'xhigh';
    default:
      // 'low' | 'medium' | 'high' pass through 1:1
      return effort;
  }
}

export abstract class AiIntegration<
  T extends { models: string[] } = any,
> extends IntegrationWrapper<T> {
  /**
   * List of models supported by this AI provider with their capabilities.
   * Override this in each integration to define supported models.
   */
  protected abstract supportedModels: ModelInfo[];

  /** Default sampling temperature for generateText / generateObject. */
  protected temperature = 0.5;

  /**
   * Build the provider-bound model factory — validates credentials and constructs
   * the underlying `@ai-sdk/*` provider. This is the only mandatory provider hook.
   */
  protected abstract createProvider(): (modelId: string) => LanguageModel;

  /**
   * Resolve a user-facing model selector to a concrete provider model id.
   * Default: the selector itself, falling back to the first configured model.
   * Override for tier maps (e.g. high/medium/low → concrete model ids).
   */
  protected resolveModelId(input?: string): string {
    const modelId = input || this.config.models?.[0];
    if (!modelId) {
      throw new Error('Integration not configured properly');
    }
    return modelId;
  }

  /**
   * Translate the normalized reasoning effort into this provider's `providerOptions`
   * shape. Return `undefined` when the provider has no reasoning control (default).
   * `modelId` is supplied because some providers (e.g. Bedrock) key the shape off the
   * model family.
   */
  protected reasoningProviderOptions(
    _effort: AiReasoningEffort,
    _modelId: string,
  ): AiReasoningProviderOptions | undefined {
    return undefined;
  }

  /**
   * Provider-specific web-search tool, applied by generateText / generateObject when
   * the caller requests `websearch`. Return `undefined` if the provider has none.
   */
  protected webSearchTool(): ToolSet | undefined {
    return undefined;
  }

  /**
   * Get the underlying language model, with reasoning effort baked in when requested.
   *
   * Reasoning is applied as a model-level default via `defaultSettingsMiddleware`, so
   * the returned model carries it on every call — callers never touch provider-specific
   * `providerOptions`.
   */
  public getModel(args?: AiGetModelArgs): LanguageModel {
    const provider = this.createProvider();
    const modelId = this.resolveModelId(args?.customModel);
    let model = provider(modelId);

    if (args?.reasoningEffort) {
      const providerOptions = this.reasoningProviderOptions(
        args.reasoningEffort,
        modelId,
      );
      if (providerOptions) {
        model = wrapLanguageModel({
          model,
          middleware: defaultSettingsMiddleware({
            settings: { providerOptions },
          }),
        });
      }
    }

    return model;
  }

  public async generateText(
    args: AiGenerateTextArgs,
  ): Promise<AiGenerateTextResponse> {
    const model = this.getModel({ customModel: args.customModel });
    const tools = args.websearch ? this.webSearchTool() : undefined;

    const response = await sdkGenerateText({
      model,
      system: args.system,
      temperature: this.temperature,
      ...('messages' in args
        ? { messages: args.messages }
        : { prompt: args.prompt }),
      ...(tools ? { tools } : {}),
    });

    return {
      usage: {
        input_tokens: response.usage.inputTokens,
        output_tokens: response.usage.outputTokens,
        total_tokens: response.usage.totalTokens,
        model: model.modelId,
      },
      data: response.text,
    };
  }

  public async generateObject<T = any>(
    args: AiGenerateObjectArgs,
  ): Promise<AiGenerateObjectResponse<T>> {
    const model = this.getModel({ customModel: args.customModel });
    const tools = args.websearch ? this.webSearchTool() : undefined;

    const response = await sdkGenerateText({
      model,
      output: Output.object({ schema: args.schema }),
      messages: args.messages,
      temperature: this.temperature,
      ...(tools ? { tools } : {}),
    });

    return {
      usage: {
        input_tokens: response.usage.inputTokens,
        output_tokens: response.usage.outputTokens,
        total_tokens: response.usage.totalTokens,
        model: model.modelId,
      },
      data: response.output as T,
    };
  }

  /**
   * Get available models based on user configuration
   * @param capability - Optional capability filter (e.g., 'text', 'vision', 'tools')
   * @returns List of models that match the criteria
   *
   * Note: Custom models (not in supportedModels) are always included,
   * assuming they support all capabilities
   */
  public async availableModels(
    capability?: ModelCapability,
  ): Promise<ModelInfo[]> {
    const results: ModelInfo[] = [];

    for (const modelId of this.config.models || []) {
      // Find model in supportedModels list
      const supportedModel = this.supportedModels.find(
        (m) => m.value === modelId,
      );

      if (supportedModel) {
        // Known model - check capabilities if specified
        if (!capability || supportedModel.capabilities.includes(capability)) {
          results.push(supportedModel);
        }
      } else {
        // Custom/unknown model - assume it supports everything
        results.push({
          value: modelId,
          label: modelId, // Use the ID as label
          capabilities: ['text', 'vision', 'tools', 'image-generation'],
        });
      }
    }

    return results;
  }

  public async fetchOptions(payload: { key: string }): Promise<unknown> {
    const { key } = payload;
    if (key === 'models') {
      return this.supportedModels;
    }
    return [];
  }

  // Optional: Only implement for providers that support image generation
  generateImage?(args: AiGenerateImageArgs): Promise<AiGenerateImageResponse>;
}

export interface AiUsage {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  model: string;
}

export interface AiGenerateObjectArgs {
  messages: ModelMessage[];
  schema: any;
  customModel?: string;
  websearch?: boolean;
}

interface AiGenerateObjectResponse<T> {
  usage: AiUsage;
  data: T;
}

export type AiGenerateTextArgs = {
  system: string;
  customModel?: string;
  websearch?: boolean;
} & ({ prompt: string } | { messages: ModelMessage[] });

interface AiGenerateTextResponse {
  usage: AiUsage;
  data: string;
}

export interface AiGetModelArgs {
  customModel?: string;
  /**
   * Normalized reasoning intensity; translated per-provider and baked into the
   * returned model as a default. Omit for the provider's own default behaviour.
   */
  reasoningEffort?: AiReasoningEffort;
}

export interface AiGenerateImageArgs {
  prompt: string;
  customModel?: string;
  size?: string; // e.g. '1024x1024'
  n?: number;
}

export interface AiGenerateImageResponse {
  image: {
    base64: string;
    uint8Array: Uint8Array;
  };
  images: Array<{
    base64: string;
    uint8Array: Uint8Array;
  }>;
}
