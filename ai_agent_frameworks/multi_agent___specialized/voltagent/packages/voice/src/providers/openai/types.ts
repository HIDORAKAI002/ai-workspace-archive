import type { SpeechCreateParams } from "openai/resources/audio/speech";
import type { TranscriptionCreateParams } from "openai/resources/audio/transcriptions";
import type { BaseVoiceProviderOptions } from "../base/types";

export const OPENAI_VOICES = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
  "ash",
  "coral",
  "sage",
] as const;

export type OpenAIVoice = (typeof OPENAI_VOICES)[number];

/**
 * OpenAI voice options
 */
export type OpenAIVoiceOptions = BaseVoiceProviderOptions & {
  /**
   * OpenAI API key
   */
  apiKey: string;

  /**
   * Model to use for speech recognition
   * @default "whisper-1"
   */
  speechModel?: string;

  /**
   * Model to use for text-to-speech
   * @default "tts-1"
   */
  ttsModel?: string;

  /**
   * Voice to use for text-to-speech
   * @default "alloy"
   */
  voice?: OpenAIVoice;

  /**
   * Additional OpenAI API options
   */
  options?: {
    /**
     * Organization ID
     */
    organization?: string;

    /**
     * Request timeout in milliseconds
     */
    timeout?: number;

    /**
     * Maximum retries for failed requests
     */
    maxRetries?: number;
  };
};

/**
 * Options for text-to-speech
 */
export type OpenAISpeakOptions = Omit<SpeechCreateParams, "model" | "voice" | "input">;

/**
 * Options for speech-to-text
 */
export type OpenAIListenOptions = Omit<TranscriptionCreateParams, "model" | "file" | "stream"> & {
  /**
   * Whether to stream the transcription
   * @default false
   */
  stream?: boolean;
};

/**
 * Supported audio formats
 */
export type OpenAIAudioFormat = "mp3" | "mp4" | "mpeg" | "mpga" | "m4a" | "wav" | "webm";
