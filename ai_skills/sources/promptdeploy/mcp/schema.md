# MCP Server Definition Schema

Each `.yaml` file in this directory defines a single MCP server.

## Required Fields

| Field         | Type   | Description                              |
|---------------|--------|------------------------------------------|
| `name`        | string | Unique server identifier                 |
| `description` | string | Human-readable purpose of the server     |

## Transport

Exactly one transport must be specified:

### stdio (command + args)

| Field     | Type     | Description                        |
|-----------|----------|------------------------------------|
| `command` | string   | Path or name of the executable     |
| `args`    | string[] | Command-line arguments             |

### HTTP (url + headers)

| Field     | Type              | Description                    |
|-----------|-------------------|--------------------------------|
| `url`     | string            | HTTP endpoint URL              |
| `headers` | map[string,string] | HTTP headers for requests     |

## Optional Fields

| Field     | Type     | Default | Description                                                  |
|-----------|----------|---------|--------------------------------------------------------------|
| `env`     | map[string,string] | `{}` | Environment variables. Supports `${VAR}` syntax for referencing shell environment variables. |
| `scope`   | string   | `user`  | `user` (all projects) or `project` (current project only)    |
| `enabled` | bool     | `true`  | Set to `false` to disable without deleting the definition    |
| `only`    | string[] | `[]`    | If non-empty, only include this server for listed profiles   |
| `except`  | string[] | `[]`    | Exclude this server for listed profiles                      |

## Example

```yaml
name: my-server
description: Example MCP server
command: npx
args:
  - -y
  - "@example/mcp-server"
env:
  API_KEY: "${MY_API_KEY}"
scope: user
enabled: true
only:
  - claude
```

## Local Overrides

Files matching `*.local.yaml` are gitignored and can be used to override settings for local development.
