# Python Debugging Template

Debug Python code with systematic root cause analysis and clear explanations.

## Use Cases
- Finding bugs in Python code
- Understanding error messages
- Performance optimization
- Security vulnerability detection
- Code improvement recommendations

## Template

```xml
<task>Debug this Python code and explain the issue</task>

<code>
[PASTE YOUR PYTHON CODE HERE]
</code>

<error_or_issue>
[PASTE ERROR MESSAGE OR DESCRIBE THE UNEXPECTED BEHAVIOR]
</error_or_issue>

<thinking>
Let me analyze this systematically:
1. What is this code supposed to do?
2. What is it actually doing?
3. What's the root cause of the issue?
4. Are there related issues I should address?
</thinking>

<analysis_focus>
- Root cause identification
- Security implications
- Performance considerations
- Edge cases
- Best practices violations
</analysis_focus>

<output_format>
Provide:

1. **Problem Summary** (one sentence)

2. **Root Cause**
   - What's causing the bug
   - Why it's happening
   - Line numbers where issue occurs

3. **Fixed Code**
   ```python
   # Fixed version with comments explaining changes
   ```

4. **Explanation**
   - Why the fix works
   - What was wrong with the original

5. **Prevention**
   - How to avoid this in the future
   - Testing recommendations
   - Code review checklist item

6. **Related Issues** (if any)
   - Other potential problems in the code
   - Improvements to consider
</output_format>
```

## Example Usage

### Input
```xml
<task>Debug this Python code and explain the issue</task>

<code>
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

scores = [85, 90, 78, 92, 88]
average = calculate_average(scores)
print(f"Average score: {average}")

# But when I pass an empty list, it crashes
empty_scores = []
avg = calculate_average(empty_scores)
</code>

<error_or_issue>
ZeroDivisionError: division by zero
</error_or_issue>

<thinking>
Let me analyze this systematically:
1. What is this code supposed to do?
2. What is it actually doing?
3. What's the root cause of the issue?
4. Are there related issues I should address?
</thinking>

<analysis_focus>
- Root cause identification
- Security implications
- Performance considerations
- Edge cases
- Best practices violations
</analysis_focus>

<output_format>
Provide:

1. **Problem Summary** (one sentence)

2. **Root Cause**
   - What's causing the bug
   - Why it's happening
   - Line numbers where issue occurs

3. **Fixed Code**
   ```python
   # Fixed version with comments explaining changes
   ```

4. **Explanation**
   - Why the fix works
   - What was wrong with the original

5. **Prevention**
   - How to avoid this in the future
   - Testing recommendations
   - Code review checklist item

6. **Related Issues** (if any)
   - Other potential problems in the code
   - Improvements to consider
</output_format>
```

### Expected Output

**1. Problem Summary**
The function crashes when given an empty list because it divides by zero (line 5).

**2. Root Cause**
- **Cause:** `len(numbers)` returns 0 for empty lists, causing division by zero
- **Why:** No validation of input before division operation
- **Location:** Line 5: `return total / len(numbers)`

**3. Fixed Code**
```python
def calculate_average(numbers):
    """
    Calculate the average of a list of numbers.

    Args:
        numbers: List of numeric values

    Returns:
        float: The average, or None if list is empty

    Raises:
        TypeError: If numbers contains non-numeric values
    """
    # Handle empty list edge case
    if not numbers:
        return None

    # Validate all elements are numbers
    if not all(isinstance(n, (int, float)) for n in numbers):
        raise TypeError("All elements must be numbers")

    total = sum(numbers)  # More Pythonic than manual loop
    return total / len(numbers)


# Usage examples
scores = [85, 90, 78, 92, 88]
average = calculate_average(scores)
if average is not None:
    print(f"Average score: {average}")
else:
    print("No scores to average")

# Safe handling of empty list
empty_scores = []
avg = calculate_average(empty_scores)
if avg is not None:
    print(f"Average: {avg}")
else:
    print("Cannot calculate average of empty list")
```

**4. Explanation**
- **Why fix works:** We check if the list is empty before attempting division
- **What was wrong:** Original code assumed input would always be non-empty
- **Improvement:** Also added type checking and better error handling

**5. Prevention**
- **Avoid in future:** Always validate inputs before operations that can fail
- **Testing:** Add unit tests for edge cases:
  ```python
  def test_calculate_average():
      assert calculate_average([1, 2, 3]) == 2.0
      assert calculate_average([]) is None
      with pytest.raises(TypeError):
          calculate_average([1, 'a', 3])
  ```
- **Code review checklist:**
  - ✅ Check for division by zero
  - ✅ Validate input assumptions
  - ✅ Handle empty collections
  - ✅ Add docstrings

**6. Related Issues**
- **Type safety:** Original code doesn't validate that `numbers` contains actual numbers
- **Performance:** Using `sum()` is more efficient than manual loop for large lists
- **Documentation:** Missing docstring explaining expected input/output
- **Return value:** Consider whether `None`, `0`, or raising an exception is better for empty lists (depends on use case)

---

## Variations

### For Performance Issues
Replace `<error_or_issue>` with:
```xml
<performance_issue>
This code is running slowly with large datasets.
Current performance: Processing 10,000 items takes 45 seconds.
Expected: Should process in under 5 seconds.
</performance_issue>
```

### For Security Issues
Replace `<analysis_focus>` with:
```xml
<security_focus>
- SQL injection vulnerabilities
- Input validation
- Authentication/authorization issues
- Data exposure risks
- Dependency vulnerabilities
</security_focus>
```

### For Code Smells
Add after `<thinking>`:
```xml
<code_quality_concerns>
Look for:
- Duplicate code
- Long functions (>50 lines)
- Deep nesting (>3 levels)
- Magic numbers
- Poor naming
- Missing error handling
</code_quality_concerns>
```

---

## Tips for Best Results

1. **Include the full error traceback** - Not just the error message
2. **Explain what you expected** - Helps AI understand intent
3. **Mention Python version** - Syntax and features vary by version
4. **Include relevant dependencies** - Some bugs are library-specific
5. **Describe your environment** - OS, runtime, etc. if relevant

## Related Templates

- [Code Review](code-review.md) - Systematic code review
- [Unit Test Generation](unit-tests.md) - Create test cases
- [Refactoring Guide](refactoring.md) - Improve code structure
- [SQL Optimization](sql-optimization.md) - Database query debugging

---

**Back to [Main README](../README.md)**
