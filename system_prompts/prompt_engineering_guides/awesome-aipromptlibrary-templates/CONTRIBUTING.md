# Contributing to Awesome AI Prompt Library Templates

First off, thank you for considering contributing! 🎉

This repository is community-driven, and we welcome all contributions - from fixing typos to adding new prompt templates.

## How to Contribute

### 1. Adding a New Prompt Template

**What makes a good contribution:**
✅ Battle-tested (you've used it successfully)
✅ Specific use case (not too generic)
✅ Includes examples
✅ Copy-paste ready
✅ Well-documented

**Template structure:**
```markdown
# [Template Name]

Brief description of what this template does.

## Use Cases
- When to use this
- Who it's for
- What problems it solves

## Template

```xml
[Your prompt template with clear placeholders]
```

## Example Usage

### Input
[Show a real example with placeholders filled]

### Expected Output
[Show what good output looks like]

## Variations
[Optional: Different versions for different scenarios]

## Tips for Best Results
- Tip 1
- Tip 2

## Related Templates
- Link to related prompts

---

**Back to [Main README](../README.md)**
```

### 2. Improving Existing Templates

Found a way to make a template better? Great!

- **Small changes** (typos, clarity): Submit a PR directly
- **Major changes** (restructuring): Open an issue first to discuss

### 3. Reporting Issues

If a template isn't working well:
1. Open an issue
2. Include:
   - Which template
   - What you expected
   - What you got
   - Your use case

## Contribution Process

### Step 1: Fork & Clone
```bash
# Fork this repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/awesome-aipromptlibrary-templates.git
cd awesome-aipromptlibrary-templates
```

### Step 2: Create a Branch
```bash
git checkout -b add-template-name
# or
git checkout -b fix-template-name
```

### Step 3: Make Your Changes

Add your template to the appropriate category:
- `coding/` - Development, debugging, testing
- `writing/` - Content creation, documentation
- `business/` - Professional communication, strategy
- `research/` - Analysis, data, academic work
- `creative/` - Brainstorming, design, marketing

**File naming:**
- Use lowercase
- Use hyphens (not underscores)
- Be descriptive: `api-error-handling.md` not `api.md`

### Step 4: Test Your Template

Before submitting:
1. ✅ Test it with Claude or ChatGPT
2. ✅ Verify all placeholders are clear
3. ✅ Check markdown formatting renders correctly
4. ✅ Ensure links work
5. ✅ Run through the example you provided

### Step 5: Update README.md

Add your template to the main README.md under the appropriate category:

```markdown
### Quick Links
- [Your Template Name](category/your-template.md) - Brief description
```

### Step 6: Commit & Push
```bash
git add .
git commit -m "Add [template name] for [use case]"
git push origin add-template-name
```

### Step 7: Submit Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Fill out the PR template (appears automatically)
4. Submit!

## Pull Request Guidelines

### PR Title Format
```
Add: [Template name] for [use case]
Fix: [Template name] - [what you fixed]
Update: [Template name] - [what you improved]
```

### PR Description Should Include
- **What:** What template you're adding/changing
- **Why:** Why it's useful
- **Tested:** Confirm you tested it
- **Example:** Link to output or screenshot (optional)

### Example PR Description
```markdown
## What
Adding a new template for generating SQL queries from natural language.

## Why
I use this daily for converting business questions into SQL.
Saves ~30 minutes per day vs. writing queries manually.

## Tested
✅ Tested with Claude 3.5 Sonnet
✅ Tested with GPT-4
✅ Works on PostgreSQL, MySQL, SQLite

## Example Output
See example in the template file. Generated a complex JOIN query from:
"Show me top 10 customers by revenue in 2024"
```

## Template Quality Standards

### Must Have:
- ✅ Clear use case
- ✅ Copy-paste ready template
- ✅ Placeholders clearly marked with `[BRACKETS]`
- ✅ At least one example
- ✅ Expected output shown

### Should Have:
- ✅ Variations for different scenarios
- ✅ Tips for best results
- ✅ Links to related templates
- ✅ Common pitfalls to avoid

### Nice to Have:
- ✅ Multiple examples
- ✅ Before/after comparisons
- ✅ Performance metrics
- ✅ Real-world use case stories

## Code of Conduct

### Do:
- ✅ Be respectful and constructive
- ✅ Provide helpful feedback
- ✅ Credit original sources
- ✅ Test your templates
- ✅ Write clear documentation

### Don't:
- ❌ Copy prompts without credit
- ❌ Submit untested templates
- ❌ Be rude or dismissive
- ❌ Submit promotional content
- ❌ Include personal/sensitive data in examples

## Questions?

- **General questions:** [Open a discussion](https://github.com/Grow-Online-Digital/awesome-aipromptlibrary-templates/discussions)
- **Bug reports:** [Open an issue](https://github.com/Grow-Online-Digital/awesome-aipromptlibrary-templates/issues)
- **Feature requests:** [Open an issue](https://github.com/Grow-Online-Digital/awesome-aipromptlibrary-templates/issues)

## Recognition

Contributors will be:
- ✨ Listed in the README (if you want)
- 🎉 Credited in release notes
- 💬 Mentioned in community showcases

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making this resource better for everyone!** 🙏
