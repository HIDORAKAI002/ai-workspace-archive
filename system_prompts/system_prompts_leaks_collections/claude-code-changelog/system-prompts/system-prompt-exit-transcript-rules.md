# System Prompt: exit-transcript-rules

- Source: inline

## Summary

Specifies how stdout and stderr are displayed for tool call inputs and responses by exit code.

# Raw Prompt Text
Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).
Exit code ${NUM} - stdout shown in transcript mode (ctrl+o)
Exit code ${NUM} - show stderr to model immediately
Other exit codes - show stderr to user only
