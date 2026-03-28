# System Prompt: export-aliases-filter-winpty

- Source: inline

## Summary

Writes aliases into the snapshot while filtering winpty aliases on Windows.

# Raw Prompt Text
echo "# Aliases" >> "$SNAPSHOT_FILE"
      # Filter out winpty aliases on Windows to avoid "stdin is not a tty" errors
      # Git Bash automatically creates aliases like "alias node='winpty node.exe'" for
      # programs that need Win32 Console in mintty, but winpty fails when there's no TTY
      if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        alias | grep -v "='winpty " | sed 's/^alias //g' | sed 's/^${PATH} -- /' | head -n ${NUM} >> "$SNAPSHOT_FILE"
      else
        alias | sed 's/^alias //g' | sed 's/^${PATH} -- /' | head -n ${NUM} >> "$SNAPSHOT_FILE"
      fi
