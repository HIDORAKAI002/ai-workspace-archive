# System Prompt: bash-function-snapshot

- Source: inline

## Summary

Captures shell function definitions into a snapshot file using declare and base64 encoding.

# Raw Prompt Text
echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      declare -f > ${PATH} ${NUM}>&${NUM}

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      declare -F | cut -d' ' -f3 | grep -vE '^_[^_]' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval \"\$(echo '$encoded_func' | base64 -d)\" > ${PATH} ${NUM}>&${NUM}" >> "$SNAPSHOT_FILE"
      done
