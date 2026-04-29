# @vectorize-io/self-driving-agents

Install self-driving agents with portable memory on any harness.

```bash
npx @vectorize-io/self-driving-agents install ./my-agent --harness openclaw
```

## What it does

1. Reads `bank-template.json` from the agent directory (knowledge pages, missions, directives)
2. Reads `content/` directory for reference docs to ingest
3. Resolves the Hindsight bank from the harness config
4. Imports the template and ingests content
5. Creates the harness agent, installs the skill, patches startup

## Agent directory layout

```
my-agent/
  bank-template.json   # optional: bank config + knowledge pages
  content/             # optional: reference docs (.md, .txt, .html, etc.)
```

Agent name defaults to the directory name. Override with `--agent <name>`.

## Options

```
npx @vectorize-io/self-driving-agents install <dir> --harness <harness> [options]

--harness <h>      Required. openclaw | hermes | claude-code
--agent <name>     Agent name (defaults to directory name)
--api-url <url>    Override Hindsight API URL
--api-token <t>    Override API token
```

## Example

```bash
# Clone an agent repo
git clone https://github.com/vectorize-io/self-driving-agents
cd self-driving-agents

# Install the SEO blog writer
npx @vectorize-io/self-driving-agents install ./marketing-seo-blog-posts --harness openclaw

# Create and start the agent
openclaw agents add marketing-seo-blog-posts --workspace ~/.hindsight-agents/openclaw/marketing-seo-blog-posts --non-interactive
openclaw gateway restart
openclaw tui --session agent:marketing-seo-blog-posts:main:session1
```
