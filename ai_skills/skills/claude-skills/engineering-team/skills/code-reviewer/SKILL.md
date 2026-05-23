---
name: "code-reviewer"
description: Code review automation for TypeScript, JavaScript, Python, Go, Swift, Kotlin, C#, and .NET. Analyzes PRs for complexity and risk, checks code quality for SOLID violations and code smells, generates review reports. Use when reviewing pull requests, analyzing code quality, identifying issues, generating review checklists.
---

# Code Reviewer

Automated code review tools for analyzing pull requests, detecting code quality issues, and generating review reports.

---

## Table of Contents

- [Tools](#tools)
  - [PR Analyzer](#pr-analyzer)
  - [Code Quality Checker](#code-quality-checker)
  - [Review Report Generator](#review-report-generator)
- [Reference Guides](#reference-guides)
- [Languages Supported](#languages-supported)

---

## Tools

### PR Analyzer

Analyzes git diff between branches to assess review complexity and identify risks.

```bash
# Analyze current branch against main
python scripts/pr_analyzer.py /path/to/repo

# Compare specific branches
python scripts/pr_analyzer.py . --base main --head feature-branch

# JSON output for integration
python scripts/pr_analyzer.py /path/to/repo --json
```

**What it detects:**
- Hardcoded secrets (passwords, API keys, tokens, connection strings)
- SQL injection patterns (string concatenation in queries)
- Debug statements (debugger, console.log, Debug.WriteLine)
- ESLint / Roslyn analyzer rule disabling (`#pragma warning disable`, `[SuppressMessage]`)
- TypeScript `any` types / C# `dynamic` overuse
- TODO/FIXME comments
- Unsafe code blocks (`unsafe { }` in C#)
- Nullable reference type suppressions (`!` null-forgiving operator overuse)

**Output includes:**
- Complexity score (1-10)
- Risk categorization (critical, high, medium, low)
- File prioritization for review order
- Commit message validation

---

### Code Quality Checker

Analyzes source code for structural issues, code smells, and SOLID violations.

```bash
# Analyze a directory
python scripts/code_quality_checker.py /path/to/code

# Analyze specific language (valid values: python, typescript, javascript, go, swift, kotlin, csharp)
python scripts/code_quality_checker.py . --language python

# JSON output
python scripts/code_quality_checker.py /path/to/code --json
```

**What it detects:**
- Long functions/methods (>50 lines)
- Large files (>500 lines)
- God classes (>20 methods)
- Deep nesting (>4 levels)
- Too many parameters (>5)
- High cyclomatic complexity
- Missing error handling (bare `catch` / `catch (Exception)` swallowing)
- Unused imports / unnecessary `using` directives
- Magic numbers
- C#-specific: missing `async`/`await` on async paths, `Task` not awaited, `IDisposable` not disposed

**Thresholds:**

| Issue | Threshold |
|-------|-----------|
| Long function | >50 lines |
| Large file | >500 lines |
| God class | >20 methods |
| Too many params | >5 |
| Deep nesting | >4 levels |
| High complexity | >10 branches |

---

### Review Report Generator

Combines PR analysis and code quality findings into structured review reports.

```bash
# Generate report for current repo
python scripts/review_report_generator.py /path/to/repo

# Markdown output
python scripts/review_report_generator.py . --format markdown --output review.md

# Use pre-computed analyses
python scripts/review_report_generator.py . \
  --pr-analysis pr_results.json \
  --quality-analysis quality_results.json
```

**Report includes:**
- Review verdict (approve, request changes, block)
- Score (0-100)
- Prioritized action items
- Issue summary by severity
- Suggested review order

**Verdicts:**

| Score | Verdict |
|-------|---------|
| 90+ with no high issues | Approve |
| 75+ with ≤2 high issues | Approve with suggestions |
| 50-74 | Request changes |
| <50 or critical issues | Block |

---

## Reference Guides

### Code Review Checklist
`references/code_review_checklist.md`

Systematic checklists covering:
- Pre-review checks (build, tests, PR hygiene)
- Correctness (logic, data handling, error handling)
- Security (input validation, injection prevention)
- Performance (efficiency, caching, scalability)
- Maintainability (code quality, naming, structure)
- Testing (coverage, quality, mocking)
- Language-specific checks (including C# / .NET)

### Coding Standards
`references/coding_standards.md`

Language-specific standards for:
- TypeScript (type annotations, null safety, async/await)
- JavaScript (declarations, patterns, modules)
- Python (type hints, exceptions, class design)
- Go (error handling, structs, concurrency)
- Swift (optionals, protocols, errors)
- Kotlin (null safety, data classes, coroutines)
- **C# / .NET** (nullable reference types, async/await, LINQ, dependency injection, exception handling, record types, pattern matching)

### Common Antipatterns
`references/common_antipatterns.md`

Antipattern catalog with examples and fixes:
- Structural (god class, long method, deep nesting)
- Logic (boolean blindness, stringly typed code)
- Security (SQL injection, hardcoded credentials, unvalidated input in ASP.NET)
- Performance (N+1 queries, unbounded collections, `async void`, blocking on async code with `.Result` / `.Wait()`)
- Testing (duplication, testing implementation)
- Async (floating promises, callback hell, `async void` in C#, deadlocks from `.GetAwaiter().GetResult()`)
- **C# / .NET-specific**: catching and swallowing `Exception`, missing `ConfigureAwait`, overuse of `dynamic`, not disposing `IDisposable` resources, mutable public setters on domain models

---

## C# / .NET Review Notes

When reviewing C# or .NET code, pay special attention to:

### Async / Await
- Flag `async void` methods (except event handlers) — they can't be awaited and swallow exceptions
- Flag `.Result`, `.Wait()`, or `.GetAwaiter().GetResult()` on `Task` — causes deadlocks in ASP.NET contexts
- Flag missing `ConfigureAwait(false)` in library code

### Nullable Reference Types
- Flag excessive use of the null-forgiving operator (`!`) without justification
- Ensure nullable annotations are enabled at the project level (`<Nullable>enable</Nullable>`)
- Flag unchecked dereferences of potentially null values

### Resource Management
- Flag `IDisposable` objects not wrapped in `using` / `using var`
- Flag `HttpClient` instantiated with `new` inside methods (should be injected or use `IHttpClientFactory`)
- Flag `DbContext` not scoped correctly in DI

### Exception Handling
- Flag bare `catch { }` or `catch (Exception) { }` that swallows exceptions silently
- Flag catching `Exception` when a more specific type is appropriate
- Flag exceptions used for control flow

### LINQ
- Flag `.ToList()` / `.ToArray()` called prematurely on queryables, forcing unnecessary DB round-trips
- Flag `First()` where `FirstOrDefault()` is safer
- Flag complex LINQ chains that would be clearer as explicit loops

### Security (ASP.NET)
- Flag raw string interpolation in SQL queries — require parameterized queries or EF Core
- Flag missing `[ValidateAntiForgeryToken]` on state-changing controller actions
- Flag user-controlled data passed to `Process.Start()` or `File` APIs without validation
- Flag hardcoded connection strings in source (should use `appsettings.json` + secrets management)

---

## Languages Supported

| Language | Extensions |
|----------|------------|
| Python | `.py` |
| TypeScript | `.ts`, `.tsx` |
| JavaScript | `.js`, `.jsx`, `.mjs` |
| Go | `.go` |
| Swift | `.swift` |
| Kotlin | `.kt`, `.kts` |
| **C# / .NET** | **`.cs`, `.csx`, `.razor`, `.cshtml`** |
