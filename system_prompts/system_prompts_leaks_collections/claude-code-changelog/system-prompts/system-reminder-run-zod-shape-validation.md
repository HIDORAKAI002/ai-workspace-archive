# System Prompt: run-zod-shape-validation

- Source: inline

## Summary

Runs a Zod shape validator against an input value.

# Raw Prompt Text
shape[${EXPR_1}]._zod.run({ value: input[${EXPR_2}], issues: [] }, ctx)
