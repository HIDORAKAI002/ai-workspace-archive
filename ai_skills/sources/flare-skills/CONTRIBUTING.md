# Contributing

This document describes the process of contributing to this project. It is
intended for anyone considering opening an issue or pull request.

## AI Assistance

> [!IMPORTANT]
>
> If you are using **any kind of AI assistance** to contribute to this project,
> it must be disclosed in the pull request.

If you are using any kind of AI assistance while contributing to this project,
**this must be disclosed in the pull request**, along with the extent to which
AI assistance was used. Trivial tab-completion doesn't need to be disclosed, as
long as it is limited to single keywords or short phrases.

An example disclosure:

> This PR was written primarily by Claude Code.

Or a more detailed disclosure:

> I consulted ChatGPT to understand the codebase, but the solution was fully
> authored manually by myself.

## Quick Start

If you'd like to contribute, report a bug, suggest a feature, or you've
implemented a new skill, please open an issue or pull request.

## Contributing a New Skill

To add a new skill to this repository:

1. Create a new folder under `skills/` with the naming convention `flare-<skill-name>-skill/`
2. Add the required files:
   - `SKILL.md` — Main skill instructions and domain knowledge
   - `reference.md` — Links to relevant Flare Developer Hub documentation
3. Optionally add a `scripts/` folder for helper utilities
4. Update the root `README.md` to include your skill in the Available Skills table

### Skill File Guidelines

**SKILL.md** should include:
- Clear description of the skill's purpose
- Key concepts and terminology
- Step-by-step workflows where applicable
- Code examples when relevant

**reference.md** should include:
- Links to official Flare documentation
- Links to relevant contract addresses or APIs
- Any external resources the agent should reference

## Style Guidelines

- Use clear, concise language
- Follow existing formatting patterns in other skills
- Ensure all links are valid and point to current documentation
- Test your skill with an AI agent before submitting
