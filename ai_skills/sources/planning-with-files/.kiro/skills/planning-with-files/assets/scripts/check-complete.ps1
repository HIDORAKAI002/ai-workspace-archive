# Report phase completion status for task_plan.md (stdout only, always exit 0).
# Default plan path: .kiro/plan/task_plan.md (relative to current directory).

param(
    [string]$PlanFile = ".kiro/plan/task_plan.md"
)

if (-not (Test-Path $PlanFile)) {
    Write-Host "[planning-with-files] No task plan at $PlanFile — run bootstrap or specify path."
    exit 0
}

$content = Get-Content $PlanFile -Raw
$TOTAL = ([regex]::Matches($content, "### Phase")).Count
$COMPLETE = ([regex]::Matches($content, "\*\*Status:\*\* complete")).Count
$IN_PROGRESS = ([regex]::Matches($content, "\*\*Status:\*\* in_progress")).Count
$PENDING = ([regex]::Matches($content, "\*\*Status:\*\* pending")).Count

if ($COMPLETE -eq 0 -and $IN_PROGRESS -eq 0 -and $PENDING -eq 0) {
    $COMPLETE = ([regex]::Matches($content, "\[complete\]")).Count
    $IN_PROGRESS = ([regex]::Matches($content, "\[in_progress\]")).Count
    $PENDING = ([regex]::Matches($content, "\[pending\]")).Count
}

if ($COMPLETE -eq $TOTAL -and $TOTAL -gt 0) {
    Write-Host "[planning-with-files] ALL PHASES COMPLETE ($COMPLETE/$TOTAL)."
} else {
    Write-Host "[planning-with-files] In progress ($COMPLETE/$TOTAL phases complete)."
    if ($IN_PROGRESS -gt 0) {
        Write-Host "[planning-with-files] $IN_PROGRESS phase(s) in_progress."
    }
    if ($PENDING -gt 0) {
        Write-Host "[planning-with-files] $PENDING phase(s) pending."
    }
}
exit 0
