# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Repository Purpose

A single-source repository of AI coding prompts (agents, commands, skills, MCP servers, hooks, models) deployed to three target environments -- Claude Code, Factory Droid, and OpenCode -- using the included `promptdeploy` Python CLI tool.

## Content Types

| Type | Location | Format | Notes |
|------|----------|--------|-------|
| Agents | `agents/*.md` | Markdown + YAML frontmatter (`name`, `description`) | Pro agents, reviewers, specialists |
| Commands | `commands/*.md` | Plain Markdown, `$ARGUMENTS` placeholder | Some have frontmatter for filtering |
| Skills | `skills/*/SKILL.md` | Directory with `SKILL.md` (YAML frontmatter) + optional files | `humanizer` is a git submodule |
| MCP Servers | `mcp/*.yaml` | YAML with `name`, transport (`command`+`args` or `url`), `env`, `scope` | Schema in `mcp/schema.md` |
| Hooks | `hooks/*.yaml` | YAML with `name`, event handlers, matchers | Claude-only |
| Models | `models.yaml` | Single YAML file, providers with nested models | Droid and OpenCode only; Claude skipped |

All content items support `only`/`except` filtering by target or group name (defined in `deploy.yaml`).

## promptdeploy Architecture

`src/promptdeploy/` -- Pure Python, single dependency (PyYAML). `src` layout with setuptools.

### Pipeline

1. **CLI** (`cli.py`) -- argparse, 4 subcommands: `deploy`, `validate`, `status`, `list`
2. **Config** (`config.py`) -- Loads `deploy.yaml` from CWD or ancestors. `Config`/`TargetConfig` dataclasses. `remap_targets_to_root()` for `--target-root` preview
3. **Discovery** (`source.py`) -- `SourceDiscovery` scans all 6 item types. `SourceItem` uses singular `item_type` (`agent`, `command`, `skill`, `mcp`, `models`, `hook`)
4. **Filtering** (`filters.py`) -- `should_deploy_to()` evaluates `only`/`except` with group expansion
5. **Deploy** (`deploy.py`) -- Orchestrates targets × items, computes SHA256 hashes, returns `List[DeployAction]`. Maps between naming conventions: `_TYPE_TO_CATEGORY` (singular→plural for manifests), `_CLI_TYPE_TO_ITEM_TYPE` (CLI plural→singular)
6. **Targets** (`targets/`) -- Abstract `Target` ABC in `base.py`, three local implementations + remote wrapper:
   - `claude.py` -- Writes `.md` files; merges MCP into `settings.json` `mcpServers`; merges hooks with `_source` tagging for independent group updates
   - `droid.py` -- Agents→`droids/`; commands skipped unless `droid_deploy: skill` in frontmatter; MCP→`mcp.json` with `type` field; models→`settings.json` `customModels` with provider-type formatting
   - `opencode.py` -- Standard layout; MCP→`opencode.json` with `command` as array, `environment` instead of `env`; models→`opencode.json` under `provider` key
   - `remote.py` -- `RemoteTarget` wrapper; delegates to inner target operating on a local staging dir; syncs via rsync over SSH
7. **SSH Transport** (`ssh.py`) -- `ssh_pull`/`ssh_push`/`ssh_exists` via `rsync -az --delete` and `ssh`. No Python SSH dependencies.
8. **Manifest** (`manifest.py`) -- SHA256 change detection. Atomic writes via `tempfile.mkstemp()` + `os.replace()`

### Key Patterns

- **Atomic file writes everywhere** -- All JSON/manifest writes use temp file + `os.replace()`. New code writing files must follow this pattern.
- **Manifest tracks managed items** -- Only manifest-tracked items are updated/removed; unmanaged items in target directories are never touched.
- **`_source` tagging on hooks** -- Each hook entry in `settings.json` gets `_source: <group-name>` so multiple groups can coexist on the same event type without interference.
- **Environment variable handling** -- `envsubst.py` expands `${VAR}` from `os.environ`. Claude target passes `${VAR}` through verbatim (runtime expansion); Droid/OpenCode expand at deploy time.
- **Frontmatter transformation** -- `frontmatter.py` `transform_for_target()` strips deployment metadata (`only`/`except`) before writing to targets.
- **Models filtering** -- `only`/`except` applies at both provider and individual model level.
- **Remote deployment** -- Targets with `host:` in `deploy.yaml` are deployed via rsync over SSH. The `Target` ABC has `prepare()`/`finalize()`/`cleanup()` lifecycle hooks (no-ops for local targets). `RemoteTarget` wraps any inner target, using a local staging dir: `prepare()` pulls remote state, `finalize()` pushes back. Path `~` expansion is skipped for remote targets (rsync expands `~` on the remote). `--target-root` strips `host` to force local preview.

## Development Commands

```bash
# Enter dev shell (Python 3.12 + all deps via Nix)
direnv allow

# Run from source
PYTHONPATH=src python -m promptdeploy deploy --dry-run

# Run all tests (100% coverage enforced in pyproject.toml)
PYTHONPATH=src python -m pytest tests/ --cov --cov-report=term-missing

# Run a single test file
PYTHONPATH=src python -m pytest tests/test_deploy.py -v

# Run a single test
PYTHONPATH=src python -m pytest tests/test_deploy.py::TestDeploy::test_name -v

# Run all Nix flake checks (ruff, mypy, pytest, build)
nix flake check

# Build Nix package only
nix build

# Install editable with pip (alternative to Nix)
pip install -e ".[dev]"
```

The Nix dev shell also provides `mypy` and `ruff`, configured in `pyproject.toml` and enforced via `nix flake check`.

## CI

`.github/workflows/ci.yml` runs `nix flake check` which executes all 5 checks defined in `flake.nix`: `ruff format --check`, `ruff check`, `mypy`, `pytest` with 100% coverage gate, and `nix build`. `lefthook.yml` mirrors these as pre-commit checks with fast staged-file feedback, plus `nix flake check` as the authoritative full-tree gate.

## deploy.yaml

Defines 8 targets classified by labels: `claude`, `personal`, `positron`, `local`, `remote`. Labels on targets auto-generate groups (merged with explicit groups). `--target positron` expands to `claude-positron` + `claude-andoria`. Target types: `claude`, `droid`, `opencode`. Remote targets add `host:` field.

## Environment Variables

API keys required for deployment (not dry-run). See `.env.example` for the full list. Must be exported in shell before `promptdeploy deploy`.
