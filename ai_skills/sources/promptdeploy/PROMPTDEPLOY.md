# promptdeploy

Deploy prompts, agents, skills, and MCP servers from a single source repository to multiple AI coding tool environments.

## Targets

| Target | Type | Path |
|--------|------|------|
| claude-personal | Claude Code | ~/.config/claude/personal |
| claude-positron | Claude Code | ~/.config/claude/positron |
| claude-git-ai | Claude Code | ~/.config/claude/git-ai |
| droid | Factory Droid | ~/.factory |
| opencode | OpenCode | ~/.config/opencode |

Targets and groups are defined in `deploy.yaml` at the repository root.

## Commands

```
promptdeploy deploy [--dry-run] [--target TARGET] [--only-type TYPE] [--verbose|--quiet]
promptdeploy validate
promptdeploy status [--target TARGET]
promptdeploy list [--target TARGET]
```

- **deploy** -- Copy agents, commands, skills, and MCP servers to target environments. Items unchanged since the last deploy are skipped. Items removed from the source are cleaned up from targets.
- **validate** -- Check all source items for YAML errors, invalid environment IDs, and missing required fields.
- **status** -- Compare source items against deployed manifests. Shows new (A), modified (M), deleted (D), and current items.
- **list** -- Show all items currently managed by promptdeploy in each target.

### Flags

- `--dry-run` -- Show what would happen without making changes.
- `--target TARGET` -- Limit to specific targets. Repeatable. Accepts group names (e.g., `claude`).
- `--only-type TYPE` -- Limit to `agents`, `commands`, `skills`, or `mcp`. Repeatable.
- `--verbose` -- Show diffs and timing.
- `--quiet` -- Suppress output except errors and change counts.

## Environment Filtering

Items can be restricted to specific targets using YAML frontmatter:

```yaml
---
name: my-agent
only:
  - claude
---
```

- `only: [claude]` -- Deploy only to the `claude` group (personal, positron, git-ai).
- `except: [droid]` -- Deploy everywhere except Factory Droid.
- Both cannot be used on the same item.
- Group names (defined in `deploy.yaml`) expand to their members.

## Development

### Running from source with Nix (recommended)

The repository includes a `flake.nix` and `.envrc`. With [direnv](https://direnv.net/) installed:

```bash
cd ~/src/claude-prompts
direnv allow
```

This drops you into a shell with Python 3.12, PyYAML, pytest, pytest-cov, mypy, and ruff.

Run the tool from source:

```bash
PYTHONPATH=src python -m promptdeploy deploy --dry-run
```

### Running from source with a virtualenv

```bash
python3 -m venv .venv
.venv/bin/pip install -e ".[dev]"
.venv/bin/promptdeploy deploy --dry-run
```

### Running tests

```bash
# All tests
pytest

# With coverage report
pytest --cov=promptdeploy --cov-report=term-missing

# Single module
pytest tests/test_deploy.py -v
```

Coverage is enforced at 98% via `pyproject.toml`. The current suite has 312 tests at 99.78% coverage.

### Project layout

```
src/promptdeploy/
  cli.py             # Argument parsing and command dispatch
  config.py          # deploy.yaml loading (Config, TargetConfig)
  source.py          # Source item discovery (agents/, commands/, skills/, mcp/)
  frontmatter.py     # YAML frontmatter parsing and transformation
  filters.py         # only/except environment filtering with group expansion
  manifest.py        # SHA256 hash tracking for change detection
  deploy.py          # Core deploy orchestration
  validate.py        # Source item validation
  status.py          # Deployment status comparison
  output.py          # Verbosity levels and formatted output
  targets/
    base.py          # Abstract Target interface
    claude.py        # Claude Code target
    droid.py         # Factory Droid target
    opencode.py      # OpenCode target

tests/               # 312 tests, 99.78% coverage
deploy.yaml          # Target environment definitions
mcp/                 # MCP server YAML definitions
  schema.md          # MCP YAML schema documentation
```

## System Installation

### Building with Nix

```bash
nix build
./result/bin/promptdeploy --help
```

### Adding to a NixOS/nix-darwin configuration

In your system flake (e.g., `~/src/nix/flake.nix`), add the input:

```nix
claude-prompts.url = "git+file:///Users/johnw/src/claude-prompts";
```

Then reference the package wherever you build your package list:

```nix
inputs.claude-prompts.packages.${system}.default
```

Rebuild your system to install `promptdeploy` to the Nix profile.

## How It Works

1. **Discovery** -- Scans `agents/*.md`, `commands/*.md`, `skills/*/SKILL.md`, and `mcp/*.yaml` in the source repo.
2. **Filtering** -- Evaluates `only`/`except` frontmatter against each target, expanding group names.
3. **Change detection** -- Computes SHA256 hashes and compares against the manifest from the last deploy. Unchanged items are skipped.
4. **Deployment** -- Copies files to each target in the format it expects:
   - Claude Code: agents/, commands/, skills/ directories; MCP merges into settings.json.
   - Factory Droid: agents go to droids/; commands are skipped (unless `droid_deploy: skill`); MCP merges into mcp.json with a `type` field.
   - OpenCode: standard layout; MCP merges into opencode.json with `command` as an array and `environment` instead of `env`.
5. **Cleanup** -- Items present in the old manifest but absent from the current source are removed. Pre-existing unmanaged items are never touched.
6. **Manifest update** -- A `.prompt-deploy-manifest.json` is saved atomically to each target directory.
