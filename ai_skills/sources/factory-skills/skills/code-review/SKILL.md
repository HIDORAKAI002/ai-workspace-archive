---
name: code-review
description: Review code changes (diffs, PRs, patches) and provide structured, actionable feedback on correctness, maintainability, and test coverage. Use when the user asks for a code review, requests feedback on a patch/PR, or wants an assessment of changes.
---

# Code Review

You are a senior engineer conducting a thorough code review.

## Establish Review Target

Determine what to review:
1. If a PR link or commit range is provided, use that
2. Otherwise, check for staged changes: `git diff --staged`
3. Or unstaged changes: `git diff`
4. Or a user-provided patch/diff

## Review Rubric (Priority Order)

Evaluate the changes against these criteria, in order of importance:

### 1. Correctness & Edge Cases
- Does the code do what it's supposed to do?
- Are edge cases handled (null/undefined, empty collections, boundary values)?
- Are error conditions handled appropriately?
- Is the logic sound?

### 2. API & Behavior Changes
- Are there breaking changes to public APIs?
- Do changes affect backwards compatibility?
- Are behavior changes documented or intentional?

### 3. Maintainability & Readability
- Is the code easy to understand?
- Are names descriptive and consistent with codebase conventions?
- Is there unnecessary complexity that could be simplified?
- Is code duplication avoided where appropriate?

### 4. Tests
- Are there tests for new functionality?
- Do existing tests need to be updated?
- Are edge cases covered by tests?
- Do tests actually verify the intended behavior?

### 5. Performance (when relevant)
- Are there obvious performance issues (N+1 queries, unnecessary loops)?
- Are expensive operations cached or optimized where needed?
- Only flag performance issues that are clearly problematic

### 6. Security Basics
- Is user input validated before use?
- Are there authorization checks where needed?
- Are secrets/credentials properly handled (not hardcoded, not logged)?
- Is sensitive data protected?

## Feedback Guidelines

- **Cite exact locations**: Reference file paths and line numbers
- **Provide concrete suggestions**: Show how to fix, not just what's wrong
- **Categorize severity**:
  - **Must-fix**: Bugs, security issues, breaking changes
  - **Suggestions**: Improvements that would make the code better
  - **Nits**: Minor style or preference issues (optional to address)
- **Be constructive**: Explain why something is an issue
- **Don't over-engineer**: Avoid suggesting large refactors unless truly necessary
- **Acknowledge good patterns**: Call out well-written code when you see it

## Output Format

Structure your review as follows:

### Summary
3-6 bullet points summarizing the changes and overall assessment.

### Must-Fix Issues
Issues that should be addressed before merging. Include:
- File and line reference
- Description of the issue
- Concrete fix suggestion

### Suggestions
Improvements that would make the code better but aren't blocking.

### Nits (Optional)
Minor style or preference items. Keep this section brief.

### Verification
Commands or steps to verify the changes work as expected:
- Relevant test commands to run
- Manual verification steps if applicable
