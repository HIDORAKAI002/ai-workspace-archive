import type { VoiceEventData } from "@voltagent/core";

export type BaseVoiceProviderOptions = {
  apiKey?: string;
  options?: Record<string, unknown>;
};

export type BaseVoiceProviderEvents = VoiceEventData;
