# Test Structure

This directory contains all test files for the flowise-to-langchain converter.

## Directory Structure

- **`unit/`** - Unit tests for individual modules and functions
- **`integration/`** - Integration tests for complete workflows and system interactions
- **`fixtures/`** - Test data files including sample Flowise JSON exports
- **`utils/`** - Test helper utilities and shared testing code

## Testing Categories

### Unit Tests (`unit/`)
- **Parser Tests** - JSON parsing and validation
- **Converter Tests** - Individual converter modules (LLM, Chain, Memory, etc.)
- **Emitter Tests** - Code generation and formatting
- **Registry Tests** - Component registry and lookup
- **CLI Tests** - Command-line interface functionality
- **Edge Cases** - Error handling and boundary conditions

### Integration Tests (`integration/`)
- **End-to-End Tests** - Complete conversion pipeline testing
- **Workflow Integration** - Full system workflow validation
- **Service Communication** - API service and real-time communication testing
- **Performance & Load** - System performance under various load conditions
- **Data Consistency** - Cross-service data integrity and recovery testing
- **Agent Testing** - AI agent conversion and coordination

## Test Types by Scope

### 🔄 **Workflow Integration Tests**
- Complete CLI to generated code workflow
- API service integration workflow
- Batch processing scenarios
- File I/O and filesystem operations
- Configuration and environment handling

### 🌐 **Service Communication Tests**
- Real-time progress streaming via WebSocket
- REST API request/response flows
- Event-driven communication patterns
- Cross-service coordination
- Service discovery and health checks
- Failover and recovery mechanisms

### 📊 **Performance & Load Tests**
- High-volume conversion scenarios
- Concurrent user simulation
- Burst traffic pattern handling
- Memory constraint testing
- CPU-intensive operation efficiency
- Disk I/O optimization
- Stress testing and system recovery

### 🔒 **Data Consistency Tests**
- Cross-service data integrity
- Concurrent modification handling
- Referential integrity maintenance
- Transactional data operations
- Distributed transaction scenarios
- Error recovery and data corruption handling
- Backup and incremental recovery

### 🤖 **Agent Conversion Tests**
- Complex agent flow parsing
- Multi-step agent chain conversion
- Tool integration testing
- Memory and state management
- Error propagation in agent workflows

## Testing Guidelines

### Core Principles
- Use Jest as the testing framework
- Maintain high test coverage (>90%)
- Include both positive and negative test cases
- Use fixtures for consistent test data
- Mock external dependencies appropriately

### Integration Test Best Practices
1. **Real System Testing** - Test actual system interactions, not just mocks
2. **Resource Management** - Properly clean up temporary files and resources
3. **Isolation** - Each test should be independent and not affect others
4. **Performance Monitoring** - Track memory usage, response times, and throughput
5. **Error Scenarios** - Test failure modes and recovery mechanisms
6. **Data Integrity** - Verify data consistency across all system components

### Test Data Management
- Store test flows in `fixtures/sample-flows.ts`
- Use temporary directories for file operations
- Clean up test artifacts after completion
- Version test data with the application

### Performance Benchmarks
- **Response Time**: < 5 seconds for simple flows, < 30 seconds for complex flows
- **Throughput**: > 1 conversion per second sustained
- **Memory Usage**: < 100MB increase per large flow conversion
- **Success Rate**: > 95% under normal load, > 70% under extreme load
- **Recovery Time**: < 2 seconds after system overload

## Running Tests

```bash
# Run all tests
npm test

# Run specific test categories
npm test -- unit
npm test -- integration

# Run specific integration test suites
npm test -- integration/workflow-integration.test.ts
npm test -- integration/service-communication.test.ts
npm test -- integration/performance-load.test.ts
npm test -- integration/data-consistency.test.ts

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

## Test Environment Setup

### Required Dependencies
- Jest with TypeScript support
- Node.js 18+ for module support
- Temporary directory access for file operations
- Memory monitoring capabilities

### Environment Variables
```bash
# Test configuration
NODE_ENV=test
TEST_TIMEOUT=30000
TEST_TEMP_DIR=/tmp/flowise-tests

# Performance testing
ENABLE_PERFORMANCE_TESTS=true
MAX_CONCURRENT_TESTS=10
MEMORY_LIMIT=500MB
```

### Mock Services
- **MockDatabase** - In-memory database for consistency testing
- **MockWebSocketServer** - WebSocket communication testing
- **MockFileSystem** - Controlled file system operations

## Coverage Targets

| Component | Unit Tests | Integration Tests | Target Coverage |
|-----------|------------|-------------------|-----------------|
| Parser | ✅ | ✅ | 95%+ |
| Converters | ✅ | ✅ | 90%+ |
| Emitters | ✅ | ✅ | 90%+ |
| CLI | ✅ | ✅ | 85%+ |
| API Services | ⚠️ | ✅ | 85%+ |
| Workflows | ⚠️ | ✅ | 80%+ |
| Error Handling | ✅ | ✅ | 95%+ |

## Troubleshooting

### Common Issues
1. **Test Timeouts** - Increase timeout for complex integration tests
2. **Memory Leaks** - Ensure proper cleanup in afterEach hooks
3. **File Permissions** - Use temporary directories with proper permissions
4. **Concurrent Test Conflicts** - Use unique identifiers for parallel tests

### Debug Configuration
```bash
# Enable debug logging
DEBUG=flowise:* npm test

# Run specific test with verbose output
npm test -- --verbose integration/workflow-integration.test.ts

# Memory profiling
node --inspect npm test
```