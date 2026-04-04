---
title: "Announcing FIRE-1, Our Web Action Agent: Launch Week III - Day 2"
description: "Firecrawl's new FIRE-1 AI Agent enhances web scraping capabilities by intelligently navigating and interacting with web pages."
pubDate: "Apr 15, 2025"
heroImage: "../../assets/blog/lw3-d2-3.webp"
category: "updates"
---

**Welcome to Launch Week III, Day 2!** Today we’re thrilled to announce FIRE-1, our first web action agent designed to turbocharge scraping experience.

## Meet FIRE-1: Intelligent Navigation and Interaction

FIRE-1 brings a new level of intelligence to Firecrawl, enhancing your scraping tasks by navigating complex website structures, interacting with dynamic content, and more. This powerful AI agent ensures comprehensive data extraction beyond traditional scraping methods.

This agent doesn’t just scrape — it **takes actions** to uncover the data you need, even when it’s hidden behind interactions like logins, button clicks, or modal windows.

Uncover Data with AI-Powered Actions

## With FIRE-1, you can:

- Interact with buttons, links, and dynamic elements.
- **Bring intelligent interaction to your scraping workflows — no manual steps required.**

## How to Enable FIRE-1

Activating FIRE-1 is straightforward. Simply include an `agent` object in your scrape API request:

```json
"agent": {
  "model": "FIRE-1",
  "prompt": "Your detailed navigation instructions here."
}
```

_Note:_ The `prompt` field is required for scrape requests, instructing FIRE-1 precisely how to interact with the webpage.

## Example Usage with Scrape Endpoint

Here’s a quick example using FIRE-1 with the scrape endpoint to paginate through product listings:

```bash
curl -X POST https://api.firecrawl.dev/v1/scrape \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -d '{
    "url": "https://www.ycombinator.com/companies",
    "formats": ["markdown"],
    "agent": {
      "model": "FIRE-1",
      "prompt": "Search for firecrawl and go to the company page."
    }
  }'
```

In this scenario, FIRE-1 intelligently fills out search forms and clicks around the website to find the desired page.

## Considerations

- Using FIRE-1 may consume more credits based on task complexity and interaction depth.
- Ensure your prompts clearly guide FIRE-1 to optimize results and efficiency.

## Start Using FIRE-1 Today

Experience the future of web scraping today:

- **Try FIRE-1:** Integrate intelligent navigation into your scraping and extracting workflows.
- **Explore the docs:** Learn more in our [comprehensive documentation](https://docs.firecrawl.dev/agents/fire-1).
- **Need help?** Join our [Discord community](https://discord.gg/S7Enyh9Abh) or email [help@firecrawl.com](mailto:help@firecrawl.com).

**Ready to leverage AI-powered scraping?** [Sign up for Firecrawl](https://firecrawl.dev/signup) and start with FIRE-1 today.
