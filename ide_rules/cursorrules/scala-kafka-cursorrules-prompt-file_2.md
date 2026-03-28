---
name: "scala-kafka-cursorrules-prompt-file Cursorrules"
category: "ide_rules/cursor"
---

# IDE Rules for scala-kafka-cursorrules-prompt-file

*Drop the text below into your `.cursorrules`, `.clinerules`, or `.windsurfrules` file at the root of your project:*

```text
---
description: Applies general coding standards and best practices for Kafka development with Scala.
globs: **/*.scala
alwaysApply: true
---
- All topic names config values (Typesafe Config or pure-config).
- Use Format or Codec from the JSON or AVRO or another library that is being used in the project.
- Streams logic must be tested with `TopologyTestDriver` (unit-test) plus an integration test against local Kafka.

```