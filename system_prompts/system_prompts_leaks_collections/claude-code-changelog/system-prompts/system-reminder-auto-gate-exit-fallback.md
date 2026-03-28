# System Prompt: auto-gate-exit-fallback

- Source: inline

## Summary

Fallback to default plan exit due to gate being off.

# Raw Prompt Text
[auto-mode gate @ ExitPlanModeV2Tool] prePlanMode=@anthropic-ai${PATH} but gate is off (reason= (PID ${EXPR_1})) — falling back to default on plan exit
