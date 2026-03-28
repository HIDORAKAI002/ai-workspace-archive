# Flowise-to-LangChain API

A REST API and WebSocket service that provides programmatic access to the Flowise-to-LangChain converter.

## Features

- **REST API** endpoints for conversion, validation, testing, and file uploads
- **WebSocket streaming** for real-time progress updates
- **File upload** support with security scanning
- **Batch processing** for multiple operations
- **Rate limiting** and authentication
- **Error handling** and logging
- **CLI integration** with the existing converter

## Quick Start

### Start the API Server

```bash
# Start with default settings
flowise-to-lc api

# Start with custom configuration
flowise-to-lc api --port 3001 --cors-origin "http://localhost:3000"

# Start with authentication
flowise-to-lc api --api-key "your-secret-key" --verbose
```

### Test the API

```bash
# Health check
curl http://localhost:3001/health

# Convert a flow
curl -X POST http://localhost:3001/api/convert \
  -H "Content-Type: application/json" \
  -d '{"input": {"nodes": [], "edges": []}, "options": {"format": "typescript"}}'

# Upload and convert a file
curl -X POST http://localhost:3001/api/upload \
  -F "file=@my-flow.json" \
  -F "autoConvert=true"
```

## API Endpoints

### Core Operations

- `POST /api/convert` - Convert Flowise flow to LangChain code
- `POST /api/validate` - Validate Flowise flow JSON
- `POST /api/test` - Test generated code
- `POST /api/upload` - Upload and process files
- `POST /api/batch` - Process multiple operations

### Job Management

- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job status
- `DELETE /api/jobs/:id` - Cancel job

### System

- `GET /api/stats` - API statistics
- `GET /health` - Health check
- `GET /api/docs` - API documentation

## WebSocket Integration

Connect to `/ws` for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:3001/ws');

// Subscribe to job progress
ws.send(
  JSON.stringify({
    type: 'subscribe',
    payload: { jobId: 'job-123' },
  })
);

// Listen for progress updates
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'progress') {
    console.log('Progress:', message.payload);
  }
};
```

## Configuration

### Environment Variables

- `API_KEY` - Optional API key for authentication
- `NODE_ENV` - Environment (development/production)
- `FLOWISE_LOG_LEVEL` - Log level (debug/info/warn/error)

### CLI Options

- `--port` - Server port (default: 3001)
- `--host` - Server host (default: 0.0.0.0)
- `--max-file-size` - Max upload size in MB (default: 10)
- `--max-connections` - Max WebSocket connections (default: 100)
- `--rate-limit` - Requests per 15 minutes (default: 100)
- `--cors-origin` - Allowed CORS origins
- `--api-key` - API key for authentication
- `--verbose` - Enable verbose logging
- `--silent` - Suppress output

## Security Features

- **File validation** - MIME type and extension checking
- **Content scanning** - Malicious content detection
- **Rate limiting** - IP-based request limiting
- **CORS protection** - Configurable origin restrictions
- **Input validation** - JSON schema validation
- **Error handling** - Secure error responses

## Architecture

```
src/api/
├── index.ts              # Main API server
├── cli.ts                # CLI integration
├── types/                # TypeScript interfaces
├── services/             # Business logic
│   ├── conversion.ts     # Conversion service
│   ├── validation.ts     # Validation service
│   ├── test.ts          # Testing service
│   ├── upload.ts        # Upload service
│   └── websocket.ts     # WebSocket service
├── routes/              # API routes
├── middleware/          # Express middleware
└── README.md           # This file
```

## Integration with CLI

The API integrates seamlessly with the existing CLI converter:

- Uses the same `ConverterPipeline` for conversions
- Shares validation and testing utilities
- Maintains compatibility with all CLI options
- Provides the same output formats and features

## Usage Examples

### Convert a Flow

```bash
curl -X POST http://localhost:3001/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "nodes": [
        {"id": "1", "type": "llm", "data": {"model": "gpt-3.5-turbo"}}
      ],
      "edges": []
    },
    "options": {
      "format": "typescript",
      "withLangfuse": true,
      "includeTests": true
    }
  }'
```

### Upload and Auto-Convert

```bash
curl -X POST http://localhost:3001/api/upload \
  -F "file=@my-flow.json" \
  -F "validate=true" \
  -F "autoConvert=true" \
  -F "conversionOptions={\"format\":\"typescript\"}"
```

### Stream Progress

```javascript
const ws = new WebSocket('ws://localhost:3001/ws');
const response = await fetch('/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    input: flowData,
    stream: true,
    connectionId: 'client-123',
  }),
});
```

## Error Handling

The API provides structured error responses:

```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Request validation failed",
  "details": ["body: input is required"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Performance

- **Parallel processing** for batch operations
- **Streaming responses** for large outputs
- **Memory management** with automatic cleanup
- **Connection pooling** for WebSocket connections
- **Rate limiting** to prevent abuse

## Development

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT - See LICENSE file for details.
