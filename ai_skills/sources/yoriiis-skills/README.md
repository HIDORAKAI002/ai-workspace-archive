# Frontend code review skill

> **Scalable frontend quality control.** An automated review engine for GitHub and GitLab designed to tackle "Comprehension debt" in the era of high-velocity, AI-assisted development.

This skill is part of the [yoriiis/ai-skills](https://github.com/yoriiis/ai-skills) collection and is compatible with the [Agent Skills](https://skills.sh) ecosystem.

---

## 📦 Platforms & registries

This skill is available on multiple agent skill ecosystems:

| Platform           | Link                                                                                                         |
| :----------------- | :----------------------------------------------------------------------------------------------------------- |
| **Agent Skills**   | [skills.sh/yoriiis/ai-skills/frontend-code-review](https://skills.sh/yoriiis/ai-skills/frontend-code-review) |
| **Tessl Registry** | [tessl.io/registry/yoriiis/frontend-code-review](https://tessl.io/registry/yoriiis/frontend-code-review)     |

---

## 🚀 Installation

Choose the command that matches your agent environment:

### Agent Skills (skills.sh)

```bash
npx skills add yoriiis/ai-skills --skill frontend-code-review
```

### Tessl

```bash
tessl install https://github.com/yoriiis/ai-skills --skill frontend-code-review
```

---

## 💡 Philosophy: "Every comment must earn its place"

The goal of this skill is to provide high-signal feedback. Every reported finding must meet at least one of these criteria:

- Prevent a real bug, security flaw, or production incident.
- Teach a better pattern or provide critical context.
- Save future debugging time by identifying edge cases.
- Improve user experience through accessibility or performance.

> [!TIP]
> This skill follows a "Gatekeeper" protocol: it only loads reference modules that strictly match the file extensions detected in your diff, ensuring maximum efficiency and context focus.

---

## 🛠 Key pillars

### 1. Step 0: Convention discovery

Before any analysis, the agent scans the project to detect active tooling (linter, formatter, module type). It adapts its feedback severity based on your project's existing safety nets.

### 2. Remote source of truth

Analysis is strictly based on the remote diff from the PR/MR branch.

> [!NOTE]
> This eliminates false positives caused by out-of-sync local workspaces. The remote repository is the only source of truth.

---

## 📊 Severity levels

Findings are prioritized using a structured tagging system:

| Level                    | Description                                                              |
| :----------------------- | :----------------------------------------------------------------------- |
| **[Blocking]**           | Critical issues (bugs, security, data loss). Must be fixed before merge. |
| **[Important]**          | Significant improvements in architecture, accessibility, or reliability. |
| **[Suggestion]**         | Quality-of-life improvements or alternative patterns.                    |
| **[Attention Required]** | Nuanced logic or visual changes that require human verification.         |
| **[Minor]**              | Code hygiene (logs, minor formatting) — consolidated into one section.   |

> [!CAUTION]
> **[Blocking]** findings include a mandatory "Consequence" statement to explain exactly what will break if the code is merged as is.

---

## 🔄 3-phase workflow

This skill follows a structured process to keep the developer in control:

1. **Phase 1: Chat report** — A detailed report is generated in the chat interface for initial review.
2. **Phase 2: Selection** — The user reviews findings and selects which ones are relevant to post on the PR/MR.
3. **Phase 3: Automated posting** — The agent posts selected findings directly to GitHub/GitLab with AI disclosure.

> [!WARNING]
> All comments posted on the PR/MR include a mandatory AI disclosure to maintain transparency within the engineering team.

---

## 📚 Reference modules

The engine utilizes an atomic set of standards sorted alphabetically for easy navigation:

- **`accessibility.md`**: Focus traps, ARIA management, and SVG accessibility.
- **`architecture.md`**: SRP/DIP principles, coupling, and separation of concerns.
- **`assets.md`**: Media optimization, SVG sprites, and font loading.
- **`ci-cd.md`**: Integrity of GitHub Actions and GitLab CI workflows.
- **`code-quality.md`**: Performance batching and boundary conditions.
- **`css.md`**: Consistency with project conventions and rendering performance.
- **`html.md`**: Semantic hierarchy and script loading strategies.
- **`js-ts.md`**: Semantic naming, TypeScript hygiene, and DOM interaction.
- **`security.md`**: XSS prevention, prototype pollution, and PII protection.
- **`templates.md`**: Logic isolation in server-side templates (e.g., Twig).
- **`testing.md`**: Behavioral assertions vs. implementation details.

---

## 📝 Usage example

Once installed, simply ask your agent to review a specific PR or MR:

```text
"Review this PR: https://github.com/owner/repo/pull/123"
```

Learn more: [skills.sh](https://skills.sh) | [Tessl Registry](https://tessl.io/registry)

---

_Maintained by [yoriiis](https://github.com/yoriiis)_
