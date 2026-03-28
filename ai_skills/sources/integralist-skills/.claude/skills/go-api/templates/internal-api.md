# internal/api Template

Replace `{SERVICE_NAME}` with your service name (kebab-case), `{SERVICE_NAME_PASCAL}` with PascalCase, and `{MODULE_PATH}` with your Go module path.

## api.go

```go
// internal/api/api.go

package api

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"go.opentelemetry.io/otel"

	"{MODULE_PATH}/internal/config"
	"{MODULE_PATH}/internal/contextx"
	"{MODULE_PATH}/internal/deps"
	"{MODULE_PATH}/internal/httpx"
	"{MODULE_PATH}/internal/metrics"
	"{MODULE_PATH}/internal/middleware"
	"{MODULE_PATH}/internal/mysql"
	"{MODULE_PATH}/internal/redis"
	"{MODULE_PATH}/internal/traces"
)

var (
	apiReadTimeout  = time.Duration(10) * time.Second
	apiWriteTimeout = time.Duration(10) * time.Second
	component       = "api"
)

// BuildInfo holds build-time information.
type BuildInfo struct {
	Version   string
	GitCommit string
	BuildDate string
	GoVersion string
}

// DefaultBuildInfo is used when build info is not injected.
var DefaultBuildInfo = BuildInfo{
	Version:   "dev",
	GitCommit: "unknown",
	BuildDate: "unknown",
	GoVersion: "unknown",
}

// Run starts the API server.
func Run(l *slog.Logger, cfg *config.Config, buildInfo BuildInfo) error {
	ctx := contextx.WithComponent(context.Background(), component)

	d := deps.Dependencies{}

	// Initialize tracing
	traceShutdown, _, err := traces.New(ctx, "{SERVICE_NAME}-"+component)
	if err != nil {
		err = fmt.Errorf("unable to start tracing: %w", err)
		l.LogAttrs(ctx, slog.LevelError, "trace_create", slog.Any("err", err))
	}
	defer func() {
		if traceShutdown != nil {
			if shutdownErr := traceShutdown(context.WithoutCancel(ctx)); shutdownErr != nil {
				l.LogAttrs(ctx, slog.LevelError, "trace_shutdown", slog.Any("err", shutdownErr))
			}
		}
	}()

	// Create metrics server
	registry := prometheus.NewRegistry()
	metric := metrics.New(registry, component, l)
	createMetricStore(metric, component)
	ms := metric.StartServer(ctx, l, cfg.Metrics.Host, cfg.Metrics.Port)

	// Create Redis client
	redisClient, err := redis.NewClient(ctx, l, cfg)
	if err != nil {
		werr := fmt.Errorf("failed to create redis client: %w", err)
		l.LogAttrs(ctx, slog.LevelError, "redis_create", slog.Any("err", werr))
		d.RedisFailed = true
	}
	_ = redisClient // Use in your handlers

	// Create MySQL connection
	db, err := mysql.New(ctx, cfg.MySQL, l)
	if err != nil {
		werr := fmt.Errorf("unable to start mysql: %w", err)
		l.LogAttrs(ctx, slog.LevelError, "mysql_create", slog.Any("err", werr))
		d.MySQLFailed = true
	} else {
		defer db.Close()
	}

	// Create middleware pipeline
	middlewareTracer := otel.Tracer("internal.middleware")
	muxAPI := http.NewServeMux()
	pipeline := middleware.New(
		middleware.PanicRecovery(l, metric),
		middleware.AddRoutePattern(muxAPI),
		middleware.TraceRequestData,
		middleware.TraceResponseData,
		middleware.WithMetrics(metric, middlewareTracer),
		middleware.WithDependencies(l, d),
		middleware.LogRouteAndTraceID(l, middlewareTracer),
		middleware.InFlight(metric, middlewareTracer),
	)
	hc := middleware.New(metric.WithHealthCheckMetrics)
	_ = pipeline // Use when registering routes

	// Register routes
	muxAPI.Handle("GET /healthcheck", hc.Decorate(healthcheck(l, buildInfo)))

	// TODO: Register your domain handlers here
	// Example:
	// domainHandlers := domain.NewHandlers(l, metric, businessLayer)
	// domainHandlers.RegisterRoutes(muxAPI, pipeline, cfg)

	// Override timeouts from config
	if cfg.Timeouts.APIReadTimeout != "" {
		if d, err := time.ParseDuration(cfg.Timeouts.APIReadTimeout); err == nil {
			apiReadTimeout = d
		}
	}
	if cfg.Timeouts.APIWriteTimeout != "" {
		if d, err := time.ParseDuration(cfg.Timeouts.APIWriteTimeout); err == nil {
			apiWriteTimeout = d
		}
	}

	s := http.Server{
		Addr:         cfg.Addr,
		Handler:      muxAPI,
		ReadTimeout:  apiReadTimeout,
		WriteTimeout: apiWriteTimeout,
	}

	// Handle graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		signalType := <-quit
		shutdownCtx := context.Background()

		l.LogAttrs(shutdownCtx, slog.LevelWarn, "api_shutdown", slog.String("signal", signalType.String()))
		if err := s.Shutdown(shutdownCtx); err != nil {
			err = fmt.Errorf("unable to gracefully stop API server: %w", err)
			l.LogAttrs(shutdownCtx, slog.LevelError, "api_shutdown", slog.Any("err", err))
		}

		l.LogAttrs(shutdownCtx, slog.LevelWarn, "metrics_shutdown", slog.String("signal", signalType.String()))
		if err := ms.Shutdown(shutdownCtx); err != nil {
			err = fmt.Errorf("unable to gracefully stop metrics server: %w", err)
			l.LogAttrs(shutdownCtx, slog.LevelError, "metrics_shutdown", slog.Any("err", err))
		}
	}()

	l.LogAttrs(ctx, slog.LevelInfo, "api_start")

	if err := s.ListenAndServe(); err != nil {
		if errors.Is(err, http.ErrServerClosed) {
			l.LogAttrs(ctx, slog.LevelInfo, "api_serve",
				slog.String("status", "stopped"),
				slog.Any("err", err),
			)
			return nil
		}
		err = fmt.Errorf("api server failed to listen and serve requests: %w", err)
		l.LogAttrs(ctx, slog.LevelError, "api_serve", slog.Any("err", err))
		return err
	}

	return nil
}

// healthcheck returns an http.Handler that responds with application status.
func healthcheck(l *slog.Logger, buildInfo BuildInfo) http.Handler {
	startTime := time.Now()
	hostname, _ := os.Hostname()
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		response := map[string]string{
			"build_date": buildInfo.BuildDate,
			"go_version": buildInfo.GoVersion,
			"hostname":   hostname,
			"launch":     startTime.Format(time.RFC3339),
			"uptime":     time.Since(startTime).Truncate(time.Second).String(),
			"version":    buildInfo.Version,
			"git_commit": buildInfo.GitCommit,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(response); err != nil {
			l.LogAttrs(r.Context(), slog.LevelError,
				"failed to write healthcheck response", slog.Any("err", err))
		}
	})
}

// createMetricStore registers all metrics for this application.
func createMetricStore(m *metrics.Metrics, component string) {
	m.StoreCreate(&metrics.Store{
		Component: component,
		Counters:  []string{},
		CounterVecs: [][]string{
			{"api_operations_total", "endpoint", "method", "result"},
			{"db_operations_total", "operation", "table", "result"},
			{"cache_operations_total", "operation", "cache_type", "result"},
			{"panics_total", "panic"},
		},
		Histograms: []string{},
		HistogramVecs: [][]string{
			{"db_operation_duration_seconds", "operation", "table", "result"},
			{"cache_operation_duration_seconds", "operation", "result"},
			{"service_operation_duration_seconds", "operation", "result"},
		},
	})
}
```

## README.md

```markdown
# internal/api

This package contains the main API server setup including:

- HTTP server configuration and lifecycle management
- Graceful shutdown handling
- Middleware pipeline assembly
- Route registration
- Health check endpoint
- Metrics store initialization

## Usage

The `Run` function is called from `cmd/api/main.go` to start the server:

```go
if err := api.Run(logger, cfg, buildInfo); err != nil {
    logger.LogAttrs(ctx, slog.LevelError, "api_run", slog.Any("err", err))
    os.Exit(1)
}
```

## Middleware Pipeline

The middleware executes in order:
1. PanicRecovery - Catches panics and logs them
2. AddRoutePattern - Stores route pattern in context
3. TraceRequestData - Creates OpenTelemetry spans
4. TraceResponseData - Sets span status from response
5. WithMetrics - Records request metrics
6. WithDependencies - Checks MySQL/Redis availability
7. LogRouteAndTraceID - Structured request logging
8. InFlight - Tracks concurrent requests

## Adding New Routes

Register handlers in the `Run` function after creating the middleware pipeline.
```
