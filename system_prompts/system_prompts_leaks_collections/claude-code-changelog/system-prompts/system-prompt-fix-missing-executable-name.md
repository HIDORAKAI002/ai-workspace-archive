# System Prompt: fix-missing-executable-name

- Source: inline

## Summary

Advise fixes when a specified CLI subcommand executable path is missing.

# Raw Prompt Text
'${NUM}' does not exist
 - if '${EXPR_1}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 -  (PID ${EXPR_2})
