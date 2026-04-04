.PHONY: help smoke_tests deps_smoke docker_up docker_down docker_restart test_storage_only

# Default target
help:
	@echo "Available targets:"
	@echo "  make smoke_tests        - Run all smoke tests (starts docker-compose if needed)"
	@echo "  make docker_up          - Start docker-compose services for storage tests"
	@echo "  make docker_down        - Stop docker-compose services"
	@echo "  make docker_restart     - Restart docker-compose services"
	@echo "  make test_storage_only  - Run only storage tests (requires docker-compose)"
	@echo "  make deps_smoke         - Install optional deps for smoke tests (storage, faiss)"

# Docker compose file location (relative to project root)
DOCKER_COMPOSE_DIR := tests/smoke_tests
DOCKER_COMPOSE_FILE := $(DOCKER_COMPOSE_DIR)/docker-compose.yml

# Check if docker-compose services are running
check_docker:
	@cd $(DOCKER_COMPOSE_DIR) && (docker-compose ps 2>/dev/null || docker compose ps 2>/dev/null) | grep -q "Up" || (echo "⚠️  Docker services not running. Starting them..." && $(MAKE) docker_up)

# Start docker-compose services
docker_up:
	@echo "🚀 Starting docker-compose services for storage tests..."
	@cd $(DOCKER_COMPOSE_DIR) && (docker-compose up -d 2>/dev/null || docker compose up -d)
	@echo "⏳ Waiting for services to be healthy..."
	@sleep 5
	@cd $(DOCKER_COMPOSE_DIR) && for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30; do (docker-compose ps 2>/dev/null || docker compose ps 2>/dev/null) | grep -q "Up" && break; sleep 2; done
	@echo "✅ Docker services are ready"

# Stop docker-compose services
docker_down:
	@echo "🛑 Stopping docker-compose services..."
	@cd $(DOCKER_COMPOSE_DIR) && (docker-compose down 2>/dev/null || docker compose down)
	@echo "✅ Docker services stopped"

# Restart docker-compose services
docker_restart: docker_down docker_up

# Install optional deps required by smoke tests (storage, chunkers/vectordb)
deps_smoke:
	@echo "📦 Syncing optional dependencies for smoke tests..."
	@uv sync --extra storage --extra faiss
	@echo "✅ Dependencies ready"

# Run all smoke tests
smoke_tests: deps_smoke docker_up
	@echo "🧪 Running smoke tests..."
	@uv run pytest tests/smoke_tests -v --ignore=tests/smoke_tests/hitl/test_comprehensive_hitl.py --ignore=tests/smoke_tests/hitl/usage_durable_execution.py
	@echo "✅ Smoke tests completed"

# Run only storage tests (requires docker)
test_storage_only: deps_smoke docker_up
	@echo "🧪 Running storage tests only..."
	@uv run pytest tests/smoke_tests/memory -v
	@echo "✅ Storage tests completed"
