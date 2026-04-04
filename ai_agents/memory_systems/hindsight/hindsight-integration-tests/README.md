# Hindsight Integration Tests

E2E and integration tests for Hindsight API that require a running server.

## Test Types

### 1. Tests with External Server
Tests like `test_mcp_e2e.py` expect a server to already be running.

**Running:**
```bash
# Start the API server
./scripts/dev/start-api.sh

# Run tests
cd hindsight-integration-tests
HINDSIGHT_API_URL=http://localhost:8888 uv run pytest tests/test_mcp_e2e.py -v
```

### 2. Self-Contained Tests
Tests like `test_base_path_deployment.py` manage their own server lifecycle and use docker-compose.

**Running:**
```bash
cd hindsight-integration-tests

# Run with pytest
uv run pytest tests/test_base_path_deployment.py -v

# Or run directly for nice output
uv run python tests/test_base_path_deployment.py
```

**Requirements:**
- Docker and docker-compose installed (for reverse proxy test)
- No nginx required on host!

**What it tests:**
- ✅ API with base path (direct server)
- ✅ Full reverse proxy via docker-compose + Nginx
- ✅ Regression: API without base path
- ✅ Full retain/recall workflow

These tests:
- Start their own API servers on dedicated ports (18888-18891)
- Use docker-compose to test actual deployment scenarios
- Run in parallel with other tests (no port conflicts)
- Clean up automatically

## Running All Tests

```bash
cd hindsight-integration-tests
uv run pytest tests/ -v
```

This runs both types. Self-contained tests won't conflict with the external server.

## Environment Variables

- `HINDSIGHT_API_URL` - Base URL for external-server tests (default: `http://localhost:8888`)
