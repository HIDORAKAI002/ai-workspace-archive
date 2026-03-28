# Edge Cases

This directory contains invalid and edge case Flowise flows designed to test error handling, validation, and robustness of the flowise-to-langchain converter.

## Invalid Examples

### 1. Missing Nodes (`invalid-missing-nodes.flowise.json`)
**Issue:** Edges reference non-existent nodes
**Expected Behavior:** Schema validation should fail
**Test Purpose:** Validate edge-to-node reference checking
**Error Type:** ValidationError

### 2. Circular Reference (`invalid-circular-reference.flowise.json`)
**Issue:** Nodes create circular dependencies (A → B → A)
**Expected Behavior:** Cycle detection should prevent infinite loops
**Test Purpose:** Test dependency graph analysis
**Error Type:** CyclicDependencyError

### 3. Missing Required Parameters (`invalid-missing-required-params.flowise.json`)
**Issue:** Node missing required parameters and invalid parameter values
**Expected Behavior:** Parameter validation should fail
**Test Purpose:** Test node parameter validation
**Error Type:** ParameterValidationError

## Edge Case Categories

### Schema Validation Errors
- Empty flows (no nodes)
- Missing required fields
- Invalid data types
- Malformed JSON structure

### Graph Structure Errors
- Disconnected components
- Circular dependencies
- Invalid edge connections
- Missing source/target handles

### Parameter Validation Errors
- Missing required parameters
- Invalid parameter types
- Out-of-range values
- Incompatible configurations

### Converter Edge Cases
- Unsupported node types
- Version compatibility issues
- Missing converter implementations
- Complex dependency chains

## Testing Guidelines

### Validation Testing
```typescript
// Expected behavior for invalid flows
try {
  const flow = parseFlowiseJSON(invalidFlow);
  // Should not reach here
  fail('Expected validation error');
} catch (error) {
  expect(error).toBeInstanceOf(ValidationError);
  expect(error.message).toContain('expected error details');
}
```

### Error Recovery Testing
```typescript
// Test graceful degradation
const result = convertFlow(partiallyInvalidFlow, {
  skipInvalidNodes: true,
  continueOnError: true
});

expect(result.errors).toHaveLength(expectedErrorCount);
expect(result.validNodes).toHaveLength(expectedValidCount);
```

## Validation Checklist

### ✅ Schema Validation
- [ ] Node structure validation
- [ ] Edge structure validation
- [ ] Required field presence
- [ ] Data type correctness

### ✅ Graph Validation
- [ ] Edge endpoint validation
- [ ] Cycle detection
- [ ] Connectivity analysis
- [ ] Handle validation

### ✅ Parameter Validation
- [ ] Required parameter presence
- [ ] Parameter type checking
- [ ] Value range validation
- [ ] Cross-parameter dependencies

### ✅ Converter Validation
- [ ] Node type support
- [ ] Version compatibility
- [ ] Dependency resolution
- [ ] Code generation errors

## Usage in Tests

### Unit Tests
Use these examples to test individual validation functions:
```typescript
describe('Schema Validation', () => {
  it('should reject flows with missing nodes', () => {
    expect(() => validateFlow(missingNodesFlow)).toThrow();
  });
});
```

### Integration Tests
Use these examples to test end-to-end error handling:
```typescript
describe('End-to-End Error Handling', () => {
  it('should handle complex validation errors gracefully', () => {
    const result = processFlow(complexInvalidFlow);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });
});
```

### Performance Tests
Use these examples to test error handling performance:
```typescript
describe('Error Handling Performance', () => {
  it('should validate large invalid flows quickly', () => {
    const start = Date.now();
    validateFlow(largeInvalidFlow);
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(1000); // Should complete within 1 second
  });
});
```

## Error Message Guidelines

Good error messages should:
1. **Be specific**: Identify exactly what went wrong
2. **Be actionable**: Tell the user how to fix the issue
3. **Include context**: Show where in the flow the error occurred
4. **Be user-friendly**: Avoid technical jargon when possible

Example error messages:
```
❌ Bad: "Validation failed"
✅ Good: "Node 'chatOpenAI_0' is missing required parameter 'modelName'"

❌ Bad: "Invalid graph"
✅ Good: "Circular dependency detected: promptTemplate_1 → llmChain_0 → promptTemplate_1"

❌ Bad: "Parse error"
✅ Good: "Edge 'edge_1' references non-existent target node 'missing_node'"
```