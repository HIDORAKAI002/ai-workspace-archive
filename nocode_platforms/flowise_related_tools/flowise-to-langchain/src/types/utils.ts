/**
 * Utility Types and Constants
 *
 * This file contains utility types, constants, and helper functions
 * used throughout the Flowise-to-LangChain converter system.
 */

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

export type NonNullableKeys<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type NullableKeys<T> = {
  [K in keyof T]: T[K] | null;
};

export type StringKeys<T> = {
  [K in keyof T]: string;
};

export type NumberKeys<T> = {
  [K in keyof T]: number;
};

export type BooleanKeys<T> = {
  [K in keyof T]: boolean;
};

export type ArrayKeys<T> = {
  [K in keyof T]: T[K][];
};

export type PromiseKeys<T> = {
  [K in keyof T]: Promise<T[K]>;
};

export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ValueOf<T> = T[keyof T];

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type ValuesOfType<T, U> = T[KeysOfType<T, U>];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends any ? (t: T) => T : never> extends (
    _: any
  ) => infer W
    ? [...UnionToTuple<Exclude<T, W>>, W]
    : [];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Flatten<T> = T extends (infer U)[] ? U : T;

export type Head<T extends readonly any[]> = T extends readonly [
  infer H,
  ...any[],
]
  ? H
  : never;

export type Tail<T extends readonly any[]> = T extends readonly [
  any,
  ...infer U,
]
  ? U
  : never;

export type Last<T extends readonly any[]> = T extends readonly [
  ...any[],
  infer L,
]
  ? L
  : never;

export type Init<T extends readonly any[]> = T extends readonly [
  ...infer U,
  any,
]
  ? U
  : never;

export type Reverse<T extends readonly any[]> = T extends readonly [
  ...infer U,
  infer L,
]
  ? [L, ...Reverse<U>]
  : [];

export type Length<T extends readonly any[]> = T['length'];

export type Push<T extends readonly any[], U> = [...T, U];

export type Unshift<T extends readonly any[], U> = [U, ...T];

export type Concat<T extends readonly any[], U extends readonly any[]> = [
  ...T,
  ...U,
];

export type Includes<T extends readonly any[], U> = U extends T[number]
  ? true
  : false;

export type IndexOf<T extends readonly any[], U> = T extends readonly [
  infer H,
  ...infer R,
]
  ? H extends U
    ? 0
    : IndexOf<R, U> extends -1
      ? -1
      : IndexOf<R, U> extends number
        ? IndexOf<R, U> extends infer N
          ? N extends number
            ? N extends -1
              ? -1
              : Increment<N>
            : never
          : never
        : never
  : -1;

type Increment<N extends number> = N extends 0
  ? 1
  : N extends 1
    ? 2
    : N extends 2
      ? 3
      : N extends 3
        ? 4
        : N extends 4
          ? 5
          : N extends 5
            ? 6
            : N extends 6
              ? 7
              : N extends 7
                ? 8
                : N extends 8
                  ? 9
                  : N extends 9
                    ? 10
                    : number;

export type Join<
  T extends readonly string[],
  D extends string = ',',
> = T extends readonly [infer H, ...infer R]
  ? H extends string
    ? R extends readonly string[]
      ? R['length'] extends 0
        ? H
        : `${H}${D}${Join<R, D>}`
      : never
    : never
  : '';

export type Split<
  T extends string,
  D extends string = '',
> = T extends `${infer H}${D}${infer R}`
  ? [H, ...Split<R, D>]
  : T extends ''
    ? []
    : [T];

export type Trim<T extends string> = T extends ` ${infer R}`
  ? Trim<R>
  : T extends `${infer R} `
    ? Trim<R>
    : T;

export type TrimStart<T extends string> = T extends ` ${infer R}`
  ? TrimStart<R>
  : T;

export type TrimEnd<T extends string> = T extends `${infer R} `
  ? TrimEnd<R>
  : T;

// Using TypeScript's built-in string manipulation types
export type Uppercase<T extends string> = T extends string
  ? `${T}` extends `${infer U}`
    ? U extends Uppercase<U>
      ? U
      : never
    : never
  : never;

export type Lowercase<T extends string> = T extends string
  ? `${T}` extends `${infer L}`
    ? L extends Lowercase<L>
      ? L
      : never
    : never
  : never;

export type Capitalize<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${First extends string ? First : ''}${Rest}`
    : T;

export type Uncapitalize<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${First extends string ? First : ''}${Rest}`
    : T;

export type Replace<
  T extends string,
  S extends string,
  R extends string,
> = T extends `${infer H}${S}${infer Tail}`
  ? `${H}${R}${Replace<Tail, S, R>}`
  : T;

export type StartsWith<
  T extends string,
  S extends string,
> = T extends `${S}${any}` ? true : false;

export type EndsWith<
  T extends string,
  S extends string,
> = T extends `${any}${S}` ? true : false;

export type Contains<
  T extends string,
  S extends string,
> = T extends `${any}${S}${any}` ? true : false;

export type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnknown<T> =
  IsAny<T> extends true ? false : unknown extends T ? true : false;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type IsArray<T> = T extends readonly any[] ? true : false;

export type IsObject<T> = T extends object
  ? IsArray<T> extends true
    ? false
    : true
  : false;

export type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

export type IsPromise<T> = T extends Promise<any> ? true : false;

export type IsTuple<T> = T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false;

export type IsEmptyObject<T> = T extends Record<string, never> ? true : false;

export type IsEmptyArray<T> = T extends readonly [] ? true : false;

export type IsEmptyString<T> = T extends '' ? true : false;

export type IsOptional<T, K extends keyof T> =
  {} extends Pick<T, K> ? true : false;

export type IsReadonly<T, K extends keyof T> = IsEqual<
  Pick<T, K>,
  Readonly<Pick<T, K>>
>;

export type If<C extends boolean, T, F> = C extends true ? T : F;

export type Not<C extends boolean> = C extends true ? false : true;

export type And<A extends boolean, B extends boolean> = A extends true
  ? B
  : false;

export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B;

export type Xor<A extends boolean, B extends boolean> = A extends true
  ? Not<B>
  : B;

// Branded Types
export type Brand<T, B> = T & { __brand: B };

export type Nominal<T, B> = T & { __nominal: B };

export type Opaque<T, B> = T & { readonly __opaque: B };

// ID Types
export type Id<T extends string = string> = Brand<string, `id:${T}`>;

export type NodeId = Id<'node'>;
export type EdgeId = Id<'edge'>;
export type FlowId = Id<'flow'>;
export type ProjectId = Id<'project'>;
export type UserId = Id<'user'>;
export type SessionId = Id<'session'>;
export type TaskId = Id<'task'>;
export type JobId = Id<'job'>;
export type TestId = Id<'test'>;
export type SuiteId = Id<'suite'>;
export type ConfigId = Id<'config'>;
export type TemplateId = Id<'template'>;
export type PresetId = Id<'preset'>;
export type ReportId = Id<'report'>;
export type ArtifactId = Id<'artifact'>;
export type NotificationId = Id<'notification'>;
export type WebhookId = Id<'webhook'>;
export type ApiKeyId = Id<'apikey'>;
export type TokenId = Id<'token'>;

// Timestamp Types
export type Timestamp = Brand<number, 'timestamp'>;
export type Duration = Brand<number, 'duration'>;
export type Milliseconds = Brand<number, 'milliseconds'>;
export type Seconds = Brand<number, 'seconds'>;
export type Minutes = Brand<number, 'minutes'>;
export type Hours = Brand<number, 'hours'>;
export type Days = Brand<number, 'days'>;

// URL Types
export type Url = Brand<string, 'url'>;
export type Email = Brand<string, 'email'>;
export type Phone = Brand<string, 'phone'>;
export type IPv4 = Brand<string, 'ipv4'>;
export type IPv6 = Brand<string, 'ipv6'>;
export type MAC = Brand<string, 'mac'>;
export type UUID = Brand<string, 'uuid'>;
export type Hash = Brand<string, 'hash'>;
export type Base64 = Brand<string, 'base64'>;
export type JWT = Brand<string, 'jwt'>;

// File Types
export type FilePath = Brand<string, 'filepath'>;
export type FileName = Brand<string, 'filename'>;
export type FileExtension = Brand<string, 'extension'>;
export type MimeType = Brand<string, 'mimetype'>;
export type FileSize = Brand<number, 'filesize'>;

// Semantic Types
export type PositiveInteger = Brand<number, 'positive-integer'>;
export type NonNegativeInteger = Brand<number, 'non-negative-integer'>;
export type PositiveNumber = Brand<number, 'positive-number'>;
export type NonNegativeNumber = Brand<number, 'non-negative-number'>;
export type Percentage = Brand<number, 'percentage'>;
export type Ratio = Brand<number, 'ratio'>;
export type Index = Brand<number, 'index'>;
export type Count = Brand<number, 'count'>;
export type Version = Brand<string, 'version'>;
export type SemVer = Brand<string, 'semver'>;
export type Port = Brand<number, 'port'>;
export type StatusCode = Brand<number, 'status-code'>;

// CSS Types
export type CSSColor = Brand<string, 'css-color'>;
export type CSSUnit = Brand<string, 'css-unit'>;
export type CSSSelector = Brand<string, 'css-selector'>;
export type CSSProperty = Brand<string, 'css-property'>;
export type CSSValue = Brand<string, 'css-value'>;

// JSON Types
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
export type JSONString = Brand<string, 'json-string'>;

// Function Types
export type Predicate<T> = (item: T) => boolean;
export type AsyncPredicate<T> = (item: T) => Promise<boolean>;
export type Transformer<T, U> = (input: T) => U;
export type AsyncTransformer<T, U> = (input: T) => Promise<U>;
export type Reducer<T, U> = (accumulator: U, current: T) => U;
export type AsyncReducer<T, U> = (accumulator: U, current: T) => Promise<U>;
export type Mapper<T, U> = (item: T, index: number) => U;
export type AsyncMapper<T, U> = (item: T, index: number) => Promise<U>;
export type Filter<T> = (item: T, index: number) => boolean;
export type AsyncFilter<T> = (item: T, index: number) => Promise<boolean>;
export type Comparator<T> = (a: T, b: T) => number;
export type Validator<T> = (value: T) => boolean | string | Error;
export type AsyncValidator<T> = (value: T) => Promise<boolean | string | Error>;
export type Serializer<T> = (value: T) => string;
export type Deserializer<T> = (value: string) => T;
export type Factory<T> = (...args: any[]) => T;
export type AsyncFactory<T> = (...args: any[]) => Promise<T>;
export type Builder<T> = () => T;
export type AsyncBuilder<T> = () => Promise<T>;
export type Cloner<T> = (value: T) => T;
export type Merger<T> = (target: T, source: T) => T;
export type Patch<T> = (value: T, patch: Partial<T>) => T;
export type Differ<T> = (a: T, b: T) => Partial<T>;
export type Observer<T> = (value: T) => void;
export type AsyncObserver<T> = (value: T) => Promise<void>;
export type Disposer = () => void;
export type AsyncDisposer = () => Promise<void>;

// Event Types
export type EventHandler<T = any> = (event: T) => void;
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;
export type EventListener<T = any> = EventHandler<T>;
export type AsyncEventListener<T = any> = AsyncEventHandler<T>;
export type EventEmitter<T = any> = {
  on(event: string, listener: EventListener<T>): void;
  off(event: string, listener?: EventListener<T>): void;
  emit(event: string, data: T): void;
  once(event: string, listener: EventListener<T>): void;
  removeAllListeners(event?: string): void;
  listenerCount(event: string): number;
  listeners(event: string): EventListener<T>[];
};

// Result Types
export type Result<T, E = Error> = Success<T> | Failure<E>;
export type Success<T> = { success: true; data: T };
export type Failure<E> = { success: false; error: E };
export type Option<T> = Some<T> | None;
export type Some<T> = { some: true; value: T };
export type None = { some: false };
export type Maybe<T> = T | null | undefined;
export type Either<L, R> = Left<L> | Right<R>;
export type Left<L> = { left: L };
export type Right<R> = { right: R };

// State Types
export type State<T> = {
  current: T;
  previous?: T;
  history: T[];
  canUndo: boolean;
  canRedo: boolean;
};

export type StateAction<T> = {
  type: string;
  payload?: any;
  meta?: any;
};

export type StateReducer<T> = (state: T, action: StateAction<T>) => T;

export type StateMiddleware<T> = (
  state: T,
  action: StateAction<T>,
  next: (action: StateAction<T>) => T
) => T;

export type StateSelector<T, R> = (state: T) => R;

export type StateSubscriber<T> = (state: T, prevState: T) => void;

// Promise Types
export type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type PromiseReject = (reason?: any) => void;
export type PromiseExecutor<T> = (
  resolve: PromiseResolve<T>,
  reject: PromiseReject
) => void;
export type Deferred<T> = {
  promise: Promise<T>;
  resolve: PromiseResolve<T>;
  reject: PromiseReject;
};

// Stream Types
export type StreamSubscriber<T> = (value: T) => void;
export type StreamUnsubscriber = () => void;
export type StreamOperator<T, U> = (stream: Stream<T>) => Stream<U>;
export type Stream<T> = {
  subscribe(subscriber: StreamSubscriber<T>): StreamUnsubscriber;
  map<U>(mapper: (value: T) => U): Stream<U>;
  filter(predicate: (value: T) => boolean): Stream<T>;
  reduce<U>(reducer: (acc: U, value: T) => U, initial: U): Stream<U>;
  take(count: number): Stream<T>;
  skip(count: number): Stream<T>;
  debounce(ms: number): Stream<T>;
  throttle(ms: number): Stream<T>;
  distinct(): Stream<T>;
  merge(other: Stream<T>): Stream<T>;
  zip<U>(other: Stream<U>): Stream<[T, U]>;
  flatMap<U>(mapper: (value: T) => Stream<U>): Stream<U>;
  catchError(handler: (error: Error) => T): Stream<T>;
  finalize(callback: () => void): Stream<T>;
  toArray(): Promise<T[]>;
  toPromise(): Promise<T>;
};

// Cache Types
export type CacheKey = string | number | symbol;
export type CacheValue<T> = {
  value: T;
  timestamp: number;
  ttl?: number;
  hits: number;
  size: number;
};

export type CacheEntry<T> = {
  key: CacheKey;
  value: CacheValue<T>;
};

export type CacheStats = {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  memoryUsage: number;
  evictions: number;
};

export type CacheOptions = {
  maxSize?: number;
  ttl?: number;
  maxAge?: number;
  staleWhileRevalidate?: boolean;
  serialize?: Serializer<any>;
  deserialize?: Deserializer<any>;
};

// Logger Types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogMessage = string | object | Error;
export type LogMetadata = Record<string, any>;
export type LogEntry = {
  level: LogLevel;
  message: LogMessage;
  metadata: LogMetadata;
  timestamp: Timestamp;
  source?: string;
  trace?: string;
};

export type LogFormatter = (entry: LogEntry) => string;
export type LogTransport = (entry: LogEntry) => void;
export type LogFilter = (entry: LogEntry) => boolean;

// Configuration Types
export type ConfigSource =
  | 'default'
  | 'file'
  | 'environment'
  | 'argument'
  | 'override';
export type ConfigValue = string | number | boolean | object | null | undefined;
export type ConfigSchema = Record<string, ConfigSchemaProperty>;
export type ConfigSchemaProperty = {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  default?: ConfigValue;
  required?: boolean;
  description?: string;
  enum?: ConfigValue[];
  format?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  items?: ConfigSchemaProperty;
  properties?: ConfigSchema;
  additionalProperties?: boolean;
};

export type ConfigValidationError = {
  path: string;
  message: string;
  value: ConfigValue;
  schema: ConfigSchemaProperty;
};

export type ConfigValidationResult = {
  valid: boolean;
  errors: ConfigValidationError[];
  warnings: string[];
};

// Constants
export const NODE_CATEGORIES = [
  'llm',
  'chain',
  'agent',
  'tool',
  'memory',
  'vectorstore',
  'embedding',
  'prompt',
  'retriever',
  'output_parser',
  'text_splitter',
  'loader',
  'utility',
  'control_flow',
] as const;

export const SUPPORTED_LANGUAGES = [
  'typescript',
  'javascript',
  'python',
] as const;

export const SUPPORTED_TARGETS = ['node', 'browser', 'edge'] as const;

export const SUPPORTED_FORMATS = ['esm', 'cjs', 'umd'] as const;

export const SUPPORTED_PACKAGE_MANAGERS = ['npm', 'yarn', 'pnpm'] as const;

export const VALIDATION_LEVELS = ['strict', 'normal', 'loose'] as const;

export const TEST_TYPES = [
  'unit',
  'integration',
  'e2e',
  'performance',
  'security',
  'accessibility',
] as const;

export const TEST_STATUSES = [
  'passed',
  'failed',
  'skipped',
  'pending',
  'todo',
] as const;

export const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export const HTTP_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
] as const;

export const HTTP_STATUS_CODES = {
  // 1xx Informational
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLY_HINTS: 103,

  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,

  // 3xx Redirection
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,

  // 4xx Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,

  // 5xx Server Error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

export const MIME_TYPES = {
  // Text
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
  TEXT_CSS: 'text/css',
  TEXT_JAVASCRIPT: 'text/javascript',
  TEXT_XML: 'text/xml',
  TEXT_CSV: 'text/csv',

  // Application
  APPLICATION_JSON: 'application/json',
  APPLICATION_XML: 'application/xml',
  APPLICATION_JAVASCRIPT: 'application/javascript',
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  APPLICATION_PDF: 'application/pdf',
  APPLICATION_ZIP: 'application/zip',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_FORM_DATA: 'multipart/form-data',

  // Image
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_SVG: 'image/svg+xml',
  IMAGE_WEBP: 'image/webp',
  IMAGE_ICO: 'image/x-icon',

  // Audio
  AUDIO_MP3: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',
  AUDIO_OGG: 'audio/ogg',

  // Video
  VIDEO_MP4: 'video/mp4',
  VIDEO_WEBM: 'video/webm',
  VIDEO_OGG: 'video/ogg',
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/[^\s$.?#].[^\s]*$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  SEMVER:
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  IPV6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
  MAC: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  BASE64: /^[A-Za-z0-9+/]*={0,2}$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  USERNAME: /^[a-zA-Z0-9_]{3,16}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  CAMEL_CASE: /^[a-z][a-zA-Z0-9]*$/,
  PASCAL_CASE: /^[A-Z][a-zA-Z0-9]*$/,
  SNAKE_CASE: /^[a-z][a-z0-9_]*$/,
  KEBAB_CASE: /^[a-z][a-z0-9-]*$/,
  CONSTANT_CASE: /^[A-Z][A-Z0-9_]*$/,
} as const;

export const DEFAULT_TIMEOUTS = {
  SHORT: 1000,
  MEDIUM: 5000,
  LONG: 10000,
  VERY_LONG: 30000,
  NETWORK: 30000,
  DATABASE: 10000,
  FILE_SYSTEM: 5000,
  CONVERSION: 60000,
  TEST: 30000,
  VALIDATION: 5000,
} as const;

export const DEFAULT_RETRY_OPTIONS = {
  RETRIES: 3,
  DELAY: 1000,
  BACKOFF: 'exponential',
  FACTOR: 2,
  MAX_DELAY: 10000,
} as const;

export const DEFAULT_CACHE_OPTIONS = {
  MAX_SIZE: 1000,
  TTL: 300000, // 5 minutes
  MAX_AGE: 3600000, // 1 hour
  STALE_WHILE_REVALIDATE: true,
} as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
  OFFSET: 0,
} as const;

export const DEFAULT_VALIDATION_OPTIONS = {
  STRICT: true,
  INCLUDE_WARNINGS: true,
  INCLUDE_SUGGESTIONS: true,
  MINIMAL: false,
} as const;

export const DEFAULT_TEST_CONFIG = {
  TIMEOUT: 30000,
  RETRIES: 2,
  PARALLEL: true,
  MAX_CONCURRENCY: 4,
  BAIL: false,
  FAIL_FAST: false,
  RANDOMIZE: false,
  COVERAGE: true,
  COVERAGE_THRESHOLD: 80,
  MOCK_EXTERNAL: true,
  VERBOSE: false,
  SILENT: false,
} as const;

export const DEFAULT_CONVERSION_CONFIG = {
  FORMAT: 'typescript',
  TARGET: 'node',
  INCLUDE_TESTS: true,
  INCLUDE_DOCS: true,
  INCLUDE_LANGFUSE: false,
  OVERWRITE: false,
  PACKAGE_MANAGER: 'npm',
  INDENT_SIZE: 2,
  USE_SPACES: true,
  SEMICOLONS: true,
  SINGLE_QUOTES: true,
  TRAILING_COMMAS: true,
} as const;

export const ERROR_CODES = {
  // General
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  CONVERSION_FAILED: 'CONVERSION_FAILED',
  TEST_FAILED: 'TEST_FAILED',
  TIMEOUT: 'TIMEOUT',
  CANCELLED: 'CANCELLED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  MAINTENANCE: 'MAINTENANCE',

  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  MFA_REQUIRED: 'MFA_REQUIRED',
  INVALID_MFA: 'INVALID_MFA',

  // File System
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  DISK_FULL: 'DISK_FULL',
  READ_ONLY: 'READ_ONLY',
  PERMISSION_DENIED_FILE: 'PERMISSION_DENIED_FILE',

  // Network
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONNECTION_REFUSED: 'CONNECTION_REFUSED',
  CONNECTION_TIMEOUT: 'CONNECTION_TIMEOUT',
  DNS_ERROR: 'DNS_ERROR',
  SSL_ERROR: 'SSL_ERROR',
  PROXY_ERROR: 'PROXY_ERROR',

  // Database
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  QUERY_ERROR: 'QUERY_ERROR',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
  CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
  DEADLOCK: 'DEADLOCK',

  // API
  API_ERROR: 'API_ERROR',
  INVALID_REQUEST: 'INVALID_REQUEST',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  API_UNAVAILABLE: 'API_UNAVAILABLE',
  API_DEPRECATED: 'API_DEPRECATED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  API_QUOTA_EXCEEDED: 'API_QUOTA_EXCEEDED',

  // Conversion
  UNSUPPORTED_NODE_TYPE: 'UNSUPPORTED_NODE_TYPE',
  MISSING_DEPENDENCY: 'MISSING_DEPENDENCY',
  CIRCULAR_DEPENDENCY: 'CIRCULAR_DEPENDENCY',
  INVALID_FLOW: 'INVALID_FLOW',
  INVALID_CONFIGURATION: 'INVALID_CONFIGURATION',
  GENERATION_FAILED: 'GENERATION_FAILED',
  COMPILATION_FAILED: 'COMPILATION_FAILED',

  // Testing
  TEST_SETUP_FAILED: 'TEST_SETUP_FAILED',
  TEST_TEARDOWN_FAILED: 'TEST_TEARDOWN_FAILED',
  ASSERTION_FAILED: 'ASSERTION_FAILED',
  MOCK_FAILED: 'MOCK_FAILED',
  FIXTURE_NOT_FOUND: 'FIXTURE_NOT_FOUND',
  COVERAGE_THRESHOLD_NOT_MET: 'COVERAGE_THRESHOLD_NOT_MET',
  PERFORMANCE_THRESHOLD_NOT_MET: 'PERFORMANCE_THRESHOLD_NOT_MET',
  SECURITY_VULNERABILITY: 'SECURITY_VULNERABILITY',
  ACCESSIBILITY_VIOLATION: 'ACCESSIBILITY_VIOLATION',
} as const;

export const SUCCESS_CODES = {
  OK: 'OK',
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',
  VALIDATED: 'VALIDATED',
  CONVERTED: 'CONVERTED',
  TESTED: 'TESTED',
  COMPILED: 'COMPILED',
  DEPLOYED: 'DEPLOYED',
  PUBLISHED: 'PUBLISHED',
  SYNCHRONIZED: 'SYNCHRONIZED',
  CACHED: 'CACHED',
  LOGGED: 'LOGGED',
  AUTHENTICATED: 'AUTHENTICATED',
  AUTHORIZED: 'AUTHORIZED',
  PROCESSED: 'PROCESSED',
  COMPLETED: 'COMPLETED',
} as const;

// Type aliases for commonly used types
// export type { JSONValue, JSONObject, JSONArray };
// export type { DeepPartial, DeepRequired, DeepReadonly, DeepMutable };
// export type { RequiredKeys, OptionalKeys, PickByType, OmitByType };
// export type { Result, Success, Failure, Option, Some, None, Maybe, Either, Left, Right };
// export type { EventHandler, AsyncEventHandler, EventEmitter };
// export type { State, StateAction, StateReducer, StateMiddleware, StateSelector, StateSubscriber };
// export type { Stream, StreamSubscriber, StreamUnsubscriber, StreamOperator };
// export type { CacheKey, CacheValue, CacheEntry, CacheStats, CacheOptions };
// export type { LogLevel, LogMessage, LogMetadata, LogEntry, LogFormatter, LogTransport, LogFilter };
// Note: Types are already exported individually above - removed duplicate exports

// Export all constants
export const CONSTANTS = {
  NODE_CATEGORIES,
  SUPPORTED_LANGUAGES,
  SUPPORTED_TARGETS,
  SUPPORTED_FORMATS,
  SUPPORTED_PACKAGE_MANAGERS,
  VALIDATION_LEVELS,
  TEST_TYPES,
  TEST_STATUSES,
  LOG_LEVELS,
  HTTP_METHODS,
  HTTP_STATUS_CODES,
  MIME_TYPES,
  REGEX_PATTERNS,
  DEFAULT_TIMEOUTS,
  DEFAULT_RETRY_OPTIONS,
  DEFAULT_CACHE_OPTIONS,
  DEFAULT_PAGINATION,
  DEFAULT_VALIDATION_OPTIONS,
  DEFAULT_TEST_CONFIG,
  DEFAULT_CONVERSION_CONFIG,
  ERROR_CODES,
  SUCCESS_CODES,
} as const;

// Export default - only constants since types cannot be values
export default {
  // Constants only - types cannot be exported as values
  NODE_CATEGORIES,
  SUPPORTED_LANGUAGES,
  SUPPORTED_TARGETS,
  SUPPORTED_FORMATS,
  SUPPORTED_PACKAGE_MANAGERS,
  VALIDATION_LEVELS,
  TEST_TYPES,
  TEST_STATUSES,
  LOG_LEVELS,
  HTTP_METHODS,
  HTTP_STATUS_CODES,
  MIME_TYPES,
  REGEX_PATTERNS,
  DEFAULT_TIMEOUTS,
  DEFAULT_RETRY_OPTIONS,
  DEFAULT_CACHE_OPTIONS,
  DEFAULT_PAGINATION,
  DEFAULT_VALIDATION_OPTIONS,
  DEFAULT_TEST_CONFIG,
  DEFAULT_CONVERSION_CONFIG,
  ERROR_CODES,
  SUCCESS_CODES,
};
