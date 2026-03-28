# System Prompt: list-files-with-compgen-loop

- Source: inline

## Summary

Shell command listing matching filesystem paths and appending slash for directories.

# Raw Prompt Text
compgen -f ${EXPR_1} ${NUM}>${PATH} | head -${NUM} | while IFS= read -r f; do [ -d "$f" ] && echo "$f/" || echo "$f "; done
