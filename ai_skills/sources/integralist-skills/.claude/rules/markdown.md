---
paths:
  - '**/*.md'
---

We are peers writing Markdown. Prioritize readability, consistency, and
inclusive language.

## Formatting

- Wrap text at 80 columns.
- Use the formatter tool `mdformat` to automatically format Markdown files.

To install and configure the formatter with the necessary plugins (GitHub
Flavored Markdown and Frontmatter support):

```bash
pipx install mdformat
pipx inject mdformat mdformat-gfm
pipx inject mdformat mdformat-frontmatter
```

## Code Blocks

- Always apply a language identifier to code blocks.
- If there is no obvious language, use `txt` as the language (`txt` or `text` is
  generally more widely recognized and supported by syntax highlighters like
  GitHub Linguist, highlight.js, and Prism compared to `plain`).

````md
```txt
This is a plain text block.
```
````

## Linting

Use the following linters to ensure quality, style consistency, and inclusivity:

- **[markdownlint](https://github.com/DavidAnson/markdownlint)**: For general
  Markdown style checking and consistency.
- **[alex](https://alexjs.com/)**: For catching insensitive, inconsiderate, or
  offensive writing.
- **[woke](https://docs.getwoke.tech/)**: For detecting and replacing
  non-inclusive language.
