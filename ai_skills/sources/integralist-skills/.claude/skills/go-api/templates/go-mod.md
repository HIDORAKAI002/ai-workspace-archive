# go.mod Template

Replace `{MODULE_PATH}` with your Go module path (e.g., `github.com/myorg/myservice`).

```go
// go.mod

module {MODULE_PATH}

go 1.23

require (
	github.com/go-sql-driver/mysql v1.9.3
	github.com/google/uuid v1.6.0
	github.com/prometheus/client_golang v1.23.2
	github.com/redis/go-redis/v9 v9.17.2
	github.com/stretchr/testify v1.11.1
	github.com/veqryn/slog-dedup v0.6.0
	go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.64.0
	go.opentelemetry.io/otel v1.39.0
	go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp v1.39.0
	go.opentelemetry.io/otel/sdk v1.39.0
	go.opentelemetry.io/otel/trace v1.39.0
	google.golang.org/protobuf v1.36.11
)

tool (
	fillmore-labs.com/scopeguard
	github.com/mgechev/revive
	golang.org/x/tools/go/analysis/passes/nilness/cmd/nilness
	golang.org/x/vuln/cmd/govulncheck
	honnef.co/go/tools/cmd/staticcheck
	mvdan.cc/gofumpt
)
```

## Core Dependencies

| Package | Purpose |
|---------|---------|
| `github.com/go-sql-driver/mysql` | MySQL driver |
| `github.com/google/uuid` | UUID generation |
| `github.com/prometheus/client_golang` | Prometheus metrics |
| `github.com/redis/go-redis/v9` | Redis client |
| `github.com/stretchr/testify` | Test assertions |
| `github.com/veqryn/slog-dedup` | Deduplicate slog attributes |
| `go.opentelemetry.io/otel*` | OpenTelemetry tracing |
| `google.golang.org/protobuf` | Protocol Buffers |

## Development Tools

| Tool | Purpose |
|------|---------|
| `revive` | Go linter |
| `nilness` | Nil pointer analysis |
| `govulncheck` | Vulnerability scanning |
| `staticcheck` | Static analysis |
| `gofumpt` | Code formatting |
| `scopeguard` | Scope analysis |

## Initialization

After creating `go.mod`:

```bash
# Download dependencies
go mod download

# Tidy dependencies
go mod tidy

# Install tools
make tools-install
```
