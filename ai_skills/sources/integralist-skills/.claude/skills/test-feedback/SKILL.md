---
name: test-feedback
description: Parse test failure output and fix the failing tests in a background agent. Use when the user shares test output or says "tests fail". Default output path is /tmp/output.
---

# Test Feedback

Spawn a background agent to parse test failures and fix them.

## Arguments

The user may provide a file path to test output. Default: `/tmp/output`

## Process

1. **Determine the output path.** Use whatever the user provided,
   or `/tmp/output` if not specified.

2. **Verify the file exists** by reading it. If it doesn't exist
   or is empty, ask the user where the output is. Do NOT spawn an
   agent without valid test output.

3. **Spawn a background agent** using the Agent tool with
   `run_in_background: true`. Include in the agent prompt:

   - The path to the test output file
   - Instruction to read the test output first
   - Instruction to parse and summarize failures before fixing
   - Instruction to read relevant source files before proposing
     fixes
   - Instruction to identify root causes — no guessing
   - Instruction to prefer fixing implementation over weakening
     test assertions
   - Instruction to run `make test` after fixing (up to 3
     iterations)
   - Instruction to NOT commit — leave that to the user
   - If the output contains `e2e` or integration test failures,
     note that `make test-integration` requires a running stack
   - The project's CLAUDE.md path for conventions

4. **Return control** to the user immediately with a brief
   confirmation:

   ```text
   Background agent is parsing failures from /tmp/output and
   working on fixes. You'll be notified when it's done.
   ```

## REQUIRED

- You MUST use the Agent tool with `run_in_background: true`.
- You MUST verify the output file exists before spawning.
- You MUST NOT do the fix work yourself.
- You MUST NOT weaken assertions to make tests pass.
