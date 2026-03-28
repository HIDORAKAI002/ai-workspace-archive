# System Prompt: review-and-cleanup

- Source: inline

## Summary

Review code changes for quality and efficiency.

# Raw Prompt Text
# Simplify: Code Review and Cleanup

Review all changed files for reuse, quality, and efficiency. Fix any issues found.

## Phase ${NUM}: Identify Changes

Run `git diff` (or `git diff HEAD` if there are staged changes) to see what changed. If there are no git changes, review the most recently modified files that the user mentioned or that you edited earlier in this conversation.

## Phase ${NUM}: Launch Three Review Agents in Parallel

Use the Agent tool to launch all three agents concurrently in a single message. Pass each agent the full diff so it has the complete context.

### Agent ${NUM}: Code Reuse Review

For each change:

${NUM}. **Search for existing utilities and helpers** that could replace newly written code. Look for similar patterns elsewhere in the codebase — common locations are utility directories, shared modules, and files adjacent to the changed ones.
${NUM}. **Flag any new function that duplicates existing functionality.** Suggest the existing function to use instead.
${NUM}. **Flag any inline logic that could use an existing utility** — hand-rolled string manipulation, manual path handling, custom environment checks, ad-hoc type guards, and similar patterns are common candidates.

### Agent ${NUM}: Code Quality Review

Review the same changes for hacky patterns:

${NUM}. **Redundant state**: state that duplicates existing state, cached values that could be derived, observers${PATH} that could be direct calls
${NUM}. **Parameter sprawl**: adding new parameters to a function instead of generalizing or restructuring existing ones
${NUM}. **Copy-paste with slight variation**: near-duplicate code blocks that should be unified with a shared abstraction
${NUM}. **Leaky abstractions**: exposing internal details that should be encapsulated, or breaking existing abstraction boundaries
${NUM}. **Stringly-typed code**: using raw strings where constants, enums (string unions), or branded types already exist in the codebase
${NUM}. **Unnecessary JSX nesting**: wrapper Boxes${PATH} that add no layout value — check if inner component props (flexShrink, alignItems, etc.) already provide the needed behavior
${NUM}. **Unnecessary comments**: comments explaining WHAT the code does (well-named identifiers already do that), narrating the change, or referencing the task${PATH} — delete; keep only non-obvious WHY (hidden constraints, subtle invariants, workarounds)

### Agent ${NUM}: Efficiency Review

Review the same changes for efficiency:

${NUM}. **Unnecessary work**: redundant computations, repeated file reads, duplicate network${PATH} calls, N+${NUM} patterns
${NUM}. **Missed concurrency**: independent operations run sequentially when they could run in parallel
${NUM}. **Hot-path bloat**: new blocking work added to startup or per-request${PATH} hot paths
${NUM}. **Recurring no-op updates**: state${PATH} updates inside polling loops, intervals, or event handlers that fire unconditionally — add a change-detection guard so downstream consumers aren't notified when nothing changed. Also: if a wrapper function takes an updater${PATH} callback, verify it honors same-reference returns (or whatever the "no change" signal is) — otherwise callers' early-return no-ops are silently defeated
${NUM}. **Unnecessary existence checks**: pre-checking file${PATH} existence before operating (TOCTOU anti-pattern) — operate directly and handle the error
${NUM}. **Memory**: unbounded data structures, missing cleanup, event listener leaks
${NUM}. **Overly broad operations**: reading entire files when only a portion is needed, loading all items when filtering for one

## Phase ${NUM}: Fix Issues

Wait for all three agents to complete. Aggregate their findings and fix each issue directly. If a finding is a false positive or not worth addressing, note it and move on — do not argue with the finding, just skip it.

When done, briefly summarize what was fixed (or confirm the code was already clean).
