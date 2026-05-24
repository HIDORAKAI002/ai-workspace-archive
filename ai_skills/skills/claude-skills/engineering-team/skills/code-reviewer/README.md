# code-reviewer

Code review automation for TypeScript, JavaScript, Python, Go, Swift, Kotlin, C#, and .NET. Analyzes PRs for complexity and risk, checks code quality for SOLID violations and code smells, and generates review reports.

The full skill spec is [`SKILL.md`](./SKILL.md). This README is a quick reference for the 3 bundled scripts.

---

## How to use

### Quick install check

```bash
python scripts/pr_analyzer.py --help
python scripts/code_quality_checker.py --help
python scripts/review_report_generator.py --help
```

All three scripts are stdlib-only — no `pip install` required.

### Example 1 — review a pull request

```bash
# From inside the repo you want to analyze:
python /path/to/skills/code-reviewer/scripts/pr_analyzer.py . --base main --head HEAD
```

Outputs: complexity score (1-10), risk categorization (critical / high / medium / low), prioritized review order, commit-message validation.

### Example 2 — score a directory's code quality

```bash
python scripts/code_quality_checker.py /path/to/code

# Filter by language
python scripts/code_quality_checker.py /path/to/code --language csharp

# Machine-readable
python scripts/code_quality_checker.py /path/to/code --json
```

Outputs: quality score (0-100), letter grade, detected code smells, SOLID violations.

### Example 3 — combine into a review report

```bash
python scripts/review_report_generator.py /path/to/repo --format markdown --output review.md
```

Outputs: review verdict (approve / request changes / block), score, prioritized action items.

---

## Examples bundled with the skill

| File | Purpose |
|------|---------|
| [`assets/sample_csharp_smells.cs`](./assets/sample_csharp_smells.cs) | C# file with every pattern this skill detects, labelled inline |
| [`assets/sample_csharp_clean.cs`](./assets/sample_csharp_clean.cs) | Same code refactored per the standards in `references/` |
| [`expected_outputs/sample_csharp_smells_quality.json`](./expected_outputs/sample_csharp_smells_quality.json) | Expected `code_quality_checker.py --json` output for the smells fixture |
| [`expected_outputs/sample_csharp_clean_quality.json`](./expected_outputs/sample_csharp_clean_quality.json) | Expected output for the clean fixture |

Use them as a regression-detection harness:

```bash
python scripts/code_quality_checker.py assets/sample_csharp_smells.cs --json > /tmp/check.json
diff /tmp/check.json expected_outputs/sample_csharp_smells_quality.json
# silence means the detector still behaves as documented
```

---

## What it detects

See [`SKILL.md`](./SKILL.md) for the full pattern list, severity tiers, and references. Quick summary:

- **PR Analyzer** (`scripts/pr_analyzer.py`): hardcoded secrets / connection strings, SQL injection, debug statements, ESLint / Roslyn analyzer suppressions, `any` / `dynamic` overuse, TODO/FIXME, `unsafe` blocks, null-forgiving `!`, `async void`, blocking on `Task`.
- **Code Quality Checker** (`scripts/code_quality_checker.py`): long methods, large files, god classes, deep nesting, too many parameters, high cyclomatic complexity, swallowed exceptions, missing `await`, undisposed `IDisposable`, `new HttpClient()` in method body, unused `using` directives.
- **Review Report Generator** (`scripts/review_report_generator.py`): combines the above into a single markdown or JSON verdict.

---

## References

In-depth language guides and antipattern catalog live in [`references/`](./references/):

- [`coding_standards.md`](./references/coding_standards.md) — standards for TypeScript, JavaScript, Python, Go, Swift, Kotlin, C# / .NET (nullable reference types, async/await + `ConfigureAwait`, IDisposable, LINQ, DI lifetimes, records + pattern matching, ASP.NET Core security)
- [`common_antipatterns.md`](./references/common_antipatterns.md) — antipattern catalog with examples + fixes, including a full C# / .NET section (`async void`, blocking on async, swallowing `Exception`, undisposed `IDisposable`, `new HttpClient()` in method, missing `ConfigureAwait`, mutable public setters, `dynamic` overuse, unjustified analyzer suppression)
- [`code_review_checklist.md`](./references/code_review_checklist.md) — systematic review checklist
