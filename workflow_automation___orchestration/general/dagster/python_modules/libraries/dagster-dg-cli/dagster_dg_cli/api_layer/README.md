# Dagster Plus API Architecture

Highly recommend pointing your AI agent to this file and the [dagster plus schema](../cli/plus/schema.graphql) to do development in the CLI project. With these two pieces of context, it should be able to generate most of this code easily.

For a given noun you want to add, interrogate the schema, ensure that you are picking the most up-to-date queries, and follow the pattern described here.
For detailed testing documentation, troubleshooting, and advanced workflows, see [api_tests/README.md](../../dagster_dg_cli_tests/cli_tests/api_tests/README.md).

## Architectural Overview

This package implements a three-layer architecture: **CLI → REST-like API → GraphQL**

Each layer has distinct responsibilities:

- **CLI**: User interface and argument validation
- **REST API**: Business logic and REST semantics
- **GraphQL**: Backend communication

The goal is to provide an obvious mapping between CLI and REST semantics, setting us up to deploy a REST API on Dagster Plus in the future.
REST is a better interface for API consumption across organizations.

## Architecture Layers

### 1. CLI Layer (`dagster_dg_cli/cli/api/`)

User-facing commands with consistent interface:

```bash
dg api deployment list --json
dg api asset list --json
dg api asset get my-asset --json
```

Every command supports `--json` for scripting. The API is modeled on GitHub's `gh` CLI.

### 2. REST-like API Layer (`dagster_dg_cli/api_layer/`)

Intermediate abstraction providing REST semantics:

```
api_layer/
├── api/               # REST-like interface classes
│   ├── deployments.py # DgApiDeploymentApi
│   └── asset.py       # DgApiAssetApi
├── schemas/           # Pydantic models
│   ├── deployment.py  # Deployment, DeploymentListResponse
│   └── asset.py       # Asset, AssetListResponse
└── graphql_adapter/   # GraphQL translation
    ├── deployment.py  # list_deployments_via_graphql()
    └── asset.py       # list_assets_via_graphql()
```

### 3. GraphQL Layer (`dagster_dg_cli/utils/plus/gql_client.py`)

Handles backend communication with authentication and error handling.

## Request Flow

Example flow for `dg api asset list`:

```
User: dg api asset list --json
    ↓
CLI Layer (cli/api/asset.py)
    - Parse arguments
    - Check authentication
    ↓
API Layer (api_layer/api/asset.py)
    - DgApiAssetApi.list_assets()
    - Apply business logic
    ↓
GraphQL Adapter (graphql_adapter/asset.py)
    - list_assets_via_graphql()
    - Construct GraphQL query
    ↓
GraphQL Client
    - Send authenticated request
    - Return parsed response
```

## Naming Conventions

### API Classes

All API classes follow: `DgApi{Resource}Api`

- ✅ `DgApiDeploymentApi`
- ✅ `DgApiAssetApi`
- ✅ `DgApiRunApi`
- ❌ `DgPlusApiResourceApi` (old convention)

### Methods

REST-style method naming:

- `list_*` - Return multiple items
- `get_*` - Return single item by ID
- `create_*` - Create new resource
- `update_*` - Modify existing resource
- `delete_*` - Remove resource

### Schemas

Pydantic models for type safety:

- `{Resource}` - Single resource model
- `{Resource}ListResponse` - List response with pagination

## Testing Strategy

Each resource should be added to the general compliance tests and given individual unit tests.
For detailed testing documentation, troubleshooting, and advanced workflows, see [api_tests/README.md](../../dagster_dg_cli_tests/cli_tests/api_tests/README.md).

### Compliance Tests

Tests automatically validate:

- Method naming conventions
- Type signatures
- Response consistency
- Parameter patterns

### Unit Tests

The unit tests rely on scenarios, recoded graphql responses, and output snapshots.

To update tests when logic changes:

```bash
# Re-record responses (when API behavior changes)
dagster-dev dg-api-record asset --recording success_list_assets

# Update snapshots (when CLI output changes)
pytest api_tests/asset_tests/ --snapshot-update
```

## Adding A New Resource

In this example, we'll be implementing a `run` resource.

### Step 1: Define Schema

```python
# schemas/run.py
from pydantic import BaseModel

class Run(BaseModel):
    id: str
    status: str
    started_at: str

class RunListResponse(BaseModel):
    runs: list[Run]
    cursor: str | None = None
```

### Step 2: Create GraphQL Adapter

```python
# graphql_adapter/run.py
def list_runs_via_graphql(config, limit=None):
    query = """
    query {
        runs(limit: $limit) {
            nodes { id status startedAt }
            cursor
        }
    }
    """
    # Execute and transform response
```

### Step 3: Implement API Class

```python
# api/runs.py
class DgApiRunApi:
    def __init__(self, config):
        self.config = config

    def list_runs(self, limit: int = None) -> RunListResponse:
        return list_runs_via_graphql(self.config, limit)
```

### Step 4: Add CLI Command

```python
# cli/api/run.py
@click.group("run")
def run_group():
    """Manage runs."""
    pass

@run_group.command("list")
@click.option("--json", is_flag=True)
def list_runs(json):
    api = DgApiRunApi(config)
    response = api.list_runs()
    # Output handling
```

### Step 5: Add Tests

1. Add to the compliance tests `dagster_dg_cli_tests/cli_tests/api_tests/test_rest_compliance.py`:

```diff
...
from dagster_dg_cli.api_layer.api.asset import DgApiAssetApi
from dagster_dg_cli.api_layer.api.deployments import DgApiDeploymentApi
+ from dagster_dg_cli.api_layer.api.run import DgApiRunApi

...

ALL_API_CLASSES = [
    DgApiDeploymentApi,
    DgApiAssetApi,
+     DgApiRunApi,
]
```

2. **Add test scenario** in `api_tests/run_tests/scenarios.yaml`:

```yaml
success_list_runs:
  command: "dg api run list --json"
```

3. **Record GraphQL responses:**

```bash
dagster-dev dg-api-record run list --recording success_list_runs
```

4. **Generate snapshots:**

```bash
pytest api_tests/run_tests/ --snapshot-update
```

## Best Practices

1. **Type Safety**: Always use Pydantic models for request/response
2. **Error Handling**: Let GraphQL errors bubble up naturally
3. **Pagination**: Include cursor in list responses
4. **Testing**: Record real GraphQL responses for fixtures
5. **Documentation**: Update this README when adding resources

## Common Patterns

### Pagination

```python
class ResourceListResponse(BaseModel):
    resources: list[Resource]
    cursor: str | None = None
    has_more: bool = False
```

### Error Responses

GraphQL errors are automatically handled by the client and converted to appropriate CLI output.

### Authentication

Authentication is handled by `DagsterPlusCliConfig` and passed through all layers automatically.
