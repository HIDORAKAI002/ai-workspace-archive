# Tool Prompt: memorable-moment-json

- Name: fun_ending

## Summary

JSON format request to extract a qualitative, memorable moment with brief context from usage data.

# Raw Prompt Text
Analyze this Claude Code usage data and find a memorable moment.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "headline": "A memorable QUALITATIVE moment from the transcripts - not a statistic. Something human, funny, or surprising.",
  "detail": "Brief context about when${PATH} this happened"
}

Find something genuinely interesting or amusing from the session summaries.
