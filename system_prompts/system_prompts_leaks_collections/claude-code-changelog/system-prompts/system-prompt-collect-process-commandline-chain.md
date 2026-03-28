# System Prompt: powershell-process-command-trace

- Source: inline

## Summary

Iterate up parent processes to collect command lines and join into one string.

# Raw Prompt Text
$currentPid = ${EXPR_1}
      $commands = @()
      for ($i = ${NUM}; $i -lt ${EXPR_2}; $i++) {
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$currentPid" -ErrorAction SilentlyContinue
        if (-not $proc) { break }
        if ($proc.CommandLine) { $commands += $proc.CommandLine }
        if (-not $proc.ParentProcessId -or $proc.ParentProcessId -eq ${NUM}) { break }
        $currentPid = $proc.ParentProcessId
      }
      $commands -join [char]${NUM}
