# System Prompt: hook-json-allow-deny

- Source: inline

## Summary

Specifies JSON input and output contract for a hook decision to allow or deny a command.

# Raw Prompt Text
Input to command is JSON with tool_name, tool_input, and tool_use_id.
Output JSON with hookSpecificOutput containing decision to allow or deny.
Exit code ${NUM} - use hook decision if provided
Other exit codes - show stderr to user only
