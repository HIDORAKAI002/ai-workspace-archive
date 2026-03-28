# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive agent node support with 9 different agent types
- OpenAI Functions Agent with LangChain Hub integration
- Conversational Agent using modern createReactAgent pattern
- Tool Calling Agent with OpenAI Tools support
- Structured Chat Agent for complex tool interactions
- Agent Executor for standalone agent wrapping
- Zero-Shot React Description Agent
- React Docstore Agent with document integration
- Conversational React Description Agent with memory
- Chat Agent using OpenAI Tools pattern
- Agent node templates in IR system
- Agent converter architecture with proper TypeScript support
- LangChain Hub integration for automatic prompt retrieval
- Memory support for conversational agents
- Enhanced tool integration (Calculator, SerpAPI, WebBrowser)
- Comprehensive agent testing framework

### Changed
- Updated transformer to handle agent node types
- Enhanced registry with agent converter integration
- Improved connection resolution for agent-tool-memory relationships
- Updated documentation with agent examples
- Enhanced error handling for agent conversions

### Fixed
- TypeScript compilation issues with agent converters
- Duplicate test fixture declarations
- Agent converter interface compatibility
- Connection resolution for complex agent flows

## [1.0.0] - 2025-07-15

### Added
- Initial release of Flowise-to-LangChain converter
- Support for LLM nodes (OpenAI, ChatOpenAI, Anthropic, etc.)
- Support for Chain nodes (LLMChain, ConversationChain, etc.)
- Support for Prompt nodes (PromptTemplate, ChatPromptTemplate, etc.)
- Support for Memory nodes (BufferMemory, BufferWindowMemory, etc.)
- Support for Tool nodes (Calculator, SerpAPI, WebBrowser)
- CLI interface with validate and convert commands
- TypeScript code generation with proper type safety
- Plugin-based converter architecture
- Comprehensive test suite
- Documentation and examples