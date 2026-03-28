# Tool Prompt: friction-points-json-categories

- Name: friction_analysis

## Summary

JSON schema and instructions to categorize user friction patterns with descriptions and examples in second person.

# Raw Prompt Text
Analyze this Claude Code usage data and identify friction points for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "${NUM} sentence summarizing friction patterns",
  "categories": [
    {"category": "Concrete category name", "description": "${NUM}-${NUM} sentences explaining this category and what could be done differently. Use 'you' not 'the user'.", "examples": ["Specific example with consequence", "Another example"]}
  ]
}

Include ${NUM} friction categories with ${NUM} examples each.
