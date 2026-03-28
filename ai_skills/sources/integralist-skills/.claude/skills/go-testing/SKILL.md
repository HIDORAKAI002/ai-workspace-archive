---
name: go-testing
description: Write unit and integration tests for Go services. Use when creating tests, test helpers, mocks, fuzz tests, or benchmarks in Go projects.
---

# Go Testing

Guidelines for writing tests in Go services following established patterns.

## Instructions

When asked to write unit tests, ask the user if they prefer:
- **Table-driven tests** - test cases defined in a struct slice
- **F-tests** - helper function `f` with explicit named subtests

If not specified, default to table-driven tests.

## Unit Tests

Unit tests live alongside source code (`*_test.go`) and run with `make test` or `go test ./...`.

### Table-Driven Tests

Use table-driven tests with `t.Run()` for clear, maintainable test cases:

```go
func TestFunctionName(t *testing.T) {
    tests := []struct {
        name        string
        input       string
        expected    string
        expectErr   bool
        errContains string
    }{
        {
            name:     "valid input",
            input:    "hello",
            expected: "HELLO",
        },
        {
            name:        "empty input returns error",
            input:       "",
            expectErr:   true,
            errContains: "input cannot be empty",
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := FunctionName(tt.input)

            if tt.expectErr {
                if err == nil {
                    t.Fatal("expected an error, but got nil")
                }
                if !strings.Contains(err.Error(), tt.errContains) {
                    t.Errorf("expected error to contain %q, got %q", tt.errContains, err.Error())
                }
                return
            }

            if err != nil {
                t.Fatalf("unexpected error: %v", err)
            }
            if result != tt.expected {
                t.Errorf("expected %q, got %q", tt.expected, result)
            }
        })
    }
}
```

### F-Tests (Alternative Style)

F-tests hoist assertion logic into a helper function `f`, making test cases more readable. This style works well when you want explicit, named subtests without the verbosity of table structs:

```go
func TestSomeFuncWithSubtests(t *testing.T) {
    f := func(t *testing.T, input, expected string) {
        t.Helper()

        output := SomeFunc(input)
        if output != expected {
            t.Fatalf("unexpected output; got %q; want %q", output, expected)
        }
    }

    t.Run("converts_to_uppercase", func(t *testing.T) {
        f(t, "hello", "HELLO")
    })

    t.Run("handles_empty_string", func(t *testing.T) {
        f(t, "", "")
    })

    t.Run("preserves_numbers", func(t *testing.T) {
        f(t, "abc123", "ABC123")
    })
}
```

You can also combine f-tests with table-driven tests for the best of both approaches:

```go
func TestThing_Success(t *testing.T) {
    f := func(t *testing.T, input1, input2 string, expected int) {
        t.Helper()

        result := Thing(input1, input2)
        if result != expected {
            t.Fatalf("Thing(%q, %q) = %d; want %d", input1, input2, result, expected)
        }
    }

    tests := []struct {
        name     string
        input1   string
        input2   string
        expected int
    }{
        {name: "both_empty", input1: "", input2: "", expected: 0},
        {name: "first_only", input1: "foo", input2: "", expected: 3},
        {name: "both_set", input1: "foo", input2: "bar", expected: 6},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            f(t, tt.input1, tt.input2, tt.expected)
        })
    }
}
```

### Test Helpers

Mark helper functions with `t.Helper()` so errors report the correct line:

```go
func assertStatusCode(t *testing.T, got, want int) {
    t.Helper()
    if got != want {
        t.Errorf("expected status %d, got %d", want, got)
    }
}

func newTestLogger(t *testing.T) *slog.Logger {
    t.Helper()
    var buf bytes.Buffer
    return slog.New(slog.NewJSONHandler(&buf, nil))
}
```

### HTTP Handler Tests

Use `httptest` for testing HTTP handlers:

```go
func TestHandler(t *testing.T) {
    tests := []struct {
        name           string
        method         string
        path           string
        body           string
        expectedStatus int
    }{
        {
            name:           "GET returns 200",
            method:         http.MethodGet,
            path:           "/api/v1/resource",
            expectedStatus: http.StatusOK,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            var reqBody io.Reader
            if tt.body != "" {
                reqBody = bytes.NewBufferString(tt.body)
            }

            req := httptest.NewRequest(tt.method, tt.path, reqBody)
            req.Header.Set("Content-Type", "application/json")

            rr := httptest.NewRecorder()

            handler := NewHandler(/* dependencies */)
            handler.ServeHTTP(rr, req)

            if rr.Code != tt.expectedStatus {
                t.Errorf("expected status %d, got %d", tt.expectedStatus, rr.Code)
            }
        })
    }
}
```

### Mocks

Create simple struct-based mocks that implement interfaces:

```go
// MockClient implements the Client interface for testing.
type MockClient struct {
    logger *slog.Logger
}

func NewMockClient(logger *slog.Logger) *MockClient {
    return &MockClient{logger: logger}
}

func (m *MockClient) DoSomething(ctx context.Context, id string) error {
    m.logger.LogAttrs(ctx, slog.LevelInfo, "mock_do_something",
        slog.String("id", id),
    )
    return nil
}
```

### Assertions

Prefer standard library assertions for unit tests. Use `testify/assert` for complex assertions or integration tests:

```go
// Standard library - preferred for unit tests
if result != expected {
    t.Errorf("expected %v, got %v", expected, result)
}

// testify/assert - for integration tests or complex assertions
import "github.com/stretchr/testify/assert"

assert.Equal(t, expected, result, "values should match")
assert.Contains(t, haystack, needle, "should contain substring")
assert.NotNil(t, obj, "object should not be nil")
```

## Integration Tests

Integration tests use the `e2e` build tag and live in the `e2e/` directory. Run with `make test-integration`.

### Build Tag

All integration test files must start with:

```go
//go:build e2e

package e2e_test
```

### Test Structure

Integration tests validate complete workflows:

```go
//go:build e2e

package e2e_test

import (
    "net/http"
    "testing"
    "time"

    "github.com/stretchr/testify/assert"
)

const (
    baseURL = "http://localhost:8080"
    apiKey  = "test-api-key"
)

var client = &http.Client{Timeout: 10 * time.Second}

func TestE2EWorkflow(t *testing.T) {
    t.Run("Scenario: Complete CRUD workflow", testCRUDWorkflow)
    t.Run("Scenario: Error handling", testErrorHandling)
}

func testCRUDWorkflow(t *testing.T) {
    // 1. Create resource
    resp := makeRequest(t, "POST", "/api/v1/resources", `{"name": "test"}`)
    assert.Equal(t, http.StatusCreated, resp.StatusCode)

    var created Resource
    unmarshalResponse(t, resp, &created)
    resourceID := created.ID

    // 2. Read resource
    resp = makeRequest(t, "GET", "/api/v1/resources/"+resourceID, "")
    assert.Equal(t, http.StatusOK, resp.StatusCode)

    // 3. Update resource
    resp = makeRequest(t, "PATCH", "/api/v1/resources/"+resourceID, `{"name": "updated"}`)
    assert.Equal(t, http.StatusOK, resp.StatusCode)

    // 4. Delete resource
    resp = makeRequest(t, "DELETE", "/api/v1/resources/"+resourceID, "")
    assert.Equal(t, http.StatusNoContent, resp.StatusCode)

    // 5. Verify deletion
    resp = makeRequest(t, "GET", "/api/v1/resources/"+resourceID, "")
    assert.Equal(t, http.StatusNotFound, resp.StatusCode)
}
```

### Helper Functions

Create reusable helpers for integration tests:

```go
func makeRequest(t *testing.T, method, path, body string) *http.Response {
    t.Helper()

    var reqBody io.Reader
    if body != "" {
        reqBody = bytes.NewBufferString(body)
    }

    req, err := http.NewRequest(method, baseURL+path, reqBody)
    if err != nil {
        t.Fatalf("failed to create request: %v", err)
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer "+apiKey)

    resp, err := client.Do(req)
    if err != nil {
        t.Fatalf("request failed: %v", err)
    }
    return resp
}

func unmarshalResponse(t *testing.T, resp *http.Response, target any) {
    t.Helper()
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        t.Fatalf("failed to read response body: %v", err)
    }

    if err := json.Unmarshal(body, target); err != nil {
        t.Fatalf("failed to unmarshal response: %v\nBody: %s", err, string(body))
    }
}

func uniqueName(prefix string) string {
    return fmt.Sprintf("%s-%d", prefix, time.Now().UnixNano())
}
```

## Fuzz Tests

Fuzz tests discover edge cases through randomized inputs. Use for security-critical validation:

```go
func FuzzValidatePath(f *testing.F) {
    // Seed with known valid inputs
    f.Add("/")
    f.Add("/api/v1")
    f.Add("/users/123")

    // Seed with known invalid inputs
    f.Add("")
    f.Add("no-leading-slash")
    f.Add("/path/../traversal")
    f.Add("/path?query=value")

    f.Fuzz(func(t *testing.T, path string) {
        if !utf8.ValidString(path) {
            t.Skip("skipping invalid UTF-8")
        }

        result := ValidatePath(path)

        // Assert invariants that must always hold
        if result {
            if !strings.HasPrefix(path, "/") {
                t.Errorf("valid path %q should start with /", path)
            }
            if strings.Contains(path, "//") {
                t.Errorf("valid path %q should not contain double slashes", path)
            }
        }
    })
}
```

Run fuzz tests: `go test -fuzz=FuzzValidatePath -fuzztime=30s ./...`

## Benchmarks

Use benchmarks to measure and track performance:

```go
func BenchmarkOperation(b *testing.B) {
    // Setup outside the loop
    data := prepareTestData()

    for b.Loop() {
        _ = Operation(data)
    }
}

func BenchmarkOperationParallel(b *testing.B) {
    data := prepareTestData()

    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            _ = Operation(data)
        }
    })
}
```

Run benchmarks: `go test -bench=. -benchmem ./...`

## Example Tests

Document usage with executable examples:

```go
func ExampleCacheManager_HierarchicalKeyFor() {
    cm := NewCacheManager(redisClient, logger, tracer)

    configKey := cm.HierarchicalKeyFor("customer", "123", "config", "my-config")
    // Output: br:customer:123:config:my-config

    _ = configKey
}
```

## Test Data

### Using testdata Directory

Store test fixtures in `testdata/` directories:

```
internal/config/
├── config.go
├── config_test.go
└── testdata/
    ├── good.json
    ├── bad.json
    └── malformed.json
```

```go
func TestLoadConfig(t *testing.T) {
    tests := []struct {
        name    string
        cfgPath string
        wantErr bool
    }{
        {name: "valid config", cfgPath: "testdata/good.json"},
        {name: "invalid config", cfgPath: "testdata/bad.json", wantErr: true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            cfg, err := Load(tt.cfgPath)
            if tt.wantErr {
                if err == nil {
                    t.Fatal("expected error, got nil")
                }
                return
            }
            if err != nil {
                t.Fatalf("unexpected error: %v", err)
            }
            // validate cfg...
        })
    }
}
```

## Running Tests

```bash
# Unit tests
make test

# Integration tests (starts full stack)
make test-integration

# Specific test
go test -v -run TestFunctionName ./internal/pkg/...

# With race detection
go test -race ./...

# With coverage
go test -cover ./...
```
