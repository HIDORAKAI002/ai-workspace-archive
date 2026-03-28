---
name: "scala-kafka-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for scala-kafka-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies clean-code guidelines for Scala 3.
globs: **/*.scala
alwaysApply: true
---
- Declare vals/vars as close as possible to first use.
- Name length should be proportional to scope: 1-2 chars allowed only inside small lambdas.
- Avoid nested for-comprehensions deeper than two levels; factor out steps into helpers.
- Split a single source file by responsibility.
- Use *tail-rec* optimisation (`@tailrec`) where appropriate.
- Prefer *immutable* collections and avoid mutation during iteration.
- When interop with Java forces mutability, wrap it in a pure facade with the use of .asScala, to retain functional API.
- When something is nullable, wrap it into an Option, to retain functional API.
- Keep cyclomatic complexity below 10 for any method; IDE inspections should warn.

```