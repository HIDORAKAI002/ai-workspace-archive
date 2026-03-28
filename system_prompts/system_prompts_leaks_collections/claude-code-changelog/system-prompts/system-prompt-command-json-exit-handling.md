# System Prompt: command-json-exit-handling

- Source: inline

## Summary

Rules for JSON command input and exit code output handling.

# Raw Prompt Text
Input to command is JSON with session start source.
Exit code ${NUM} - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only
