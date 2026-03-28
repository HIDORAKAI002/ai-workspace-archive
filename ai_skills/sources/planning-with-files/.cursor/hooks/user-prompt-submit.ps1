# planning-with-files: User prompt submit hook for Cursor (PowerShell)
# Injects plan context on every user message.
# Critical for session recovery after /clear — dumps actual content, not just advice.

if (Test-Path "task_plan.md") {
    Write-Output "[planning-with-files] ACTIVE PLAN — current state:"
    Get-Content "task_plan.md" -TotalCount 50 -Encoding UTF8
    Write-Output ""
    Write-Output "=== recent progress ==="
    if (Test-Path "progress.md") {
        Get-Content "progress.md" -Tail 20 -Encoding UTF8
    }
    Write-Output ""
    Write-Output "[planning-with-files] Read findings.md for research context. Continue from the current phase."
}
exit 0
