# internal/logx Template

Structured logging wrapper using `log/slog`.

## log.go

```go
// internal/logx/log.go

package logx

import (
	"context"
	"io"
	"log"
	"log/slog"
	"os"

	slogdedup "github.com/veqryn/slog-dedup"
)

// contextKey is used to store a logger in a context.
type contextKey struct{}

var (
	// ContextKey is used to store a logger in a context.
	ContextKey = contextKey{}

	// Level allows dynamically changing the output level.
	// Defaults to slog.LevelInfo.
	Level = new(slog.LevelVar)

	// AppName is the application name for logging.
	AppName = "unknown"
	// AppRepo is the repository URL for logging.
	AppRepo = "unknown"
	// AppVersion is the application version for logging.
	AppVersion = "unknown"
)

// New returns a slog.Logger configured for stdout.
func New() *slog.Logger {
	return NewWithOutputLevel(os.Stdout, Level)
}

// NewWithOutput returns a slog.Logger configured with an output writer.
func NewWithOutput(w io.Writer) *slog.Logger {
	opts := defaultOptions()
	attrs := defaultAttrs()
	return slog.New(
		slogdedup.NewOverwriteHandler(
			slog.NewJSONHandler(w, opts).WithAttrs(attrs),
			nil,
		),
	)
}

// NewWithOutputLevel returns a slog.Logger configured with an output writer and Level.
func NewWithOutputLevel(w io.Writer, l slog.Leveler) *slog.Logger {
	opts := defaultOptions()
	opts.Level = l
	attrs := defaultAttrs()
	return slog.New(
		slogdedup.NewOverwriteHandler(
			slog.NewJSONHandler(w, opts).WithAttrs(attrs),
			nil,
		),
	)
}

// Adapt returns a log.Logger for use with packages not yet compatible with log/slog.
func Adapt(l *slog.Logger, level slog.Level) *log.Logger {
	return slog.NewLogLogger(l.Handler(), level)
}

// FromContext returns the logger attached to a context.
func FromContext(ctx context.Context) *slog.Logger {
	logger, ok := ctx.Value(ContextKey).(*slog.Logger)
	if !ok {
		logger = New()
	}
	return logger
}

// defaultOptions defines default logger options.
func defaultOptions() *slog.HandlerOptions {
	return &slog.HandlerOptions{
		AddSource:   true,
		ReplaceAttr: slogReplaceAttr,
		Level:       Level,
	}
}

// defaultAttrs defines default logger attributes.
func defaultAttrs() []slog.Attr {
	return []slog.Attr{
		slog.Group("app",
			slog.String("name", AppName),
			slog.String("repo", AppRepo),
			slog.String("version", AppVersion),
		),
	}
}

// slogReplaceAttr adjusts the log output.
func slogReplaceAttr(groups []string, a slog.Attr) slog.Attr {
	// Limit application of these rules only to top-level keys
	if len(groups) == 0 {
		// Set time zone to UTC
		if a.Key == slog.TimeKey {
			a.Value = slog.TimeValue(a.Value.Time().UTC())
			return a
		}
		// Use event as the default MessageKey, remove if empty
		if a.Key == slog.MessageKey {
			a.Key = "event"
			if a.Value.String() == "" {
				return slog.Attr{}
			}
			return a
		}
	}

	// Ensures error key is logged as err for consistency
	if a.Key == "error" {
		a.Key = "err"
	}

	// Remove error key=value when error is nil
	if a.Equal(slog.Any("err", error(nil))) {
		return slog.Attr{}
	}

	// Present durations as milliseconds
	switch a.Key {
	case "dur", "delay", "p95", "previous_p95", "remaining", "max_wait":
		a.Value = slog.Float64Value(a.Value.Duration().Seconds() * 1000)
	}

	return a
}
```

## interface.go

```go
// internal/logx/interface.go

package logx

import (
	"context"
	"log/slog"
)

// Logger interface abstracts logging operations for testability.
type Logger interface {
	LogAttrs(ctx context.Context, level slog.Level, msg string, attrs ...slog.Attr)
}
```

## README.md

```markdown
# internal/logx

Structured logging wrapper using Go's `log/slog` package.

## Features

- JSON output with UTC timestamps
- Build info automatically attached to all logs
- Deduplication of repeated attributes
- Dynamic log level changes
- Context-based logger propagation

## Usage

### Basic Logging

```go
logger := logx.New()

logger.LogAttrs(ctx, slog.LevelInfo, "create_config",
    slog.String("config_id", configID),
    slog.String("customer_id", customerID),
)
```

### Error Logging

```go
if err != nil {
    logger.LogAttrs(ctx, slog.LevelError, "create_config",
        slog.String("config_id", configID),
        slog.Any("err", err),
    )
}
```

### Grouped Attributes

```go
logger.LogAttrs(ctx, slog.LevelInfo, "handler_finished",
    slog.Group("request",
        slog.String("method", r.Method),
        slog.String("path", r.URL.Path),
    ),
    slog.Group("response",
        slog.Int("status_code", status),
        slog.Int64("duration_ms", dur.Milliseconds()),
    ),
)
```

### Changing Log Level

```go
logx.Level.Set(slog.LevelDebug)
```

### Setting App Info

```go
logx.AppName = "my-service"
logx.AppRepo = "github.com/myorg/my-service"
logx.AppVersion = "abc123"
```

## Output Format

```json
{
  "time": "2024-01-15T10:30:00.000Z",
  "level": "INFO",
  "event": "create_config",
  "config_id": "cfg_123",
  "app": {
    "name": "my-service",
    "repo": "github.com/myorg/my-service",
    "version": "abc123"
  }
}
```

## Conventions

- Use `event` (not `msg`) for the log message
- Use `err` (not `error`) for error values
- Use `slog.LogAttrs` for better performance
- Create scoped loggers with `.With()` for request-specific context
```
