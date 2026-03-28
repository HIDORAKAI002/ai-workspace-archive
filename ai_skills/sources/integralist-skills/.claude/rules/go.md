---
paths:
  - '**/*.go'
---

We are peers writing Go. Prioritize correctness, clarity, and best practices.

## Tooling

After editing Go files, run the following linters to catch issues before
committing:

- `go vet ./...`
- `go-critic check ./...` (if not installed:
  `go install -v github.com/go-critic/go-critic/cmd/go-critic@latest`)
- `staticcheck ./...` (if not installed:
  `go install honnef.co/go/tools/cmd/staticcheck@latest`)

Fix any reported issues before considering the task complete.

## Formatting

After editing Go files, run `gofumpt` to format all changed files:

```bash
gofumpt -l -w .
```

If not installed: `go install mvdan.cc/gofumpt@latest`

## Structs

- Fields sorted alphabetically; embedded structs first.
- JSON tags on exported fields; `json:"-"` for internal-only fields.
- Pointer fields when nil means "not provided" (partial updates).

```go
type Service struct {
	cacheManager *CacheManager
	logger       *slog.Logger
	metrics      *metrics.Metrics
	repo         *MySQLRepository
	tracer       trace.Tracer
}
```

## Abbreviations

Only: `ctx`, `err`, `req`, `resp`, `cfg`.

## Imports

Three groups separated by blank lines: stdlib, third-party, internal.

```go
import (
	"context"
	"fmt"

	"go.opentelemetry.io/otel/trace"

	"github.com/fastly/blue-ribbon/internal/metrics"
)
```

## Error Handling

- Sentinel errors as package-level `var`:
  ```go
  var ErrNotFound = errors.New("not found")
  ```
- Wrap with layer prefix:
  ```go
  return nil, fmt.Errorf("service: failed to create config: %w", err)
  ```
- Custom error types implement `Error()` and `Unwrap()`.
- Classify errors for retry decisions (`errors.Is`, `errors.AsType`).
- Use `errors.AsType[T]` (Go 1.26+) instead of `errors.As`. It returns
  `(T, bool)` and avoids the need for a pre-declared target variable:
  ```go
  if dnsErr, ok := errors.AsType[*net.DNSError](err); ok {
      // use dnsErr
  }
  ```
- Never panic; return errors.

## Constructors

NewX factories with dependency injection. Fields assigned alphabetically.

```go
func NewService(repo *MySQLRepository, tracer trace.Tracer, logger *slog.Logger) *Service {
	return &Service{
		logger: logger,
		repo:   repo,
		tracer: tracer,
	}
}
```

When a constructor has more than 4 parameters (including `ctx`), use a params
struct instead:

```go
type ServiceParams struct {
	Logger  *slog.Logger
	Metrics *metrics.Metrics
	Repo    *MySQLRepository
	Tracer  trace.Tracer
}

func NewService(p ServiceParams) *Service {
	return &Service{
		logger:  p.Logger,
		metrics: p.Metrics,
		repo:    p.Repo,
		tracer:  p.Tracer,
	}
}
```

For types with required parameters plus optional configuration with sensible
defaults, use `WithXxx` method chaining. `NewX` takes only required params;
`WithXxx` methods set optional fields and return the receiver:

```go
func NewClient(baseURL string) *Client {
	return &Client{
		baseURL:    baseURL,
		httpClient: http.DefaultClient,
		timeout:    30 * time.Second,
	}
}

func (c *Client) WithHTTPClient(h *http.Client) *Client {
	c.httpClient = h
	return c
}

func (c *Client) WithTimeout(d time.Duration) *Client {
	c.timeout = d
	return c
}
```

### When to use each pattern

- **Params struct** — constructor has >4 args (including `ctx`). Solves "too
  many arguments".
- **`WithXxx` methods** — type has optional configuration with sensible
  defaults. Solves "optional config with discoverable defaults". `NewX` takes
  only required params; `WithXxx` methods set optional fields.
- The two are orthogonal — a type could use both if needed.

Tracer initialization at package or constructor level:

```go
var tracer = otel.Tracer("internal.contextx")
// or
tracer: otel.Tracer("internal.routeconfig.handlers"),
```

## Interfaces

- Define at consumer side, not provider.
- Place in `interface.go` when shared across packages.
- Compile-time compliance check:
  ```go
  var _ redis.Client = (*MockRedisClient)(nil)
  ```

## Logging

Use `slog.LogAttrs`; snake_case event names; same event name for success and error (level distinguishes).

```go
logger.LogAttrs(ctx, slog.LevelError, "create_config",
	slog.String("config_id", configID),
	slog.Any("err", err),
)
```

Group related attributes:

```go
slog.Group("redis",
	slog.String("key", key),
	slog.Duration("ttl", ttl),
)
```

## Observability

Wrap operations with trace spans using `layer.Operation` naming:

```go
err := traces.WithSpan(ctx, s.tracer, "service.CreatePath", func(ctx context.Context) error {
	traces.AddAttributesToCurrentSpan(ctx, attribute.String("config_id", configID))
	// ... operation
})
```

Record both count and duration metrics:

```go
s.metrics.Count(ctx, "path_operations_total", "operation=create", "result="+result)
s.metrics.Measure(ctx, "service_operation_duration_seconds", time.Since(start).Seconds(), "operation=create_path", "result="+result)
```

## Concurrency

Prefer `wg.Go` (Go 1.25+) over manual `wg.Add`/`go`/`wg.Done`:

```go
var wg sync.WaitGroup
wg.Go(func() { /* task */ })
wg.Go(func() { /* task */ })
wg.Wait()
```

`wg.Go` handles Add/Done internally; the func must not panic.

## Context Cancellation

Always use the `*Cause` variants so every cancellation carries a reason:

- `context.WithCancelCause` instead of `context.WithCancel`
- `context.WithTimeoutCause` instead of `context.WithTimeout`
- `context.WithDeadlineCause` instead of `context.WithDeadline`
- `context.AfterFunc` callbacks should pass causes via `context.Cause(ctx)`

```go
ctx, cancel := context.WithTimeoutCause(ctx, 5*time.Second, errors.New("service: timed out fetching config"))
defer cancel()
```

Retrieve the cause with `context.Cause(ctx)` rather than checking `ctx.Err()` alone.

## Context Values

Unexported struct keys; exported `WithXxx`/`XxxFromContext` helpers.

```go
type customerIDCtxKey struct{}

var CustomerIDContextKey = customerIDCtxKey{}

func WithCustomerID(ctx context.Context, customerID string) context.Context {
	return context.WithValue(ctx, CustomerIDContextKey, customerID)
}

func CustomerIDFromContext(ctx context.Context) (string, bool) {
	if v := ctx.Value(CustomerIDContextKey); v != nil {
		if s, ok := v.(string); ok {
			return s, ok
		}
	}
	return "", false
}
```

## Testing

Table-driven tests with `testCases` slice and `t.Run`:

```go
testCases := []struct {
	name    string
	input   string
	isValid bool
}{
	{"Valid input", "good", true},
	{"Empty input", "", false},
}

for _, tc := range testCases {
	t.Run(tc.name, func(t *testing.T) {
		// ...
	})
}
```

- Use `testify/mock` for mock implementations.
- Build tag `e2e` for integration tests; unit tests have no build tags.
- Compile-time interface compliance in test utility packages.
- Always add code comments above the test function to explain what it validates.

## HTTP Handlers

Struct with logger, metrics, service. Factory `NewHandlers`. Routes registered via `RegisterRoutes(mux, pipeline, cfg)`.

```go
type Handlers struct {
	logger  *slog.Logger
	metrics *metrics.Metrics
	service *Service
	tracer  trace.Tracer
}

func (h *Handlers) RegisterRoutes(mux *http.ServeMux, p *middleware.Pipeline, cfg *config.Config) {
	mux.Handle("POST /v1/things", p.Decorate(http.HandlerFunc(h.createThing)))
}
```

Errors as RFC 7807 Problem Details:

```go
problem := errorsx.NewProblem("Not Found", "Resource not found.")
httpx.WriteJSON(ctx, logger, w, http.StatusNotFound, problem)
```

## Service Layer

- Trace-wrap the operation; metrics outside the span.
- Validate at service boundary; return validation errors.

```go
func (s *Service) CreateThing(ctx context.Context, params ServiceParams) (*Thing, error) {
	start := time.Now()
	var (
		thing *Thing
		err   error
	)
	spanFunc := func(ctx context.Context) error {
		// ... business logic
		return nil
	}
	err = traces.WithSpan(ctx, s.tracer, "service.CreateThing", spanFunc)

	result := "success"
	if err != nil {
		result = "error"
	}
	s.metrics.Count(ctx, "thing_operations_total", "operation=create", "result="+result)
	s.metrics.Measure(ctx, "service_operation_duration_seconds", time.Since(start).Seconds(), "operation=create_thing", "result="+result)

	if err != nil {
		return nil, err
	}
	return thing, nil
}
```

## Repository Layer

Transaction with deferred rollback; traced queries; metrics on duration.

```go
spanFunc := func(ctx context.Context) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("repository: failed to begin transaction: %w", err)
	}
	defer func() {
		if err = tx.Rollback(); err != nil && !errors.Is(err, sql.ErrTxDone) {
			r.logger.LogAttrs(ctx, slog.LevelError, "transaction_rollback",
				slog.String("operation", "create_thing"),
				slog.Any("err", err))
		}
	}()

	// ... queries
	return tx.Commit()
}
err := traces.WithSpan(ctx, r.tracer, "repository.CreateThing", spanFunc)
```

## Middleware

`Decorator` type wrapping `http.Handler`. `Pipeline` for composition.

```go
type Decorator func(http.Handler) http.Handler

type Pipeline struct {
	middleware []Decorator
}

func (p *Pipeline) Decorate(next http.Handler) http.Handler {
	for _, mw := range slices.Backward(p.middleware) {
		next = mw(next)
	}
	return next
}
```

## Caching

Cache-aside with `CacheManager.CacheOrFetch()`. Use `singleflight.Group` to deduplicate concurrent fetches. Hierarchical keys: `prefix:customerID:resource:id`.

```go
key := cm.HierarchicalKeyFor(customerID, "config", configID)
```

## File Naming

- `handlers.go` + `handlers_*.go` (by resource: `handlers_config.go`, `handlers_errors.go`)
- `service.go` + `service_*.go`
- `repository.go` + `repository_*.go`
- `model.go` for domain types
- `interface.go` for shared interfaces
- `cache.go` for cache logic

## Type Definitions

String enums with `All*` validation slice:

```go
type ConditionType string

const (
	HeaderCondition ConditionType = "header"
	GeoCondition    ConditionType = "geo"
)

var AllConditionTypes = []ConditionType{HeaderCondition, GeoCondition}
```

## Layer Separation

handlers -> service -> repository. Business logic in service, data access in repository. Never skip layers.
