# Kiro

Use **planning-with-files** with [Kiro](https://kiro.dev): **Agent Skills**, optional **Steering** (created by bootstrap), and on-disk markdown under `.kiro/plan/`.

Official references:

- [Agent Skills](https://kiro.dev/docs/skills/)
- [Steering](https://kiro.dev/docs/steering/) (inclusion modes, `#[[file:path]]` live file references)

---

## What ships in this repo

Only the workspace skill folder:

```
.kiro/skills/planning-with-files/
├── SKILL.md
├── references/          # manus-principles, planning-rules, planning-templates
└── assets/
    ├── scripts/         # bootstrap, session-catchup, check-complete (.sh + .ps1 + .py)
    └── templates/       # task_plan, findings, progress, planning-context (steering)
```

Running **bootstrap** (from the project root) creates:

| Path | Role |
|------|------|
| `.kiro/plan/task_plan.md` | Goal, phases, decisions, errors |
| `.kiro/plan/findings.md` | Research and technical decisions |
| `.kiro/plan/progress.md` | Session log |
| `.kiro/steering/planning-context.md` | `inclusion: auto` + `#[[file:.kiro/plan/…]]` |

Design note: **hooks are not installed by default.** Hooks are workspace-wide. This integration uses the skill, generated steering, and the `[Planning Active]` reminder in `SKILL.md`.

---

## Install into your project

```bash
git clone https://github.com/OthmanAdi/planning-with-files.git
mkdir -p .kiro/skills
cp -r planning-with-files/.kiro/skills/planning-with-files ./.kiro/skills/
```

Then from your **project root**:

```bash
sh .kiro/skills/planning-with-files/assets/scripts/bootstrap.sh
```

Windows (PowerShell):

```powershell
pwsh -ExecutionPolicy Bypass -File .kiro/skills/planning-with-files/assets/scripts/bootstrap.ps1
```

---

## Import the skill in Kiro

1. Open **Agent Steering & Skills** in the Kiro panel.  
2. **Import a skill** → local folder → `.kiro/skills/planning-with-files`  
3. Or copy that folder to `~/.kiro/skills/planning-with-files` for a **global** skill ([scope](https://kiro.dev/docs/skills/#skill-scope)).

---

## Scripts (under the skill)

All paths are relative to the **project root** after you have copied `.kiro/skills/planning-with-files/` into the project.

| Script | Purpose |
|--------|---------|
| `assets/scripts/bootstrap.sh` / `bootstrap.ps1` | Create `.kiro/plan/*` and `planning-context.md` (idempotent) |
| `assets/scripts/session-catchup.py` | Print mtime + short summary of planning files |
| `assets/scripts/check-complete.sh` / `check-complete.ps1` | Report phase completion vs `.kiro/plan/task_plan.md` |

Examples:

```bash
sh .kiro/skills/planning-with-files/assets/scripts/check-complete.sh
$(command -v python3 || command -v python) \
  .kiro/skills/planning-with-files/assets/scripts/session-catchup.py "$(pwd)"
```

```powershell
pwsh -File .kiro/skills/planning-with-files/assets/scripts/check-complete.ps1
python .kiro/skills/planning-with-files/assets/scripts/session-catchup.py (Get-Location)
```

---

## Manus-style context engineering

The skill description and [references/manus-principles.md](../.kiro/skills/planning-with-files/references/manus-principles.md) document the **filesystem-as-memory** pattern discussed in Manus-style agent context engineering.

---

## Template reference

See [references/planning-templates.md](../.kiro/skills/planning-with-files/references/planning-templates.md) for compact paste-friendly skeletons. To use them as **manual steering** in Kiro, copy that file into `.kiro/steering/` and add the YAML front matter described at the top of that file.
