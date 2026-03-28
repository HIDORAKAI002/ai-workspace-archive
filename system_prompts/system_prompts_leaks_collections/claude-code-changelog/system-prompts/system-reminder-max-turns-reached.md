# System Prompt: max-turns-reached

- Source: inline

## Summary

Report that an agent hit the maximum allowed turns limit.

# Raw Prompt Text
[Agent
: $
{
  agentDefinition.agentType
}
] Reached max turns limit ($
{
  message.attachment.maxTurns
}
)
