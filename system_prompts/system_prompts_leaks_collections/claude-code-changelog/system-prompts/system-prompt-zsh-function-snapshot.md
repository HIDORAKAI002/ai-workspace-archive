# System Prompt: zsh-function-snapshot

- Source: inline

## Summary

Writes Zsh function definitions into a snapshot file using typeset and filtering rules.

# Raw Prompt Text
echo "# Functions" >> "$SNAPSHOT_FILE"

      # Force autoload all functions first
      typeset -f > ${PATH} ${NUM}>&${NUM}

      # Now get user function names - filter completion functions (single underscore prefix)
      # but keep double-underscore helpers (e.g. __zsh_like_cd from mise, __pyenv_init)
      typeset +f | grep -vE '^_[^_]' | while read func; do
        typeset -f "$func" >> "$SNAPSHOT_FILE"
      done
