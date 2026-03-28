# Tool Prompt: interaction-style-json-narrative

- Name: interaction_style

## Summary

JSON instructions to describe interaction style patterns in second person with bolded key insights.

# Raw Prompt Text
Analyze this Claude Code usage data and describe the user's interaction style.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "narrative": "${NUM}-${NUM} paragraphs analyzing HOW the user interacts with Claude Code. Use second person 'you'. Describe patterns: iterate quickly vs detailed upfront specs? Interrupt often or let Claude run? Include specific examples. Use **bold** for key insights.",
  "key_pattern": "One sentence summary of most distinctive interaction style"
}
