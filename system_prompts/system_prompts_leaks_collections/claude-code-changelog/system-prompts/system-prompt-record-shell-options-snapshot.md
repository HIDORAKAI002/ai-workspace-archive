# System Prompt: record-shell-options-snapshot

- Source: inline

## Summary

Appends current shell options and enables expand_aliases in the snapshot.

# Raw Prompt Text
echo "# Shell Options" >> "$SNAPSHOT_FILE"
      shopt -p | head -n ${NUM} >> "$SNAPSHOT_FILE"
      set -o | grep "on" | awk '{print "set -o " $${NUM}}' | head -n ${NUM} >> "$SNAPSHOT_FILE"
      echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"
