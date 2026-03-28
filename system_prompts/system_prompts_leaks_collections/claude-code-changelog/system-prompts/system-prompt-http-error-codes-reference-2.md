# System Prompt: http-error-codes-reference-2

- Source: inline

## Summary

Documentation of HTTP error codes for Claude API.

# Raw Prompt Text
# HTTP Error Codes Reference

This file documents HTTP error codes returned by the Claude API, their common causes, and how to handle them. For language-specific error handling examples, see the `python/` or `typescript/` folders.

## Error Code Summary

| Code | Error Type              | Retryable | Common Cause                         |
| ---- | ----------------------- | --------- | ------------------------------------ |
| ${NUM}  | `invalid_request_error` | No        | Invalid request format or parameters |
| ${NUM}  | `authentication_error`  | No        | Invalid or missing API key           |
| ${NUM}  | `permission_error`      | No        | API key lacks permission             |
| ${NUM}  | `not_found_error`       | No        | Invalid endpoint or model ID         |
| ${NUM}  | `request_too_large`     | No        | Request exceeds size limits          |
| ${NUM}  | `rate_limit_error`      | Yes       | Too many requests                    |
| ${NUM}  | `api_error`             | Yes       | Anthropic service issue              |
| ${NUM}  | `overloaded_error`      | Yes       | API is temporarily overloaded        |

## Detailed Error Information

### ${NUM} Bad Request

**Causes:**

- Malformed JSON in request body
- Missing required parameters (`model`, `max_tokens`, `messages`)
- Invalid parameter types (e.g., string where integer expected)
- Empty messages array
- Messages not alternating user${PATH}

**Example error:**

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "messages: roles must alternate between \"user\" and \"assistant\""
  },
  "request_id": "req_011CSHoEeqs5C35K2UUqR7Fy"
}
```

**Fix:** Validate request structure before sending. Check that:

- `model` is a valid model ID
- `max_tokens` is a positive integer
- `messages` array is non-empty and alternates correctly

---

### ${NUM} Unauthorized

**Causes:**

- Missing `x-api-key` header or `Authorization` header
- Invalid API key format
- Revoked or deleted API key

**Fix:** Ensure `ANTHROPIC_API_KEY` environment variable is set correctly.

---

### ${NUM} Forbidden

**Causes:**

- API key doesn't have access to the requested model
- Organization-level restrictions
- Attempting to access beta features without beta access

**Fix:** Check your API key permissions in the Console. You may need a different API key or to request access to specific features.

---

### ${NUM} Not Found

**Causes:**

- Typo in model ID (e.g., `claude-sonnet-${NUM}` instead of `claude-sonnet-${NUM}-${NUM}`)
- Using deprecated model ID
- Invalid API endpoint

**Fix:** Use exact model IDs from the models documentation. You can use aliases (e.g., `{{OPUS_ID}}`).

---

### ${NUM} Request Too Large

**Causes:**

- Request body exceeds maximum size
- Too many tokens in input
- Image data too large

**Fix:** Reduce input size — truncate conversation history, compress${PATH} images, or split large documents into chunks.

---

### ${NUM} Validation Errors

Some ${NUM} errors are specifically related to parameter validation:

- `max_tokens` exceeds model's limit
- Invalid `temperature` value (must be ${NUM}-${NUM})
- `budget_tokens` >= `max_tokens` in extended thinking
- Invalid tool definition schema

**Common mistake with extended thinking:**

```
# Wrong: budget_tokens must be < max_tokens
thinking: budget_tokens=${NUM}, max_tokens=${NUM}  → Error!

# Correct
thinking: budget_tokens=${NUM}, max_tokens=${NUM}
```

---

### ${NUM} Rate Limited

**Causes:**

- Exceeded requests per minute (RPM)
- Exceeded tokens per minute (TPM)
- Exceeded tokens per day (TPD)

**Headers to check:**

- `retry-after`: Seconds to wait before retrying
- `x-ratelimit-limit-*`: Your limits
- `x-ratelimit-remaining-*`: Remaining quota

**Fix:** The Anthropic SDKs automatically retry ${NUM} and 5xx errors with exponential backoff (default: `max_retries=${NUM}`). For custom retry behavior, see the language-specific error handling examples.

---

### ${NUM} Internal Server Error

**Causes:**

- Temporary Anthropic service issue
- Bug in API processing

**Fix:** Retry with exponential backoff. If persistent, check [status.anthropic.com](${URL}).

---

### ${NUM} Overloaded

**Causes:**

- High API demand
- Service capacity reached

**Fix:** Retry with exponential backoff. Consider using a different model (Haiku is often less loaded), spreading requests over time, or implementing request queuing.

---

## Common Mistakes and Fixes

| Mistake                         | Error            | Fix                                                     |
| ------------------------------- | ---------------- | ------------------------------------------------------- |
| `budget_tokens` >= `max_tokens` | ${NUM}              | Ensure `budget_tokens` < `max_tokens`                   |
| Typo in model ID                | ${NUM}              | Use valid model ID like `{{OPUS_ID}}`               |
| First message is `assistant`    | ${NUM}              | First message must be `user`                            |
| Consecutive same-role messages  | ${NUM}              | Alternate `user` and `assistant`                        |
| API key in code                 | ${NUM} (leaked key) | Use environment variable                                |
| Custom retry needs              | ${NUM}${PATH}          | SDK retries automatically; customize with `max_retries` |

## Typed Exceptions in SDKs

**Always use the SDK's typed exception classes** instead of checking error messages with string matching. Each HTTP error code maps to a specific exception class:

| HTTP Code | TypeScript Class                  | Python Class                      |
| --------- | --------------------------------- | --------------------------------- |
| ${NUM}       | `Anthropic.BadRequestError`       | `anthropic.BadRequestError`       |
| ${NUM}       | `Anthropic.AuthenticationError`   | `anthropic.AuthenticationError`   |
| ${NUM}       | `Anthropic.PermissionDeniedError` | `anthropic.PermissionDeniedError` |
| ${NUM}       | `Anthropic.NotFoundError`         | `anthropic.NotFoundError`         |
| ${NUM}       | `Anthropic.RateLimitError`        | `anthropic.RateLimitError`        |
| ${NUM}+      | `Anthropic.InternalServerError`   | `anthropic.InternalServerError`   |
| Any       | `Anthropic.APIError`              | `anthropic.APIError`              |

```typescript
// ✅ Correct: use typed exceptions
try {
  const response = await client.messages.create({...});
} catch (error) {
  if (error instanceof Anthropic.RateLimitError) {
    // Handle rate limiting
  } else if (error instanceof Anthropic.APIError) {
    console.error(`API error ${EXPR_1}:`, error.message);
  }
}

// ❌ Wrong: don't check error messages with string matching
try {
  const response = await client.messages.create({...});
} catch (error) {
  const msg = error instanceof Error ? error.message : String(error);
  if (msg.includes("${NUM}") || msg.includes("rate_limit")) { ... }
}
```

All exception classes extend `Anthropic.APIError`, which has a `status` property. Use `instanceof` checks from most specific to least specific (e.g., check `RateLimitError` before `APIError`).
