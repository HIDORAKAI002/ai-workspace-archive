# internal/middleware Template

HTTP middleware pipeline for request processing.

Replace `{MODULE_PATH}` with your Go module path.

## middleware.go

```go
// internal/middleware/middleware.go

package middleware

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"regexp"
	"runtime/debug"
	"slices"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"

	"{MODULE_PATH}/internal/contextx"
	"{MODULE_PATH}/internal/deps"
	"{MODULE_PATH}/internal/httpx"
	"{MODULE_PATH}/internal/metrics"
	"{MODULE_PATH}/internal/traces"
)

// routePattern matches the content inside curly brackets.
var routePattern = regexp.MustCompile(`\{([^{}]+)\}`)

// Decorator is a middleware function.
type Decorator func(http.Handler) http.Handler

// Pipeline wraps an http.Handler with optional logging, metrics and tracing.
type Pipeline struct {
	middleware []Decorator
}

// New returns a middleware Pipeline.
func New(middleware ...Decorator) *Pipeline {
	p := &Pipeline{}
	p.middleware = append(p.middleware, middleware...)
	return p
}

// Decorate wraps next in the defined middleware and executes the pipeline.
func (p *Pipeline) Decorate(next http.Handler) http.Handler {
	for _, mw := range slices.Backward(p.middleware) {
		next = mw(next)
	}
	return next
}

// AddRoutePattern adds the route pattern to the request context.
func AddRoutePattern(mux *http.ServeMux) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			_, route := mux.Handler(r)
			ctx := context.WithValue(r.Context(), contextx.RoutePatternContextKey, route)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// InFlight tracks the number of requests currently being handled.
func InFlight(m *metrics.Metrics, tracer trace.Tracer) func(next http.Handler) http.Handler {
	active := m.RegisterGauge("api_requests_inflight_count")
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			_, span := tracer.Start(ctx, "middleware.InFlight")
			defer span.End()

			active.Add(1)
			defer active.Dec()
			next.ServeHTTP(w, r)
		})
	}
}

// LogRouteAndTraceID attaches route pattern and Trace ID to the logger.
func LogRouteAndTraceID(l *slog.Logger, tracer trace.Tracer) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			_, span := tracer.Start(ctx, "middleware.LogRouteAndTraceID")
			defer span.End()

			start := time.Now()
			route, _ := contextx.RoutePatternFromContext(ctx)

			reqAttrs := []any{
				slog.String("pattern", route),
				slog.String("http_method", r.Method),
				slog.String("user_agent", r.Header.Get("User-Agent")),
			}

			// Extract path parameters
			if segments := routePattern.FindAllStringSubmatch(route, -1); len(segments) > 0 {
				pathSegs := []any{}
				for _, seg := range segments {
					if len(seg) == 2 {
						key := seg[1]
						pathSegs = append(pathSegs, slog.String(key, r.PathValue(key)))
					}
				}
				reqAttrs = append(reqAttrs, slog.Group("path_segs", pathSegs...))
			}

			sl := l
			if traceID := traces.GetTraceID(ctx); traceID != "" {
				sl = sl.With(slog.String("trace_id", traceID))
			}

			ww := &wrappedWriter{ResponseWriter: w}

			defer func() {
				dur := time.Since(start)

				span.SetAttributes(
					attribute.Int("http.response.status_code", ww.status),
					attribute.Int("http.response.body.size", ww.bytesWritten),
					attribute.Int64("http.response.duration_ms", dur.Milliseconds()),
				)

				reqAttrs = append(reqAttrs,
					slog.String("proto", r.Proto),
					slog.String("query", r.URL.RawQuery),
				)
				resAttrs := []any{
					slog.Int("bytes_written", ww.bytesWritten),
					slog.Int("status_code", ww.status),
					slog.Int64("duration", dur.Milliseconds()),
					slog.String("time", time.Now().Format(time.RFC3339)),
				}

				level := slog.LevelInfo
				if ww.status >= 500 || ww.status == 0 {
					level = slog.LevelError
				}

				sl.LogAttrs(ctx, level, "handler_finished",
					slog.Group("request", reqAttrs...),
					slog.Group("response", resAttrs...),
				)
			}()

			next.ServeHTTP(ww, r)
		})
	}
}

// PanicRecovery recovers from panics in an HTTP handler.
func PanicRecovery(l *slog.Logger, m *metrics.Metrics) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sl := l.With(
				slog.Group("request",
					slog.String("method", r.Method),
					slog.String("path", r.URL.Path),
				),
			)
			ctx := r.Context()

			defer func() {
				if rec := recover(); rec != nil {
					panicType := "Unknown"
					if err, ok := rec.(error); ok && errors.Is(err, http.ErrAbortHandler) {
						panicType = "ErrAbortHandler"
					}

					sl.LogAttrs(ctx, slog.LevelInfo, "panic_recovered",
						slog.Any("panic", panicType),
						slog.String("stack_trace", string(debug.Stack())),
					)
					m.Count(ctx, "panics_total", "panic="+panicType)

					panic(rec)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

// WithDependencies returns HTTP error if hard dependencies are unavailable.
func WithDependencies(l *slog.Logger, d deps.Dependencies) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if d.MySQLFailed || d.RedisFailed {
				sl := l.With(
					slog.Group("request",
						slog.String("method", r.Method),
						slog.String("path", r.URL.Path),
					),
				)
				httpx.WriteJSON(r.Context(), sl, w, http.StatusServiceUnavailable,
					map[string]string{"error": "Service Unavailable", "detail": "Missing dependencies"})
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// WithMetrics instruments HTTP requests with metrics.
func WithMetrics(m *metrics.Metrics, tracer trace.Tracer) Decorator {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			_, span := tracer.Start(ctx, "middleware.WithMetrics")
			defer span.End()

			routeOption := promhttp.WithLabelFromCtx("route", getRoute)
			routeAndTraceOptions := []promhttp.Option{
				routeOption,
				promhttp.WithExemplarFromContext(traceIDExemplar),
			}

			handler := promhttp.InstrumentHandlerCounter(
				m.RequestsTotal(),
				promhttp.InstrumentHandlerDuration(
					m.RequestDuration(),
					promhttp.InstrumentHandlerRequestSize(
						m.RequestSize(),
						promhttp.InstrumentHandlerResponseSize(
							m.ResponseSize(),
							next,
							routeOption,
						),
						routeOption,
					),
					routeAndTraceOptions...,
				),
				routeAndTraceOptions...,
			)

			handler.ServeHTTP(w, r)
		})
	}
}

// TraceRequestData wraps handler with OpenTelemetry instrumentation.
func TraceRequestData(next http.Handler) http.Handler {
	return otelhttp.NewHandler(next, "server",
		otelhttp.WithMessageEvents(otelhttp.ReadEvents, otelhttp.WriteEvents),
		otelhttp.WithFilter(func(req *http.Request) bool {
			return req.URL.Path != "/healthcheck"
		}),
		otelhttp.WithSpanNameFormatter(func(_ string, r *http.Request) string {
			if routePattern, ok := contextx.RoutePatternFromContext(r.Context()); ok {
				return routePattern
			}
			return fmt.Sprintf("%s %s", r.Method, r.URL.Path)
		}),
	)
}

// TraceResponseData sets span status from HTTP response codes.
func TraceResponseData(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ww := &wrappedWriter{ResponseWriter: w}
		span := trace.SpanFromContext(r.Context())

		if span.IsRecording() {
			if route, ok := contextx.RoutePatternFromContext(r.Context()); ok {
				segments := routePattern.FindAllStringSubmatch(route, -1)
				for _, seg := range segments {
					if len(seg) == 2 {
						key := seg[1]
						span.SetAttributes(attribute.String("http.path."+key, r.PathValue(key)))
					}
				}
			}
		}

		defer func() {
			if span.IsRecording() {
				switch {
				case ww.status >= http.StatusOK && ww.status < http.StatusBadRequest:
					span.SetStatus(codes.Ok, "")
				case ww.status >= http.StatusBadRequest:
					span.SetStatus(codes.Error, fmt.Sprintf("HTTP %d", ww.status))
				case ww.status == 0:
					span.SetStatus(codes.Error, "No HTTP status set")
				}
			}
		}()

		next.ServeHTTP(ww, r)
	})
}

func getRoute(ctx context.Context) string {
	if route, ok := contextx.RoutePatternFromContext(ctx); ok {
		return route
	}
	return ""
}

func traceIDExemplar(ctx context.Context) prometheus.Labels {
	if traceID := traces.GetTraceID(ctx); traceID != "" {
		return prometheus.Labels{"traceID": traceID}
	}
	return nil
}

// wrappedWriter saves status code and bytes written.
type wrappedWriter struct {
	http.ResponseWriter
	status       int
	bytesWritten int
}

func (ww *wrappedWriter) WriteHeader(status int) {
	ww.ResponseWriter.WriteHeader(status)
	ww.status = status
}

func (ww *wrappedWriter) Write(data []byte) (int, error) {
	if ww.status == 0 {
		ww.status = http.StatusOK
	}
	n, err := ww.ResponseWriter.Write(data)
	ww.bytesWritten += n
	return n, err
}
```

## README.md

```markdown
# internal/middleware

HTTP middleware pipeline for cross-cutting concerns.

## Available Middleware

| Middleware | Purpose |
|------------|---------|
| `PanicRecovery` | Catches panics, logs stack traces, records metrics |
| `AddRoutePattern` | Stores route pattern in context for logging/tracing |
| `TraceRequestData` | Creates OpenTelemetry spans with request data |
| `TraceResponseData` | Sets span status based on HTTP response code |
| `WithMetrics` | Records Prometheus request metrics |
| `WithDependencies` | Returns 503 if MySQL/Redis unavailable |
| `LogRouteAndTraceID` | Logs request/response with trace correlation |
| `InFlight` | Tracks concurrent request count |

## Usage

```go
pipeline := middleware.New(
    middleware.PanicRecovery(l, metric),
    middleware.AddRoutePattern(mux),
    middleware.TraceRequestData,
    middleware.TraceResponseData,
    middleware.WithMetrics(metric, tracer),
    middleware.WithDependencies(l, d),
    middleware.LogRouteAndTraceID(l, tracer),
    middleware.InFlight(metric, tracer),
)

mux.Handle("GET /items", pipeline.Decorate(handler))
```

## Middleware Order

Order matters! The middleware executes in reverse order of definition:
1. First defined = outermost (runs first on request, last on response)
2. Last defined = innermost (runs last on request, first on response)

Recommended order:
1. PanicRecovery (catch panics from all middleware)
2. AddRoutePattern (needed by tracing/logging)
3. TraceRequestData (create span early)
4. TraceResponseData (set span status)
5. WithMetrics (record metrics)
6. WithDependencies (fail fast if deps unavailable)
7. LogRouteAndTraceID (log with full context)
8. InFlight (track active requests)
```
