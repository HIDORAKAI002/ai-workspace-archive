# System Prompt: shadow-find-embedded-bfs-snapshot

- Source: inline

## Summary

Command for shadow finding with embedded BFS.

# Raw Prompt Text
# Shadow find${PATH} with embedded bfs${PATH} (ant-native only)
      echo "# Shadow find${PATH} with embedded bfs${PATH}" >> "$SNAPSHOT_FILE"
      cat >> "$SNAPSHOT_FILE" << 'FIND_GREP_FUNC_END'
${EXPR_1}
FIND_GREP_FUNC_END
