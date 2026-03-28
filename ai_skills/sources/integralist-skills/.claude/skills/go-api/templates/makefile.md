# Makefile Template

Replace `{SERVICE_NAME}` with your service name (kebab-case).
Replace `{SERVICE_NAME_SNAKE}` with your service name (snake_case).

```makefile
.DEFAULT_GOAL := run
PROJECT_APP_NAME ?= {SERVICE_NAME}
PROJECT_API_COMPONENT_NAME ?= {SERVICE_NAME}-api
SHELL := /usr/bin/env bash
TEST_ARGS ?= ./...
TOOLS = \
	github.com/mgechev/revive \
	golang.org/x/tools/go/analysis/passes/nilness/cmd/nilness \
	golang.org/x/vuln/cmd/govulncheck \
	honnef.co/go/tools/cmd/staticcheck \
	mvdan.cc/gofumpt \
	fillmore-labs.com/scopeguard
VERSION = $(shell git rev-parse HEAD || echo unknown-revision)

# ANSI escape codes for colourizing output.
bold_red=\033[1;31m
bold_yellow=\033[1;33m
bold_green=\033[1;32m
reset=\033[0m

# Check that given variables are set and all have non-empty values.
check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
        $(error Undefined $1$(if $2, ($2))$(if $(value @), \
                required by target `$@')))

# hl is a program that parses JSON structured logs.
hl := hl -P -F -e -t "%Y.%m.%d %H:%M:%S.%3N" --flatten never

.PHONY: help
help: ## Displays list of Makefile targets and documented variables
	@echo "Targets:"
	@MAX_LEN_TARGET=$$(grep -h -E '^[0-9a-zA-Z_.-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "; max=0} {len=length($$1); if (len>max) max=len} END {print max}'); \
	grep -h -E '^[0-9a-zA-Z_.-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk -v max_len="$$MAX_LEN_TARGET" 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-" max_len "s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Variables:"
	@MAX_LEN_VAR=$$(grep -h -E '^[0-9a-zA-Z_.-]+\s[?:]?=.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = "[?:]?=.*?## "; max=0} {len=length($$1); if (len>max) max=len} END {print max}'); \
	grep -h -E '^[0-9a-zA-Z_.-]+\s[?:]?=.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk -v max_len="$$MAX_LEN_VAR" 'BEGIN {FS = "[?:]?=.*?## "}; {printf "  \033[36m%-" max_len "s\033[0m %s\n", $$1, $$2}'

.PHONY: check-container-runtime
check-container-runtime:  ## Check the container runtime (docker) is running
	@docker info > /dev/null 2>&1 || (echo "Docker is not running. Please start Docker." && exit 1)

.PHONY: fmt
fmt: ## Format all Go files using gofumpt
	go tool gofumpt -w .

.PHONY: lint-all
lint-all: lint-govet lint-govul lint-nilness lint-revive lint-scopeguard lint-staticcheck ## Lint project using all linters

.PHONY: lint-govet
lint-govet: ## Lint project using go vet
	go vet ./...

.PHONY: lint-govul
lint-govul: ## Lint project using govulncheck
	go tool govulncheck ./...

.PHONY: lint-nilness
lint-nilness: ## Lint project using nilness
	go tool nilness ./...

.PHONY: lint-revive
lint-revive: ## Lint project using revive
	go tool revive -config revive.toml ./...

.PHONY: lint-scopeguard
lint-scopeguard: ## Lint project using scopeguard
	go tool scopeguard ./...

.PHONY: lint-staticcheck
lint-staticcheck: ## Lint project using staticcheck
	go tool staticcheck ./...

.PHONY: mysql-start
mysql-start: check-container-runtime ## Start MySQL locally
	@echo "Starting MySQL..."; \
	mkdir -p local/mysql/initdb.d; \
	PROJECT_APP_NAME=$(strip $(PROJECT_APP_NAME)) docker-compose --project-directory local/mysql up --detach; \
	echo "Waiting for MySQL to be ready..."; \
	while ! PROJECT_APP_NAME=$(strip $(PROJECT_APP_NAME)) docker-compose --project-directory local/mysql exec -T mysql mysql -uappuser -papppassword -D {SERVICE_NAME_SNAKE} -e "SELECT 1" >/dev/null 2>&1; do \
		sleep 1; \
	done; \
	echo "MySQL is ready."

.PHONY: mysql-stop
mysql-stop: check-container-runtime ## Stop MySQL locally
	@echo "Stopping MySQL..."; \
	PROJECT_APP_NAME=$(strip $(PROJECT_APP_NAME)) docker-compose --project-directory local/mysql down --remove-orphans --volumes; \
	echo "MySQL stopped"

.PHONY: mysql-connect
mysql-connect: ## Connect to the dockerized MySQL
	@echo "Connecting to the MySQL container. Password is: rootpassword"
	docker exec -it $(strip $(PROJECT_APP_NAME))-mysql mysql -u root -p {SERVICE_NAME_SNAKE}

.PHONY: obs-start
obs-start:  ## Start observability stack locally
	@echo "Starting observability stack..."; \
	docker-compose --project-directory local/observability up --detach; \
	echo "Observability stack started"; \
	echo "Visit http://localhost:3000/explore for Grafana"

.PHONY: obs-stop
obs-stop:  ## Stop observability stack locally
	@echo "Stopping observability stack..."; \
	docker-compose --project-directory local/observability down --remove-orphans --volumes; \
	echo "Observability stack stopped"

.PHONY: redis-start
redis-start: check-container-runtime ## Start Redis locally
	@if [ "$$(docker ps -f name=local_redis -q)" = "" ]; then \
		echo "Starting Redis..."; \
		docker run -d -p 127.0.0.1:6379:6379 --name local_redis redis >/dev/null || { \
			echo "Conflict detected. Attempting to stop and restart Redis."; \
			$(MAKE) redis-stop; \
			$(MAKE) redis-start; \
			exit 0; \
		}; \
		echo "Waiting for Redis to be ready..."; \
		while ! docker exec local_redis redis-cli ping >/dev/null 2>&1; do \
			sleep 1; \
		done; \
		echo "Redis is ready."; \
	else \
		echo "Redis already running"; \
	fi

.PHONY: redis-stop
redis-stop: check-container-runtime ## Stop Redis locally
	@echo "Stopping Redis"; \
	docker stop local_redis >/dev/null 2>&1 || true; \
	docker rm local_redis >/dev/null 2>&1 || true; \
	echo "Redis stopped"

define RUN_COMMAND
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318; \
export CLUSTER="local"; \
export MYSQL_PASSWORD="apppassword"; \
export REDIS_LOG=true; \
mkdir -p ./local/observability/logs; \
go run ./cmd/api/main.go -cfg ./local/config/api.json | tee ./local/observability/logs/$(strip $(PROJECT_API_COMPONENT_NAME)).log $(if $(filter true,$(HL)),| $(hl)) ; \
pkill main; \
$(MAKE) redis-stop; \
$(MAKE) mysql-stop; \
$(MAKE) obs-stop;
endef

.PHONY: run
run: HL=true
run: redis-start mysql-start obs-start  ## Run the API server
	$(RUN_COMMAND)

.PHONY: test
test: ## Run the Go test suite
	go test $(strip $(TEST_ARGS))

.PHONY: test-bench
test-bench: ## Run the Go benchmark tests
	go test -bench=. -benchmem -run=^$$ $(strip $(TEST_ARGS))

.PHONY: test-fuzz
test-fuzz: ## Run fuzz tests
ifeq ($(strip $(GO_FUZZARGS)),)
	@status=0; \
	for pkg in $$(go list ./...); do \
		for test in $$(go test -list=^Fuzz $$pkg | grep '^Fuzz'); do \
			echo ">>> Fuzzing $$pkg $$test"; \
			if ! go test -fuzz=$$test -fuzztime=10s $$pkg; then \
				echo "FAIL: $$pkg $$test"; \
				status=1; \
			fi; \
		done; \
	done; \
	exit $$status
else
	go test -v -run='^$$' $(GO_FUZZARGS)
endif

.PHONY: test-integration
test-integration: redis-start mysql-start obs-start ## Run integration tests
	@echo "--- Starting server stack for integration tests ---"; \
	set -m; make _run-for-test & \
	SERVER_PID=$$!; \
	trap 'kill -TERM -- -$$SERVER_PID 2>/dev/null || true; make redis-stop; make mysql-stop; make obs-stop' EXIT INT TERM; \
	echo "--- Waiting for API server to be ready ---"; \
	timeout=30; \
	while ! curl -s -o /dev/null http://localhost:8080/healthcheck; do \
		sleep 1; \
		timeout=$$((timeout-1)); \
		if [ $$timeout -eq 0 ]; then \
			echo "ERROR: API server did not start within 30 seconds." >&2; \
			exit 1; \
		fi; \
	done; \
	echo "API server is ready."; \
	echo "--- Running E2E tests ---"; \
	go test -v -tags=e2e ./e2e/...; \
	TEST_EXIT_CODE=$$?; \
	exit $$TEST_EXIT_CODE

.PHONY: _run-for-test
_run-for-test: HL=true
_run-for-test:
	$(RUN_COMMAND)

.PHONY: test-all
test-all: test test-integration  ## Runs both unit and integration tests

.PHONY: tools-install
tools-install: ## Install dev tools
	@$(foreach tool,$(TOOLS), \
		echo "checking $(tool)"; \
		if ! go tool | grep "$(tool)" >/dev/null; then \
			echo "installing $(tool)"; \
			go get -tool "$(tool)"@latest; \
		fi; \
	)

.PHONY: tools-update
tools-update: ## Update dev tools
	@for tool in $(TOOLS); do \
		echo go get -u -tool "$$tool"@latest; \
		go get -u -tool "$$tool"@latest; \
	done
	go mod tidy

# Performance: Disable default implicit rule searches.
Makefile : ;
%.go %.mk %.json :: ;
```
