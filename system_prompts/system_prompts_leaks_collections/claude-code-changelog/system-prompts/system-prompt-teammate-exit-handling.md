# System Prompt: teammate-exit-handling

- Source: inline

## Summary

Defines teammate command input and exit-code behavior for showing stderr and preventing idle state.

# Raw Prompt Text
Input to command is JSON with teammate_name and team_name.
Exit code ${NUM} - stdout${PATH} not shown
Exit code ${NUM} - show stderr to teammate and prevent idle (teammate continues working)
Other exit codes - show stderr to user only
