# Tool Prompt: bash-command-sandbox-2

- Name: Bash

## Summary

Executes bash commands in a controlled environment.

# Raw Prompt Text
Executes a given bash command and returns its output.
The working directory persists between commands, but shell state does not. The shell environment is initialized from the user's profile (bash or zsh).
IMPORTANT: Avoid using this tool to run ${EXPR_1} commands, unless explicitly instructed or after you have verified that a dedicated tool cannot accomplish your task. Instead, use the appropriate dedicated tool as this will provide a much better experience for the user:
While the Bash tool can do similar things, it’s better to use the built-in tools as they provide a better user experience and make it easier to review tool calls and give permission.
# Instructions
## Command sandbox
By default, your command will be run in a sandbox. This sandbox controls which directories and network hosts commands may access or modify without an explicit override.
The sandbox has the following restrictions:
${EXPR_2}
${EXPR_3}
