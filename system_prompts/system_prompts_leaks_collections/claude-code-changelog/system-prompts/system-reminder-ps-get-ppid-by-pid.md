# System Prompt: ps-get-ppid-by-pid

- Source: inline

## Summary

Use ps to output the parent process ID for a specified PID.

# Raw Prompt Text
ps -o ppid= -p ${EXPR_1}
