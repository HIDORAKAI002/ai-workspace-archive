# Chinese Punctuation Preferences

Personal style preferences for Chinese punctuation in written content.

## Dash / 破折号

**Preferred**: ` - ` (space-hyphen-space)
**Avoid**: `——` (Chinese em dash, U+2014)

### Examples

```
✅ Correct:
Clawdbot 文档推荐使用 Opus 4.5，部分原因就是它有"更好的 prompt injection 抵抗能力" - 这说明维护者们很清楚这是一个真实的问题。

❌ Avoid:
Clawdbot 文档推荐使用 Opus 4.5，部分原因就是它有"更好的 prompt injection 抵抗能力"——这说明维护者们很清楚这是一个真实的问题。
```

### Rationale
- More consistent across platforms and fonts
- Easier to type
- Cleaner visual appearance in technical content

---

## Ellipsis / 省略号

**Preferred**: `......` (six ASCII periods)
**Avoid**: `……` (Chinese ellipsis, U+2026 × 2)

### Examples

```
✅ Correct:
Clawdbot、Claude computer use，所有这些......能力确实是变革性的。

❌ Avoid:
Clawdbot、Claude computer use，所有这些……能力确实是变革性的。
```

### Rationale
- Consistent character width
- Better compatibility with plain text environments
- Easier to search and replace

---

## Quotes / 引号

**Preferred**: `""` (Chinese curved quotes, U+201C / U+201D)
**Context**: For Chinese text content (body text, not code)

⚠️ **This is a common mistake** - AI models often default to straight quotes. Always use curved quotes in Chinese body text.

### Examples

```
✅ Correct (Chinese content):
但"真正去做事情"意味着"可以在你的电脑上执行任意命令"。
很多人想体验这个"贾维斯式"的 AI 助手。

❌ Avoid (Chinese content):
但"真正去做事情"意味着"可以在你的电脑上执行任意命令"。
很多人想体验这个"贾维斯式"的 AI 助手。
```

### How to Type

- macOS: `Option + [` for `"`, `Option + Shift + [` for `"`
- Or copy from here: `"` `"`

### Exception: YAML/Code

Use straight quotes `"` in:
- Markdown frontmatter (YAML syntax requirement)
- Code blocks
- JSON/config files

```yaml
# Frontmatter uses straight quotes
---
title: "文章标题"
tags: ["AI", "安全"]
---
```

---

## Summary Table

| Punctuation | Chinese Name | Preferred | Unicode | Avoid | Unicode |
|-------------|--------------|-----------|---------|-------|---------|
| Dash | 破折号 | ` - ` | U+002D | `——` | U+2014 |
| Ellipsis | 省略号 | `......` | U+002E × 6 | `……` | U+2026 × 2 |
| Left Quote | 左引号 | `"` | U+201C | `"` | U+0022 |
| Right Quote | 右引号 | `"` | U+201D | `"` | U+0022 |

---

## Application Scope

These preferences apply to:
- Blog posts and articles
- Translated content
- Video subtitles (Chinese)
- Social media posts

Exceptions:
- Code and technical identifiers
- Markdown/YAML frontmatter
- Direct quotes from sources (preserve original punctuation)
