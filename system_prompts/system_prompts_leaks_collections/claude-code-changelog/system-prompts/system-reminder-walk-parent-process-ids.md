# System Prompt: walk-parent-process-ids

- Source: inline

## Summary

Shell loop walking parent PIDs upward, printing each PPID until a stop condition.

# Raw Prompt Text
pid=${EXPR_1}; for i in $(seq ${NUM} ${EXPR_2}); do ppid=$(ps -o ppid= -p $pid ${NUM}>${PATH} | tr -d ' '); if [ -z "$ppid" ] || [ "$ppid" = "${NUM}" ] || [ "$ppid" = "${NUM}" ]; then break; fi; echo $ppid; pid=$ppid; done
