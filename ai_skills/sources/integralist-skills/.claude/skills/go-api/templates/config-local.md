# Local Configuration Template

Replace `{SERVICE_NAME}` and `{SERVICE_NAME_SNAKE}` with your service name.

```json
// local/config/api.json

{
  "addr": ":8080",
  "environment": "local",
  "metrics": {
    "host": "",
    "port": 8447
  },
  "mysql": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "appuser",
    "dbname": "{SERVICE_NAME_SNAKE}",
    "max_open_conns": 25,
    "max_idle_conns": 10,
    "conn_max_lifetime": "5m",
    "conn_max_idle_time": "1m"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "timeouts": {
    "api_read_timeout": "10s",
    "api_write_timeout": "10s"
  }
}
```

## Configuration Fields

| Field | Description |
|-------|-------------|
| `addr` | API server address (`:8080` for local) |
| `environment` | Environment name (`local`, `dev`, `stg`, `prd`) |
| `metrics.port` | Prometheus metrics endpoint port |
| `mysql.*` | MySQL connection settings |
| `redis.*` | Redis connection settings |
| `timeouts.*` | HTTP server timeouts |
