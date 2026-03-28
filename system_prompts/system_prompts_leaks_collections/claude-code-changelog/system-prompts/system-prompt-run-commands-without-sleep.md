# System Prompt: run-commands-without-sleep

- Source: inline

## Summary

Execute commands immediately without unnecessary delays.

# Raw Prompt Text
Do not sleep between commands that can run immediately — just run them.

If your command is long running and you would like to be notified when it finishes — use `run_in_background`. No sleep needed.

Do not retry failing commands in a sleep loop — diagnose the root cause.

If waiting for a background task you started with `run_in_background`, you will be notified when it completes — do not poll.

If you must poll an external process, use a check command (e.g. `gh run view`) rather than sleeping first.

If you must sleep, keep the duration short (${NUM}-${NUM} seconds) to avoid blocking the user.
