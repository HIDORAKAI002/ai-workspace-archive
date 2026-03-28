# System Prompt: function-argument-handling

- Source: inline

## Summary

Handles arguments based on OS type.

# Raw Prompt Text
function ${EXPR_1} {
  if [[ -n $ZSH_VERSION ]]; then
    ARGV0=${EXPR_2} ${EXPR_3} ${NUM}
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    ARGV0=${EXPR_4} ${EXPR_5} ${NUM}
  elif [[ $BASHPID != $$ ]]; then
    exec -a ${EXPR_6} ${EXPR_7} ${NUM}
  else
    (exec -a ${EXPR_8} ${EXPR_9} ${NUM})
  fi
}
