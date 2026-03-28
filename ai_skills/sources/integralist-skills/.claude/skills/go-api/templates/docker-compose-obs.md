# Observability Stack Docker Compose Template

Complete local observability stack with Grafana, Tempo, Loki, Prometheus, and Promtail.

Replace `{SERVICE_NAME}` with your service name.

## Docker Compose

```yaml
# local/observability/docker-compose.yaml

services:
  tempo:
    image: grafana/tempo:latest
    platform: linux/arm64
    command: ["-config.file=/etc/tempo.yaml"]
    volumes:
      - ./tempo.yaml:/etc/tempo.yaml
      - ./overrides.yaml:/etc/overrides.yaml
      - ./tempo-data:/tmp/tempo
    ports:
      - "14268:14268" # jaeger ingest
      - "3200:3200"   # tempo
      - "9095:9095"   # tempo grpc
      - "4317:4317"   # otlp grpc
      - "4318:4318"   # otlp http
      - "9411:9411"   # zipkin

  prometheus:
    image: prom/prometheus:latest
    platform: linux/arm64
    user: root
    command:
      - --config.file=/etc/prometheus.yaml
      - --web.enable-remote-write-receiver
      - --enable-feature=exemplar-storage
      - --storage.tsdb.wal-compression
      - --storage.tsdb.retention.time=1d
    volumes:
      - ./prometheus.yaml:/etc/prometheus.yaml
      - /var/run/docker.sock:/var/run/docker.sock
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:main
    platform: linux/arm64
    volumes:
      - ./grafana.ini:/etc/grafana/grafana.ini
      - ./datasources.yaml:/etc/grafana/provisioning/datasources/datasources.yaml
      - ./dashboards.yaml:/etc/grafana/provisioning/dashboards/dashboards.yaml
      - ./dashboards:/etc/grafana/dashboards
      - grafana_data:/var/lib/grafana
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_AUTH_DISABLE_LOGIN_FORM=true
      - GF_TRACING_OPENTELEMETRY_OTLP_ADDRESS=tempo:4317
    ports:
      - "3000:3000"

  loki:
    image: grafana/loki:latest
    platform: linux/arm64
    volumes:
      - ./loki.yaml:/etc/loki/local-config.yaml
      - loki_data:/loki
    command:
      - -config.file=/etc/loki/local-config.yaml
      - -table-manager.retention-period=1d
      - -table-manager.retention-deletes-enabled=true
    ports:
      - "3100:3100"

  promtail:
    image: grafana/promtail:latest
    platform: linux/arm64
    volumes:
      - ./promtail.yml:/etc/promtail/config.yml
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/host/logs:ro
      - promtail_data:/tmp/
    command: -config.file=/etc/promtail/config.yml
    ports:
      - "9080:9080"

volumes:
  prometheus_data:
  tempo_data:
  loki_data:
  promtail_data:
  grafana_data:
```

## Tempo Configuration

```yaml
# local/observability/tempo.yaml

stream_over_http_enabled: true
server:
  http_listen_port: 3200
  log_level: info

query_frontend:
  search:
    duration_slo: 5s
    throughput_bytes_slo: 1.073741824e+09
  trace_by_id:
    duration_slo: 5s

distributor:
  receivers:
    jaeger:
      protocols:
        thrift_http:
          endpoint: "tempo:14268"
        grpc:
          endpoint: "tempo:14250"
        thrift_binary:
          endpoint: "tempo:6832"
        thrift_compact:
          endpoint: "tempo:6831"
    zipkin:
      endpoint: "tempo:9411"
    otlp:
      protocols:
        http:
          endpoint: "tempo:4318"
        grpc:
          endpoint: "tempo:4317"
    opencensus:
      endpoint: "tempo:55678"

ingester:
  max_block_duration: 5m

compactor:
  compaction:
    block_retention: 1h

metrics_generator:
  registry:
    external_labels:
      source: tempo
      cluster: docker-compose
  storage:
    path: /tmp/tempo/generator/wal
    remote_write:
      - url: http://prometheus:9090/api/v1/write
        send_exemplars: true

storage:
  trace:
    backend: local
    wal:
      path: /tmp/tempo/wal
    local:
      path: /tmp/tempo/blocks

overrides:
  defaults:
    metrics_generator:
      processors: [service-graphs, span-metrics]
```

## Tempo Overrides

```yaml
# local/observability/overrides.yaml

overrides:
  "single-tenant":
    search_tags_allow_list:
      - "instance"
    ingestion_rate_strategy: "local"
    ingestion_rate_limit_bytes: 15000000
    ingestion_burst_size_bytes: 20000000
    max_traces_per_user: 10000
    max_global_traces_per_user: 0
    max_bytes_per_trace: 50000
    max_search_bytes_per_trace: 0
    max_bytes_per_tag_values_query: 5000000
    block_retention: 0s
```

## Prometheus Configuration

```yaml
# local/observability/prometheus.yaml

global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "{SERVICE_NAME}-api"
    static_configs:
      - targets:
          - "host.docker.internal:8447"
  - job_name: docker_containers
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ["__meta_docker_container_name"]
        regex: "/(.*)"
        target_label: "container"
      - source_labels:
          ["__meta_docker_container_label_com_docker_compose_service"]
        target_label: "job"
      - source_labels:
          [__metrics_path__, __meta_docker_container_label_metrics_path]
        separator: ;
        regex: (.+);(.+)
        target_label: __metrics_path__
        replacement: $2
        action: replace
```

## Loki Configuration

```yaml
# local/observability/loki.yaml

auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

analytics:
  reporting_enabled: false
```

## Promtail Configuration

```yaml
# local/observability/promtail.yml

server:
  log_level: info
  http_listen_port: 9080
  grpc_listen_port: 9095

clients:
  - url: http://loki:3100/loki/api/v1/push

positions:
  filename: /tmp/positions.yaml

scrape_configs:
  - job_name: flog_scrape
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ["__meta_docker_container_name"]
        regex: "/(.*)"
        target_label: "container"
      - source_labels: ["__meta_docker_container_log_stream"]
        target_label: "logstream"
      - source_labels:
          ["__meta_docker_container_label_com_docker_compose_service"]
        target_label: "job"

  - job_name: {SERVICE_NAME}_host_logs
    static_configs:
      - targets:
          - localhost
        labels:
          job: {SERVICE_NAME}-api
          __path__: /host/logs/*.log
    pipeline_stages:
      - json:
          expressions:
            timestamp: time
            level: level
            message: msg
            event: event
            app_name: "app.name"
      - timestamp:
          source: timestamp
          format: RFC3339Nano
      - template:
          source: service_name
          template: "{{ .app_name }}"
      - labels:
          level:
          event:
          service_name:
```

## Grafana Configuration

```ini
# local/observability/grafana.ini

[feature_toggles]
enable = tempoSearch tempoBackendSearch

[alerting]
enabled = false

[unified_alerting]
enabled = false

[analytics]
reporting_enabled = false
```

## Grafana Datasources

```yaml
# local/observability/datasources.yaml

apiVersion: 1

datasources:
- name: Prometheus
  type: prometheus
  uid: prometheus
  access: proxy
  orgId: 1
  url: http://prometheus:9090
  basicAuth: false
  isDefault: true
  version: 1
  editable: false
  jsonData:
    exemplarTraceIdDestinations:
    - name: traceID
      datasourceUid: tempo
- name: 'Tempo'
  type: tempo
  access: proxy
  orgId: 1
  url: http://tempo:3200
  basicAuth: false
  isDefault: false
  version: 1
  editable: false
  apiVersion: 1
  uid: tempo
- name: Loki
  type: loki
  uid: loki
  access: proxy
  orgId: 1
  url: http://loki:3100
  basicAuth: false
  isDefault: false
  version: 1
  editable: true
  apiVersion: 1
  jsonData:
    derivedFields:
      - name: TraceID
        datasourceUid: tempo
        matcherRegex: (?:traceID|trace_id)=(\w+)
        url: $${__value.raw}
```

## Grafana Dashboards Provider

```yaml
# local/observability/dashboards.yaml

apiVersion: 1
providers:
- name: 'dashboards'
  orgId: 1
  folder: ''
  type: 'file'
  disableDeletion: true
  editable: false
  options:
    path: '/etc/grafana/dashboards'
```

## Usage

After starting with `make obs-start`:

- **Grafana**: http://localhost:3000 (auto-login as Admin)
- **Prometheus**: http://localhost:9090
- **Tempo**: http://localhost:3200
- **Loki**: http://localhost:3100
