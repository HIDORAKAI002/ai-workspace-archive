# System Prompt: message-batches-api-typescript

- Source: inline

## Summary

API for processing message requests in batches.

# Raw Prompt Text
# Message Batches API — TypeScript

The Batches API (`POST ${PATH}`) processes Messages API requests asynchronously at ${NUM}% of standard prices.

## Key Facts

- Up to ${NUM},${NUM} requests or ${NUM} MB per batch
- Most batches complete within ${NUM} hour; maximum ${NUM} hours
- Results available for ${NUM} days after creation
- ${NUM}% cost reduction on all token usage
- All Messages API features supported (vision, tools, caching, etc.)

---

## Create a Batch

```typescript
import Anthropic from "@anthropic-ai${PATH}";

const client = new Anthropic();

const messageBatch = await client.messages.batches.create({
  requests: [
    {
      custom_id: "request-${NUM}",
      params: {
        model: "{{OPUS_ID}}",
        max_tokens: ${NUM},
        messages: [
          { role: "user", content: "Summarize climate change impacts" },
        ],
      },
    },
    {
      custom_id: "request-${NUM}",
      params: {
        model: "{{OPUS_ID}}",
        max_tokens: ${NUM},
        messages: [
          { role: "user", content: "Explain quantum computing basics" },
        ],
      },
    },
  ],
});

console.log(`Batch ID: ${EXPR_1}`);
console.log(`Status: ${EXPR_2}`);
```

---

## Poll for Completion

```typescript
let batch;
while (true) {
  batch = await client.messages.batches.retrieve(messageBatch.id);
  if (batch.processing_status === "ended") break;
  console.log(
    `Status: ${EXPR_3}, processing: ${EXPR_4}`,
  );
  await new Promise((resolve) => setTimeout(resolve, 60_000));
}

console.log("Batch complete!");
console.log(`Succeeded: ${EXPR_5}`);
console.log(`Errored: ${EXPR_6}`);
```

---

## Retrieve Results

```typescript
for await (const result of await client.messages.batches.results(
  messageBatch.id,
)) {
  switch (result.result.type) {
    case "succeeded":
      console.log(
        `[${EXPR_7}] ${EXPR_8}`,
      );
      break;
    case "errored":
      if (result.result.error.type === "invalid_request") {
        console.log(`[${EXPR_9}] Validation error - fix and retry`);
      } else {
        console.log(`[${EXPR_10}] Server error - safe to retry`);
      }
      break;
    case "expired":
      console.log(`[${EXPR_11}] Expired - resubmit`);
      break;
  }
}
```

---

## Cancel a Batch

```typescript
const cancelled = await client.messages.batches.cancel(messageBatch.id);
console.log(`Status: ${EXPR_12}`); // "canceling"
```
