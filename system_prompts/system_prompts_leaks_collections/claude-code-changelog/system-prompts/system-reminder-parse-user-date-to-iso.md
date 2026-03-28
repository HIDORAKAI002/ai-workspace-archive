# System Prompt: parse-user-date-to-iso

- Source: inline

## Summary

Parse user date input into ISO format using provided current context.

# Raw Prompt Text
Current context:
- Current date and time: ${EXPR_1} (UTC)
- Local timezone: @anthropic-ai${PATH}
- Day of week:  (PID ${EXPR_2})

User input: "${EXPR_3}"

Output format: ${EXPR_4}

Parse the user's input into ISO ${NUM} format. Return ONLY the formatted string, or "INVALID" if the input is incomplete or unparseable.
