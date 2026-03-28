# Tool Prompt: press-left-mouse-button

- Name: left_mouse_down

## Summary

Press and hold the left mouse button at the cursor.

# Raw Prompt Text
Press the left mouse button at the current cursor position and leave it held. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. Use mouse_move first to position the cursor. Call left_mouse_up to release. Errors if the button is already held.
