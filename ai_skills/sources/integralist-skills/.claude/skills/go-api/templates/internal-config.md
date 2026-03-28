# internal/config Template

Replace `{MODULE_PATH}` with your Go module path.

## config.go

```go
// internal/config/config.go

package config

import (
	"encoding/json"
	"errors"
	"fmt"
	"math"
	"os"
	"slices"

	"{MODULE_PATH}/internal/env"
)

// MaxPort represents the largest valid port number.
const MaxPort = math.MaxUint16

// Config contains all values necessary to construct and run the component.
type Config struct {
	// Addr is the API server address.
	Addr string `json:"addr"`
	// Environment is the cluster environment (e.g. dev, stg, prd).
	Environment env.Environment `json:"environment"`
	// Metrics is the host/port for the metrics server.
	Metrics Metrics `json:"metrics"`
	// MySQL is the database configuration.
	MySQL MySQL `json:"mysql"`
	// Redis is used to cache data.
	Redis Redis `json:"redis"`
	// Timeouts are API timeouts.
	Timeouts Timeouts `json:"timeouts"`
}

// Metrics contains the metric server address and port.
type Metrics struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

// MySQL contains the MySQL server connection details.
type MySQL struct {
	Host            string `json:"host"`
	Port            int    `json:"port"`
	User            string `json:"user"`
	DBName          string `json:"dbname"`
	MaxOpenConns    int    `json:"max_open_conns,omitempty"`
	MaxIdleConns    int    `json:"max_idle_conns,omitempty"`
	ConnMaxLifetime string `json:"conn_max_lifetime,omitempty"`
	ConnMaxIdleTime string `json:"conn_max_idle_time,omitempty"`
}

// Redis contains the Redis server address and port.
type Redis struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

// Timeouts contains the timeout details.
type Timeouts struct {
	APIReadTimeout  string `json:"api_read_timeout"`
	APIWriteTimeout string `json:"api_write_timeout"`
}

// Load reads JSON from cfgPath and returns a populated Config.
func Load(cfgPath string) (*Config, error) {
	var cfg Config
	file, err := os.ReadFile(cfgPath)
	if err != nil {
		return nil, fmt.Errorf("unable to open cfg file '%s': %w", cfgPath, err)
	}
	if err = json.Unmarshal(file, &cfg); err != nil {
		return nil, fmt.Errorf("unable to unmarshal cfg file '%s': %w", cfgPath, err)
	}
	return &cfg, nil
}

// Validate checks specific fields contain valid values.
func (cfg *Config) Validate() error {
	var result []error
	if cfg.Addr == "" {
		result = append(result, errors.New("missing Addr config"))
	}
	if cfg.Environment == "" {
		result = append(result, errors.New("missing Environment config"))
	}
	if !slices.Contains(env.All, cfg.Environment) {
		result = append(result, fmt.Errorf("invalid Environment config: %q", cfg.Environment))
	}
	if cfg.MySQL.Host == "" {
		result = append(result, errors.New("missing MySQL.Host config"))
	}
	if cfg.MySQL.Port <= 0 || cfg.MySQL.Port > MaxPort {
		result = append(result, fmt.Errorf("invalid MySQL.Port config: %d (must be 1-%d)", cfg.MySQL.Port, MaxPort))
	}
	if cfg.MySQL.User == "" {
		result = append(result, errors.New("missing MySQL.User config"))
	}
	if cfg.MySQL.DBName == "" {
		result = append(result, errors.New("missing MySQL.DBName config"))
	}
	if cfg.Redis.Host == "" {
		result = append(result, errors.New("missing Redis.Host config"))
	}
	if cfg.Redis.Port <= 0 || cfg.Redis.Port > MaxPort {
		result = append(result, fmt.Errorf("invalid Redis.Port config: %d (must be 1-%d)", cfg.Redis.Port, MaxPort))
	}
	if cfg.Metrics.Port != 0 && (cfg.Metrics.Port <= 0 || cfg.Metrics.Port > MaxPort) {
		result = append(result, fmt.Errorf("invalid Metrics.Port config: %d (must be 1-%d)", cfg.Metrics.Port, MaxPort))
	}
	return errors.Join(result...)
}
```

## README.md

```markdown
# internal/config

This package handles configuration loading and validation.

## Usage

```go
cfg, err := config.Load("./local/config/api.json")
if err != nil {
    return fmt.Errorf("failed to load config: %w", err)
}

if err := cfg.Validate(); err != nil {
    return fmt.Errorf("invalid config: %w", err)
}
```

## Adding New Configuration

1. Add the field to the `Config` struct with JSON tags
2. Add validation in `Validate()` if required
3. Update the local config file in `local/config/api.json`
```
