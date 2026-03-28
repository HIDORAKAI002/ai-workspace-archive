# System Prompt: list-untracked-files

- Source: inline

## Summary

List untracked files with core.quotepath disabled and standard excludes applied.

# Raw Prompt Text
-c

core.quotepath=false

ls-files

--others

--exclude-standard
