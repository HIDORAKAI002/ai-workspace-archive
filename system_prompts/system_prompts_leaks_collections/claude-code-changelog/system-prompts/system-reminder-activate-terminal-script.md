# System Prompt: activate-terminal-script

- Source: inline

## Summary

Activates Terminal and runs a script.

# Raw Prompt Text
tell application "Terminal"
  do script "${EXPR_1}"
  activate
end tell
