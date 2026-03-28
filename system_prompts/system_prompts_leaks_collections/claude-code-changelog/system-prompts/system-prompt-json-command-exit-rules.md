# System Prompt: json-command-exit-rules

- Source: inline

## Summary

Defines JSON input and exit code handling for a command, showing stderr only on failure.

# Raw Prompt Text
Input to command is JSON with session end reason.
Exit code ${NUM} - command completes successfully
Other exit codes - show stderr to user only
