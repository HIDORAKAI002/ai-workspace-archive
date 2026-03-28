# System Prompt: debug-logging-enabled

- Source: inline

## Summary

Debug logging is now active for issue reproduction.

# Raw Prompt Text
## Debug Logging Just Enabled

Debug logging was OFF for this session until now. Nothing prior to this ${PATH} invocation was captured.

Tell the user that debug logging is now active at `${EXPR_1}`, ask them to reproduce the issue, then re-read the log. If they can't reproduce, they can also restart with `claude --debug` to capture logs from startup.
