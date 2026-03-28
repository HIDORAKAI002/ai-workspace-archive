# promptdeploy

I've been using three different AI coding tools -- Claude Code, Factory Droid, and OpenCode -- and quickly got tired of maintaining the same agents, commands, and configurations in three different places with three different formats. So I wrote `promptdeploy`: you define everything once in this repository, and it deploys to all your targets, handling the format differences for you.

It's a single Python CLI tool with one dependency (PyYAML). You describe what you want in Markdown files and YAML, point it at your targets in `deploy.yaml`, and it figures out the rest.

## What's in here

The repository holds six types of content, all defined in simple Markdown or YAML:

| Type | Location | What it is |
|------|----------|------------|
| Agents | `agents/*.md` | Specialized sub-agents (Markdown + YAML frontmatter) |
| Commands | `commands/*.md` | Slash command prompts, `$ARGUMENTS` for user input |
| Skills | `skills/*/SKILL.md` | Multi-file skill directories with a `SKILL.md` entry point |
| MCP Servers | `mcp/*.yaml` | Model Context Protocol server definitions |
| Hooks | `hooks/*.yaml` | Claude Code hook groups for tool events |
| Models | `models.yaml` | Custom model providers and their models |

Any item can use `only`/`except` in its frontmatter to control which targets it deploys to. Group names from `deploy.yaml` expand to their members.

## Using promptdeploy

```bash
promptdeploy deploy [--dry-run] [--target TARGET] [--only-type TYPE] [--verbose|--quiet]
promptdeploy validate    # check for YAML errors, missing fields
promptdeploy status      # show what's changed since last deploy
promptdeploy list        # show managed items per target
```

The deploy pipeline works like this: discover all source items, filter by target, compute SHA256 hashes against the last manifest, write only what changed, clean up anything that's been removed from source. Unmanaged items in target directories are never touched.

### Targets

Targets are defined in `deploy.yaml`. Each has a type (`claude`, `droid`, or `opencode`) and a path. Remote targets add a `host:` field and deploy via rsync over SSH.

```yaml
source_root: .
targets:
  claude-personal:
    type: claude
    path: ~/.config/claude/personal
  droid:
    type: droid
    path: ~/.factory
  opencode:
    type: opencode
    path: ~/.config/opencode
groups:
  claude:
    - claude-personal
```

### Environment variables

API keys use `${VAR}` syntax in MCP and model definitions. Claude targets pass these through verbatim for runtime expansion; Droid and OpenCode expand them at deploy time from your shell environment. See `.env.example` for the full list.

## Getting started

**With Nix** (recommended):

```bash
direnv allow   # Python 3.12 + all dependencies
PYTHONPATH=src python -m promptdeploy deploy --dry-run
```

**With pip:**

```bash
pip install -e ".[dev]"
promptdeploy deploy --dry-run
```

**System-wide:**

```bash
nix build
./result/bin/promptdeploy --help
```

## Development

The test suite enforces 100% code coverage. Pre-commit hooks run formatting, linting, type checking, tests, and the full Nix build -- all in parallel via lefthook.

```bash
# Run tests
PYTHONPATH=src python -m pytest tests/ --cov --cov-report=term-missing

# Run all checks (same as CI)
nix flake check

# Format
ruff format src/ tests/

# Lint
ruff check src/ tests/

# Type check
PYTHONPATH=src mypy src/ tests/
```

CI runs `nix flake check` on every push and PR, which exercises all five checks: ruff format, ruff lint, mypy, pytest with coverage, and the Nix package build.

## Nix integration

There's a home-manager module if you want deployments to happen automatically on every `home-manager switch`:

```nix
{
  imports = [ inputs.promptdeploy.homeManagerModules.default ];

  programs.promptdeploy = {
    enable = true;
    package = inputs.promptdeploy.packages.${system}.default;
    sourceDir = "~/src/promptdeploy";
    targets = [ "local" ];
  };
}
```

## License

BSD 3-Clause. See [LICENSE.md](LICENSE.md).
