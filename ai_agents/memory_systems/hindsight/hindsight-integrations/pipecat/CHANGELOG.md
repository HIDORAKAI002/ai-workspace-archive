# Changelog

## 0.1.0 (2026-04-07)

- Initial release: `HindsightMemoryService` FrameProcessor for Pipecat voice AI pipelines
- Retain/recall/inject loop on each `LLMContextFrame`
- Fire-and-forget async retain after each complete user+assistant turn
- Memory injected as `<hindsight_memories>` system message before LLM call
- Supports both `LLMContextFrame` and deprecated `OpenAILLMContextFrame`
- Configurable recall budget (`low`, `mid`, `high`) and token limit
- Global `configure()` helper for shared connection settings
