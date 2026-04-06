# Troubleshooting

## Database lock errors
The graph uses SQLite with WAL mode. If you see lock errors:
- Ensure only one build process runs at a time
- The database auto-recovers; just retry
- Delete `.code-review-graph/graph.db-wal` and `.code-review-graph/graph.db-shm` if corrupt

## Large repositories (>10k files)
- First build may take 30-60 seconds
- Subsequent incremental updates are fast (<2s)
- Add more ignore patterns to `.code-review-graphignore`:
  ```
  generated/**
  vendor/**
  *.min.js
  ```

## Missing nodes after build
- Check that the file's language is supported (see [FEATURES.md](FEATURES.md))
- Check that the file isn't matched by an ignore pattern
- Run with `full_rebuild=True` to force a complete re-parse

## Graph seems stale
- Hooks auto-update on edit/commit
- If stale, run `/code-review-graph:build-graph` manually
- Check that hooks are configured in `hooks/hooks.json` (see [hooks documentation](../hooks/hooks.json))

## Embeddings not working
- Install with: `pip install code-review-graph[embeddings]`
- Run `embed_graph_tool` to compute vectors
- First embedding run downloads the model (~90MB, one time)

## MCP server won't start
- Verify `uv` is installed (`uv --version`; install with `pip install uv` or `brew install uv`)
- Check that `uvx code-review-graph serve` runs without errors
- If using a custom `.mcp.json`, ensure it uses `"command": "uvx"` with `"args": ["code-review-graph", "serve"]`
- Re-run `code-review-graph install` to regenerate the config

## Windows / WSL

- Use forward slashes in paths when passing `repo_root` to MCP tools
- In WSL, ensure `uv` is installed inside WSL (not the Windows version): `curl -LsSf https://astral.sh/uv/install.sh | sh`
- If `uv` is not found after install, add `~/.cargo/bin` to your PATH
- File watching (`code-review-graph watch`) may have delays on WSL1 due to filesystem event limitations; WSL2 is recommended
- On Windows native (non-WSL), long path support may need to be enabled: `git config --system core.longpaths true`

## Community detection requires igraph

- Install with: `pip install code-review-graph[communities]`
- Without igraph, community detection falls back to file-based grouping (less precise but functional)

## Wiki generation with LLM summaries

- Install with: `pip install code-review-graph[wiki]`
- Requires a running Ollama instance for LLM-powered summaries
- Without Ollama, wiki pages are generated with structural information only (no prose summaries)

## Optional dependency groups

If a tool returns an ImportError, install the relevant optional group:
- `pip install code-review-graph[embeddings]` for semantic search
- `pip install code-review-graph[google-embeddings]` for Google Gemini embeddings
- `pip install code-review-graph[communities]` for igraph-based community detection
- `pip install code-review-graph[eval]` for evaluation benchmarks (matplotlib)
- `pip install code-review-graph[wiki]` for wiki LLM summaries (ollama)
- `pip install code-review-graph[all]` for everything
