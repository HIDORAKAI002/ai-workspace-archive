# Tool Prompt: project-areas-session-summary

- Name: project_areas

## Summary

JSON output spec to group sessions into project areas with counts and brief descriptions.

# Raw Prompt Text
Analyze this Claude Code usage data and identify project areas.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "areas": [
    {"name": "Area name", "session_count": N, "description": "${NUM}-${NUM} sentences about what was worked on and how Claude Code was used."}
  ]
}

Include ${NUM}-${NUM} areas. Skip internal CC operations.
