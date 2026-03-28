# System Prompt: add-native-path-export

- Source: inline

## Summary

Instructs adding a native install directory to PATH via shell profile.

# Raw Prompt Text
Native installation exists but ~${PATH} is not in your PATH. Run:

echo 'export PATH="$HOME${PATH}:$PATH"' >> ${EXPR_1} && source ${EXPR_2}
