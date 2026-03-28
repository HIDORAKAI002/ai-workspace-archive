# System Prompt: json-action-response-exit

- Source: inline

## Summary

Handles JSON commands with specific actions and responses.

# Raw Prompt Text
Input to command is JSON with mcp_server_name, action, content, mode, and elicitation_id.
Output JSON with hookSpecificOutput containing optional action and content to override the response.
Exit code ${NUM} - use hook response if provided
Exit code ${NUM} - block the response (action becomes decline)
Other exit codes - show stderr to user only
