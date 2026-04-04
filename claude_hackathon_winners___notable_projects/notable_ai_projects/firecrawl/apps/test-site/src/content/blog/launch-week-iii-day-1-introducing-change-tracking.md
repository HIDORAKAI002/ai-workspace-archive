---
title: "Introducing Change Tracking: Launch Week III - Day 1"
description: "Firecrawl's enhanced Change Tracking feature now provides detailed insights into webpage updates, including diffs and structured data comparisons."
pubDate: "Apr 14, 2025"
heroImage: "../../assets/blog/changeTracking.jpg"
category: "updates"
---

**Welcome to Launch Week III, Day 1! Today we’re excited to announce Change Tracking** — an enhanced Firecrawl feature that automatically detects and details changes on websites, now available in beta for all users.

## What is Change Tracking?

Change Tracking allows you to monitor website changes by comparing the current scrapes and crawls to previous versions, clearly indicating if content is new, unchanged, modified, or removed.

### Each Change Tracking response includes:

| Field              | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `previousScrapeAt` | Timestamp of the last scrape (or `null` if no previous scrape)    |
| `changeStatus`     | `new`, `same`, `changed`, or `removed`                            |
| `visibility`       | `visible` (found through crawling) or `hidden` (found via memory) |
| `diff` (optional)  | Git-style diff of changes (when enabled)                          |
| `json` (optional)  | Structured JSON comparison of specific fields (when enabled)      |

## Simple Integration

Firecrawl’s Change Tracking feature integrates effortlessly into your existing workflows with two simple request methods—scrape and crawl. You must specify the `markdown` format in addition to `changeTracking`:

### Scrape Request Example:

```typescript
const scrapeResponse = await app.scrapeUrl("https://firecrawl.dev", {
  formats: ["markdown", "changeTracking"],
});
console.log(scrapeResponse);
```

### Scrape Response:

```json
{
  "url": "https://firecrawl.dev",
  "markdown": "# AI Agents for great customer experiences\n\nChatbots that delight your users...",
  "changeTracking": {
    "previousScrapeAt": "2025-04-10T12:00:00Z",
    "changeStatus": "changed",
    "visibility": "visible"
  }
}
```

### Crawl Request Example:

```typescript
const crawlResponse = await app.crawlUrl("https://firecrawl.dev", {
  scrapeOptions: { formats: ["markdown", "changeTracking"] },
});
console.log(crawlResponse);
```

### Crawl Response:

```json
{
  "success": true,
  "status": "completed",
  "completed": 2,
  "total": 2,
  "creditsUsed": 2,
  "expiresAt": "2025-04-14T18:44:13.000Z",
  "data": [
    {
      "markdown": "# Turn websites into LLM-ready data\n\nPower your AI apps with web data from any website...",
      "metadata": {},
      "changeTracking": {
        "previousScrapeAt": "2025-04-10T12:00:00Z",
        "changeStatus": "changed",
        "visibility": "visible"
      }
    },
    {
      "markdown": "## Flexible Pricing\n\nStart for free, then scale as you grow...",
      "metadata": {},
      "changeTracking": {
        "previousScrapeAt": "2025-04-10T12:00:00Z",
        "changeStatus": "changed",
        "visibility": "visible"
      }
    }
  ]
}
```

## Advanced Change Tracking Modes

Change Tracking supports multiple advanced modes to suit different monitoring needs:

- **Git-Diff Mode:** Provides detailed, Git-style line-by-line diffs, perfect for content updates and edits.
- **JSON Mode:** Offers structured comparisons using a custom schema to track specific data changes, ideal for monitoring product details, pricing, or key text changes.

### Advanced Change Tracking Request Example:

```typescript
const result = await app.scrapeUrl("http://www.whattimeisit.com", {
  formats: ["markdown", "changeTracking"],
  changeTrackingOptions: {
    modes: ["git-diff", "json"], // Enable specific change tracking modes
    schema: {
      type: "object",
      properties: {
        time: { type: "string" },
      },
    }, // Schema for structured JSON comparison
    prompt: "Get the time", // Optional custom prompt
  },
});

// Access git-diff format changes
if (result.changeTracking.diff) {
  console.log(result.changeTracking.diff.text); // Git-style diff text
  console.log(result.changeTracking.diff.json); // Structured diff data
}

// Access JSON comparison changes
if (result.changeTracking.json) {
  console.log(result.changeTracking.json); // Previous and current values
}
```

### Git-Diff Results Example:

```
 **April, 13 2025**

-**05:55:05 PM**
+**05:58:57 PM**

...
```

### JSON Comparison Results Example:

```json
{
  "time": {
    "previous": "2025-04-13T17:54:32Z",
    "current": "2025-04-13T17:55:05Z"
  }
}
```

## How Change Tracking Works

When enabled, Firecrawl compares current scrapes against previous versions based on URL, team ID, and markdown format:

- **Comparison is resilient to whitespace and content order changes.**
- **Iframe source URLs are ignored** to avoid false positives caused by captchas or antibots.

## Important Considerations and Limitations

- **URL Consistency:** Ensure URLs match exactly for accurate comparisons.
- **Scrape Option Consistency:** Variations in scrape options can affect consistency.
- **Team Scoping:** Tracking is scoped per team; initial scrapes always show as new.
- **Beta Monitoring:** Watch the warning field and handle missing changeTracking objects due to potential database timeouts.

## Pricing

- Basic tracking and Git-diff mode: Free
- JSON mode: **5 credits per page scrape** due to additional processing requirements.

## Get Started Today

Change Tracking is live in beta for all users:

- **Try it now:** Add `changeTracking` to your scrape or crawl formats.
- **Learn more:** [Read the docs for `/scrape`](https://docs.firecrawl.dev/features/change-tracking) and [the docs for `/crawl`](https://docs.firecrawl.dev/features/crawl#change-tracking).
- **Get help:** Join our [Discord community](https://discord.gg/S7Enyh9Abh) or contact [help@firecrawl.com](mailto:help@firecrawl.com).

**Ready to track detailed content changes?** [Sign up for Firecrawl](https://firecrawl.dev/signup) and start today.
