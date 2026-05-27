import { ModelProvider } from 'model-bank';
import type OpenAI from 'openai';

import { createOpenAICompatibleRuntime } from '../../core/openaiCompatibleFactory';
import { createRouterRuntime } from '../../core/RouterRuntime';
import type { CreateRouterRuntimeOptions } from '../../core/RouterRuntime/createRuntime';
import type { ChatStreamPayload } from '../../types';
import { processMultiProviderModelList } from '../../utils/modelParse';

const GO_BASE_URL = 'https://opencode.ai/zen/go/v1';

// MiniMax and Qwen models in Go use @ai-sdk/anthropic (Anthropic Messages API format)
// Endpoint: /go/v1/messages
const anthropicModels = ['minimax-m2.5', 'minimax-m2.7', 'qwen3.5-plus', 'qwen3.6-plus', 'qwen3.7-max'];

// Moonshot Kimi thinking toggle models (kimi-k2.N) expose reasoning on the
// OpenAI-compatible route. Matches the official Moonshot provider's prefix logic.
const isKimiThinkingToggleModel = (model: string) => model.startsWith('kimi-k2.');

// Models with interleaved reasoning_content (from models.dev opencode-go)
// that use openai-compatible SDK. All of these need:
//   1. reason → reasoning_content conversion
//   2. reasoning_content forced on all assistant messages (fill '' if missing)
// Ref: https://models.dev/api.json → opencode-go
const reasoningInterleavedModels = [
  'glm-5',
  'glm-5.1',
  'mimo-v2.5',
  'mimo-v2.5-pro',
  'mimo-v2-omni',
  'mimo-v2-pro',
  'qwen3.7-max',
  'deepseek-v4-pro',
  'deepseek-v4-flash',
];

const hasValidReasoning = (reasoning: any) =>
  typeof reasoning?.content === 'string';

const isEmptyContent = (content: any) =>
  content === '' || content === null || content === undefined;

/**
 * Recursively remove `null` values from `enum` arrays in a JSON Schema.
 * The opencode-go backend ("could not translate the enum None") rejects
 * nullable enums produced by Zod schema `.nullable()` / `.nullish()`.
 */
export const sanitizeJsonSchema = (schema: any): any => {
  if (!schema || typeof schema !== 'object') return schema;
  if (Array.isArray(schema)) return schema.map(sanitizeJsonSchema);

  const result: any = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'enum' && Array.isArray(value)) {
      const filtered = value.filter((v: any) => v !== null);
      if (filtered.length > 0) result[key] = filtered;
      continue;
    }
    // For `type: ['string', 'null']` → just `type: 'string'`
    if (key === 'type' && Array.isArray(value) && value.includes('null') && value.length >= 2) {
      const nonNullTypes = value.filter((v: any) => v !== 'null' && v !== null);
      if (nonNullTypes.length === 1) result.type = nonNullTypes[0];
      else if (nonNullTypes.length > 1) result.type = nonNullTypes;
      continue;
    }
    // Recurse into schema traversals:
    //   properties, additionalProperties, items, prefixItems
    //   allOf, anyOf, oneOf, not
    //   if/then/else
    //   $defs, definitions
    //   contains, unevaluatedItems, unevaluatedProperties
    if (key === 'properties' || key === '$defs' || key === 'definitions') {
      const nested: any = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        nested[k] = sanitizeJsonSchema(v);
      }
      result[key] = nested;
    } else if (
      ['allOf', 'anyOf', 'oneOf', 'prefixItems'].includes(key) &&
      Array.isArray(value)
    ) {
      result[key] = value.map(sanitizeJsonSchema);
    } else if (
      ['items', 'additionalProperties', 'not', 'contains', 'if', 'then', 'else',
       'unevaluatedItems', 'unevaluatedProperties']
        .includes(key)
    ) {
      result[key] = sanitizeJsonSchema(value);
    } else {
      result[key] = sanitizeJsonSchema(value);
    }
  }
  return result;
};

/**
 * Build OpenAI-compatible payload with reasoning_content handling.
 *
 * Applies to all models with interleaved reasoning_content (models.dev opencode-go):
 *   GLM-5/5.1, MiMo-V2.5/Pro, MiMo-V2-Omni/Pro, DeepSeek V4 Flash/Pro, Kimi K2.5/K2.6
 *
 * All of these get reason → reasoning_content conversion AND forced
 * reasoning_content on assistant messages when thinking is not explicitly disabled.
 */
const buildOpenAIPayload = (
  payload: ChatStreamPayload,
): OpenAI.ChatCompletionCreateParamsStreaming => {
  const model = payload.model;
  const isKimi = isKimiThinkingToggleModel(model);
  const isInterleavedModel = reasoningInterleavedModels.some((m) => model?.includes(m));
  if (!isKimi && !isInterleavedModel) return payload as any;

  const thinkingExplicitlyDisabled = (payload as any).thinking?.type === 'disabled';
  const shouldForceAssistantReasoningContent =
    (isInterleavedModel || isKimi) && !thinkingExplicitlyDisabled;

  const messages = payload.messages.map((message: any) => {
    const { reasoning, ...rest } = message;

    // Normalize empty content to space for Kimi (matching Moonshot provider)
    const normalized = isKimi && isEmptyContent(message.content) ? { ...rest, content: ' ' } : rest;

    const reasoningContent =
      typeof normalized.reasoning_content === 'string'
        ? normalized.reasoning_content
        : hasValidReasoning(reasoning)
          ? reasoning.content
          : undefined;

    if (message.role === 'assistant' && shouldForceAssistantReasoningContent) {
      return {
        ...normalized,
        reasoning_content: reasoningContent ?? ' ',
      };
    }

    if (reasoningContent !== undefined) {
      return {
        ...normalized,
        reasoning_content: reasoningContent,
      };
    }

    return normalized;
  });

  const { reasoning_effort, thinking, ...restPayload } = payload;

  // Sanitize response_format schema for Kimi models only (opencode-go backend
  // rejects nullable Zod enums from Kimi K2.5/K2.6 with "could not translate the enum None").
  const response_format =
    isKimi &&
    restPayload.response_format &&
    'json_schema' in restPayload.response_format &&
    restPayload.response_format.json_schema?.schema
      ? {
          ...restPayload.response_format,
          json_schema: {
            ...restPayload.response_format.json_schema,
            schema: sanitizeJsonSchema(restPayload.response_format.json_schema.schema),
          },
        }
      : restPayload.response_format;

  // Sanitize tool parameters schemas for Kimi models only
  const tools =
    isKimi && restPayload.tools
      ? restPayload.tools.map((tool: any) => ({
          ...tool,
          function: {
            ...tool.function,
            parameters: tool.function?.parameters
              ? sanitizeJsonSchema(tool.function.parameters)
              : tool.function?.parameters,
          },
        }))
      : restPayload.tools;

  return {
    ...restPayload,
    messages,
    response_format,
    tools,
    ...(!thinkingExplicitlyDisabled && reasoning_effort ? { reasoning_effort } : {}),
    ...(thinking?.type === 'enabled' || thinking?.type === 'disabled'
      ? { thinking: { type: thinking.type } }
      : {}),
    stream: payload.stream ?? true,
  } as OpenAI.ChatCompletionCreateParamsStreaming;
};

// Dedicated OpenAI-compatible runtime with buildOpenAIPayload baked into the
// factory closure. RouterRuntime creates instances of this class for all
// non-MiniMax models, ensuring reasoning_content is properly set on messages.
const LobeOpenCodeCodingPlanOpenAI = createOpenAICompatibleRuntime({
  provider: ModelProvider.OpenCodeCodingPlan,
  baseURL: GO_BASE_URL,
  chatCompletion: {
    handlePayload: buildOpenAIPayload,
  },
  debug: {
    chatCompletion: () => process.env.DEBUG_OPENCODE_GO_CHAT_COMPLETION === '1',
  },
});

// Anthropic SDK auto-appends /v1/messages to baseURL, so we need to strip trailing /v1
const stripV1 = (url?: string) => url?.replace(/\/v1$/, '');

export const params = {
  debug: {
    chatCompletion: () => process.env.DEBUG_OPENCODE_GO_CHAT_COMPLETION === '1',
  },
  id: ModelProvider.OpenCodeCodingPlan,
  models: async ({ client }) => {
    try {
      const modelsPage = await (client as any).models.list();
      const modelList = modelsPage.data || [];
      return processMultiProviderModelList(modelList, 'opencodecodingplan');
    } catch {
      const { opencodecodingplan } = await import('model-bank');
      return processMultiProviderModelList(
        opencodecodingplan.map((m: { id: string }) => ({ id: m.id })),
        'opencodecodingplan',
      );
    }
  },
  routers: (options) => {
    const baseURL = options.baseURL || GO_BASE_URL;
    return [
      // Anthropic router for MiniMax & Qwen models (use Anthropic Messages API format)
      {
        apiType: 'anthropic',
        models: anthropicModels,
        options: {
          ...options,
          baseURL: stripV1(baseURL),
        },
      },
      // OpenAI-compatible fallback for all other models (GLM, Kimi, MiMo, Qwen, DeepSeek)
      {
        apiType: 'openai',
        runtime: LobeOpenCodeCodingPlanOpenAI as any,
        options: {
          ...options,
          baseURL,
        },
      },
    ];
  },
} satisfies CreateRouterRuntimeOptions;

export const LobeOpenCodeCodingPlanAI = createRouterRuntime(params);
