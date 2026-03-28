# System Prompt: powershell-get-process-commandline

- Source: inline

## Summary

Run PowerShell CIM query to print a process command line by PID.

# Raw Prompt Text
powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \"ProcessId=${EXPR_1}\").CommandLine"
