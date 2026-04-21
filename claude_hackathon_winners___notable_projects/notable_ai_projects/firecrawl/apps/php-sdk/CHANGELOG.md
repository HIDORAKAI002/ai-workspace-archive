# Changelog

All notable changes to the Firecrawl PHP SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-21

### Added
- Parse: `parse()` with `ParseFile` and `ParseOptions` models for uploading
  local files (`html`, `pdf`, `docx`, etc.) to the `/v2/parse` endpoint via
  multipart form data.

## [1.0.0] - 2026-04-13

### Added
- Initial release with Firecrawl v2 API support
- Scrape: `scrape()`, `interact()`, `stopInteractiveBrowser()`
- Crawl: `crawl()`, `startCrawl()`, `getCrawlStatus()`, `cancelCrawl()`, `getCrawlErrors()`
- Batch Scrape: `batchScrape()`, `startBatchScrape()`, `getBatchScrapeStatus()`, `cancelBatchScrape()`
- Map: `map()`
- Search: `search()`
- Agent: `agent()`, `startAgent()`, `getAgentStatus()`, `cancelAgent()`
- Browser: `browser()`, `browserExecute()`, `deleteBrowser()`, `listBrowsers()`
- Usage: `getConcurrency()`, `getCreditUsage()`
- Automatic polling with pagination for async jobs (crawl, batch scrape, agent)
- Retry with exponential backoff for transient failures (408, 409, 502, 5xx)
- Typed exception hierarchy: `FirecrawlException`, `AuthenticationException`, `RateLimitException`, `JobTimeoutException`
- Laravel integration: auto-discovered service provider, publishable config, `Firecrawl` facade
- PHP 8.1+ support with named parameters and readonly properties
