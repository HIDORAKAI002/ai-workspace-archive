# Contributing to AI Workspace Archive

First off, thank you for considering contributing to the AI Workspace Archive! This repository is designed to be the ultimate offline-capable repository of AI skills, MCP servers, and prompts. 

## How It Works Under The Hood

This repository operates differently than a standard codebase. 

Instead of hosting thousands of source files natively, the repository is maintained by a headless **Auto-Sync VPS Bot**. Every 6 hours, the bot reads the `sync_manifest.json` file, performs a lightweight sparse checkout from dozens of upstream repositories, and commits any new additions to this repository automatically.

Because of this architecture, **you should not submit Pull Requests editing the actual skill/server files directly**, because the bot will overwrite your changes during the next sync cycle!

## How to Contribute a New Resource

If you've found a new, high-quality MCP server, a brilliant curated skill repository, or a highly useful AI framework, here is the exact process to add it to the archive:

1. **Fork this repository**.
2. **Edit `sync_manifest.json`** located in the root directory.
3. Add a new JSON object to the end of the array outlining the repository upstream URL and its destination. 

### Example Addition to Manifest
```json
  {
    "name": "Your Awesome MCP",
    "upstream": "https://github.com/author/awesome-mcp.git",
    "dest": "mcps/misc_specialized/awesome-mcp"
  }
```

4. **Submit a Pull Request**. Title it clearly (e.g., `feature: add awesome-mcp to manifest`).

Once merged, the VPS bot will automatically provision the space, perform a shallow clone, and keep your submitted repository permanently synced for the community!

## Reporting Issues

If you notice a repository in the archive is dead, contains malicious updates, or the sync has broken, please navigate to the **Issues** tab and open a "Bug Report". 

- Provide the name of the failing component.
- Explain the symptoms or what the `sync_manifest.json` ought to be changed to.
