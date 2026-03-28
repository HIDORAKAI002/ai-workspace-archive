# Writing rules for review findings

Apply these rules when formatting findings in the review report and when posting comments on the MR/PR.

- Language: use the user's message language; default to English if ambiguous.
- Concise findings: max 2 short sentences per finding. Follow the `[Level]` from reference files strictly. No generic pedagogy.
- Constructive feedback: specific and actionable; explain why; suggest an alternative when possible.
- Focus on the code, not the person. Critique the code, not the developer.
- Consequence required (Blocking and Important only): each finding must include the concrete consequence in one sentence.
- Prioritized: clearly distinguish Blocking vs Important vs Suggestion vs Minor (use the tag from the reference rule) and Attention Required (skill-driven, no tag in references).
- Consolidate: group similar issues (e.g. "5 functions missing error handling" not 5 separate findings).
- Verdict first: the developer must know immediately if they need to act.
- Group by file: easier to navigate than by severity.
- Minor section: non-blocking items (log, newline, imports) go in the Minor section, one line per item — not in per-file findings.
- When CI runs linter/formatter, skip style items in the Minor section; focus on what tools cannot catch.
- Subjective opinion: if a finding is personal preference, note it ("personal opinion", "subjective"). For Suggestion/Minor: add "Not blocking if you prefer" when relevant.
- Code citations: wrap file paths, identifiers, function names, selectors, snippets in backticks.
- Code modifications: avoid line-targeted suggestion blocks (they break markdown across platforms). Provide corrected code in standard markdown blocks; post at file level or as general comment.
- Tone: professional, direct, constructive. Length: review readable in 2 minutes, not 10.
- Diff only — see "Source of truth: remote only" section in SKILL.md.
- When posting: prefer overview notes over inline thread replies; no thread on pipeline status; AI disclosure mandatory (`---` then `*AI-assisted review (skill frontend-code-review)*`).
