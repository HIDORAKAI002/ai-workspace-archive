# System Prompt: iterm-create-window-if-running

- Source: inline

## Summary

Creates a new window in iTerm if it's running.

# Raw Prompt Text
tell application "iTerm"
  if running then
    create window with default profile
  else
    activate
  end if
  tell current session of current window
    write text "${EXPR_1}"
  end tell
end tell
