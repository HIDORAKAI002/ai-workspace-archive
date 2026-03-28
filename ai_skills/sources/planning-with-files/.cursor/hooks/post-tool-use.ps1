# planning-with-files: Post-tool-use hook for Cursor (PowerShell)
# Reminds the agent to update task_plan.md after file modifications.

if (Test-Path "task_plan.md") {
    Write-Output "[planning-with-files] Update progress.md with what you just did. If a phase is now complete, update task_plan.md status."
}
exit 0
