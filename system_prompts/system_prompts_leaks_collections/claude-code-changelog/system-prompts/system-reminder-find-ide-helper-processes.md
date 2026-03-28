# System Prompt: find-ide-helper-processes

- Source: inline

## Summary

Shell command to locate IDE and helper processes via ps and grep.

# Raw Prompt Text
ps aux | grep -E "Visual Studio Code|Code Helper|Cursor Helper|Windsurf Helper|IntelliJ IDEA|PyCharm|WebStorm|PhpStorm|RubyMine|CLion|GoLand|Rider|DataGrip|AppCode|DataSpell|Aqua|Gateway|Fleet|Android Studio" | grep -v grep
