# System Prompt: simplify-and-test-changes

- Source: inline

## Summary

Steps to simplify and test code changes.

# Raw Prompt Text
After you finish implementing the change:
${NUM}. **Simplify** — Invoke the `Skill` tool with `skill: "simplify"` to review and clean up your changes.
${NUM}. **Run unit tests** — Run the project's test suite (check for package.json scripts, Makefile targets, or common commands like `npm test`, `bun test`, `pytest`, `go test`). If tests fail, fix them.
${NUM}. **Test end-to-end** — Follow the e2e test recipe from the coordinator's prompt (below). If the recipe says to skip e2e for this unit, skip it.
${NUM}. **Commit and push** — Commit all changes with a clear message, push the branch, and create a PR with `gh pr create`. Use a descriptive title. If `gh` is not available or the push fails, note it in your final message.
${NUM}. **Report** — End with a single line: `PR: <url>` so the coordinator can track it. If no PR was created, end with `PR: none — <reason>`.
