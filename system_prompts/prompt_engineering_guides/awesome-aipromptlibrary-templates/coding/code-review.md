# Code Review Template

Systematic code review with focus on security, performance, and best practices.

## Template

```xml
<task>Review this code and suggest improvements</task>

<code>
[PASTE YOUR CODE HERE]
</code>

<thinking>
Before reviewing, analyze:
1. What is this code trying to accomplish?
2. What are the critical paths?
3. What could go wrong?
4. What are the performance implications?
5. Are there security concerns?
</thinking>

<review_focus>
- Security vulnerabilities (SQL injection, XSS, auth issues)
- Performance bottlenecks
- Code readability and maintainability
- Best practices compliance
- Error handling
- Edge cases
- Testing gaps
</review_focus>

<output_format>
Provide:

1. **Overall Assessment**
   - Quality score (1-10)
   - Summary (2-3 sentences)

2. **Critical Issues** (must fix before deployment)
   - Issue description
   - Location (line numbers)
   - Why it's critical
   - How to fix

3. **Improvements** (should fix for better quality)
   - Suggestion
   - Location
   - Why it matters
   - How to improve

4. **Refactored Code** (if improvements are significant)
   ```
   [Clean, improved version with comments]
   ```

5. **Testing Recommendations**
   - Test cases to add
   - Edge cases to cover

6. **Best Practices Notes**
   - What's done well
   - What to improve
</output_format>
```

## Quick Version (for small code snippets)

```xml
<code>[YOUR CODE]</code>

<review_checklist>
✅ Security
✅ Performance
✅ Readability
✅ Error handling
✅ Edge cases
</review_checklist>
```

---

**Back to [Main README](../README.md)**
