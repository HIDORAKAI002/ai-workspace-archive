# Node-RED Admin API Reference

## Authentication

If `httpAdminAuth` is configured in settings.js, include authentication headers:

```bash
# Basic Auth
curl -u admin:password http://localhost:1880/flows

# Bearer Token
curl -H "Authorization: Bearer <access_token>" http://localhost:1880/flows
```

## Flow Management

### GET /flows
Retrieve all flows configuration.

**Response:**
```json
{
  "flows": [...],      // Array of flow nodes
  "rev": "abc123"      // Revision ID for update operations
}
```

### POST /flows
Deploy complete flow configuration.

**Request:**
```json
{
  "flows": [...],      // Complete flow array
  "rev": "abc123"      // Optional: revision for conflict detection
}
```

**Headers:**
- `Node-RED-Deployment-Type`: full|nodes|flows|reload

### POST /flow
Add a new flow/tab.

**Request:**
```json
{
  "id": "optional-id",
  "label": "Flow Name",
  "nodes": [...],       // Nodes in this flow
  "configs": [...]      // Config nodes used by this flow
}
```

### GET /flow/:id
Get a specific flow configuration.

**Response:**
```json
{
  "id": "flow-id",
  "label": "Flow Name",
  "nodes": [...],
  "configs": [...]
}
```

### PUT /flow/:id
Update a specific flow.

**Request:**
```json
{
  "id": "flow-id",
  "label": "Updated Name",
  "nodes": [...],
  "configs": [...]
}
```

### DELETE /flow/:id
Delete a flow.

**Response:**
```json
{
  "removed": ["node-id-1", "node-id-2"]
}
```

## Node Management

### POST /nodes
Install a new node module.

**Request:**
```json
{
  "module": "node-red-contrib-example",
  "version": "1.0.0"    // Optional
}
```

### GET /nodes
List all installed nodes.

**Response:**
```json
[
  {
    "id": "node-red/inject",
    "name": "inject",
    "types": ["inject"],
    "enabled": true,
    "module": "node-red",
    "version": "3.0.0"
  }
]
```

### GET /nodes/:module
Get specific node module info.

### DELETE /nodes/:module
Uninstall a node module.

### PUT /nodes/:module
Enable/disable a node module.

**Request:**
```json
{
  "enabled": true
}
```

## Context Store

### GET /context/:scope
Get context data.

**Scopes:**
- `global`: Global context
- `flow/:flowId`: Flow context
- `node/:nodeId`: Node context

**Query Parameters:**
- `store`: Context store name (default: "default")

### GET /context/:scope/:key
Get specific context value.

### DELETE /context/:scope/:key
Delete context value.

## Settings

### GET /settings
Get runtime settings (publicly accessible).

**Response:**
```json
{
  "httpNodeRoot": "/",
  "version": "3.0.0",
  "context": {
    "default": "memory",
    "stores": ["memory", "file"]
  },
  "flowEncryptionType": "system",
  "user": {
    "username": "admin"
  }
}
```

## Authentication Endpoints

### POST /auth/token
Get access token.

**Request:**
```json
{
  "client_id": "node-red-editor",
  "grant_type": "password",
  "username": "admin",
  "password": "password",
  "scope": "read write"
}
```

**Response:**
```json
{
  "access_token": "token-string",
  "expires_in": 604800,
  "token_type": "Bearer"
}
```

### POST /auth/revoke
Revoke access token.

**Request:**
```json
{
  "token": "access-token"
}
```

## Library

### GET /library/flows
List saved flows in library.

### GET /library/flows/:path
Get specific library flow.

### POST /library/flows/:path
Save flow to library.

**Request:**
```json
{
  "flows": [...],
  "description": "Flow description"
}
```

## Debug

### GET /debug/view
Get debug messages (WebSocket endpoint also available).

### POST /debug/:nodeId/:state
Enable/disable debug node.

**State:** enable|disable

## UI Editor

### GET /red/*
Serve the Node-RED editor UI.

### GET /
Redirect to editor (if httpAdminRoot is set).

## Projects API (if enabled)

### GET /projects
List all projects.

### POST /projects
Create new project.

**Request:**
```json
{
  "name": "my-project",
  "summary": "Project description",
  "files": {
    "flow": "flows.json",
    "credentials": "flows_cred.json"
  },
  "git": {
    "remotes": {
      "origin": {
        "url": "https://github.com/user/repo.git"
      }
    }
  }
}
```

### GET /projects/:name
Get project details.

### PUT /projects/:name
Update project.

### DELETE /projects/:name
Delete project.

### PUT /projects/:name/stage
Stage files for commit.

**Request:**
```json
{
  "files": ["flows.json", "package.json"]
}
```

### POST /projects/:name/commit
Commit staged changes.

**Request:**
```json
{
  "message": "Commit message"
}
```

## Execution Control

### POST /inject/:nodeId
Trigger inject node programmatically.

**Response:**
```json
{
  "status": "ok"
}
```

## Health Check

### GET /diagnostics
Get system diagnostics (if enabled).

**Response:**
```json
{
  "version": "3.0.0",
  "nodejs": "18.0.0",
  "os": {
    "platform": "linux",
    "release": "5.10.0"
  },
  "runtime": {
    "modules": [...],
    "settings": {...}
  }
}
```

## Error Responses

### Error Format
```json
{
  "code": "error_code",
  "message": "Human readable message",
  "details": {}
}
```

### Common Error Codes
- `invalid_api_version`: API version mismatch
- `invalid_flow`: Flow validation failed
- `module_not_found`: Node module not found
- `not_found`: Resource not found
- `permission_denied`: Insufficient permissions
- `conflict`: Revision conflict
- `unexpected_error`: Internal server error

## WebSocket Endpoints

### /comms
Real-time communication for editor.

**Events:**
- `status`: Node status updates
- `debug`: Debug messages
- `notification`: System notifications

## Rate Limiting

API endpoints may be rate-limited based on settings:
- Default: 100 requests per 15 minutes
- Configurable via `rateLimit` in settings.js

## CORS Configuration

Configure in settings.js:
```javascript
httpNodeCors: {
  origin: "*",
  methods: "GET,PUT,POST,DELETE"
}
```

## Example Usage

### Deploy Flow via cURL
```bash
# Get current flows
FLOWS=$(curl -s http://localhost:1880/flows)

# Modify and deploy
curl -X POST http://localhost:1880/flows \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d "$FLOWS"
```

### Python Example
```python
import requests
import json

# Get flows
resp = requests.get('http://localhost:1880/flows')
config = resp.json()

# Add a new node
new_node = {
    "id": "generated-id",
    "type": "debug",
    "z": "flow-tab-id",
    "name": "New Debug",
    "x": 300,
    "y": 200,
    "wires": []
}
config['flows'].append(new_node)

# Deploy
requests.post(
    'http://localhost:1880/flows',
    json=config,
    headers={'Node-RED-Deployment-Type': 'nodes'}
)
```