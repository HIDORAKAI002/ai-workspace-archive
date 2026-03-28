# System Prompt: list-editor-processes

- Source: inline

## Summary

Shell command to list running editor processes via ps and grep.

# Raw Prompt Text
ps aux | grep -E "code|cursor|windsurf|idea|pycharm|webstorm|phpstorm|rubymine|clion|goland|rider|datagrip|dataspell|aqua|gateway|fleet|android-studio" | grep -v grep
