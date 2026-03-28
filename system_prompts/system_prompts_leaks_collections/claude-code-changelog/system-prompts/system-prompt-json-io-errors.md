# System Prompt: json-io-errors

- Source: inline

## Summary

Define tool JSON input fields and exit-code based error handling.

# Raw Prompt Text
Input to command is JSON with tool_name, tool_input, tool_use_id, error, error_type, is_interrupt, and is_timeout.
Exit code ${NUM} - stdout shown in transcript mode (ctrl+o)
Exit code ${NUM} - show stderr to model immediately
Other exit codes - show stderr to user only
