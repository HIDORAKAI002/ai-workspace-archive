# System Prompt: files-api-typescript-overview

- Source: inline

## Summary

Overview of the Files API for file uploads.

# Raw Prompt Text
# Files API — TypeScript

The Files API uploads files for use in Messages API requests. Reference files via `file_id` in content blocks, avoiding re-uploads across multiple API calls.

**Beta:** Pass `betas: ["files-api-${DATE}"]` in your API calls (the SDK sets the required header automatically).

## Key Facts

- Maximum file size: ${NUM} MB
- Total storage: ${NUM} GB per organization
- Files persist until deleted
- File operations (upload, list, delete) are free; content used in messages is billed as input tokens
- Not available on Amazon Bedrock or Google Vertex AI

---

## Upload a File

```typescript
import Anthropic, { toFile } from "@anthropic-ai${PATH}";
import fs from "fs";

const client = new Anthropic();

const uploaded = await client.beta.files.upload({
  file: await toFile(fs.createReadStream("report.pdf"), undefined, {
    type: "application${PATH}",
  }),
  betas: ["files-api-${DATE}"],
});

console.log(`File ID: ${EXPR_1}`);
console.log(`Size: ${EXPR_2} bytes`);
```

---

## Use a File in Messages

### PDF / Text Document

```typescript
const response = await client.beta.messages.create({
  model: "{{OPUS_ID}}",
  max_tokens: ${NUM},
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "Summarize the key findings in this report." },
        {
          type: "document",
          source: { type: "file", file_id: uploaded.id },
          title: "Q4 Report",
          citations: { enabled: true },
        },
      ],
    },
  ],
  betas: ["files-api-${DATE}"],
});

console.log(response.content[${NUM}].text);
```

---

## Manage Files

### List Files

```typescript
const files = await client.beta.files.list({
  betas: ["files-api-${DATE}"],
});
for (const f of files.data) {
  console.log(`${EXPR_3}: ${EXPR_4} (${EXPR_5} bytes)`);
}
```

### Delete a File

```typescript
await client.beta.files.delete("file_011CNha8iCJcU1wXNR6q4V8w", {
  betas: ["files-api-${DATE}"],
});
```

### Download a File

```typescript
const response = await client.beta.files.download(
  "file_011CNha8iCJcU1wXNR6q4V8w",
  { betas: ["files-api-${DATE}"] },
);
const content = Buffer.from(await response.arrayBuffer());
await fs.promises.writeFile("output.txt", content);
```
