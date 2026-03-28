# Tool Prompt: release-left-mouse-button

- Name: left_mouse_up

## Summary

Releases the left mouse button at the cursor position.

# Raw Prompt Text
Release the left mouse button at the current cursor position. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. Pairs with left_mouse_down. Safe to call even if the button is not currently held.
