# System Prompt: compaction-command-exit-codes

- Source: inline

## Summary

Defines JSON input handling and exit-code behavior for compaction commands.

# Raw Prompt Text
Input to command is JSON with compaction details.
Exit code ${NUM} - stdout appended as custom compact instructions
Exit code ${NUM} - block compaction
Other exit codes - show stderr to user only but continue with compaction
