$ErrorActionPreference = "Stop"

$sourceDir = "c:\Users\josep\OneDrive\Desktop\ai_skills\sources"

Write-Host "🔄 Starting Daily Skills Sync & Commit..." -ForegroundColor Cyan

# 1. Update existing sources or clone if missing
$repos = @(
    @("https://github.com/anthropics/skills.git", "anthropics-skills"),
    @("https://github.com/openai/skills.git", "openai-skills"),
    @("https://github.com/huggingface/skills.git", "hf-skills"),
    @("https://github.com/heilcheng/awesome-agent-skills.git", "heilcheng-agent-skills"),
    @("https://github.com/VoltAgent/awesome-agent-skills.git", "voltagent-agent-skills"),
    @("https://github.com/gmh5225/awesome-skills.git", "gmh5225-awesome-skills"),
    @("https://github.com/sickn33/antigravity-awesome-skills.git", "sickn33-awesome-skills"),
    @("https://github.com/karanb192/awesome-claude-skills.git", "karanb-claude-skills"),
    @("https://github.com/shajith003/awesome-claude-skills.git", "shajith-skills"),
    @("https://github.com/WordPress/agent-skills.git", "wordpress-skills"),
    @("https://github.com/kepano/obsidian-skills.git", "obsidian-skills"),
    @("https://github.com/flare-foundation/flare-ai-skills.git", "flare-skills"),
    @("https://github.com/sugarforever/01coder-agent-skills.git", "sugarforever-skills"),
    @("https://github.com/alirezarezvani/claude-skills.git", "alirezarezvani-skills"),
    @("https://github.com/Integralist/claude-skills.git", "integralist-skills"),
    @("https://github.com/Factory-AI/skills.git", "factory-skills"),
    @("https://github.com/agentscope-ai/skills.git", "agentscope-skills"),
    @("https://github.com/yoriiis/ai-skills.git", "yoriiis-skills"),
    @("https://github.com/OthmanAdi/planning-with-files.git", "planning-with-files"),
    @("https://github.com/seedprod/openclaw-prompts-and-skills.git", "openclaw-skills"),
    @("https://github.com/jwiegley/promptdeploy.git", "promptdeploy"),
    @("https://github.com/github/awesome-copilot.git", "awesome-copilot"),
    @("https://github.com/apify/awesome-skills.git", "apify-skills")
)

if (!(Test-Path $sourceDir)) {
    mkdir $sourceDir -Force | Out-Null
}

Write-Host "📥 Pulling latest updates from source repositories..."
foreach ($repo in $repos) {
    $url = $repo[0]
    $dirName = $repo[1]
    $targetPath = Join-Path $sourceDir $dirName

    if (Test-Path -Path $targetPath) {
        Write-Host "  -> Updating $dirName..."
        Set-Location $targetPath
        git pull origin main --quiet 2>$null || git pull origin master --quiet 2>$null
    } else {
        Write-Host "  -> Cloning $dirName..."
        Set-Location $sourceDir
        git clone $url $dirName --quiet
    }
}

Set-Location "c:\Users\josep\OneDrive\Desktop\ai_skills"

Write-Host "🪄 Aggregating and Formatting Skills..." -ForegroundColor Yellow
python scripts/aggregate.py

Write-Host "🚀 Pushing Daily Commits to GitHub..." -ForegroundColor Green
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git add .
git commit -m "chore(sync): daily update and format of skills ($timestamp)"
# git push origin main # Uncomment once a remote origin is set

Write-Host "✅ Sync Complete! You've got your daily commit." -ForegroundColor Cyan
