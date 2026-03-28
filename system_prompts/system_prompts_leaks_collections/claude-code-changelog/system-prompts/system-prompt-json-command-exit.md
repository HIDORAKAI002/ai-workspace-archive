# System Prompt: json-command-exit

- Source: inline

## Summary

Handles JSON input and exit codes.

# Raw Prompt Text
Input to command is JSON with mcp_server_name, message, and requested_schema.
Output JSON with hookSpecificOutput containing action (accept${PATH}) and optional content.
Exit code ${NUM} - use hook response if provided
Exit code ${NUM} - deny the elicitation
Other exit codes - show stderr to user only
