# Flowise JSON Parser

A comprehensive TypeScript parser for Flowise chatflow exports with robust validation, error handling, and analysis capabilities.

## Features

- ✅ **Complete Zod Schema Validation** - Type-safe parsing with detailed error messages
- 🔄 **Multi-Version Support** - Supports Flowise v1.x and v2.x formats with auto-detection
- 🚨 **Robust Error Handling** - Helpful error messages with suggestions for fixes
- ⚡ **Performance Optimized** - Fast parsing with configurable options
- 🔍 **Flow Analysis** - Deep analysis of flow structure, cycles, and complexity
- 🛠️ **Utility Functions** - Transform, merge, compare, and analyze flows
- 📊 **Comprehensive Metadata** - Detailed parsing statistics and insights
- 🌐 **Multiple Input Sources** - Parse from strings, files, URLs, or buffers

## Quick Start

```typescript
import { parseFlowiseJson, FlowiseParser } from './parser/index.js';

// Basic parsing
const result = await parseFlowiseJson(jsonString);
if (result.success) {
  console.log(`Parsed ${result.data.nodes.length} nodes`);
} else {
  console.error(result.errors);
}

// Advanced parsing with options
const parser = new FlowiseParser({
  version: 'auto',
  includeWarnings: true,
  autoDetectVersion: true,
});

const detailedResult = await parser.parseString(jsonString);
```

## API Reference

### Main Parser Class

```typescript
class FlowiseParser {
  constructor(options?: ParserOptions);

  async parseString(content: string): Promise<ParseResult>;
  async parseFile(filePath: string): Promise<ParseResult>;
  async parseUrl(url: string): Promise<ParseResult>;
  async parseBuffer(buffer: Buffer): Promise<ParseResult>;
  async validate(content: string): Promise<ValidationResult>;
  async quickValidate(content: string): Promise<QuickValidationResult>;
}
```

### Parser Options

```typescript
interface ParserOptions {
  strict?: boolean; // Strict validation (default: true)
  version?: '1.x' | '2.x' | 'auto'; // Flowise version (default: 'auto')
  minimal?: boolean; // Minimal validation only (default: false)
  includeMetadata?: boolean; // Include performance metadata (default: true)
  maxFileSize?: number; // Max file size in bytes (default: 10MB)
  autoDetectVersion?: boolean; // Auto-detect Flowise version (default: true)
  includeWarnings?: boolean; // Include warnings (default: true)
  fetchTimeout?: number; // URL fetch timeout (default: 30s)
  errorFormatter?: (issues: ZodIssue[]) => string; // Custom error formatter
}
```

### Parse Result

```typescript
interface ParseResult {
  success: boolean;
  data?: FlowiseChatFlow;
  errors: ParseError[];
  warnings: ParseWarning[];
  metadata: ParseMetadata;
}
```

### Convenience Functions

```typescript
// Quick parsing
const result = await parseFlowiseJson(content, options);
const result = await parseFlowiseFile(filePath, options);
const result = await parseFlowiseUrl(url, options);

// Quick validation
const { isValid, errors } = await quickParse(content);
const { isValid, errors, warnings } = await validate(content);

// Flow analysis
const analysis = analyzeFlow(flowData);
const stats = calculateFlowStatistics(flowData);
const transformed = transformFlow(flowData, transformOptions);
const merged = mergeFlows([flow1, flow2], mergeOptions);
```

## Schema Validation

The parser uses comprehensive Zod schemas that validate:

- **Node Structure**: ID, position, type, and data validation
- **Edge Connections**: Source/target validation and handle checking
- **Input Parameters**: Type validation with constraints
- **Anchor Points**: Connection point validation
- **Metadata**: Chatflow metadata and timestamps
- **Cross-References**: Ensures edges reference valid nodes and handles

### Supported Node Categories

- `llm` - Language models (OpenAI, Anthropic, etc.)
- `chain` - LangChain chains and sequences
- `agent` - AI agents and tools
- `tool` - Individual tools and functions
- `memory` - Memory and context management
- `vectorstore` - Vector databases and search
- `embedding` - Text embedding models
- `prompt` - Prompt templates and formatters
- `retriever` - Document retrievers
- `output_parser` - Output parsing and formatting
- `text_splitter` - Text splitting utilities
- `loader` - Document loaders
- `utility` - Utility functions
- `control_flow` - Flow control logic

## Version Detection

The parser automatically detects Flowise versions based on:

- Node data version numbers
- Node type patterns
- Metadata structure
- Feature availability

### Version-Specific Features

**Flowise v1.x:**

- Basic node structure
- Simple input/output anchors
- Limited metadata

**Flowise v2.x:**

- Enhanced node data structure
- Extended base classes
- Rich metadata support
- Advanced node types

## Error Handling

The parser provides detailed error information:

```typescript
interface ParseError {
  type: 'validation' | 'syntax' | 'structure' | 'version' | 'network';
  message: string;
  path?: string; // JSON path to error location
  line?: number; // Line number (for syntax errors)
  column?: number; // Column number (for syntax errors)
  code?: string; // Error code
  suggestion?: string; // Suggested fix
}
```

### Common Error Types

- **Syntax Errors**: Invalid JSON format
- **Validation Errors**: Schema validation failures
- **Structure Errors**: Missing required fields or invalid structure
- **Version Errors**: Unsupported version features
- **Network Errors**: URL fetching failures

## Flow Analysis

The parser includes powerful analysis capabilities:

```typescript
const analysis = analyzeFlow(flowData);

// Analysis results include:
// - Entry and exit points
// - Cycle detection
// - Orphaned nodes
// - Individual node analysis
// - Complexity metrics
// - Performance recommendations
```

### Analysis Features

- **Cycle Detection**: Identifies circular dependencies
- **Orphan Detection**: Finds disconnected nodes
- **Complexity Analysis**: Calculates flow complexity
- **Node Validation**: Checks required inputs and unused outputs
- **Performance Insights**: Identifies potential bottlenecks
- **Best Practice Recommendations**: Suggests improvements

## Utilities

### Flow Transformation

```typescript
const transformed = transformFlow(flow, {
  stripMetadata: true, // Remove UI metadata
  normalizeIds: true, // Use sequential IDs
  removeOrphans: true, // Remove disconnected nodes
  addDefaults: true, // Add missing default values
  simplify: true, // Simplify structure
});
```

### Flow Merging

```typescript
const merged = mergeFlows([flow1, flow2], {
  idConflictStrategy: 'rename', // 'rename' | 'merge' | 'error'
  validateResult: true, // Validate merged result
  renamePrefix: 'merged_', // Prefix for renamed nodes
});
```

### Flow Comparison

```typescript
const diff = compareFlows(flow1, flow2);
// Returns added, removed, and modified nodes/edges
```

## Performance

The parser is optimized for performance:

- **Fast Schema Validation**: Efficient Zod schema validation
- **Streaming Support**: Handle large files efficiently
- **Caching**: Built-in result caching for repeated operations
- **Memory Management**: Configurable memory limits
- **Parallel Processing**: Support for batch operations

### Performance Metrics

```typescript
interface ParseMetadata {
  parseTime: number; // Parse duration in ms
  sourceSize: number; // Input size in bytes
  nodeCount: number; // Number of nodes
  edgeCount: number; // Number of edges
  complexity: 'simple' | 'medium' | 'complex';
  memoryUsage?: number; // Peak memory usage
}
```

## Examples

### Basic Usage

```typescript
import { parseFlowiseFile } from './parser/index.js';

const result = await parseFlowiseFile('./my-flow.json');
if (result.success) {
  console.log(`✅ Parsed ${result.data.nodes.length} nodes`);
  console.log(`📊 Complexity: ${result.metadata.complexity}`);
} else {
  console.error('❌ Parse failed:', result.errors[0].message);
}
```

### Advanced Analysis

```typescript
import { FlowiseParser, analyzeFlow } from './parser/index.js';

const parser = new FlowiseParser({
  includeWarnings: true,
  autoDetectVersion: true,
});

const result = await parser.parseFile('./complex-flow.json');
if (result.success) {
  const analysis = analyzeFlow(result.data);

  console.log(`🔍 Flow Analysis:`);
  console.log(`  Valid: ${analysis.isValid}`);
  console.log(`  Entry points: ${analysis.entryPoints.length}`);
  console.log(`  Cycles: ${analysis.cycles.length}`);
  console.log(`  Recommendations: ${analysis.recommendations.length}`);

  if (analysis.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    analysis.recommendations.forEach((rec) => console.log(`  - ${rec}`));
  }
}
```

### Batch Processing

```typescript
import { parseMultipleFiles } from './parser/index.js';

const results = await parseMultipleFiles([
  './flow1.json',
  './flow2.json',
  './flow3.json',
]);

console.log(`✅ Successful: ${results.successful.length}`);
console.log(`❌ Failed: ${results.failed.length}`);

if (results.combined) {
  console.log(`🔄 Combined flow has ${results.combined.nodes.length} nodes`);
}
```

## Error Recovery

The parser includes several error recovery mechanisms:

1. **Graceful Degradation**: Falls back to minimal validation when strict validation fails
2. **Partial Parsing**: Extracts valid parts even when some sections fail
3. **Auto-Correction**: Attempts to fix common JSON formatting issues
4. **Helpful Suggestions**: Provides actionable error messages

## Testing

The parser includes comprehensive tests:

```bash
npm test src/parser/parser.test.ts
```

Test coverage includes:

- Schema validation edge cases
- Version detection accuracy
- Error handling scenarios
- Performance benchmarks
- Memory leak detection
- Large file handling

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  FlowiseChatFlow,
  FlowiseNode,
  FlowiseEdge,
  ParseResult,
  ParseError,
  ParseWarning,
  ParseMetadata,
  ParserOptions,
  FlowAnalysis,
  FlowStatistics,
} from './parser/index.js';
```

## Contributing

When contributing to the parser:

1. **Schema Changes**: Update Zod schemas in `schema.ts`
2. **New Features**: Add to `parser.ts` and include tests
3. **Utilities**: Add helper functions to `utils.ts`
4. **Documentation**: Update this README and add JSDoc comments
5. **Tests**: Include comprehensive test coverage

## License

MIT License - see the main project LICENSE file.
