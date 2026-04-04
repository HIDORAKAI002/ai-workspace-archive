---
title: "Introducing /extract v2: Launch Week III - Day 3"
description: "Turn any website into a clean, LLM-ready text file in seconds with llmstxt.new — powered by Firecrawl."
pubDate: "Apr 16, 2025"
heroImage: "../../assets/blog/lw3-d3-2.webp"
category: "updates"
---

**Welcome to Launch Week III, Day 3!** Today we’re excited to unveil **/extract v2**, the next-generation version of our powerful data extraction endpoint.

## Introducing /extract v2

If you’ve used the original `/extract` endpoint we launched back in January, you’re going to love what comes next. The all-new `/extract v2` brings massive improvements across the board:

- **Pagination and page interaction support** via our FIRE-1 agent.
- **Smarter model architecture** and upgraded internal pipelines.
- **Higher accuracy and reliability** across our internal benchmarks.
- **Built-in search layer** — extract from the web even without providing a URL.

## A Leap Beyond Extract v1

With FIRE-1 integration, `/extract v2` doesn’t just pull data — it understands the steps needed to **interact, navigate, and retrieve** information from complex websites. Whether it’s multiple pages, login walls, or dynamic content, it handles it all.

The new system is significantly more powerful, flexible, and accurate than extract v1. In short: this is a major leap forward for intelligent data extraction.

## What You Can Do with /extract v2

- Extract from multiple pages that require navigation and interaction.
- Use structured prompts and JSON Schema to define your output.
- Search and extract directly without URLs using our built-in search layer.
- Get reliable results on real-world, dynamic websites.

## Using FIRE-1 with the Extract Endpoint

You can now use the same FIRE-1 agent introduced in Day 2 to perform advanced extraction with the `/extract` endpoint.

### Example Usage (cURL):

```bash
curl -X POST https://api.firecrawl.dev/v1/extract \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "urls": ["https://example-forum.com/topic/123"],
      "prompt": "Extract all user comments from this forum thread.",
      "schema": {
        "type": "object",
        "properties": {
          "comments": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "author": {"type": "string"},
                "comment_text": {"type": "string"}
              },
              "required": ["author", "comment_text"]
            }
          }
        },
        "required": ["comments"]
      },
      "agent": {
        "model": "FIRE-1"
      }
    }'
```

This allows you to extract complex, multi-step, and paginated data — all with a single, streamlined request.

## Start Using /extract v2 Today

Ready to experience smarter, more interactive data extraction?

- **Try /extract v2:** Unlock next-level data gathering with Firecrawl and FIRE-1.
- **Check the docs:** Learn everything you need in our [official documentation](https://docs.firecrawl.dev/features/extract#using-fire-1).
- **Join the community:** Need help or want to share feedback? Head to our [Discord](https://discord.gg/S7Enyh9Abh) or email [help@firecrawl.com](mailto:help@firecrawl.com).
