# System Prompt: powershell-process-ancestor-pids

- Source: inline

## Summary

Walk up parent process IDs to build and output a comma-separated ancestor list.

# Raw Prompt Text
$pid = ${EXPR_1}
      $ancestors = @()
      for ($i = ${NUM}; $i -lt ${EXPR_2}; $i++) {
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$pid" -ErrorAction SilentlyContinue
        if (-not $proc -or -not $proc.ParentProcessId -or $proc.ParentProcessId -eq ${NUM}) { break }
        $pid = $proc.ParentProcessId
        $ancestors += $pid
      }
      $ancestors -join ','
