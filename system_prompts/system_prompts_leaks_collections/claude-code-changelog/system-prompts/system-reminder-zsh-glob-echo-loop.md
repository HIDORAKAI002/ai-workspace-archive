# System Prompt: zsh-glob-echo-loop

- Source: inline

## Summary

Zsh loop echoes matched entries, appending slash for directories, space otherwise.

# Raw Prompt Text
for f in ${EXPR_1}*(N[${NUM},${NUM}]); do [[ -d "$f" ]] && echo "$f/" || echo "$f "; done
