# BoxLite Examples

Working examples for running planning-with-files inside [BoxLite](https://boxlite.ai) micro-VM sandboxes via [ClaudeBox](https://github.com/boxlite-ai/claudebox).

## Files

| File | Description |
|------|-------------|
| `quickstart.py` | Full Python example — loads planning-with-files as a ClaudeBox Skill, runs a planning session inside a BoxLite VM |

## Requirements

```bash
pip install claudebox
export CLAUDE_CODE_OAUTH_TOKEN=sk-ant-oat01-...
```

## Run

```bash
python quickstart.py
```

## Documentation

See [docs/boxlite.md](../../docs/boxlite.md) for the full integration guide.
