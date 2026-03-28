# Bootstrap planning-with-files into the current workspace (idempotent).
# Run from the workspace root:
#   pwsh -File .kiro/skills/planning-with-files/assets/scripts/bootstrap.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SkillDir = (Resolve-Path (Join-Path $ScriptDir "..\..")).Path
$TemplatesSrc = Join-Path $SkillDir "assets\templates"
$ProjectDir = if ($env:PLANNING_PROJECT_ROOT) { $env:PLANNING_PROJECT_ROOT } else { (Get-Location).Path }
$PlanDest = Join-Path $ProjectDir ".kiro\plan"
$SteeringDest = Join-Path $ProjectDir ".kiro\steering"

Write-Host ""
Write-Host "planning-with-files (Kiro) — bootstrap"
Write-Host "Project: $ProjectDir"
Write-Host ""

Write-Host "[ Planning files → $PlanDest ]"
New-Item -ItemType Directory -Force -Path $PlanDest | Out-Null

$installed = 0
$skipped = 0
foreach ($tpl in @("task_plan.md", "findings.md", "progress.md")) {
    $dest = Join-Path $PlanDest $tpl
    $src = Join-Path $TemplatesSrc $tpl
    if (Test-Path $dest) {
        Write-Host "  SKIP  $tpl"
        $skipped++
    } else {
        Copy-Item -Path $src -Destination $dest
        Write-Host "  OK    $tpl"
        $installed++
    }
}

Write-Host ""
Write-Host "[ Steering → $SteeringDest ]"
New-Item -ItemType Directory -Force -Path $SteeringDest | Out-Null

$contextSrc = Join-Path $TemplatesSrc "planning-context.md"
$contextDest = Join-Path $SteeringDest "planning-context.md"
if (Test-Path $contextDest) {
    Write-Host "  SKIP  planning-context.md"
} else {
    Copy-Item -Path $contextSrc -Destination $contextDest
    Write-Host "  OK    planning-context.md (auto inclusion + #[[file:]] references)"
}

Write-Host ""
Write-Host "Done. Planning files: .kiro/plan/"
Write-Host "Optional: import this folder as a Kiro workspace skill (Agent Steering & Skills → Import)."
Write-Host ""
