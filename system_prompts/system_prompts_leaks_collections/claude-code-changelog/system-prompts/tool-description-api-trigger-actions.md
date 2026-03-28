# Tool Prompt: api-trigger-actions

- Name: RemoteTrigger

## Summary

Interact with the claude.ai remote-trigger API.

# Raw Prompt Text
Call the claude.ai remote-trigger API. Use this instead of curl — the OAuth token is added automatically in-process and never exposed.

Actions:
- list: GET ${PATH}
- get: GET ${PATH}{trigger_id}
- create: POST ${PATH} (requires body)
- update: POST ${PATH}{trigger_id} (requires body, partial update)
- run: POST ${PATH}{trigger_id}${PATH}

The response is the raw JSON from the API.
