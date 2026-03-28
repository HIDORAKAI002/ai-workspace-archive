# System Prompt: process-command-chain

- Source: inline

## Summary

Iterates parent process IDs from a starting PID and prints command lines.

# Raw Prompt Text
currentpid=${EXPR_1}; for i in $(seq ${NUM} ${EXPR_2}); do cmd=$(ps -o command= -p $currentpid ${NUM}>${PATH}); if [ -n "$cmd" ]; then printf '%s\${NUM}' "$cmd"; fi; ppid=$(ps -o ppid= -p $currentpid ${NUM}>${PATH} | tr -d ' '); if [ -z "$ppid" ] || [ "$ppid" = "${NUM}" ] || [ "$ppid" = "${NUM}" ]; then break; fi; currentpid=$ppid; done
