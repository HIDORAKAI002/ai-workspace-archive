/**
 * ReadableStream type for voice responses
 */
export type ReadableStreamType = ReadableStream | NodeJS.ReadableStream | any;

/**
 * Voice provider options
 */
export type VoiceOptions = {
  /**
   * API key for the voice provider
   */
  apiKey?: string;

  /**
   * Model to use for speech recognition
   */
  speechModel?: string;

  /**
   * Model to use for text-to-speech
   */
  ttsModel?: string;

  /**
   * Voice ID to use for text-to-speech
   */
  voice?: string;

  /**
   * Additional provider-specific options
   */
  options?: Record<string, unknown>;
};

/**
 * Voice event types
 */
export type VoiceEventType = "speaking" | "listening" | "error" | "connected" | "disconnected";

/**
 * Voice event data types
 */
export type VoiceEventData = {
  speaking: {
    text: string;
    audio?: NodeJS.ReadableStream;
  };
  listening: {
    audio: NodeJS.ReadableStream;
  };
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
  connected: undefined;
  disconnected: undefined;
};

/**
 * Voice metadata
 */
export type VoiceMetadata = {
  id: string;
  name: string;
  language: string;
  gender?: "male" | "female" | "neutral";
  metadata?: Record<string, unknown>;
};

/**
 * Base interface for voice providers
 */
export type Voice = {
  /**
   * Convert text to speech
   */
  speak(
    text: string | NodeJS.ReadableStream,
    options?: {
      voice?: string;
      speed?: number;
      pitch?: number;
    },
  ): Promise<NodeJS.ReadableStream>;

  /**
   * Convert speech to text
   */
  listen(
    audio: NodeJS.ReadableStream,
    options?: {
      language?: string;
      model?: string;
      stream?: boolean;
    },
  ): Promise<string | ReadableStreamType>;

  /**
   * Connect to real-time voice service
   */
  connect(options?: Record<string, unknown>): Promise<void>;

  /**
   * Disconnect from real-time voice service
   */
  disconnect(): void;

  /**
   * Send audio data to real-time service
   */
  send(audioData: NodeJS.ReadableStream | Int16Array): Promise<void>;

  /**
   * Register event listener
   */
  on<E extends VoiceEventType>(event: E, callback: (data: VoiceEventData[E]) => void): void;

  /**
   * Remove event listener
   */
  off<E extends VoiceEventType>(event: E, callback: (data: VoiceEventData[E]) => void): void;

  /**
   * Get available voices
   */
  getVoices(): Promise<VoiceMetadata[]>;
};
