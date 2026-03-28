# Tool Prompt: suggest-cc-feature-improvements

- Name: suggestions

## Summary

Instructions to suggest improvements using specific Claude Code features like MCP servers, custom skills, and hooks.

# Raw Prompt Text
Analyze this Claude Code usage data and suggest improvements.

## CC FEATURES REFERENCE (pick from these for features_to_try):
${NUM}. **MCP Servers**: Connect Claude to external tools, databases, and APIs via Model Context Protocol.
   - How to use: Run `claude mcp add <server-name> -- <command>`
   - Good for: database queries, Slack integration, GitHub issue lookup, connecting to internal APIs

${NUM}. **Custom Skills**: Reusable prompts you define as markdown files that run with a single ${PATH}
   - How to use: Create `.claude${PATH}` with instructions. Then type `${PATH}` to run it.
   - Good for: repetitive workflows - ${PATH}, ${PATH}, ${PATH}, ${PATH}, /pr, or complex multi-step workflows

${NUM}. **Hooks**: Shell commands that auto-run at specific lifecycle events.
   - How to use: Add to `.claude${PATH}` under "hooks" key.
   - Good for: auto-formatting code, running type checks, enforcing conventions

${NUM}. **Headless Mode**: Run Claude non-interactively from scripts and CI${PATH}
   - How to use: `claude -p "fix lint errors" --allowedTools "Edit,Read,Bash"`
   - Good for: CI/CD integration, batch code fixes, automated reviews

${NUM}. **Task Agents**: Claude spawns focused sub-agents for complex exploration or parallel work.
   - How to use: Claude auto-invokes when helpful, or ask "use an agent to explore X"
   - Good for: codebase exploration, understanding complex systems

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "claude_md_additions": [
    {"addition": "A specific line or block to add to CLAUDE.md based on workflow patterns. E.g., 'Always run tests after modifying auth-related files'", "why": "${NUM} sentence explaining why this would help based on actual sessions", "prompt_scaffold": "Instructions for where to add this in CLAUDE.md. E.g., 'Add under ## Testing section'"}
  ],
  "features_to_try": [
    {"feature": "Feature name from CC FEATURES REFERENCE above", "one_liner": "What it does", "why_for_you": "Why this would help YOU based on your sessions", "example_code": "Actual command or config to copy"}
  ],
  "usage_patterns": [
    {"title": "Short title", "suggestion": "${NUM}-${NUM} sentence summary", "detail": "${NUM}-${NUM} sentences explaining how this applies to YOUR work", "copyable_prompt": "A specific prompt to copy and try"}
  ]
}

IMPORTANT for claude_md_additions: PRIORITIZE instructions that appear MULTIPLE TIMES in the user data. If user told Claude the same thing in ${NUM}+ sessions (e.g., 'always run tests', 'use TypeScript'), that's a PRIME candidate - they shouldn't have to repeat themselves.

IMPORTANT for features_to_try: Pick ${NUM}-${NUM} from the CC FEATURES REFERENCE above. Include ${NUM}-${NUM} items for each category.
