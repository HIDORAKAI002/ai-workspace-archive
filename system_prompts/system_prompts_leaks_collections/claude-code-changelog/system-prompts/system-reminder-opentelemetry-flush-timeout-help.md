# System Prompt: opentelemetry-flush-timeout-help

- Source: inline

## Summary

Explains an OpenTelemetry flush timeout and suggests increasing timeout, checking backend, or disabling telemetry.

# Raw Prompt Text
OpenTelemetry telemetry flush timed out after ${EXPR_1} loaded with errorsms

To resolve this issue, you can:
${NUM}. Increase the timeout by setting CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS env var (e.g., ${NUM} for ${NUM} seconds)
${NUM}. Check if your OpenTelemetry backend is experiencing scalability issues
${NUM}. Disable OpenTelemetry by unsetting CLAUDE_CODE_ENABLE_TELEMETRY env var

Current timeout: ${EXPR_2} loaded with errorsms
