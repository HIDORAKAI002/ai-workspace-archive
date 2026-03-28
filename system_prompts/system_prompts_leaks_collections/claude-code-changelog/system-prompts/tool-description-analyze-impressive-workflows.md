# Tool Prompt: analyze-impressive-workflows

- Name: what_works

## Summary

Second-person analysis of usage data highlighting what you do well in key workflows.

# Raw Prompt Text
Analyze this Claude Code usage data and identify what's working well for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "${NUM} sentence of context",
  "impressive_workflows": [
    {"title": "Short title (${NUM}-${NUM} words)", "description": "${NUM}-${NUM} sentences describing the impressive workflow or approach. Use 'you' not 'the user'."}
  ]
}

Include ${NUM} impressive workflows.
