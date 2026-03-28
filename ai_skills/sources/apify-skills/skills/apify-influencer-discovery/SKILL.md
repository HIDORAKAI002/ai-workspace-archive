---
name: apify-influencer-discovery
description: Find and evaluate influencers for brand partnerships, verify authenticity, and track collaboration performance across Instagram, Facebook, YouTube, and TikTok.
---

# Influencer Discovery

Discover and analyze influencers across multiple platforms using Apify Actors.

## Prerequisites
(No need to check it upfront)

- `.env` file with `APIFY_TOKEN`
- Node.js 20.6+ (for native `--env-file` support)

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Determine discovery source (select Actor)
- [ ] Step 2: Fetch Actor schema
- [ ] Step 3: Ask user preferences (format, filename)
- [ ] Step 4: Run the discovery script
- [ ] Step 5: Summarize results
```

### Step 1: Determine Discovery Source

Select the appropriate Actor based on user needs:

| User Need | Actor ID | Best For |
|-----------|----------|----------|
| Influencer profiles | `apify/instagram-profile-scraper` | Profile metrics, bio, follower counts |
| Find by hashtag | `apify/instagram-hashtag-scraper` | Discover influencers using specific hashtags |
| Reel engagement | `apify/instagram-reel-scraper` | Analyze reel performance and engagement |
| Discovery by niche | `apify/instagram-search-scraper` | Search for influencers by keyword/niche |
| Brand mentions | `apify/instagram-tagged-scraper` | Track who tags brands/products |
| Comprehensive data | `apify/instagram-scraper` | Full profile, posts, comments analysis |
| API-based discovery | `apify/instagram-api-scraper` | Fast API-based data extraction |
| Engagement analysis | `apify/export-instagram-comments-posts` | Export comments for sentiment analysis |
| Facebook content | `apify/facebook-posts-scraper` | Analyze Facebook post performance |
| Micro-influencers | `apify/facebook-groups-scraper` | Find influencers in niche groups |
| Influential pages | `apify/facebook-search-scraper` | Search for influential pages |
| YouTube creators | `streamers/youtube-channel-scraper` | Channel metrics and subscriber data |
| TikTok influencers | `clockworks/tiktok-scraper` | Comprehensive TikTok data extraction |
| TikTok (free) | `clockworks/free-tiktok-scraper` | Free TikTok data extractor |
| Live streamers | `clockworks/tiktok-live-scraper` | Discover live streaming influencers |

### Step 2: Fetch Actor Schema

Fetch the Actor's input schema and details:

```bash
node --env-file=.env ${CLAUDE_PLUGIN_ROOT}/reference/scripts/fetch_actor_details.js --actor "ACTOR_ID"
```

Replace `ACTOR_ID` with the selected Actor (e.g., `apify/instagram-profile-scraper`).

This returns:
- Actor info (title, description, URL, categories, stats, rating)
- README summary
- Input schema (required and optional parameters)

### Step 3: Ask User Preferences

**Skip this step** for simple lookups (e.g., "what's Nike's follower count?", "find me 5 coffee shops in Prague") — just use quick answer mode and move to Step 4.

For larger scraping tasks, ask:
1. **Output format**:
   - **Quick answer** - Display top few results in chat (no file saved)
   - **CSV** - Full export with all fields
   - **JSON** - Full export in JSON format
2. **Number of results**: Based on character of use case

**Cost safety**: Always set a sensible result limit in the Actor input (e.g., `maxResults`, `resultsLimit`, `maxCrawledPages`, or equivalent field from the input schema). Default to 100 results unless the user explicitly asks for more. Warn the user before running large scrapes (1000+ results) as they consume more Apify credits.

### Step 4: Run the Script

**Quick answer (display in chat, no file):**
```bash
node --env-file=.env ${CLAUDE_PLUGIN_ROOT}/reference/scripts/run_actor.js \
  --actor "ACTOR_ID" \
  --input 'JSON_INPUT'
```

**CSV:**
```bash
node --env-file=.env ${CLAUDE_PLUGIN_ROOT}/reference/scripts/run_actor.js \
  --actor "ACTOR_ID" \
  --input 'JSON_INPUT' \
  --output YYYY-MM-DD_OUTPUT_FILE.csv \
  --format csv
```

**JSON:**
```bash
node --env-file=.env ${CLAUDE_PLUGIN_ROOT}/reference/scripts/run_actor.js \
  --actor "ACTOR_ID" \
  --input 'JSON_INPUT' \
  --output YYYY-MM-DD_OUTPUT_FILE.json \
  --format json
```

### Step 5: Summarize Results

After completion, report:
- Number of influencers found
- File location and name
- Key metrics available (followers, engagement rate, etc.)
- Suggested next steps (filtering, outreach, deeper analysis)


## Error Handling

`APIFY_TOKEN not found` - Ask user to create `.env` with `APIFY_TOKEN=your_token`
`Actor not found` - Check Actor ID spelling
`Run FAILED` - Ask user to check Apify console link in error output
`Timeout` - Reduce input size or increase `--timeout`
