FRONTEND := frontend
API      := backend/core_api
AGENT    := backend/core_agent

_NPM_STAMP := $(FRONTEND)/node_modules/.package-lock.json
_API_STAMP  := $(API)/.venv
_AGENT_STAMP := $(AGENT)/.venv

.PHONY: setup dev dev-web build dist-mac dist-win docker-build docker-up docker-down flush

$(_NPM_STAMP): $(FRONTEND)/package-lock.json
	npm --prefix $(FRONTEND) ci

$(_API_STAMP): $(API)/uv.lock
	uv sync --directory $(API)

$(_AGENT_STAMP): $(AGENT)/uv.lock
	uv sync --directory $(AGENT)

setup: $(_NPM_STAMP) $(_API_STAMP) $(_AGENT_STAMP)

dev: $(_NPM_STAMP) $(_API_STAMP) $(_AGENT_STAMP)
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	uv run --directory $(API) uvicorn cowork.server:app --reload \
		--reload-dir $(CURDIR)/$(API)/cowork \
		--reload-dir $(CURDIR)/$(AGENT)/anton & \
	npm --prefix $(FRONTEND) run dev

dev-web: $(_NPM_STAMP) $(_API_STAMP) $(_AGENT_STAMP)
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
	uv run --directory $(API) uvicorn cowork.server:app --reload \
		--reload-dir $(CURDIR)/$(API)/cowork \
		--reload-dir $(CURDIR)/$(AGENT)/anton & \
	cd $(FRONTEND) && BUILD_TARGET=web npm run dev:renderer -- --open

build: $(_NPM_STAMP)
	npm --prefix $(FRONTEND) run build

dist-mac: $(_NPM_STAMP)
	npm --prefix $(FRONTEND) run dist:mac

dist-win: $(_NPM_STAMP)
	npm --prefix $(FRONTEND) run dist:win

docker-build:
	docker compose build

docker-up:
	docker compose up

docker-down:
	docker compose down

# Wipe every local install + all app state, returning the machine to a
# pre-install state. Covers BOTH runtime models (the Makefile dev venvs
# AND the Electron app's `uv tool install cowork-server`) plus user data.
# Removes:
#   • cowork-server uv tool (and the legacy anton-agent tool)
#   • submodule venvs: $(API)/.venv, $(AGENT)/.venv
#   • ~/.anton   — provider keys / .env
#   • ~/.cowork  — database, hermes, projects
# The next `make setup` (or app launch) reinstalls from scratch.
# Set FORCE=1 to skip the confirmation prompt (CI / scripts).
flush:
	@echo "This will PERMANENTLY remove:"
	@echo "  • cowork-server uv tool (+ legacy anton-agent)"
	@echo "  • $(API)/.venv and $(AGENT)/.venv"
	@echo "  • ~/.anton   (provider keys / .env)"
	@echo "  • ~/.cowork  (database, hermes, projects)"
	@if [ "$(FORCE)" != "1" ]; then \
		read -p "Proceed? [y/N] " ans; [ "$$ans" = y ] || [ "$$ans" = Y ] || { echo "Aborted."; exit 1; }; \
	fi
	-uv tool uninstall cowork-server
	-uv tool uninstall anton-agent
	rm -rf $(API)/.venv $(AGENT)/.venv
	rm -rf $$HOME/.anton $$HOME/.cowork
	@echo "✓ Flushed. Run 'make setup' (or relaunch the app) for a fresh install."
