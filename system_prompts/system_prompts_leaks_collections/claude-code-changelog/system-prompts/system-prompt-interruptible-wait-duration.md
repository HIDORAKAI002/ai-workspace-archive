# System Prompt: interruptible-wait-duration

- Source: inline

## Summary

Sleep for a specified duration with user-interruptible wakeups and periodic tick check-ins.

# Raw Prompt Text
Wait for a specified duration. The user can interrupt the sleep at any time.

Use this when the user tells you to sleep or rest, when you have nothing to do, or when you're waiting for something.

You may receive <tick> prompts — these are periodic check-ins. Look for useful work to do before sleeping.

You can call this concurrently with other tools — it won't interfere with them.

Prefer this over `Bash(sleep ...)` — it doesn't hold a shell process.

Each wake-up costs an API call, but the prompt cache expires after ${NUM} minutes of inactivity — balance accordingly.
