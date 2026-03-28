# System Prompt: exit-output-handling

- Source: inline

## Summary

Route stdout and stderr visibility based on exit codes.

# Raw Prompt Text
Exit code ${NUM} - stdout${PATH} not shown
Exit code ${NUM} - show stderr to model and continue conversation
Other exit codes - show stderr to user only
