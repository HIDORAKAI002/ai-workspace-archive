# System Prompt: interval-check-deploy-defaults

## Summary

Multiple prompts (2)

# Raw Prompt Text
Usage: ${PATH} [interval] <prompt>

Run a prompt or slash command on a recurring interval.

Intervals: Ns, Nm, Nh, Nd (e.g. 5m, 30m, 2h, 1d). Minimum granularity is ${NUM} minute.
If no interval is specified, defaults to ${EXPR_1}.

Examples:
  ${PATH} 5m ${PATH}
  ${PATH} 30m check the deploy
  ${PATH} 1h ${PATH} ${NUM}
  ${PATH} check the deploy          (defaults to ${EXPR_2})
  ${PATH} check the deploy every 20m
