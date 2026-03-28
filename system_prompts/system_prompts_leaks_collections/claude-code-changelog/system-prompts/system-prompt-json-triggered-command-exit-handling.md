# System Prompt: json-triggered-command-exit-handling

- Source: inline

## Summary

Defines JSON trigger input and how to handle stdout and stderr by exit code.

# Raw Prompt Text
Input to command is JSON with trigger (init or maintenance).
Exit code ${NUM} - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only
