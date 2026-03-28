# System Prompt: find-running-ide-processes

- Source: inline

## Summary

Checks running processes for common IDE executables via tasklist and findstr.

# Raw Prompt Text
tasklist | findstr /I "Code.exe Cursor.exe Windsurf.exe idea64.exe pycharm64.exe webstorm64.exe phpstorm64.exe rubymine64.exe clion64.exe goland64.exe rider64.exe datagrip64.exe appcode.exe dataspell64.exe aqua64.exe gateway64.exe fleet.exe studio64.exe"
